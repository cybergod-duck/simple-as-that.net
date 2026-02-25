import imaplib
import email
import re
import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()

# Zoho IMAP Configuration
ZOHO_IMAP = "imap.zoho.com"
USER = "admin@simple-as-that.org"
PASSWORD = os.getenv("ZOHO_PURGE_KEY")
DB_PATH = "targets.db"

def purge_dead_leads():
    try:
        # 1. Connect to Zoho
        print(f"[*] CONNECTING TO ZOHO IMAP: {ZOHO_IMAP}")
        mail = imaplib.IMAP4_SSL(ZOHO_IMAP)
        mail.login(USER, PASSWORD)
        
        # Searching INBOX as bounce-backs usually land there
        mail.select("INBOX") 
        
        # 2. Search for Mailer-Daemon failures
        print("[*] HUNTING FOR MAILER-DAEMON BOUNCE NOTIFICATIONS...")
        status, messages = mail.search(None, '(FROM "mailer-daemon@mail.zoho.com")')
        
        if status != 'OK' or not messages[0]:
            print("[+] No bounce-backs found in INBOX. Reputation is pristine.")
            mail.close()
            mail.logout()
            return
            
        message_numbers = messages[0].split()
        print(f"[*] Found {len(message_numbers)} bounce notifications to process.")
        
        dead_emails = []
        for num in message_numbers:
            _, data = mail.fetch(num, '(RFC822)')
            msg = email.message_from_bytes(data[0][1])
            
            # Extract the body payload
            body = ""
            if msg.is_multipart():
                for part in msg.walk():
                    content_type = part.get_content_type()
                    content_disposition = str(part.get("Content-Disposition"))

                    if content_type == "text/plain" and "attachment" not in content_disposition:
                        body_bytes = part.get_payload(decode=True)
                        if body_bytes:
                            body += body_bytes.decode('utf-8', errors='ignore')
            else:
                 body_bytes = msg.get_payload(decode=True)
                 if body_bytes:
                     body += body_bytes.decode('utf-8', errors='ignore')

            # Regex to find the failed recipient email in the bounce body
            found = re.findall(r'[\w\.-]+@[\w\.-]+', body)
            if found:
                # The first email mentioned after the sender in the bounce log is usually the failed target
                for f_email in found:
                     if "mailer-daemon" not in f_email.lower() and USER.lower() not in f_email.lower():
                           dead_emails.append(f_email)
                           break

        # 3. Blacklist in SQLite
        if dead_emails:
            print(f"[*] Found {len(set(dead_emails))} unique dead leads. Purging from database...")
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            for mail_addr in set(dead_emails):
                cursor.execute("UPDATE vulnerable_targets SET email_sent = 1, contact_email = '[BANNED] ' || contact_email WHERE contact_email = ?", (mail_addr,))
                print(f"[-] BLACKLISTED DEAD LEAD: {mail_addr}")
            conn.commit()
            conn.close()
            print("[+] Database purge complete.")
        else:
             print("[+] No identifiable email addresses found in the bounce logs.")
        
        mail.close()
        mail.logout()
        
    except sqlite3.Error as e:
         print(f"[-] Database Error during Purge: {e}")
    except Exception as e:
         print(f"[-] IMAP/Purge Error: {e}")

if __name__ == "__main__":
    print("=========================================")
    print(" ANTIGRAVITY BOUNCE-BACK PURGE INITIATED")
    print("=========================================")
    purge_dead_leads()

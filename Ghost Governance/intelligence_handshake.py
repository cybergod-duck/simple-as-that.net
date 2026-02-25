import sqlite3
import csv
import json
import os
import sys

DB_PATH = "targets.db"

def ensure_status_column():
    """Dynamically adds a 'status' tracking column to the existing schema to support Deep Research states."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute("ALTER TABLE vulnerable_targets ADD COLUMN status TEXT DEFAULT 'PENDING'")
        # Retroactively map older states just in case
        cursor.execute("UPDATE vulnerable_targets SET status = 'BANNED' WHERE contact_email LIKE '[BANNED]%'")
        cursor.execute("UPDATE vulnerable_targets SET status = 'SENT' WHERE email_sent = 1 AND status != 'BANNED'")
        conn.commit()
    except sqlite3.OperationalError:
        pass # Column likely already exists
    finally:
        conn.close()

def process_handshake(filepath):
    print("=========================================")
    print(" INITIATING INTELLIGENCE HANDSHAKE")
    print("=========================================")
    ensure_status_column()
    
    if not os.path.exists(filepath):
        print(f"[-] FATAL: Payload file not found at {filepath}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    processed_count = 0
    print(f"[*] READING PAYLOAD: {filepath}")
    
    try:
        if filepath.endswith('.csv'):
            with open(filepath, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                # Expecting columns: domain, email
                for row in reader:
                    domain = row.get('domain', '').strip()
                    email = row.get('email', '').strip()
                    if domain and email:
                        cursor.execute(
                            "UPDATE vulnerable_targets SET contact_email = ?, status = 'VERIFIED_STRIKE' WHERE domain = ?",
                            (email, domain)
                        )
                        processed_count += 1
                        print(f"[+] COLD STORAGE -> VERIFIED_STRIKE: {domain} assigned to {email}")
                        
        elif filepath.endswith('.json'):
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Expecting a JSON array of objects: [{"domain": "x.com", "email": "ceo@x.com"}]
                for item in data:
                    domain = item.get('domain', '').strip()
                    email = item.get('email', '').strip()
                    if domain and email:
                        cursor.execute(
                            "UPDATE vulnerable_targets SET contact_email = ?, status = 'VERIFIED_STRIKE' WHERE domain = ?",
                            (email, domain)
                        )
                        processed_count += 1
                        print(f"[+] COLD STORAGE -> VERIFIED_STRIKE: {domain} assigned to {email}")
        else:
            print("[-] Unsupported file format. Please provide .csv or .json")
            conn.close()
            return

        conn.commit()
        print(f"\n[+] INTELLIGENCE HANDSHAKE COMPLETE. {processed_count} targets upgraded to VERIFIED_STRIKE.")
        
    except Exception as e:
        print(f"[-] ERROR PROCESSING HANDSHAKE: {e}")
        
    finally:
        conn.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        process_handshake(sys.argv[1])
    else:
        print("Usage: python intelligence_handshake.py <path_to_payload.csv_or_.json>")
        print("[*] No file specified. Scanning for default 'enriched_payload.csv' or 'enriched_payload.json'...")
        found = False
        for default_file in ['enriched_payload.csv', 'enriched_payload.json']:
            if os.path.exists(default_file):
                print(f"[*] Auto-detected {default_file}. Engaging...")
                process_handshake(default_file)
                found = True
                break
        
        if not found:
             print("[-] No default payload files found in the directory.")

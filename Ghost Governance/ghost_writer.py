import os
import requests
from dotenv import load_dotenv

# Load environment variables
ENV_PATH = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(ENV_PATH)

def get_access_token():
    """Uses the perpetual Refresh Token to get a fresh Access Token."""
    client_id = os.getenv("ZOHO_CLIENT_ID")
    client_secret = os.getenv("ZOHO_CLIENT_SECRET")
    refresh_token = os.getenv("ZOHO_REFRESH_TOKEN")

    url = "https://accounts.zoho.com/oauth/v2/token"
    payload = {
        "grant_type": "refresh_token",
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
    }

    response = requests.post(url, data=payload)
    response.raise_for_status()
    data = response.json()
    return data.get("access_token")

def fetch_account_id(access_token):
    """Fetches the primary account ID needed to send emails via the API."""
    url = "https://mail.zoho.com/api/accounts"
    headers = {"Authorization": f"Zoho-oauthtoken {access_token}"}
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    accounts = response.json().get("data", [])
    
    if accounts:
        # Assuming the first account returned is the one with the aliases configured
        return accounts[0].get("accountId")
    return None

def generate_and_send_audit(target_email, access_token, account_id, state_code=None, domain="unknown"):
    """GHOST-WRITER: Compiles plain text/HTML business email and sends via Zoho."""
    print(f"[+] GHOST-WRITER: Synthesizing compliance audit for {target_email} ({state_code})...")
    
    # We enforce the "Write/Send" using the admin alias explicitly
    from_address = "admin@simple-as-that.org"
    
    # Custom subject and body based on the state vulnerability
    if state_code == 'TN':
        subject = "Website Upgrade & Tennessee Compliance Review"
        state_name = "Tennessee (TIPA)"
        urgency_text = "As a heads up, Tennessee's Information Protection Act (TIPA) requires specific privacy updates. Many local businesses are upgrading their sites this year to ensure they are covered."
    elif state_code == 'RI':
        subject = "Website Upgrade & Rhode Island Compliance Review"
        state_name = "Rhode Island (RIDTPPA)"
        urgency_text = "Just a quick note that the new Rhode Island Data Transparency and Privacy Protection Act (RIDTPPA) recently took effect. We're helping local businesses update their sites to meet these new standards."
    elif state_code == 'IN':
        subject = "Website Upgrade & Indiana Compliance Review"
        state_name = "Indiana (ICDPA)"
        urgency_text = "With Indiana's Consumer Data Protection Act (ICDPA) taking effect, it's a great time to refresh your website. We've been helping local teams add these required updates seamlessly."
    elif state_code == 'NJ':
        subject = "Website Upgrade & New Jersey Compliance Review"
        state_name = "New Jersey (NJDPA)"
        urgency_text = "New Jersey's Data Privacy Act (NJDPA) requires sites to recognize Global Privacy Control signals. We specialize in modernizing websites to handle these requirements smoothly."
    elif state_code == 'KY':
        subject = "Website Upgrade & Kentucky Compliance Review"
        state_name = "Kentucky (KCDPA)"
        urgency_text = "Kentucky's Consumer Data Protection Act (KCDPA) is rolling out soon. We're proactively reaching out to local businesses to help them upgrade their websites to ensure they are ready."
    else:
        subject = "Website Modernization & 2026 Compliance Review"
        state_name = "upcoming state"
        urgency_text = "As new state privacy laws roll out, it's a great opportunity to modernize your website and ensure it's fully compliant with modern web standards."
    
    # Build dynamic link
    base_url = f"https://simple-as-that.org/audit/{domain}"
    patch_link = f"{base_url}?state={state_code}" if state_code else base_url
    patch_name = "Compliance Upgrade Patch"
        
    # Clean, plain-text styling to maximize deliverability and avoid marketing filters
    content_html = f"""
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
        <p>Hi there,</p>
        <p>We were taking a look at your website and noticed it might be a good time for a refresh, especially with the new {state_name} privacy guidelines taking effect.</p>
        <p>{urgency_text}</p>
        <p>Our team builds fast, modern websites for local businesses. If you're happy with your current design, we've also put together a simple drop-in snippet you can add to your existing site to handle the new compliance requirements.</p>
        <br>
        <p><b>You can review the details and grab the upgrade snippet here:</b></p>
        <p><a href="{patch_link}" style="color: #0056b3; font-weight: bold;">{patch_name} & Deployment Guide</a></p>
        <br>
        <p>If you're ever looking for a complete website redesign, we'd love to help. Feel free to reach out with any questions!</p>
        <p>Best regards,</p>
        <p><strong>The Web Design Team</strong><br>
        Simple As That<br>
        admin@simple-as-that.org</p>
    </div>
    """

    url = f"https://mail.zoho.com/api/accounts/{account_id}/messages"
    headers = {
        "Authorization": f"Zoho-oauthtoken {access_token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "fromAddress": from_address,
        "toAddress": target_email,
        "subject": subject,
        "content": content_html,
        "mailFormat": "html",
    }
    
    print("[+] Sending payload to Zoho Mail API...")
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        
        resp_data = response.json()
        if resp_data.get("status", {}).get("code") == 200:
            print(f"[+] SUCCESS: Compliance Audit sent to {target_email} from {from_address}")
        else:
            print(f"[-] ERROR: Zoho Mail API rejected the message. Response: {resp_data}")
            
    except requests.exceptions.RequestException as e:
        print(f"[-] Request failed during send: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"[-] API Response Output: {e.response.text}")


if __name__ == "__main__":
    import sys
    
    # Default target for testing if not provided via CLI
    target = sys.argv[1] if len(sys.argv) > 1 else "ovjuputti@gmail.com"
    
    token = get_access_token()
    if token:
        acc_id = fetch_account_id(token)
        if acc_id:
            generate_and_send_audit(target, token, acc_id)
        else:
            print("[-] Could not fetch primary account ID")
    else:
        print("[-] Could not retrieve access token")

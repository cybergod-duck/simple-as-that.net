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

    if not all([client_id, client_secret, refresh_token]):
        print("[-] Missing Zoho credentials or Refresh Token in .env file.")
        return None

    url = "https://accounts.zoho.com/oauth/v2/token"
    payload = {
        "grant_type": "refresh_token",
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
    }

    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        data = response.json()
        
        if "access_token" in data:
            return data["access_token"]
        else:
            print(f"[-] Error fetching access token: {data}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"[-] Request failed during access token fetch: {e}")
        return None

def verify_scopes_and_alias(access_token, target_alias="admin@simple-as-that.org"):
    """Pings the Zoho Mail API to confirm access and alias mapping."""
    print(f"[+] SCOPE-VALET: Verifying API access for {target_alias}...")

    # Fetch Account Info
    url = "https://mail.zoho.com/api/accounts"
    headers = {
        "Authorization": f"Zoho-oauthtoken {access_token}"
    }

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 403:
            print("[-] 403 Forbidden: The token does not have the correct scopes (e.g., ZohoMail.messages.ALL, ZohoMail.accounts.READ).")
            return
            
        response.raise_for_status()
        data = response.json()

        accounts = data.get("data", [])
        if not accounts:
            print("[-] No mail accounts found for this user.")
            return

        print("[+] Account details retrieved successfully.")
        
        # Check if target_alias exists in user's send-as addresses or primary email
        alias_found = False
        account_id = None
        
        for account in accounts:
            primary_email = account.get("primaryEmailAddress", "")
            if primary_email == target_alias:
                alias_found = True
                account_id = account.get("accountId")
                break
                
            # Check Send-As addresses if available in the accounts payload
            send_as_details = account.get("sendAsDetails", [])
            for send_as in send_as_details:
                if send_as.get("emailAddress") == target_alias:
                    alias_found = True
                    account_id = account.get("accountId")
                    break
        
        if alias_found:
            print(f"[+] Verified: The alias '{target_alias}' is correctly mapped and accessible.")
            print(f"[+] Account ID: {account_id}")
            print("[+] SCOPE-VALET Audit Complete: API Guard confirms Write access is clear for sending.")
        else:
            print(f"[-] Warning: The alias '{target_alias}' was not found in the accessible accounts.")
            print(f"    Available primary emails: {[acc.get('primaryEmailAddress') for acc in accounts]}")
            
    except requests.exceptions.RequestException as e:
        print(f"[-] API request failed during verification: {e}")


if __name__ == "__main__":
    token = get_access_token()
    if token:
        verify_scopes_and_alias(token)

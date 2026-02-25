import os
import requests
from dotenv import load_dotenv, set_key

# Load environment variables from .env file
ENV_PATH = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(ENV_PATH)

def fetch_refresh_token():
    client_id = os.getenv("ZOHO_CLIENT_ID")
    client_secret = os.getenv("ZOHO_CLIENT_SECRET")
    grant_token = os.getenv("ZOHO_GRANT_TOKEN")

    if not all([client_id, client_secret, grant_token]):
        print("[-] Missing one or more Zoho credentials in .env file.")
        return

    print("[+] ZOHO-RELAY Initiated: Exchanging Grant Token for Refresh Token...")

    url = "https://accounts.zoho.com/oauth/v2/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": client_id,
        "client_secret": client_secret,
        "code": grant_token,
    }

    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        data = response.json()

        if "refresh_token" in data:
            refresh_token = data["refresh_token"]
            print(f"[+] Success! Refresh Token acquired. Saving to .env Vault...")
            
            # Securely update the .env file with the newly acquired token
            set_key(ENV_PATH, "ZOHO_REFRESH_TOKEN", refresh_token)
            
            print(f"[+] ZOHO-RELAY Complete: Perpetual Session secured.")
        elif "error" in data:
            print(f"[-] Zoho API Error: {data.get('error')} - {data.get('error_description')}")
        else:
            print(f"[-] Unexpected response format: {data}")

    except requests.exceptions.RequestException as e:
        print(f"[-] Request failed: {e}")

if __name__ == "__main__":
    fetch_refresh_token()

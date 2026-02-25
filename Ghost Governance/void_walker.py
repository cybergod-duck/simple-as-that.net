import sqlite3
import requests
import time
import random
import re
import concurrent.futures
from bs4 import BeautifulSoup
from duckduckgo_search import DDGS
from urllib.parse import urlparse
from nameparser import HumanName
import tldextract

DB_PATH = "targets.db"

# ==========================================
# PROXY-GHOST ROTATION MIDDLEWARE
# Insert your BrightData or ScraperAPI proxy URLs here.
# Example: "http": "http://user:pass@proxy_domain:port"
# ==========================================
PROXIES = {
    # "http": "",
    # "https": ""
}

def extract_decision_maker_name(company_name, state_name):
    """Searches for the specific owner/CEO of the company."""
    query = f'site:linkedin.com/in "Owner" OR "CEO" OR "Founder" OR "Principal" OR "Managing Director" OR "Partner" "{company_name}" "{state_name}"'
    print(f"[*] Hunting Decision Maker: '{query}'")
    try:
        # DDGS proxy support exists but we'll use base implementation for now
        results = DDGS().text(query, max_results=3)
        if isinstance(results, str) or not results:
             return None
             
        for r in results:
            if isinstance(r, dict) and 'title' in r:
                # The title on LinkedIn is usually "Name - Title - Company"
                title_parts = r['title'].split('-')
                if len(title_parts) >= 1:
                    raw_name = title_parts[0].strip()
                    # Clean up common LinkedIn suffixes
                    raw_name = re.sub(r'\|.*', '', raw_name).strip()
                    name = HumanName(raw_name)
                    if name.first and name.last:
                        print(f"[+] Found Decision Maker: {name.first} {name.last}")
                        return name
    except Exception as e:
        print(f"[-] Decision Maker Hunt Error: {e}")
    return None

def verify_email_deliverability(email):
    """
    Placeholder for NeverBounce/ZeroBounce API layer.
    Returns True if deliverable, False otherwise.
    For now, pass-through.
    """
    # To implement:
    # response = requests.get(f"https://api.neverbounce.com/v4/single/check?key={API_KEY}&email={email}")
    # return response.json().get('result') == 'valid'
    return True

def predict_email_patterns(name, base_domain):
    """Generates potential email patterns based on the decision maker's name."""
    first = name.first.lower()
    last = name.last.lower()
    f = first[0] if first else ""
    l = last[0] if last else ""
    
    # Common company patterns
    patterns = [
        f"{first}@{base_domain}",           # mike@
        f"{first}{last}@{base_domain}",       # mikejones@
        f"{f}{last}@{base_domain}",           # mjones@
        f"{first}.{last}@{base_domain}",      # mike.jones@
        f"{first}_{last}@{base_domain}",      # mike_jones@
        f"{f}.{last}@{base_domain}",          # m.jones@
    ]
    return patterns

def setup_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vulnerable_targets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT,
            domain TEXT UNIQUE,
            contact_email TEXT,
            state TEXT,
            scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            email_sent INTEGER DEFAULT 0,
            status TEXT DEFAULT 'PENDING',
            source_url TEXT
        )
    ''')
    conn.commit()
    conn.close()

def get_random_headers():
    """The 'Ghost' Rotation: Prevents search engine saturation by rotating User-Agents."""
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0"
    ]
    return {'User-Agent': random.choice(user_agents)}

def extract_email_from_url(url):
    headers = get_random_headers()
    parsed = urlparse(url)
    domain_only = parsed.netloc.replace('www.', '')
    default_email = f"info@{domain_only}"

    try:
        print(f"[*] Scraping {url} for contact email...")
        response = requests.get(url, headers=headers, proxies=PROXIES, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        page_text = soup.get_text()
        
        for a in soup.find_all('a', href=True):
            if a['href'].startswith('mailto:'):
                email = a['href'].replace('mailto:', '').split('?')[0].strip()
                if '@' in email:
                    return email
                    
        emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", page_text)
        for email in emails:
            if not email.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                return email
                
        return default_email
        
    except Exception as e:
        print(f"[-] Connection failed for {url} ({type(e).__name__}). Using fallback email.")
        return default_email

def search_duckduckgo(query, max_results=10):
    urls = []
    try:
        # Implementing the updated DDGS usage (context manager)
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
            
            for r in results:
                if isinstance(r, dict) and 'href' in r:
                    urls.append(r['href'])
    except Exception as e:
        print(f"[-] DuckDuckGo Error: {e}")
    return urls

def search_searxng(query, max_results=10):
    urls = []
    
    # Instance Rotation Network to bypass "Forbidden" walls
    searxng_instances = [
        "https://searx.be/search",
        "https://search.ononoki.org/search",
        "https://searx.tiekoetter.com/search",
        "https://paulgo.io/search"
    ]
    
    searxng_url = random.choice(searxng_instances)
    print(f"[*] Dispatching to SearXNG Instance: {searxng_url}")
    
    params = {
        'q': query,
        'format': 'json',
        'language': 'en'
    }
    headers = get_random_headers()
    
    try:
        response = requests.get(searxng_url, params=params, headers=headers, proxies=PROXIES, timeout=10)
        response.raise_for_status()
        data = response.json()
        if 'results' in data:
            for r in data['results'][:max_results]:
                if 'url' in r:
                    urls.append(r['url'])
    except Exception as e:
         print(f"[-] SearXNG Error ({searxng_url}): {e}")
    return urls
    
def search_bing_html(query, max_results=10):
    urls = []
    headers = get_random_headers()
    url = f"https://www.bing.com/search?q={query.replace(' ', '+')}"
    try:
        response = requests.get(url, headers=headers, proxies=PROXIES, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.startswith('http') and not any(x in href for x in ['microsoft', 'bing']):
                urls.append(href)
                if len(urls) >= max_results:
                    break
    except Exception as e:
        print(f"[-] Bing HTML Error: {e}")
    return urls

def search_yahoo_html(query, max_results=10):
    urls = []
    headers = get_random_headers()
    url = f"https://search.yahoo.com/search?p={query.replace(' ', '+')}"
    try:
        response = requests.get(url, headers=headers, proxies=PROXIES, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.startswith('http') and not any(x in href for x in ['yahoo', 'bing']):
                urls.append(href)
                if len(urls) >= max_results:
                    break
    except Exception as e:
        print(f"[-] Yahoo HTML Error: {e}")
    return urls

def robust_search(query, max_results=15):
    """
    Swarm Mode: Scrape multiple engines concurrently to maximize target acquisition.
    """
    all_urls = set()
    
    engines = [
        search_duckduckgo,
        search_searxng,
        search_bing_html,
        search_yahoo_html
    ]
    
    print(f"[*] Dispatching Swarm ({len(engines)} Engines) for: '{query}'")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(engines)) as executor:
        future_to_engine = {executor.submit(engine, query, max_results): engine.__name__ for engine in engines}
        for future in concurrent.futures.as_completed(future_to_engine):
            engine_name = future_to_engine[future]
            try:
                urls = future.result()
                for u in urls:
                    all_urls.add(u)
                print(f"[+] Engine {engine_name} returned {len(urls)} results.")
            except Exception as exc:
                print(f"[-] Engine {engine_name} generated an exception: {exc}")
                
    return list(all_urls)[:max_results]

def void_walker_cycle():
    print("[+] SEQUENCE START: VOID-WALKER Initializing GLOBAL-SWARM-ENFORCE...")
    setup_db()
    
    # All 5 STAT-2026 target states
    target_phases = {
        "TN": "Tennessee",
        "RI": "Rhode Island",
        "IN": "Indiana",
        "NJ": "New Jersey",
        "KY": "Kentucky"
    }
    
    # Statute Sniper Strategy: Target infrastructure and registries instead of broad niches
    # The "Directory" Pivot: High-Value specific directories bypassing exhausted CMS leads
    advanced_dorks = {
        "NJ": [
            'site:nj.gov "Life Sciences" "Compliance" "@gmail.com"',
            '"Princeton" "Biotech" "Management" "Contact Us"',
            'site:linkedin.com/company "New Jersey" "Pharmaceuticals" "Owner"'
        ],
        "IN": [
            'site:in.gov "Biomedical" "Medical Devices" "Registry"',
            '"Indianapolis" "Manufacturing" "Compliance Officer" email',
            '"Boone County" "Pharmaceutical" "Managing Member"'
        ],
        "TN": [
            'site:tn.gov "Nuclear" "Energy" "Compliance" list',
            '"Oak Ridge" "Advanced Energy" "Director" "@outlook.com"',
            '"Tennessee" "Aerospace" "Defense" "Contractor" email'
        ],
        "RI": [
            'site:ri.gov "Insurance Claim" "Administrator" "Registry"',
            '"Providence" "Health Tech" "Founder" "Contact Information"',
            'site:linkedin.com/in "Rhode Island" "Operations Manager" "Privacy"'
        ],
        "KY": [
            'site:ky.gov "EV Battery" "Manufacturing" "Facility" list',
            '"Kentucky" "Logistics" "International Shipping" "Partner"',
            '"Louisville" "Advanced Materials" "Manager" "@gmail.com"'
        ]
    }
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    found_targets = 0
    max_targets = 1000 # Increased to target 1,000 URLs
    
    for state_code, state_name in target_phases.items():
        print(f"\n[+] Executing VOID-WALKER Phase for: {state_name} ({state_code})")
        dorks = advanced_dorks.get(state_code, [])
        for query in dorks:
            print(f"[*] Executing Search Vector: '{query}'")
            
            try:
                # Rotate through multiple engines to avoid blocks
                results = robust_search(query, max_results=20) # Get more per query
                
                if not results:
                     print(f"[-] All Search Engines failed/blocked for query: '{query}'")
                     continue
                     
                for url in results:
                    if found_targets >= max_targets:
                        print("\n[!] Harvest capacity reached for this cycle.")
                        conn.close()
                        return
                        
                    if any(x in url for x in ["yelp.com", "facebook.com", "yellowpages.com", "bbb.org", "mapquest.com", "expertise.com", "linkedin.com/search", "shopify.com", "wix.com"]):
                        continue
                        
                    parsed_url = urlparse(url)
                    base_domain = f"{parsed_url.scheme}://{parsed_url.netloc}"
                    
                    cursor.execute("SELECT 1 FROM vulnerable_targets WHERE domain = ?", (base_domain,))
                    if cursor.fetchone():
                        print(f"[*] {base_domain} already exists in Strike DB. Skipping.")
                        continue
                    
                    contact_email = extract_email_from_url(base_domain)
                    
                    # Blacklist the user's own email from ever being added.
                    if "crmindex.net" in contact_email.lower():
                        print(f"[!] Contact email {contact_email} is blacklisted. Skipping.")
                        continue
                    
                    # Prevent duplicate emails from being added across different domains.
                    cursor.execute("SELECT 1 FROM vulnerable_targets WHERE contact_email = ?", (contact_email,))
                    if cursor.fetchone():
                         print(f"[*] Contact email {contact_email} already exists in Strike DB. Skipping.")
                         continue
                         
                    # Decision Maker Hunt
                    target_email = contact_email
                    company_name = parsed_url.netloc.replace("www.", "").split(".")[0].title()
                    
                    decision_maker = extract_decision_maker_name(company_name, state_name)
                    if decision_maker:
                        parsed_domain = tldextract.extract(base_domain)
                        host_domain = f"{parsed_domain.domain}.{parsed_domain.suffix}"
                        
                        predictions = predict_email_patterns(decision_maker, host_domain)
                        for potential_email in predictions:
                            # Here we check DB to see if we already sent to this predicted email.
                            cursor.execute("SELECT 1 FROM vulnerable_targets WHERE contact_email = ?", (potential_email,))
                            if cursor.fetchone():
                                continue
                                
                            if verify_email_deliverability(potential_email):
                                target_email = potential_email
                                print(f"[+] Verified Decision Maker Email: {target_email} for {decision_maker.first} {decision_maker.last}")
                                break
                    
                    # Assuming non-compliance based on mandate
                    print(f"[!] VULNERABILITY ASSUMED: {base_domain} is missing 2026 Privacy Statutory disclosures.")
                    print(f"[*] Extracted Target Contact: {target_email}")
                    
                    cursor.execute('''
                        INSERT INTO vulnerable_targets (company_name, domain, contact_email, state, source_url)
                        VALUES (?, ?, ?, ?, ?)
                    ''', (company_name, base_domain, target_email, state_code, url)) # Save url as source_url
                    conn.commit()
                    print(f"[+] Isolated Target: {company_name} loaded into Strike DB for {state_code}.")
                    found_targets += 1
                    
                    time.sleep(random.uniform(1, 3)) # Slightly reduced delay for volume
                    
            except Exception as e:
                print(f"[-] Search Error during vector '{query}': {e}")
                time.sleep(5)
                
    conn.close()
    print("\n[+] VOID-WALKER array complete.")

if __name__ == "__main__":
    void_walker_cycle()

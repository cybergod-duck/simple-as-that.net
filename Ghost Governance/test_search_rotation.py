import time
import requests
from duckduckgo_search import DDGS
from urllib.parse import urlparse

def search_duckduckgo(query, max_results=5):
    urls = []
    try:
        print(f"[*] Trying DuckDuckGo for: '{query}'")
        results = DDGS().text(query, max_results=max_results)
        # duckduckgo_search might return a string on error instead of a list of dicts.
        if isinstance(results, str):
             print(f"[-] DuckDuckGo Error: {results}")
             return urls
        
        for r in results:
            if isinstance(r, dict) and 'href' in r:
                urls.append(r['href'])
    except Exception as e:
        print(f"[-] DuckDuckGo Failed: {e}")
    return urls

def search_searxng(query, max_results=5):
    urls = []
    # Using a common public SearXNG instance. 
    # It's better to rotate these or use a pool in production, but this serves as a good fallback.
    searxng_url = "https://searx.be/search"
    params = {
        'q': query,
        'format': 'json',
        'language': 'en'
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
    }
    try:
        print(f"[*] Trying SearXNG fallback for: '{query}'")
        response = requests.get(searxng_url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        if 'results' in data:
            for r in data['results'][:max_results]:
                if 'url' in r:
                    urls.append(r['url'])
    except Exception as e:
         print(f"[-] SearXNG Failed: {e}")
    return urls

def robust_search(query, max_results=5):
    """Tries multiple engines until it gets enough results."""
    urls = search_duckduckgo(query, max_results)
    
    if len(urls) < max_results:
        print(f"[-] DuckDuckGo only returned {len(urls)} results. Falling back to SearXNG...")
        # Get more from SearXNG
        fallback_urls = search_searxng(query, max_results)
        for u in fallback_urls:
             if u not in urls:
                 urls.append(u)
    
    # Trim to max_results just in case
    return urls[:max_results]

if __name__ == "__main__":
    test_query = "Dental Clinic Tennessee website"
    results = robust_search(test_query, 5)
    print("\n[+] Final Aggregated Results:")
    for r in results:
        print(f"  - {r}")

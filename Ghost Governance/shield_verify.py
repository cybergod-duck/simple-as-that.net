import dns.resolver
import logging

def verify_antigravity_shield(domain: str, selector: str) -> bool:
    """
    Verifies that SPF, DKIM, and DMARC records are properly configured
    for the domain. Helps prevent the orchestrator from firing if the
    domain reputation shield is compromised.
    """
    logging.info(f"[*] RUNNING PRE-FLIGHT CHECKS ON {domain}...")
    spf_pass = False
    dkim_pass = False
    dmarc_pass = False

    # 1. Check SPF
    try:
        answers = dns.resolver.resolve(domain, 'TXT')
        for rdata in answers:
            txt = rdata.to_text().strip('"')
            if txt.startswith('v=spf1'):
                spf_pass = True
                logging.info(f"[+] SPF Profile Found: {txt}")
                break
    except Exception as e:
        logging.warning(f"[-] SPF Check Failed: {e}")

    # 2. Check DMARC
    try:
        dmarc_domain = f"_dmarc.{domain}"
        answers = dns.resolver.resolve(dmarc_domain, 'TXT')
        for rdata in answers:
            txt = rdata.to_text().strip('"')
            if txt.startswith('v=DMARC1'):
                dmarc_pass = True
                logging.info(f"[+] DMARC Profile Found: {txt}")
                break
    except Exception as e:
        logging.warning(f"[-] DMARC Check Failed: {e}")

    # 3. Check DKIM
    # Zoho often uses CNAMEs for DKIM, but dnspython's resolver will typically follow them 
    # to the underlying TXT if we query TXT directly.
    try:
        dkim_domain = f"{selector}._domainkey.{domain}"
        answers = dns.resolver.resolve(dkim_domain, 'TXT')
        for rdata in answers:
            txt = rdata.to_text().strip('"')
            if 'v=DKIM1' in txt or 'p=' in txt:
                dkim_pass = True
                logging.info(f"[+] DKIM Keys Found at {dkim_domain}")
                break
    except Exception as e:
        # Sometimes Zoho DKIM is strictly a CNAME that doesn't resolve to a TXT directly if not configured correctly,
        # or the dnspython behaves differently. Let's explicitly check CNAME too.
        try:
            answers = dns.resolver.resolve(dkim_domain, 'CNAME')
            for rdata in answers:
                if 'zoho' in rdata.to_text().lower() or 'domainkey' in rdata.to_text().lower():
                    dkim_pass = True
                    logging.info(f"[+] DKIM CNAME Alias Found at {dkim_domain}")
                    break
        except Exception as e2:
            logging.warning(f"[-] DKIM Check Failed for selector '{selector}': TXT err={e}, CNAME err={e2}")
        
    status = spf_pass and dkim_pass and dmarc_pass
    if status:
        logging.info("[+] ANTIGRAVITY SHIELD INTEGRITY: 100%")
    else:
        logging.error("[-] ANTIGRAVITY SHIELD COMPROMISED. DO NOT SEND EMAILS.")
        
    return status

if __name__ == "__main__":
    # Basic configured logger setup if ran standalone
    logging.basicConfig(level=logging.INFO, format='%(message)s')
    verify_antigravity_shield("simple-as-that.org", "zoho")

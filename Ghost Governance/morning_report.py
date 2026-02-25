import sqlite3
import os
from datetime import datetime

def generate_and_open_report():
    # Path to your Desktop
    desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop')
    filename = os.path.join(desktop, f"STRIKE_PROSPECTS_{datetime.now().strftime('%Y-%m-%d')}.txt")
    
    conn = sqlite3.connect('targets.db')
    cursor = conn.cursor()
    
    # Target our 5 Priority States: NJ, IN, TN, RI, KY
    states = ('NJ', 'IN', 'TN', 'RI', 'KY')
    cursor.execute("""
        SELECT domain, state, source_url FROM vulnerable_targets 
        WHERE state IN (?, ?, ?, ?, ?) AND status = 'PENDING'
    """, states)
    
    leads = cursor.fetchall()
    
    with open(filename, 'w') as f:
        f.write(f"=== ANTIGRAVITY MORNING INTEL: {datetime.now().strftime('%Y-%m-%d')} ===\n")
        f.write(f"Total Raw Leads: {len(leads)}\n")
        f.write("-" * 70 + "\n")
        for domain, state, source_url in leads:
            f.write(f"[{state}] | {domain} | Source: {source_url if source_url else 'Unknown'}\n")
            
    conn.close()
    
    print(f"[*] 8AM Report Generated: {filename} ({len(leads)} leads)")
    # Forces the file to open on your screen
    try:
        os.startfile(filename)
    except AttributeError:
        # Fallback for non-Windows if needed, though OS is known to be Windows
        import subprocess
        subprocess.call(['notepad.exe', filename])

if __name__ == "__main__":
    generate_and_open_report()

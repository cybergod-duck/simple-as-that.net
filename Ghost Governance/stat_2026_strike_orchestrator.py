import time
import sys
import logging
from datetime import datetime
from void_walker import void_walker_cycle
from strike_relay import strike_relay_cycle
from shield_verify import verify_antigravity_shield # Import the new verification logic

# Setup Logging
log_filename = f"stat_2026_strike_orchestrator_{datetime.now().strftime('%Y%m%d')}.log"
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [%(levelname)s] - %(message)s',
    handlers=[
        logging.FileHandler(log_filename),
        logging.StreamHandler(sys.stdout)
    ]
)

DOMAIN = "simple-as-that.org"
SELECTOR = "zoho"

def orchestrate():
    logging.info("="*60)
    logging.info("INITIATING STAT-2026-STRIKE ORCHESTRATOR")
    logging.info("="*60)
    
    try:
        # Step 0: Pre-Flight DNS Verification
        logging.info(f">>> VERIFYING DOMAIN SHIELD: {DOMAIN}")
        if not verify_antigravity_shield(DOMAIN, SELECTOR):
            logging.error("SHIELD VERIFICATION FAILED. DNS records (SPF/DKIM/DMARC) are not aligned.")
            logging.error("ABORTING STRIKE TO PROTECT DOMAIN REPUTATION.")
            return # Exit the cycle without killing the script (for Task Scheduler)

        logging.info("<<< SHIELD VERIFIED: DOMAIN IS AUTHENTICATED")

        # Step 1: Execute VOID-WALKER
        logging.info(">>> ENGAGING SUBSYSTEM: VOID-WALKER (Target Acquisition)")
        void_walker_cycle()
        logging.info("<<< SUBSYSTEM COMPLETE: VOID-WALKER")
        
        time.sleep(5)
        
        # Step 2: Execute ZOHO-RELAY (DISABLED for Deep Research Protocol)
        # logging.info(">>> ENGAGING SUBSYSTEM: ZOHO-RELAY (Payload Dispatch)")
        # strike_relay_cycle()
        # logging.info("<<< SUBSYSTEM COMPLETE: ZOHO-RELAY")
        
        logging.info(">>> STRIKE-RELAY IS DISABLED. AWAITING 8 AM INTELLIGENCE HANDSHAKE <<<")
        
    except Exception as e:
        logging.error(f"FATAL ORCHESTRATOR ERROR: {str(e)}", exc_info=True)
        sys.exit(1)
        
    logging.info("="*60)
    logging.info("STAT-2026-STRIKE CYCLE COMPLETE. ENTERING HIBERNATION.")
    logging.info("="*60)

if __name__ == "__main__":
    orchestrate()

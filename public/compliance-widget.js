/**
 * Simple-As-That: State Compliance & ADA Verification Badge
 * This script injects a high-authority DoFollow backlink footprint into the client's footer.
 * 
 * Usage for Clients:
 * <script id="sat-tag" src="https://simple-as-that.org/compliance-widget.js" data-industry="plumbers" data-state="texas" data-certificate="SAT-12345"></script>
 */

(function () {
    // 1. Extract context from the script injection tag to dynamically form the backlink
    let targetScript = document.currentScript;
    if (!targetScript) {
        targetScript = document.getElementById('sat-tag');
    }

    // Default fallback routing if no tags provided
    const industry = targetScript ? (targetScript.getAttribute('data-industry') || 'general') : 'general';
    const state = targetScript ? (targetScript.getAttribute('data-state') || 'national') : 'national';
    const certificate = targetScript ? (targetScript.getAttribute('data-certificate') || 'PENDING') : 'PENDING';

    // Formulate the exact SEO anchor link back to the generated directory
    const directoryUrl = `https://simple-as-that.org/certified-businesses/${industry.toLowerCase()}/${state.toLowerCase()}`;
    const badgeId = 'sat-compliance-verification';

    // 2. Ping the verification API to ensure active subscription
    const currentDomain = window.location.hostname;
    fetch(`https://simple-as-that.net/api/verify-license?domain=${encodeURIComponent(currentDomain)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            if (data.licensed) {
                renderBadge(directoryUrl, certificate);
            } else {
                console.log('Compliance Tier: Subscription Inactive.');
            }
        })
        .catch(error => {
            console.error('Compliance Shield Verification Error:', error);
        });

    // 3. Render the widget containing the DoFollow link
    function renderBadge(url, certStr) {
        if (document.getElementById(badgeId)) return;

        const badgeContainer = document.createElement('div');
        badgeContainer.id = badgeId;

        // Inline CSS for guaranteed styling positioning
        Object.assign(badgeContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '999999',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        });

        // The DoFollow HTML Markup carrying the massive SEO juice
        // Note: The anchor tag explicitly omits rel="nofollow" to act as a DoFollow node.
        badgeContainer.innerHTML = `
            <a href="${url}" target="_blank" title="Verify 2026 State Data Compliance & ADA Guidelines" style="
                display: flex;
                align-items: center;
                gap: 12px;
                background-color: #0f2129;
                border: 1px solid rgba(0,255,255,0.3);
                border-radius: 12px;
                padding: 10px 16px;
                text-decoration: none;
                box-shadow: 0 4px 20px rgba(0, 255, 255, 0.15);
                transition: all 0.3s ease;
            " onmouseover="this.style.borderColor='rgba(0,255,255,0.8)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='rgba(0,255,255,0.3)'; this.style.transform='translateY(0)';">
                
                <div style="
                    width: 32px; 
                    height: 32px; 
                    background-color: #152e39; 
                    border-radius: 8px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    border: 1px solid rgba(0,255,255,0.5);
                ">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                </div>
                
                <div style="display: flex; flex-direction: column;">
                    <span style="color: rgba(255,255,255,0.9); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">Data & ADA Compliant</span>
                    <span style="color: #00ffff; font-size: 9px; font-weight: 600; font-family: monospace; letter-spacing: 1px;">VERIFIED BY SIMPLE-AS-THAT • ${certStr}</span>
                </div>
                
            </a>
        `;

        document.body.appendChild(badgeContainer);
    }
})();

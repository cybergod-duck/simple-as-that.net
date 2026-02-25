(function () {
    // Self-executing anonymous function to prevent scope pollution
    // Step 1: Get the current domain
    const currentDomain = window.location.hostname;

    // Step 2: Set styles for the badge securely
    const badgeId = 'stat-compliance-shield-2026';

    // Step 3: Ping the verification API
    // (Replace with production URL when deployed)
    fetch(`https://simple-as-that.net/api/verify-license?domain=${encodeURIComponent(currentDomain)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.licensed) {
                renderBadge();
            } else {
                console.log('Compliance Tier: Subscription Inactive.');
            }
        })
        .catch(error => {
            console.error('Compliance Shield Verification Error:', error);
        });

    // Step 4: Render the minimalist UI
    function renderBadge() {
        // Double check no duplicates
        if (document.getElementById(badgeId)) return;

        const badge = document.createElement('div');
        badge.id = badgeId;

        // Inline CSS for guaranteed styling
        badge.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: system-ui, -apple-system, sans-serif;
            color: #fff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            cursor: pointer;
        `;

        // Small SVG Shield Icon
        const icon = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        `;

        // Inner HTML Construction
        badge.innerHTML = `
            ${icon}
            <div style="display: flex; flex-direction: column;">
                <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.05em; color: #10B981; text-transform: uppercase;">
                    Verified
                </span>
                <span style="font-size: 10px; opacity: 0.7;">State Compliance Shield</span>
            </div>
        `;

        // Hover Effect
        badge.onmouseenter = () => {
            badge.style.transform = 'translateY(-2px)';
            badge.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            badge.style.border = '1px solid rgba(16, 185, 129, 0.6)';
        };
        badge.onmouseleave = () => {
            badge.style.transform = 'translateY(0)';
            badge.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        };

        // Click Action -> Link back to the agency verifying it
        badge.onclick = () => {
            window.open('https://simple-as-that.net', '_blank');
        };

        document.body.appendChild(badge);
    }
})();

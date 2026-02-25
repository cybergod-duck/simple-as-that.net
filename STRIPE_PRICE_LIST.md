# Simple-As-That.org Stripe Product Pricing List

Based on the implemented features and compliance standards (like the $49 compliance patch from the 50-State Expansion playbook, and the tiered onboarding templates), here are the products and prices you need to create in your Stripe dashboard to support the new platform funnel:

## 1. Core Website Templates (One-time or Subscriptions)
These are triggered at the end of the onboarding flow (`TemplateRecommendations.tsx`).

*   **Landing Page:** $99.00
    *   *Description:* A high-converting, single-page website optimized for mobile users. Includes your business information, contact form, and semantic SEO markup to start ranking locally immediately.
*   **Starter Template:** $199.00
    *   *Description:* The professional standard for local businesses. A 3-page (Home, Services, Contact) lightning-fast website featuring our proprietary "Brand Lock" color science, integrated contact forms, and automated compliance structures.
*   **Essential Template:** $499.00
    *   *Description:* The credibility builder. A 3-page platform featuring dynamic lead capture forms, client success/review sections, and intermediate integrations designed to bridge the gap between basic presence and active lead generation.
*   **Pro Template:** $999.00
    *   *Description:* Built for growth and lead generation. Includes everything in Essential, plus dynamic industry-specific pain-point targeting, advanced SEO Schema (JSON-LD), and deep Google AI Overview integration to capture zero-click search traffic.
*   **Elite Template:** $1,999.00
    *   *Description:* The ultimate digital infrastructure. A comprehensive, enterprise-grade web platform designed for maximum authority. Includes competitor content analysis, custom API integrations, and the highest tier of our automated performance architecture. **Automatically includes a Custom Logo and the State Compliance Pack.**

## 2. Platform Upsells (Add-ons)
These are offered on the dynamic industry landing pages as frictionless checkout add-ons.

*   **Custom Logo:** $50.00
    *   *Description:* Need a brand identity fast? Our automated design engine generates a high-resolution, industry-specific logo file instantly, perfectly matched to your new website's color palette.
*   **State Compliance Pack:** $30.00
    *   *Description:* Protect your business with our live State Compliance Pack. Displays a verified badge on your site demonstrating proactive adherence to state-level data privacy regulations, building instant trust with your clients.

## 3. Compliance Pipeline (The 50-State Playbook)
This is for the automated outbound workflow targeting non-compliant domains.

*   **Compliance Patch (Smart Middleware):** $49.00
    *   *Description:* Instant mitigation against aggressive state privacy audits ($10,000+ fines). This proprietary "Smart Middleware" injects necessary legal structures into your domain and dynamically updates whenever regional laws change, providing a perpetual "Safe Harbor."

## 4. Recurring Revenue Subscriptions
The backbone of the agency scaling model. We white-label our infrastructure stack and provide it as a managed service.

*   **Monthly Management & Cloud Hosting:** $29.00/mo
    *   *Description:* Enterprise-grade CDN hosting, automatic SSL certificate renewals, daily backups, dedicated domain routing management, and 24/7 uptime monitoring.

---

### How to add to Stripe:
1. Go to your Stripe Dashboard -> **Product Catalog** -> **Add Product**.
2. Add the Name (e.g., "Pro Template").
3. Set the price type (One-time or Recurring based on your business model).
4. Save the product.
5. Copy the generated `price_...` ID and add it to your Next.js `.env` variables if you plan to link them directly via API, or use Stripe Payment Links for the buttons.

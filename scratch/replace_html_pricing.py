import os
import re

file_path = r"c:\dev\donbrico-net\host-reply\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pricing_section_new = """    <section style="padding: var(--spacing-xl) 0">
      <div class="container">
        <h2
          class="section-title"
          data-i18n="hostReply.pricing.sectionTitle"
        >
          Simple pricing. No hidden costs.
        </h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-lg);
            justify-content: center;
          "
        >
          <!-- Free Tier -->
          <div class="card" style="border: 2px solid var(--accent)">
            <h3 data-i18n="hostReply.pricing.free.title">Free</h3>
            <p
              style="font-size: 2rem; font-weight: 700; color: var(--accent)"
              data-i18n="hostReply.pricing.free.price"
            >
              $0
            </p>
            <ul>
              <li data-i18n="hostReply.pricing.free.features.f1">5 Saved Reply templates</li>
              <li data-i18n="hostReply.pricing.free.features.f2">1 property (Host Memory)</li>
              <li data-i18n="hostReply.pricing.free.features.f3">5 core smart variables</li>
              <li data-i18n="hostReply.pricing.free.features.f4">10 AI replies/day</li>
              <li data-i18n="hostReply.pricing.free.features.f5">3 Reply Scenarios</li>
              <li data-i18n="hostReply.pricing.free.features.f6">Single BYOK provider</li>
              <li data-i18n="hostReply.pricing.free.features.f7">3 host tones</li>
            </ul>
            <a
              href="https://chromewebstore.google.com/detail/habaanjfebpomgkglicmnkofhiikekol"
              class="btn"
              data-i18n="hostReply.pricing.free.button"
              >Add to Chrome</a
            >
          </div>

          <!-- Pro Monthly Tier -->
          <div class="card" style="border: 2px solid var(--accent)">
            <h3 data-i18n="hostReply.pricing.proMonthly.title">Pro (Monthly)</h3>
            <p
              style="font-size: 2rem; font-weight: 700; color: var(--accent)"
              data-i18n="hostReply.pricing.proMonthly.price"
            >
              $7.99/mo
            </p>
            <ul>
              <li data-i18n="hostReply.pricing.proMonthly.features.f1">Unlimited AI replies</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f2">Unlimited saved replies</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f3">Unlimited properties</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f4">5 host tones</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f5">Export/import templates</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f6">20+ Smart variables</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f7">Multiple BYOK providers</li>
              <li data-i18n="hostReply.pricing.proMonthly.features.f8">Priority support</li>
            </ul>
            <a
              href="https://checkout.dodopayments.com/buy/pdt_0Neiemm14aVfIDOMub6sP?quantity=1&redirect_url=https%3A%2F%2Fdonbrico.net%2Factivate%3Fproduct%3Dhost-reply"
              class="btn"
              data-i18n="hostReply.pricing.proMonthly.button"
              >Subscribe monthly</a
            >
          </div>

          <!-- Pro Lifetime Tier -->
          <div class="card" style="background: linear-gradient(135deg, var(--card-bg), rgba(99, 102, 241, 0.15)); border: 2px solid var(--accent); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 12px; right: -30px; background: var(--accent); color: white; padding: 4px 30px; transform: rotate(45deg); font-size: 0.8rem; font-weight: bold;">LAUNCH</div>
            <h3 data-i18n="hostReply.pricing.proLifetime.title">Pro (Lifetime)</h3>
            <p
              style="font-size: 2rem; font-weight: 700; color: var(--accent)"
              data-i18n="hostReply.pricing.proLifetime.price"
            >
              $69
            </p>
            <p style="font-size: 0.9rem; margin-top: -10px; margin-bottom: 20px; color: var(--muted);" data-i18n="hostReply.pricing.proLifetime.tagline">Pay once, use forever</p>
            <ul>
              <li data-i18n="hostReply.pricing.proLifetime.features.f1">Everything in Pro Monthly</li>
              <li data-i18n="hostReply.pricing.proLifetime.features.f2">No recurring fees</li>
              <li data-i18n="hostReply.pricing.proLifetime.features.f3">Future updates included</li>
              <li data-i18n="hostReply.pricing.proLifetime.features.f4">Early adopter pricing</li>
            </ul>
            <a
              href="https://checkout.dodopayments.com/buy/pdt_0NeiemCI20dLNrN5eodgH?quantity=1&redirect_url=https%3A%2F%2Fdonbrico.net%2Factivate%3Fproduct%3Dhost-reply"
              class="btn"
              style="background: linear-gradient(135deg, var(--accent), #8b5cf6);"
              data-i18n="hostReply.pricing.proLifetime.button"
              >Lifetime pass</a
            >
          </div>
        </div>
      </div>
    </section>"""

# Replace between '<section style="padding: var(--spacing-xl) 0">' and '<section style="padding: var(--spacing-xl) 0">' that contains pricing
import re

pattern = re.compile(r'<section style="padding: var(--spacing-xl) 0">\s*<div class="container">\s*<h2\s*class="section-title"\s*data-i18n="hostReply.pricing.sectionTitle".*?</div>\s*</section>', re.DOTALL)
new_content = pattern.sub(pricing_section_new, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated pricing section in HTML.")

# Activation Routing

The activation page (`/activate` / `activate.html`) routes checkout license keys to the correct Chromium extension via `chrome.runtime.sendMessage`.

## Resolution order

1. **`extid` + `mode=test`** — any valid 32-char extension id (unpacked / dev builds).
2. **`extid`** (allowlisted) — must match a mapped store id in `EXTENSIONS_BY_PRODUCT`.
3. **`product`** — slug maps to a non-empty Chrome Web Store id in `activate.html`.
4. **No `product` param** — legacy links only: targets **Autofill AI** (unchanged).
5. **Unknown or unmapped `product`** — **manual activation UI only** (does **not** message Autofill AI).

This prevents false errors such as “Donbrico Autofill AI: resource could not be found” when the buyer purchased HostReply, SellerDesk, TradeDesk, or RecruitReply.

## Extension IDs (`activate.html`)

| `product` slug | Extension | Chrome Web Store id |
|----------------|-----------|------------------------|
| `autofill-ai` | Donbrico Autofill AI | `ldglmpphcjdamkmfpknojafocpihhbal` |
| `ai-reply` | Donbrico AI Reply Assistant | `hkkbbcnmbhkcjcmmifbclgmbkipillih` |
| `host-reply` | HostReply AI | `habaanjfebpomgkglicmnkofhiikekol` |
| `seller-desk` | SellerDesk AI | `khcpemlmikkjknbepapfdfaeggjohelb` |
| `trade-desk` | TradeDesk AI | `olepgmahphlopgjihbpaochdbekadpcp` |
| `recruit-reply` | RecruitReply AI | *(empty until listed — use manual steps or `extid` in test)* |
| `workdesk` | Donbrico WorkDesk | `kilfjjkfocajofinfhplccpmojdjplhb` |

Source of truth for store links: each product’s `index.html` install button (`chromewebstore.google.com/detail/...`).

## URL parameters

| Param | Purpose |
|-------|---------|
| `license_key` or `key` | License sent to the extension |
| `product` | Slug in the table above |
| `mode=test` | Enables `extid` for unpacked extensions |
| `extid` | Explicit extension id (test mode: any id; production: allowlisted only) |
| `subscription_id` | Resolved via `/api/resolve-license` when key not in URL |

## Examples

- `/activate?license_key=abc` → Autofill AI (legacy, no `product`)
- `/activate?license_key=abc&product=host-reply` → HostReply AI
- `/activate?license_key=abc&product=recruit-reply&mode=test&extid=<unpacked-id>` → dev RecruitReply build
- `/activate?license_key=abc&product=recruit-reply` → manual copy-key (until store id is set)

## Onboarding a new extension

1. Add the slug and Chrome Web Store id to `EXTENSIONS_BY_PRODUCT` and `PRODUCT_LABELS` in `activate.html`.
2. Add the same id to the product `index.html` Web Store link.
3. Use checkout `redirect_url` with `?product=<slug>` (and `&mode=test` for test checkout).
4. Smoke-test: success screen or manual steps — **no** error toast from another extension.

## Recruit Reply publish gate

Before Recruit Reply store launch, set `recruit-reply` in `activate.html` to the **published** extension id (not an unpacked dev id). Until then, buyers see manual activation instructions instead of a false Autofill AI error.

## Test checklist

- [ ] No `product` → Autofill AI (unchanged).
- [ ] `product=host-reply` → HostReply (no Autofill toast).
- [ ] `product=seller-desk` / `trade-desk` → correct extension.
- [ ] `product=recruit-reply` without store id → manual UI only (no `sendMessage`).
- [ ] `product=recruit-reply&mode=test&extid=<id>` → unpacked extension activates.
- [ ] Unknown `product=foo` → manual UI only (no Autofill fallback).

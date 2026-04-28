# Activation Routing

The activation page (`/activate` / `activate.html`) supports safe extension routing with backward compatibility.

## Default behavior (Autofill AI)

- If `extid` and `product` are both missing, activation targets Autofill AI by default.
- Existing checkout redirects that already point to `/activate?...` continue to work unchanged.

## Param behavior (`product` / `extid`)

Target extension id resolution order:

1. Use `extid` when it is allowlisted.
2. Else use `product` when it maps to an allowlisted extension id.
3. Else fall back to Autofill AI.

Supported params:

- `license_key` or `key`: license value sent to the extension.
- `extid`: explicit extension id (only used when allowlisted).
- `product`: logical product key that maps to an extension id.

Examples:

- `/activate.html?license_key=abc` -> Autofill AI (default)
- `/activate.html?license_key=abc&product=ai-reply` -> AI Reply (if mapped id is allowlisted)
- `/activate.html?license_key=abc&extid=<allowlisted_id>` -> selected allowlisted extension
- Unknown `product` or `extid` -> Autofill AI fallback

## Safe onboarding for a new extension

1. Add the new product key and extension id in the `EXTENSIONS_BY_PRODUCT` map in `activate.html`.
2. Keep the extension id in lowercase 32-char Chrome id format.
3. Do not bypass `isAllowedExtensionId(id)` checks.
4. Use checkout redirects with either:
   - `&product=<product-key>` (preferred), or
   - `&extid=<allowlisted_extension_id>`

## Test checklist (for PR description)

- [ ] No params -> still activates Autofill AI (unchanged).
- [ ] `product=ai-reply` -> targets AI Reply extension.
- [ ] `extid=<valid allowlisted id>` -> targets that extension.
- [ ] Unknown `product`/`extid` -> falls back to Autofill AI.
- [ ] No license key in URL -> manual fallback UI still shown.

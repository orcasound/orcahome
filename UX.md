# UX.md — Orcahome UX Context

> **What this file is.** A curated, machine-readable source of Orcasound's UX knowledge for the Orcahome website. It exists so that anything anyone generates with an AI tool for this product (a designer's mockup, a Product Manager's quick prototype, a developer's coding assistant deciding a button label or an error state) is informed by what Orcasound actually knows about its users and standards, instead of the model's average guess.
>
> **This is not a handoff document and it is not written to persuade a human.** People can read it, but its only measure of success is whether AI-generated output for Orcahome gets better. It is never finished. It is updated when research or standards change, and when we notice what the AI got wrong.
>
> **Status: EXPERIMENT, started 2026-07-31.** This is a lightweight first version testing the UX-context practice described in NN/g's "UX-Context Design" (Tony Alicea, 2026-07-24) and Google Labs' DESIGN.md. See "How this file is maintained" at the bottom.

---

## 0. Product identity (facts, do not change without Product Manager sign-off)

- **Orcasound** is an open-source collective that runs a network of underwater hydrophones so people can listen live for Southern Resident Killer Whales and other marine life in the Salish Sea. It is not a company and not a 501(c)(3); describe it as a collective or open-source community.
- **"Orcahome" is an internal name for the website redesign.** It is the Product Team's proof-of-concept site, deployed at `orcasound.tech`. The official public site is `orcasound.net`.
- **Never use the internal names "Orcahome" or "Orcasite" in any user-facing or public copy.** In generated UI text, refer to "the Orcasound website," "the homepage," or "the live listening page," never the codename.
- Always write "Southern Resident Killer Whales" in full in content. Do not shorten to "orcas" or "Southern Residents."

## 1. Visual standards (points to the design half of this system)

- **Canonical design system (single source of truth):** Orcasound Design System in Figma — https://www.figma.com/design/YunjBU0bjoDbHcYLNScAQ2/Design-System . Use it for all color tokens, typography, and components.
- **Brand assets and logos:** `orcasound/orca-branding` — https://github.com/orcasound/orca-branding . Canonical wordmark is `assets/wordmark/png/Asset 3@2x.png`. Do not use older multicolor logo files.
- **orcasound.tech theme color:** indigo `#1B2B7B`.
- **TODO (Design System Lead, Nina Alter):** as the design system moves to machine-readable tokens, this section should point to (or inline) the exact token values, ideally via a DESIGN.md kept next to the code. Until then, the Figma file above is authoritative and a human should transcribe tokens when generating.

## 2. Glossary (the words this product and its domain use)

> Seed this from the #227 technical-jargon audit of the deployed site. State the plain-language term the user understands, and the internal or technical term to avoid or define. A model should prefer the user's word.

- **TODO (Product Manager / Rhiza Mendoza, from #227):** list confirmed term pairs, for example "what users say" vs "what to avoid," with a one-line definition each. Examples to fill in: hydrophone, spectrogram, the live audio player, a "call," a candidate detection.

## 3. User model (who the users are) — AUTHORED BY THE PRODUCT MANAGER

> State what research has established about the people who use this product: their expertise, what they are trying to accomplish, what concerns them, and what does not work for them. Write findings as plain statements a model can reason on, not as personas with stock photos.
>
> **Guardrail (do not violate):** Orcasound does not track or model individual named users. This section describes users in aggregate from research and self-report only. Do not let generated UI introduce personalization, individual usage tracking, or account-based behavior inference. Consent to "contact me for research" is not consent to track browsing.
>
> **Note:** the 2020 personas are known to be flawed and are pending overhaul. Do not import them here until they are redone.

- **TODO (Brendan Thatcher):** author 3 to 6 user statements grounded in Orcasound research. Example shape only, replace with real findings: "Many listeners are not scientists; they are people who care about the whales and want to know whether any are near right now."

## 4. World model (the conditions users are in while using the product) — AUTHORED BY THE PRODUCT MANAGER

> Describe the real circumstances of use (the "context of use") and how they change. This leans generation toward the right density, urgency, and device assumptions.

- **TODO (Brendan Thatcher):** author the context-of-use statements. Prompts to consider: users often arrive because they heard whales might be present, so "is anything happening right now" is a common intent; live audio is central and can be listened to on mobile while doing other things; the audience spans casual listeners, hydrophone partners, students, and scientists; sessions can be brief and repeated.

## 5. Interaction standards (how the product should behave) — AUTHORED BY THE PRODUCT MANAGER

> How the product behaves, stated as rules a model can follow: when to confirm versus allow undo, how errors are worded, whether UI favors novices or experts, tone of microcopy.

- **Accessibility target (documented standard):** WCAG 2.2 AA. Generated UI must meet AA color-contrast; check choices against the design system tokens.
- **TODO (Brendan Thatcher):** author the behavior and voice rules, for example error-message tone, novice-first defaults, and any confirm-versus-undo conventions.

## 6. Research findings as constraints — AUTHORED BY THE PRODUCT MANAGER

> The findings that should actively constrain what gets generated. Write each as a constraint, not as a report line. A finding like "users abandon setup when asked for something they do not have on hand" becomes a rule the AI must honor.

- **TODO (Brendan Thatcher):** distill 5 findings from completed research (start with Whale Museum SV1) into constraint statements. Keep this to the findings you would defend, not everything learned.

---

## How this file is maintained

- **Owners.** Brendan Thatcher, Product Manager and UX Researcher, owns this file and all of its UX content across UX Research, UX Design, and the Product process (sections 0, 2, 3, 4, 5, and 6). Nina Alter, Design System Lead, maintains the canonical design system specifications (tokens and components) that section 1 points to; Brendan is the Product owner and reviewer of that work.
- **Authorship rule.** This file is human-authored and human-curated. AI advises on structure and surfaces gaps; the findings, models, and standards are written by the owners. It is the output of human synthesis, not a substitute for it.
- **Cadence.** Update as a byproduct of the work, whenever research concludes or a standard changes. Do not let it go stale; a confidently wrong context file is worse than none.
- **Intended home.** This file's real home is the root of the `orcasound/orcahome` repository, next to the code, where every contributor's AI tools read it on each generation.
- **Success test (the only one that counts).** Does AI-generated UI for Orcahome improve when contributors' tools read this file? Run a few before-and-after generation tasks (a page section, an error state, some microcopy) and watch what the model gets right that it previously got wrong. Refine the file based on what it still gets wrong.

## Version history

- v0.1 — 2026-07-31. Experiment scaffold created. Factual pointers and documented guardrails pre-filled (product identity, design system, accessibility, privacy, naming). Sections 3 to 6 and the glossary left as Product-Manager-authored placeholders.

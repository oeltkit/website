# OELTKit Website — Structure & Copy

*Handoff doc for an Astro build session. Primary audience: L&D practitioners already creating bespoke e-learning with LLMs. Secondary: developers/contributors. One project: marketing pages + Starlight docs.*

## Positioning

**One-liner:** Bespoke e-learning from your AI assistant — that actually works in your LMS.

**The message hierarchy (every page serves #1):**

1. You're already making amazing things with Claude/ChatGPT. OELTKit makes them SCORM/cmi5-compliant, accessible, and trackable — without giving up the bespoke part.
2. It's open source and standards-based. No lock-in, no per-seat pricing, no template trap.
3. It's built for the way you actually work now: chat with an AI, get a course.

**Tone:** practitioner-to-practitioner, plainspoken, zero corporate-LMS jargon ("learning journeys", "upskilling at scale"). Confident but honest about beta status. Show, don't claim — working demos over adjectives.

## Site map

```
/                     Home (the conversion page)
/how-it-works         The 3-step story + architecture for the curious
/components           Live component gallery (the proof)
/standards            SCORM / cmi5 / xAPI / accessibility (the trust page)
/examples             Gallery of generated courses, downloadable packages
/docs/*               Starlight: quickstart, guides, component reference, llms.txt
/community            Contribute, governance, roadmap
/blog/*               Launch post + ongoing (content collection, can start empty)
```

Global header: logo · How it works · Components · Standards · Docs · GitHub (star count) · CTA button "Get started".
Global footer: GitHub / npm / license (Apache 2.0) / a11y conformance statement / BCL credit ("incubated by") / llms.txt link.

---

## Page: Home

**Hero**

- H1: `Your AI builds the course. OELTKit makes it count.`
- Sub: `An open source toolkit that turns LLM-generated learning content into accessible, SCORM- and cmi5-compliant courses your LMS understands. Keep the bespoke. Standardize the plumbing.`
- Primary CTA: `Get started in 5 minutes` → /docs/quickstart
- Secondary CTA: `See a generated course` → /examples
- Hero visual: split panel — left: a chat prompt ("Build me a 15-minute course on GDPR basics with a scored quiz…"); right: the resulting course running with a live tracking panel showing real SCORM calls. (Animated or static screenshot; build session decides feasibility.)

**Problem section** — H2: `Bespoke AI courses are amazing. Then you upload them.`

> You've seen what Claude can do: interactive scenarios, beautiful one-off learning experiences, in minutes. Then reality hits — the LMS needs SCORM. Completion doesn't report. The quiz score goes nowhere. A screen reader can't navigate it. Legal asks about WCAG. Every generated course is a brilliant prototype that can't ship.

**Solution section** — H2: `Keep the creativity. Standardize everything underneath.`
Three cards:

1. **Tracks out of the box** — `One line — oelt.track.score(0.85) — works in SCORM 1.2, SCORM 2004, cmi5, or no LMS at all. Completion rules are declared, not hand-wired.`
2. **Accessible by construction** — `Every interaction component ships keyboard-ready and screen-reader tested to WCAG 2.2 AA. Validation catches what generation misses.`
3. **Built for AI authoring** — `An MCP server, agent skills, and docs written for model consumption. Your AI assistant already knows how to use it — that's the point.`

**How-it-works strip** (3 steps, links to /how-it-works):
`1. Chat — describe the course to Claude (or any agent) with OELTKit connected. 2. Validate — accessibility, tracking, and packaging checks run automatically; the AI fixes its own findings. 3. Ship — download a SCORM or cmi5 package that imports anywhere.`

**Proof section** — embedded live demo: one real `<oelt-mcq>` + branching snippet running on the page with a mini tracking inspector. Caption: `This isn't a mockup — these are the actual components, tracking live.`

**Open source section** — H2: `Open source, open standards, no lock-in.`
`Apache 2.0. Plain web components — no framework, no build step, no subscription. Works with the LMS you already have and the AI assistant you already use.` GitHub CTA with star count.

**Final CTA band:** `Five minutes from prompt to SCORM package.` → quickstart. Sub-link: `Or read why we built this →` (blog launch post).

---

## Page: How it works

1. **The contract idea** (plain-language): the LLM writes free-form HTML for the creative layer; OELTKit provides the manifest, runtime, components, and packager around it. Diagram: the 7-layer architecture simplified to 4 boxes (Your content → Components & runtime → Validation → Package).
2. **Walkthrough with real artifacts:** an actual `course.json` (Option C shape), a page of HTML with an `<oelt-branching>` in it, the validate output (including a caught error — honesty sells), the packaged zip in an LMS import screen.
3. **For developers** sub-section: link to architecture docs, runtime API, MCP tool list.

## Page: Components

Gallery grid; each entry = live rendered component + "view source" toggle showing the exact markup an LLM writes + a11y notes (keyboard map, SR behavior) + tracking events it emits. Launch set: the Phase 0/1 inventory. Each card links to its docs page. Banner: `Every component here is keyboard-operable and screen-reader tested. Try it — unplug your mouse.`

## Page: Standards

The trust page for the person who has to defend the choice to IT/legal/procurement:

- **LMS interoperability:** SCORM 1.2 / SCORM 2004 / cmi5/xAPI / standalone web — what each target means, who needs which, verified-on list (SCORM Cloud + real LMSes as they're tested)
- **Accessibility:** WCAG 2.2 AA commitment, per-component conformance table (auto-generated from repo), Section 508 / EN 301 549 mapping, conformance statement template download
- **Data:** what's tracked, where it goes (their LMS/LRS, nowhere else), no phone-home

## Page: Examples

3–5 generated courses (build them with the toolkit during Phase 1 — dogfood artifacts): each with live preview, the original prompt that produced it, and downloadable SCORM/cmi5 packages. This page is the marketing payload: `Every course below started as a single prompt.`

## Page: Community

Contribution funnel (component proposals as the on-ramp), governance summary, roadmap (link to GitHub project), Open Collective link when live, "incubated by BCL Training" with the vendor-neutrality commitment.

## Docs (Starlight)

Quickstart (the 5-minute promise: install → `oelt new` → chat → `oelt package`) · Authoring guide · Tracking guide (incl. the SCORM 1.2 collapse rule, prominently) · Component reference (one page per component, generated from repo READMEs when possible) · MCP setup per client (Claude Desktop/Cowork/Code) · CLI reference · `llms.txt` + `llms-full.txt` at site root, linked in footer and docs nav.

## Design notes

- Dogfood the design tokens: the site's palette/type IS the OELTKit default theme — the site demonstrates the product's look
- Performance & a11y as marketing: the site itself must score 100/100/100/100 Lighthouse and pass axe clean — it will be checked by exactly this audience
- No stock photos, no AI-slop illustration; screenshots of real artifacts and live components only
- Dark/light mode (token swap — another product demo)

## Honesty constraints (pre-launch)

Until v1.0 ships: a visible `beta` banner, no fabricated testimonials, no "trusted by" logos, verified-on list only contains actually-verified LMSes. The examples page launches with real generated output even if modest.

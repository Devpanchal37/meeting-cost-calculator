# Meeting Cost Calculator 💸

**See the real cost of your meetings — in real time.**

---

## The Problem

Nobody looks at the price tag on a meeting. When 8 engineers at ₹20 LPA sit in a 2-hour planning call, that's not free — that's **₹3,200 in salary cost, per occurrence**. Run that meeting every week and you've spent **₹1.6 lakh/year** on a single recurring invite. Multiply across an org, and you're looking at crores evaporating in rooms where half the people didn't need to be there.

The cost is invisible. There's no feedback loop. And the default for every recurring meeting is "add everyone, block an hour." This tool makes the cost visible — in real time, while the money is draining.

---

## Demo

**[Live Demo →](https://devnp.github.io/meeting-cost-calculator)**

![Meeting ticker mid-meeting](assets/preview.png)

---

## Features

- **Real-time cost ticker** — updates every frame as the meeting runs
- **Multi-attendee support** — add as many people as needed, each with their own salary
- **Role-based presets** — India (INR) and US (USD) salary bands built in
- **INR / USD / EUR support** — Indian number formatting (₹1,23,456) included
- **Milestone alerts** — toast notification when cost crosses ₹500, ₹1,000, ₹2,000…
- **Meeting summary** — per-person breakdown, cost per minute, total duration
- **"What else could this buy?"** — fun cost comparisons (Swiggy orders, chai cups, coffees)
- **Recurring cost projections** — daily / weekly / monthly annual cost estimate
- **Weekly rollup** — tracks all meetings in the browser, shows week-to-date total
- **Copy report** — one-click plain-text summary for Slack/email
- **PNG card export** — LinkedIn/Twitter-ready 600×315 card
- **Zero dependencies** — no npm, no build step, works offline, open `index.html` and go
- **Keyboard shortcuts** — Space to pause/resume, Esc to end

---

## How the Math Works

```
hourly_rate     = annual_ctc / 2080      (52 weeks × 40 hrs)
cost_per_second = hourly_rate / 3600
meeting_cost    = cost_per_second × elapsed_seconds × attendees
```

That's it. The formula is visible in [`src/calculator.js`](src/calculator.js) — no magic, just arithmetic applied every animation frame.

**Example:** 4 engineers at ₹22 LPA in a 45-minute meeting:

```
hourly_rate     = 2,200,000 / 2080 = ₹1,057.69/hr
cost_per_second = 1057.69 / 3600  = ₹0.2938/sec
meeting_cost    = 0.2938 × 2700 × 4 = ₹3,173
```

---

## Salary Presets

### India (INR — Annual CTC)

| Role | Annual CTC |
|------|-----------|
| Intern | ₹4,00,000 |
| SDE 1 | ₹12,00,000 |
| SDE 2 | ₹22,00,000 |
| Senior SDE | ₹35,00,000 |
| Staff Engineer | ₹60,00,000 |
| Engineering Manager | ₹40,00,000 |
| Senior EM | ₹70,00,000 |
| Director of Engineering | ₹1,20,00,000 |
| VP Engineering | ₹2,00,00,000 |
| Product Manager | ₹20,00,000 |
| Senior PM | ₹35,00,000 |
| Designer | ₹10,00,000 |
| Data Scientist | ₹18,00,000 |
| QA Engineer | ₹9,00,000 |

### US (USD — Annual)

| Role | Annual Salary |
|------|--------------|
| Intern | $80,000 |
| SDE 1 | $140,000 |
| SDE 2 | $180,000 |
| Senior SDE | $230,000 |
| Staff Engineer | $300,000 |
| Engineering Manager | $250,000 |
| Director of Engineering | $450,000 |
| VP Engineering | $600,000 |

---

## Run Locally

```bash
git clone https://github.com/devnp/meeting-cost-calculator.git
cd meeting-cost-calculator
```

Then open `index.html` via a local server — ES modules require HTTP, not `file://`:

- **VS Code:** install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) → click "Go Live"
- **Python:** `python -m http.server 8000` → visit `localhost:8000`
- **Node:** `npx serve .` → visit the printed URL

No npm install. No build step. No backend.

## Deploy to GitHub Pages

No workflow file needed. GitHub Pages can serve static files directly:

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**

Your site will be live at `https://<username>.github.io/meeting-cost-calculator` within a minute.

---

## Why I Built This

I was in a 90-minute "alignment meeting" with 7 people when it struck me: nobody in this room knows what this meeting costs. The calendar invite just says "1:30–3:00 PM." I wanted a tool that shows the number in real time — not as a gimmick, but as a small behavioural nudge. Every existing tool I found was US-centric, required a signup, or hadn't been touched in years. Built this in two days with Claude Code.

---

## Contributing

PRs welcome, especially for:

- More country/currency presets (🇬🇧 GBP, 🇨🇦 CAD, 🇦🇺 AUD, etc.)
- Google Calendar integration (auto-populate attendees + duration)
- Slack bot version (`/meetingcost 45 @alice @bob @carol`)
- Multiple meeting comparison view

---

## License

MIT — use it, fork it, embed it in your internal tools.

---

*Built with [Claude Code](https://claude.ai/code) · Zero dependencies · Works offline*

# Contributing

Contributions are welcome, especially salary presets for new countries.

---

## Run Locally

```bash
git clone https://github.com/Devpanchal37/meeting-cost-calculator.git
cd meeting-cost-calculator
```

Open `index.html` via a local server (ES modules require HTTP, not `file://`):

- **VS Code:** [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) → click "Go Live"
- **Python:** `python -m http.server 8000` → `localhost:8000`
- **Node:** `npx serve .`

No npm. No build step.

---

## Adding Salary Presets for a New Country

**Step 1 — Open `src/presets.js`** and add your country block following the existing format:

```js
GBP: {
  'Intern': 25000,
  'SDE 1': 55000,
  'SDE 2': 75000,
  'Senior SDE': 95000,
  // ... more roles
},
```

Use annual salary in the local currency. Stick to the same role names so the dropdown stays consistent.

**Step 2 — Update `getDefaultCTCForCurrency()`** in the same file:

```js
if (currency === 'GBP') return 60000;
```

**Step 3 — Add currency formatting in `src/calculator.js`** inside `formatCurrency()`:

```js
if (currency === 'GBP') {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}
```

**Step 4 — Add the currency button in `index.html`** in the currency tabs section:

```html
<button class="currency-btn" data-currency="GBP">£ GBP</button>
```

---

## Submitting a PR

```bash
# Fork the repo on GitHub, then:
git checkout -b add-gbp-presets
# make your changes
git add .
git commit -m "feat: add GBP salary presets for UK"
git push origin add-gbp-presets
```

Then open a PR with a short description of the country, the currency, and where you sourced the salary data.

---

## Ground Rules

- No backend dependencies
- No npm, no build steps, no bundlers
- Keep it vanilla HTML/CSS/JS
- One PR per country/feature — keep diffs small and reviewable

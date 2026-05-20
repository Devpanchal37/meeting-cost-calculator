const PRESETS = {
  INR: {
    'Intern': 400000,
    'SDE 1': 1200000,
    'SDE 2': 2200000,
    'Senior SDE': 3500000,
    'Staff Engineer': 6000000,
    'Engineering Manager': 4000000,
    'Senior EM': 7000000,
    'Director of Engineering': 12000000,
    'VP Engineering': 20000000,
    'Product Manager': 2000000,
    'Senior PM': 3500000,
    'Designer': 1000000,
    'Senior Designer': 2000000,
    'Data Scientist': 1800000,
    'QA Engineer': 900000,
  },
  USD: {
    'Intern': 80000,
    'SDE 1': 140000,
    'SDE 2': 180000,
    'Senior SDE': 230000,
    'Staff Engineer': 300000,
    'Engineering Manager': 250000,
    'Senior EM': 350000,
    'Director of Engineering': 450000,
    'VP Engineering': 600000,
    'Product Manager': 160000,
    'Senior PM': 220000,
    'Designer': 110000,
    'Senior Designer': 160000,
    'Data Scientist': 170000,
    'QA Engineer': 110000,
  },
  EUR: {
    'Intern': 40000,
    'SDE 1': 70000,
    'SDE 2': 90000,
    'Senior SDE': 120000,
    'Staff Engineer': 160000,
    'Engineering Manager': 130000,
    'Senior EM': 180000,
    'Director of Engineering': 240000,
    'VP Engineering': 320000,
    'Product Manager': 85000,
    'Senior PM': 115000,
    'Designer': 65000,
    'Senior Designer': 90000,
    'Data Scientist': 95000,
    'QA Engineer': 60000,
  },
};

export function getPreset(role, currency) {
  return PRESETS[currency]?.[role] ?? getDefaultCTCForCurrency(currency);
}

export function getRoles(currency = 'INR') {
  return Object.keys(PRESETS[currency] || PRESETS.INR);
}

export function getDefaultCTCForCurrency(currency) {
  if (currency === 'INR') return 1500000;
  if (currency === 'USD') return 150000;
  return 120000;
}

export { PRESETS };

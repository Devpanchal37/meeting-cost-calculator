export function ctcToHourlyRate(annualCTC) {
  return annualCTC / 2080;
}

export function costPerSecond(annualCTC) {
  return ctcToHourlyRate(annualCTC) / 3600;
}

export function calculateMeetingCost(attendees, elapsedSeconds) {
  let totalCost = 0;
  const breakdown = attendees.map(a => {
    const cost = costPerSecond(a.annualCTC) * elapsedSeconds;
    totalCost += cost;
    return { name: a.name, role: a.role, cost };
  });
  return { totalCost, breakdown };
}

export function formatCurrency(amount, currency) {
  if (currency === 'INR') {
    const fixed = amount.toFixed(2);
    const [int, dec] = fixed.split('.');
    if (int.length <= 3) return `₹${int}.${dec}`;
    const lastThree = int.slice(-3);
    const rest = int.slice(0, -3);
    const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    return `₹${formatted}.${dec}`;
  }
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
  if (currency === 'EUR') {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  }
  return amount.toFixed(2);
}

export function estimateCost(attendees, durationMinutes) {
  return calculateMeetingCost(attendees, durationMinutes * 60);
}

export function getCostThreshold(totalCost, currency) {
  if (currency === 'INR') {
    if (totalCost < 500) return 'low';
    if (totalCost < 2000) return 'medium';
    if (totalCost < 5000) return 'high';
    return 'critical';
  }
  if (totalCost < 10) return 'low';
  if (totalCost < 50) return 'medium';
  if (totalCost < 100) return 'high';
  return 'critical';
}

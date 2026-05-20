import { formatCurrency } from './calculator.js';

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export async function copyToClipboard(summary, currency) {
  const { totalCost, duration, attendees, costPerMinute, weeklyAnnual } = summary;
  const lines = [
    '---',
    'Meeting Cost Report',
    `Duration: ${formatDuration(duration)} | Attendees: ${attendees.length}`,
    `Total Cost: ${formatCurrency(totalCost, currency)}`,
    `Cost/min: ${formatCurrency(costPerMinute, currency)}`,
    '',
    'Breakdown:',
    ...attendees.map(a => `• ${a.name ? `${a.name} (${a.role})` : a.role}: ${formatCurrency(a.cost, currency)}`),
    '',
    `📅 If weekly: ${formatCurrency(weeklyAnnual, currency)}/year`,
    '',
    'Calculated with Meeting Cost Calculator',
    'github.com/devnp/meeting-cost-calculator',
    '---',
  ];
  try {
    await navigator.clipboard.writeText(lines.join('\n'));
    return true;
  } catch (_) {
    return false;
  }
}

export async function exportPNGCard(summary, currency) {
  const { totalCost, duration, attendees, costPerMinute } = summary;
  const card = document.getElementById('export-card');

  const currencySymbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€';
  const thresholdColor = totalCost > 5000 && currency === 'INR' ? '#ef4444'
    : totalCost > 100 && currency !== 'INR' ? '#ef4444'
    : '#f97316';

  card.innerHTML = `
    <div id="export-card-inner" style="
      background:#0f0f0f;color:#fff;width:600px;height:315px;
      padding:40px 48px;box-sizing:border-box;font-family:'Courier New',monospace;
      display:flex;flex-direction:column;justify-content:space-between;
    ">
      <div>
        <div style="font-size:11px;color:#555;letter-spacing:2px;margin-bottom:8px;text-transform:uppercase;">Meeting Cost Report</div>
        <div style="font-size:62px;font-weight:bold;color:${thresholdColor};line-height:1;letter-spacing:-2px;">${formatCurrency(totalCost, currency)}</div>
      </div>
      <div style="display:flex;gap:48px;">
        <div>
          <div style="color:#555;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Duration</div>
          <div style="font-size:22px;">${formatDuration(duration)}</div>
        </div>
        <div>
          <div style="color:#555;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Attendees</div>
          <div style="font-size:22px;">${attendees.length}</div>
        </div>
        <div>
          <div style="color:#555;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Cost / min</div>
          <div style="font-size:22px;">${formatCurrency(costPerMinute, currency)}</div>
        </div>
      </div>
      <div style="color:#333;font-size:12px;border-top:1px solid #1e1e1e;padding-top:12px;display:flex;justify-content:space-between;align-items:center;">
        <span>💸 Meeting Cost Calculator</span>
        <span style="color:#444;">See the real cost of your meetings in real time</span>
      </div>
    </div>
  `;
  card.style.display = 'block';

  const html2canvas = window.html2canvas;
  if (!html2canvas) {
    card.style.display = 'none';
    alert('Export library not loaded. Check your internet connection.');
    return;
  }

  try {
    const canvas = await html2canvas(document.getElementById('export-card-inner'), {
      width: 600,
      height: 315,
      scale: 2,
      backgroundColor: '#0f0f0f',
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = `meeting-cost-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    card.style.display = 'none';
  }
}

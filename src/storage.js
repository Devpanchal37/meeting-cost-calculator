const STORAGE_KEY = 'mcc_meetings';
const MAX_ENTRIES = 100;

export function saveMeeting(meetingData) {
  try {
    const meetings = getAllMeetings();
    meetings.push({ ...meetingData, id: Date.now() });
    if (meetings.length > MAX_ENTRIES) {
      meetings.splice(0, meetings.length - MAX_ENTRIES);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
  } catch (_) {
    // localStorage unavailable or quota exceeded — silently skip
  }
}

export function getAllMeetings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (_) {
    return [];
  }
}

export function getThisWeekMeetings() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return getAllMeetings().filter(m => {
    const d = new Date(m.date);
    return d >= monday && d <= sunday;
  });
}

export function getWeeklyStats() {
  const meetings = getThisWeekMeetings();
  if (!meetings.length) {
    return { totalCost: 0, totalMinutes: 0, meetingCount: 0, avgCostPerMeeting: 0 };
  }
  const totalCost = meetings.reduce((s, m) => s + m.totalCost, 0);
  const totalMinutes = meetings.reduce((s, m) => s + m.duration / 60, 0);
  return {
    totalCost,
    totalMinutes,
    meetingCount: meetings.length,
    avgCostPerMeeting: totalCost / meetings.length,
  };
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
}

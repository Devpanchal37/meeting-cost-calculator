export class MeetingTimer {
  constructor() {
    this.startTime = null;
    this.pausedAt = null;
    this.totalPausedMs = 0;
    this.isRunning = false;
    this.onTick = null;
    this.onMilestone = null;
    this.milestones = new Set();
    this._rafId = null;
  }

  start(onTick, onMilestone) {
    this.startTime = Date.now();
    this.totalPausedMs = 0;
    this.pausedAt = null;
    this.isRunning = true;
    this.onTick = onTick;
    this.onMilestone = onMilestone;
    this.milestones = new Set();
    this._loop();
  }

  _loop() {
    if (!this.isRunning) return;
    const elapsed = this.getElapsedSeconds();
    if (this.onTick) this.onTick(elapsed);
    this._rafId = requestAnimationFrame(() => this._loop());
  }

  pause() {
    if (!this.isRunning) return;
    this.pausedAt = Date.now();
    this.isRunning = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  resume() {
    if (this.isRunning || !this.pausedAt) return;
    this.totalPausedMs += Date.now() - this.pausedAt;
    this.pausedAt = null;
    this.isRunning = true;
    this._loop();
  }

  stop() {
    const elapsed = this.getElapsedSeconds();
    this.isRunning = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    return elapsed;
  }

  getElapsedSeconds() {
    if (!this.startTime) return 0;
    const now = this.pausedAt ? this.pausedAt : Date.now();
    return Math.max(0, (now - this.startTime - this.totalPausedMs) / 1000);
  }

  checkMilestones(totalCost, currency) {
    const milestoneMap = {
      INR: [500, 1000, 2000, 5000, 10000, 25000],
      USD: [10, 25, 50, 100, 500, 1000],
      EUR: [10, 25, 50, 100, 500, 1000],
    };
    const thresholds = milestoneMap[currency] || milestoneMap.USD;
    for (const m of thresholds) {
      if (totalCost >= m && !this.milestones.has(m)) {
        this.milestones.add(m);
        if (this.onMilestone) this.onMilestone(m, currency);
      }
    }
  }

  reset() {
    this.stop();
    this.startTime = null;
    this.pausedAt = null;
    this.totalPausedMs = 0;
    this.milestones = new Set();
    this.onTick = null;
    this.onMilestone = null;
  }
}

import { COURSES, TOTAL_SERMONS, TOTAL_PRAYER_CHARGES } from './curriculumData';

export function recalc(p) {
  const m = (Math.min(p.completedModules.length, COURSES.length) / COURSES.length) * 40;
  const s = (Math.min(p.sermonsCompleted, TOTAL_SERMONS) / TOTAL_SERMONS) * 40;
  const pr = (Math.min(p.prayerChargesCompleted, TOTAL_PRAYER_CHARGES) / TOTAL_PRAYER_CHARGES) * 20;
  p.overallProgress = Math.round(m + s + pr);
}
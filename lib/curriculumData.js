// lib/curriculumData.js
// Single source of truth for course ordering/labels, shared by the
// curriculum API route, CurriculumSidebar, LessonView, and the Grades page.
// Keys match Course.code in your Mongoose schema ('cc','c2',...,'c6') plus
// a virtual 'final' step for the capstone exam.

export const COURSES = [
  { key: 'cc',    code: 'cc', order: 0, title: 'CC Orientation',          type: 'orientation' },
  { key: 'c2',    code: 'c2', order: 1, title: 'C2 New Birth',            type: 'course' },
  { key: 'c3',    code: 'c3', order: 2, title: 'C3 Spiritual Milk',       type: 'course' },
  { key: 'c4',    code: 'c4', order: 3, title: 'C4 Growing in Love',      type: 'course' },
  { key: 'c5',    code: 'c5', order: 4, title: 'C5 Stewardship & Leadership', type: 'course' },
  { key: 'c6',    code: 'c6', order: 5, title: 'C6 COLIG Cultures',       type: 'course' },
  { key: 'final', code: 'final', order: 6, title: 'Final Exam',          type: 'final-assessment' },
];

export function getCourseByKey(key) {
  return COURSES.find((c) => c.key === key) || null;
}

export function getNextCourseKey(key) {
  const idx = COURSES.findIndex((c) => c.key === key);
  if (idx === -1 || idx === COURSES.length - 1) return null;
  return COURSES[idx + 1].key;
}

// A course is unlocked if it's the first one, or the previous course
// key is present in completedModules.
export function isUnlocked(key, completedModules = []) {
  const idx = COURSES.findIndex((c) => c.key === key);
  if (idx <= 0) return true;
  const prevKey = COURSES[idx - 1].key;
  return completedModules.includes(prevKey);
}

export function computeStatus(key, completedModules = [], currentModule) {
  if (completedModules.includes(key)) return 'COMPLETE';
  if (!isUnlocked(key, completedModules)) return 'LOCKED';
  if (key === currentModule) return 'IN PROGRESS';
  return 'UNLOCKED';
}
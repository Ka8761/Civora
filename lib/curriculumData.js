// Single source of truth for course ordering/labels.
export const TOTAL_SERMONS = 61;
export const TOTAL_PRAYER_CHARGES = 6;

export const COURSES = [
  { key: 'cc', code: 'cc', order: 0, title: 'CC Orientation', type: 'orientation',
    description: 'Welcome to Leadership Foundation School. Understand the vision, structure, and your journey ahead.' },
  { key: 'c2', code: 'c2', order: 1, title: 'C2 New Birth', type: 'course',
    description: 'Foundations of salvation, repentance, and what it truly means to be born again in Christ.' },
  { key: 'c3', code: 'c3', order: 2, title: 'C3 Spiritual Milk', type: 'course',
    description: 'The elementary principles of Christ — foundational truths every believer must be grounded in.' },
  { key: 'c4', code: 'c4', order: 3, title: 'C4 Growing in Love', type: 'course',
    description: 'Moving from milk to meat — growing in prayer, the Word, fellowship, and servant leadership.' },
  { key: 'c5', code: 'c5', order: 4, title: 'C5 Stewardship & Leadership', type: 'course',
    description: 'Your calling, spiritual gifts, and operating as a kingdom citizen in every sphere of life.' },
  { key: 'c6', code: 'c6', order: 5, title: 'C6 COLIG Cultures', type: 'course',
    description: 'The capstone module. Learn to lead like Christ — through humility, sacrifice, and love.' },
  { key: 'final', code: 'final', order: 6, title: 'Final Exam', type: 'final-assessment',
    description: 'Complete the final examination to receive your certificate.' },
];

export function getCourseByKey(key) {
  return COURSES.find((c) => c.key === key) || null;
}

export function getNextCourseKey(key) {
  const idx = COURSES.findIndex((c) => c.key === key);
  if (idx === -1 || idx === COURSES.length - 1) return null;
  return COURSES[idx + 1].key;
}

export function isUnlocked(key, completedModules = []) {
  const idx = COURSES.findIndex((c) => c.key === key);
  if (idx < 0) return false;
  if (idx === 0) return true;
  return completedModules.includes(COURSES[idx - 1].key);
}

export function computeStatus(key, completedModules = [], currentModule) {
  if (completedModules.includes(key)) return 'COMPLETE';
  if (!isUnlocked(key, completedModules)) return 'LOCKED';
  if (key === currentModule) return 'IN PROGRESS';
  return 'UNLOCKED';
}
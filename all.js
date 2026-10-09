const { default: DashboardHome } = require("./components/dashboard")
const { default: Accomplishment } = require("./models/Accomplishment")
const { default: Prayer } = require("./models/Prayer")
const { default: SermonProgress } = require("./models/SermonProgress")

folders-
  component
  lib
  models
  pages
  nodemodules
  public
  styles
- files
 .env
 package.json
 jsconfig
 ....

lib folder
-auth.js
-curriculmData.js
Email.js
MongoDBC.js
stripe.js

INSIDE COMPONENT FOOLDER
-folders
-accomplishmnets 
=>accomplishmentCard.js
=>Accomplishmnet.js

-admin

-certificate
=>CertificateCard.js

-community
=>Community.js
=>CommunityPost.js
=>Createpost.js

curriculum
=>CourseCard.jscurriculmumap.js
=>curriculmsidebar.js
=>finalassessment.js
=>index.js
=>knowledgecheck.js
=>lessoncard.js
=>lessonconent.js
=>lessonview.js
=>reflectionform.js

-dashboard
=>AccomplishmentsCard
=>accomplishmenst.js
=>community.js
=>curriculm,jsdashboardpage.js
=>grades.js
=>index.js
=>PrayerLogPage.js=>
prayersummary.js
=>profile.js
=>recentactivity.js
=>testuimonydiary.js
=>studentprogress.js
=>testimonysummary.js
-grade
=>GradeCard.js
=>GradeOverview.js

-home
=>About.js
=>HowItWorks
=>Hero.js
=>CTA.js
=>Community.js
=>HeroMain.js
=>Journey.js

-layout
=>AdminLayout.js
=>DashboardLayout.js
=>Footer.js
=>Nvbar.js
=>Sidebar.js

prayer
=>PrayerCard.js
PrayerForm.js
PrayerLogPage.js

sermons
=>SermonCard.js
=>SermonCategories.js
=>SermonLibrary.js
=>SermonPlayer.js
=>SermonProject.js

testimony
=>TestimonyCard.js
=>TestimonyDiary.js
=>TestimonyForm.js

inside model folder
-Accomplishment.js
certificate.js
communitypost.js
course.kjs
grade.js
lesson.js
lessonProgress.js
    Notification.js
    Prayer.js
    prayerenry.jsprogress.js
    sermon.js
    SermonProgress.js
    testimony.js
    user.js

    inside Pages folder
    =>folders
    -admin
    -api
    auth
    DashboardHome
    =>files
    _app.js
    _document.js
    about.js
    contact.js
    index.js
    indership-school.js
    sermons.js
import crypto from 'crypto';

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

---
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email, token, name) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  await transporter.sendMail({
    from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password — COLIG Foundation School',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">
            COLIG FOUNDATION
          </h1>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:3px;">
            LEADERSHIP FOUNDATION SCHOOL
          </p>
        </div>

        <h2 style="color:#fff;font-size:22px;">
          Hello, ${name}
        </h2>

        <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
          We received a request to reset your password.
          Click the button below to set a new password.
          This link expires in
          <strong style="color:#c9921a;">1 hour</strong>.
        </p>

        <div style="text-align:center;margin:32px 0;">
          <a
            href="${resetUrl}"
            style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;"
          >
            RESET MY PASSWORD
          </a>
        </div>

        <p style="color:rgba(255,255,255,0.4);font-size:12px;">
          If you didn't request this, you can safely ignore this email.
        </p>

        <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0;" />

        <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;">
          © 2026 COLIG Leadership Foundation School · Nigeria
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email, name) {
  await transporter.sendMail({
    from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to COLIG Leadership Foundation School',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
        <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">
          COLIG FOUNDATION
        </h1>

        <h2 style="color:#fff;">
          Welcome, ${name}!
        </h2>

        <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
          Your account has been created successfully.
          You are now enrolled in the COLIG Leadership Foundation School.
        </p>

        <div style="background:rgba(201,146,26,0.1);border:1px solid rgba(201,146,26,0.3);border-radius:8px;padding:20px;margin:24px 0;">
          <p style="color:#c9921a;font-weight:bold;">
            Your first steps:
          </p>

          <p style="color:rgba(255,255,255,0.7);font-size:14px;">
            ✓ Start with CC Orientation<br/>
            ✓ Log your first prayer request<br/>
            ✓ Join the Community<br/>
            ✓ Begin the Sermon Project
          </p>
        </div>

        <div style="text-align:center;margin:32px 0;">
          <a
            href="${process.env.NEXTAUTH_URL}/dashboard"
            style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;"
          >
            GO TO DASHBOARD
          </a>
        </div>
      </div>
    `,
  });
}

------

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

---
import mongoose from 'mongoose';
import path from 'path';
import SermonCard from './components/sermons/SermonCard'
import dotenv from 'dotenv';
import PrayerLogPage from './components/dashboard/prayer-log'
import AdminLayout from './components/layout/AdminLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import CommunityPost from './models/CommunityPost'
import CourseCard from './components/curriculum/CourseCard'
 // Load environment variables from .env file

const MONGODB_URI = process.env.MONGODB_URI;
console.log("ALL ENVS:", process.env);
console.log("SPECIFIC URI:", process.env.MONGODB_URI);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

---
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
--------
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Course from '../../../models/Course';
import Progress from '../../../models/Progress';
import { COURSES, isUnlocked, computeStatus } from '../../../lib/curriculumData';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Course docs (title/description/thumbnail etc.) keyed by code, if present in DB.
      const dbCourses = await Course.find({ isActive: true }).sort({ order: 1 }).lean();
      const dbByCode = Object.fromEntries(dbCourses.map((c) => [c.code, c]));

      let progress = await Progress.findOne({ userId: session.user.id }).lean();
      const completedModules = progress?.completedModules || [];
      const currentModule = progress?.currentModule || 'cc';

      const curriculum = COURSES.map((c) => {
        const dbCourse = dbByCode[c.code];
        return {
          key: c.key,
          code: c.code,
          order: c.order,
          type: c.type,
          title: dbCourse?.title || c.title,
          subtitle: dbCourse?.subtitle || '',
          description: dbCourse?.description || '',
          lessonsCount: dbCourse?.lessonsCount || 0,
          passingScore: dbCourse?.passingScore ?? 70,
          unlocked: isUnlocked(c.key, completedModules),
          completed: completedModules.includes(c.key),
          status: computeStatus(c.key, completedModules, currentModule),
          isCurrent: c.key === currentModule,
        };
      });

      return res.status(200).json({ curriculum, currentModule, completedModules });
    } catch (err) {
      console.error('GET /api/curriculum error:', err);
      return res.status(500).json({ error: 'Failed to load curriculum' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
-----
import Link from 'next/link';
import LockIcon from '../ui/LockIcon';
import ProgressBar from '../ui/ProgressBar';

export default function CourseCard({
  course,
  progress = 0,
  locked = false,
}) {
  return (
    <div
      style={{
        background: locked
          ? 'rgba(255,255,255,0.02)'
          : 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: 22,
        opacity: locked ? 0.6 : 1,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontSize: 10,
              letterSpacing: 2.5,
              color: '#c9921a',
              fontWeight: 700,
            }}
          >
            {course.code}
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display'",
              fontSize: 20,
              fontWeight: 700,
              color: '#fff',
              marginTop: 5,
            }}
          >
            {course.title}
          </div>

          <div
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Barlow Condensed'",
              fontSize: 11,
              marginTop: 5,
            }}
          >
            {course.subtitle}
          </div>
        </div>

        {locked ? (
          <LockIcon />
        ) : (
          <div
            style={{
              color: '#c9921a',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            OPEN
          </div>
        )}
      </div>

      {!locked && (
        <>
          <div style={{ marginTop: 20 }}>
            <ProgressBar progress={progress} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Barlow Condensed'",
                fontSize: 10,
              }}
            >
              {progress}% COMPLETE
            </span>

            <Link
              href={`/dashboard/curriculum/${course._id}`}
              style={{
                color: '#c9921a',
                textDecoration: 'none',
                fontFamily: "'Barlow Condensed'",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              CONTINUE →
            </Link>
          </div>
        </>
      )}

      {locked && (
        <div
          style={{
            marginTop: 16,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: "'Barlow Condensed'",
            fontSize: 10,
            letterSpacing: 1,
          }}
        >
          Complete the previous class to unlock this course.
        </div>
      )}
    </div>
  );
}
-------
// import { useState } from 'react';
// import toast from 'react-hot-toast';

// const LESSONS = {
//   'cc-overview': {
//     tag: 'CC ORIENTATION · OVERVIEW · LESSON 1 OF 4',
//     title: 'Welcome to COLIG Leadership Foundation School',
//     type: 'overview',
//     body: `Welcome, beloved student. You have made a great decision to begin this journey of intentional discipleship and servant leadership training.

// The COLIG Leadership Foundation School is a structured programme designed to equip you with:
// - Sound biblical doctrine and a deep understanding of Scripture
// - A personal discipline of prayer, study, and daily reflection
// - The character and competence required for servant leadership
// - A strong community of accountability with fellow believers

// This orientation module (CC) introduces you to the school's vision, structure, and expectations. Complete every lesson, knowledge check, and reflection before proceeding to C2.`,
//     next: 'cc-video',
//   },
//   'cc-video': {
//     tag: 'CC ORIENTATION · VIDEO LESSON · LESSON 2 OF 4',
//     title: 'Introduction to COLIG Leadership Foundation School',
//     type: 'video',
//     duration: '22 minutes',
//     next: 'cc-knowledge',
//   },
//   'cc-knowledge': {
//     tag: 'CC ORIENTATION · KNOWLEDGE CHECK · LESSON 3 OF 4',
//     title: 'Test Your Understanding',
//     type: 'knowledge',
//     questions: [
//       {
//         q: '1. What is the primary aim of COLIG Leadership Foundation School?',
//         options: [
//           { k: 'A', text: 'To equip believers with sound doctrine, spiritual discipline, and servant leadership', correct: true },
//           { k: 'B', text: 'To train pastors for church planting only', correct: false },
//           { k: 'C', text: 'To provide secular leadership skills', correct: false },
//           { k: 'D', text: 'To replace church membership', correct: false },
//         ],
//       },
//       {
//         q: '2. According to Romans 10:17, faith comes by:',
//         options: [
//           { k: 'A', text: 'Fasting and prayer alone', correct: false },
//           { k: 'B', text: 'Hearing, and hearing by the Word of God', correct: true },
//           { k: 'C', text: 'Good works and service', correct: false },
//           { k: 'D', text: 'Church attendance alone', correct: false },
//         ],
//       },
//       {
//         q: '3. How many course modules does the Foundation School have?',
//         options: [
//           { k: 'A', text: '4', correct: false },
//           { k: 'B', text: '5', correct: false },
//           { k: 'C', text: '6 — CC, C2, C3, C4, C5, C6', correct: true },
//           { k: 'D', text: '8', correct: false },
//         ],
//       },
//     ],
//     next: 'cc-reflection',
//   },
//   'cc-reflection': {
//     tag: 'CC ORIENTATION · REFLECTION · LESSON 4 OF 4',
//     title: 'Personal Reflection',
//     type: 'reflection',
//     prompts: [
//       'What specific area of your life do you believe God is calling you to grow in through this school? How does servant leadership apply to where you are right now?',
//       'What was the most impactful thing from the CC Orientation? How will you apply it this week?',
//       'Write a short prayer committing yourself to this journey of discipleship.',
//     ],
//     next: null,
//     completesChapter: true,
//   },
// };

// export default function LessonView({ lessonKey, onComplete }) {
//   const lesson = LESSONS[lessonKey];
//   const [answers, setAnswers] = useState({});
//   const [reflections, setReflections] = useState({});

//   if (!lesson) {
//     return (
//       <div className="lc">
//         <div style={{ padding: '60px', textAlign: 'center' }}>
//           <div style={{ fontSize: 46, marginBottom: 13 }}>🔒</div>
//           <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 7 }}>
//             Module Locked
//           </div>
//           <p style={{ fontSize: 14, color: 'var(--mid)', maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
//             Complete <strong>CC Orientation</strong> to unlock this module.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   function pickAnswer(qIdx, correct) {
//     setAnswers(a => ({ ...a, [qIdx]: correct }));
//     if (correct) toast.success('✅ Correct!');
//     else toast.error('❌ Not quite — try again');
//   }

//   function submitReflection() {
//     const filled = Object.values(reflections).filter(v => v.trim().length > 20);
//     if (filled.length < (lesson.prompts?.length || 0)) {
//       toast.error('Please complete all reflection prompts');
//       return;
//     }
//     toast.success('🎉 ' + (lesson.completesChapter ? 'CC Orientation Complete! C2 is now unlocked.' : 'Reflection saved!'));
//     if (onComplete) onComplete(lessonKey);
//   }

//   return (
//     <div className="lc">
//       {/* Video type */}
//       {lesson.type === 'video' && (
//         <div className="lc-vid">
//           <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(201,146,26,0.7)', marginBottom: 8 }}>{lesson.tag}</div>
//           <button
//             style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gold)', border: 'none', fontSize: 22, cursor: 'pointer', transition: 'transform .2s' }}
//             onClick={() => toast.success('▶ Playing: ' + lesson.title)}
//           >▶</button>
//           <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>{lesson.title}</div>
//           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.34)' }}>Duration: {lesson.duration} · HD Video</div>
//         </div>
//       )}

//       {/* Meta */}
//       <div className="lc-meta">
//         <div className="lc-tag">{lesson.tag}</div>
//         <div className="lc-title">{lesson.title}</div>
//       </div>

//       {/* Overview body */}
//       {lesson.type === 'overview' && (
//         <div className="lc-body">
//           {lesson.body.split('\n').map((line, i) => {
//             if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 18 }}>{line.slice(2)}</li>;
//             if (line.trim() === '') return <br key={i} />;
//             return <p key={i} style={{ marginBottom: 11 }}>{line}</p>;
//           })}
//         </div>
//       )}

//       {/* Knowledge check */}
//       {lesson.type === 'knowledge' && (
//         <div style={{ padding: '16px 20px' }}>
//           {lesson.questions.map((q, qi) => (
//             <div key={qi} className="kcq">
//               <div className="kcqt">{q.q}</div>
//               <div className="kcops">
//                 {q.options.map((opt, oi) => (
//                   <div
//                     key={oi}
//                     className={`kcop ${answers[qi] === true && opt.correct ? 'cor' : answers[qi] === false && !opt.correct && answers[qi] !== undefined ? '' : ''}`}
//                     onClick={() => pickAnswer(qi, opt.correct)}
//                   >
//                     <div className="kl">{opt.k}</div>
//                     <div className="ktxt">{opt.text}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Reflection */}
//       {lesson.type === 'reflection' && (
//         <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
//           {lesson.prompts.map((prompt, pi) => (
//             <div key={pi} className="rb">
//               <div className="rp">"{prompt}"</div>
//               <textarea
//                 className="rta"
//                 placeholder="Write your reflection here (minimum 100 words)…"
//                 value={reflections[pi] || ''}
//                 onChange={e => setReflections(r => ({ ...r, [pi]: e.target.value }))}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Actions */}
//       <div className="lc-acts">
//         {lesson.next && (
//           <button className="bs bs-g" onClick={() => onComplete && onComplete(lessonKey, lesson.next)}>
//             NEXT LESSON →
//           </button>
//         )}
//         {lesson.type === 'reflection' && (
//           <button className="bs bs-g" onClick={submitReflection}>
//             SUBMIT & COMPLETE →
//           </button>
//         )}
//         {lesson.type !== 'reflection' && lesson.type !== 'knowledge' && (
//           <button className="bs bs-o" onClick={() => { toast.success('Marked complete!'); onComplete && onComplete(lessonKey); }}>
//             MARK COMPLETE
//           </button>
//         )}
//         {lesson.type === 'knowledge' && (
//           <button className="bs bs-gr" onClick={() => { toast.success('Score submitted: 95%!'); onComplete && onComplete(lessonKey); }}>
//             SUBMIT ANSWERS
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCourseByKey, getNextCourseKey } from '../../lib/curriculumData';

/**
 * Props:
 *  - lessonKey: string, current active course/lesson key ('cc','c2',...,'final')
 *  - onComplete: (lessonKey, nextKey) => void   // parent auto-advances activeLesson to nextKey
 *
 * Every step that requires user input (Knowledge Check, Personal Reflection)
 * gets a Skip button beside its Submit/Complete button. Skip moves the
 * student forward without requiring the field to be filled in.
 */
export default function LessonView({ lessonKey, onComplete }) {
  const course = getCourseByKey(lessonKey);
  const nextKey = getNextCourseKey(lessonKey);

  const [reflection, setReflection] = useState('');
  const [knowledgeAnswer, setKnowledgeAnswer] = useState('');

  function finishLesson(meta = {}) {
    onComplete(lessonKey, nextKey);
    if (meta.skipped) {
      toast('⏭️ Skipped — moving to the next session'.replace('⏭️ ', ''));
    }
  }

  function handleReflectionSubmit(e) {
    e.preventDefault();
    if (!reflection.trim()) {
      toast.error('Write a short reflection, or use Skip.');
      return;
    }
    finishLesson();
    toast.success('Reflection saved!');
  }

  function handleReflectionSkip() {
    setReflection('');
    finishLesson({ skipped: true });
  }

  function handleKnowledgeSubmit(e) {
    e.preventDefault();
    if (!knowledgeAnswer.trim()) {
      toast.error('Answer the check, or use Skip.');
      return;
    }
    toast.success('Knowledge check submitted!');
  }

  function handleKnowledgeSkip() {
    setKnowledgeAnswer('');
    toast('Knowledge check skipped.');
  }

  if (!course) {
    return <div className="lv-empty">Select a session to begin.</div>;
  }

  return (
    <div className="lv">
      <div className="lv-head">
        <div className="lv-eyebrow">{course.type === 'final-assessment' ? 'CAPSTONE' : 'SESSION'}</div>
        <h2 className="lv-title">{course.title}</h2>
        {course.subtitle && <p className="lv-sub">{course.subtitle}</p>}
      </div>

      <div className="lv-body">
        <p>{course.description || 'Lesson content goes here.'}</p>
      </div>

      {/* Knowledge Check */}
      <div className="lv-section">
        <div className="lv-section-title">Knowledge Check</div>
        <form onSubmit={handleKnowledgeSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="Answer the knowledge check question…"
            value={knowledgeAnswer}
            onChange={(e) => setKnowledgeAnswer(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" className="lv-btn lv-btn-primary">SUBMIT</button>
            <button type="button" className="lv-btn lv-btn-skip" onClick={handleKnowledgeSkip}>
              SKIP
            </button>
          </div>
        </form>
      </div>

      {/* Personal Reflection */}
      <div className="lv-section">
        <div className="lv-section-title">Personal Reflection</div>
        <form onSubmit={handleReflectionSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="What is God speaking to you through this session?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" className="lv-btn lv-btn-primary">
              SUBMIT &amp; COMPLETE
            </button>
            <button type="button" className="lv-btn lv-btn-skip" onClick={handleReflectionSkip}>
              SKIP
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .lv-empty {
          padding: 40px;
          text-align: center;
          color: var(--mid);
        }
        .lv-head {
          margin-bottom: 18px;
        }
        .lv-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--gold);
          margin-bottom: 6px;
        }
        .lv-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--navy);
        }
        .lv-sub {
          font-size: 13px;
          color: var(--mid);
          margin-top: 4px;
        }
        .lv-body {
          font-size: 14px;
          color: var(--mid);
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .lv-section {
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 18px;
        }
        .lv-section-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 12px;
        }
        .lv-textarea {
          width: 100%;
          min-height: 100px;
          resize: vertical;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          color: var(--txt);
          margin-bottom: 12px;
        }
        .lv-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .lv-btn {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 11px 22px;
          border-radius: 6px;
          cursor: pointer;
          border: none;
        }
        .lv-btn-primary {
          background: var(--gold);
          color: var(--navy);
        }
        .lv-btn-primary:hover {
          background: #e8b84b;
        }
        .lv-btn-skip {
          background: transparent;
          border: 1px solid #d8d8d8;
          color: var(--mid);
        }
        .lv-btn-skip:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
      `}</style>
    </div>
  );
}
-----
import DashboardPage from './DashboardPage';

const courses = [
  {
    code: 'ORIENTATION',
    title: 'Orientation',
    description: 'Welcome and introduction to Leadership Foundation School.',
    unlocked: true,
  },
  {
    code: 'C2',
    title: 'New Birth',
    description: 'Understanding the foundation of the Christian life.',
    unlocked: false,
  },
  {
    code: 'C3',
    title: 'Spiritual Milk',
    description: 'Growing through the Word and spiritual disciplines.',
    unlocked: false,
  },
  {
    code: 'C4',
    title: 'Prayer & Fellowship',
    description: 'Developing a consistent life of prayer and fellowship.',
    unlocked: false,
  },
  {
    code: 'C5',
    title: 'Leadership',
    description: 'Learning the principles and responsibility of leadership.',
    unlocked: false,
  },
  {
    code: 'C6',
    title: 'Ministry & Service',
    description: 'Preparing for service, ministry and influence.',
    unlocked: false,
  },
];

export default function CurriculumPage() {
  return (
    <DashboardPage
      eyebrow="Leadership Foundation School"
      title="Curriculum Map"
      description="Follow the curriculum step by step. Each stage becomes available as you complete the previous requirement."
    >
      <div className="list">
        {courses.map((course, index) => (
          <div
            className={`course ${course.unlocked ? 'active' : 'locked'}`}
            key={course.code}
          >
            <div className="number">
              {index + 1}
            </div>

            <div className="info">
              <span>{course.code}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>

            <div className="status">
              {course.unlocked ? 'OPEN' : '🔒 LOCKED'}
            </div>
          </div>
        ))}

        <div className="assessment">
          <div>
            <span>FINAL ASSESSMENT</span>
            <h2>Final Examination</h2>
            <p>
              Complete all required curriculum stages before taking the final
              examination.
            </p>
          </div>

          <strong>🔒</strong>
        </div>
      </div>

      <style jsx>{`
        .list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .course {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.65);
        }

        .course.locked {
          opacity: 0.55;
        }

        .number {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #111;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .info {
          flex: 1;
        }

        .info span,
        .assessment span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #888;
        }

        h2 {
          margin: 5px 0;
          color: #111;
        }

        p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .status {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #111;
        }

        .assessment {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          margin-top: 15px;
          border-radius: 20px;
          background: #111;
          color: #fff;
        }

        .assessment h2 {
          color: #fff;
        }

        .assessment p,
        .assessment span {
          color: #bbb;
        }

        .assessment strong {
          font-size: 30px;
        }

        @media (max-width: 700px) {
          .course {
            align-items: flex-start;
          }

          .status {
            display: none;
          }
        }
      `}</style>
    </DashboardPage>
  );
}
-----
import DashboardPage from './DashboardPage';

export default function PrayerLogPage() {
  return (
    <DashboardPage
      eyebrow="Spiritual Journal"
      title="Prayer Log"
      description="Keep a private record of your prayers, things you are trusting God for, and answered prayers."
    >
      <div className="actions">
        <button>+ NEW PRAYER</button>
      </div>

      <div className="empty">
        <div>🙏</div>
        <h2>No prayer entries yet</h2>
        <p>Your prayer journal will appear here.</p>
      </div>

      <style jsx>{`
        .actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        button {
          background: #111;
          color: #fff;
          border: none;
          padding: 14px 20px;
          border-radius: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .empty {
          padding: 70px 20px;
          text-align: center;
          border: 1px dashed #ccc;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.5);
        }

        .empty div {
          font-size: 40px;
        }

        h2 {
          color: #111;
        }

        p {
          color: #777;
        }
      `}</style>
    </DashboardPage>
  );
}
------
import ProgressBar from '../ui/ProgressBar';

export default function StudentProgress({
  progress = 0,
  currentModule = 'Orientation',
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: 24,
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Barlow Condensed'",
              fontSize: 10,
              letterSpacing: 2.5,
              color: '#c9921a',
              fontWeight: 700,
            }}
          >
            MY PROGRESS
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display'",
              fontSize: 19,
              color: '#fff',
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            {currentModule}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display'",
            fontSize: 22,
            color: '#c9921a',
            fontWeight: 800,
          }}
        >
          {progress}%
        </div>
      </div>

      <ProgressBar progress={progress} />

      <div
        style={{
          marginTop: 10,
          fontFamily: "'Barlow Condensed'",
          fontSize: 10,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 1,
        }}
      >
        Keep going. Your next lesson is waiting.
      </div>
    </div>
  );
}
-----
import Head from 'next/head';

export default function DashboardPage({
  title,
  eyebrow,
  description,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title} | COLIG Leadership Foundation School</title>
      </Head>

      <main className="dashboard-page">
        <div className="dashboard-container">
          {eyebrow && <p className="dashboard-eyebrow">{eyebrow}</p>}

          <h1>{title}</h1>

          {description && (
            <p className="dashboard-description">{description}</p>
          )}

          <div className="dashboard-content">{children}</div>
        </div>

        <style jsx>{`
          .dashboard-page {
            min-height: 100vh;
            background: #000000;
            color: #111111;
            padding: 50px;
          }

          .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .dashboard-eyebrow {
            margin: 0 0 10px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #777777;
          }

          h1 {
            margin: 0;
            font-family: 'Playfair Display', serif;
            font-size: clamp(36px, 5vw, 64px);
            line-height: 1;
            color: #111111;
          }

          .dashboard-description {
            max-width: 680px;
            margin: 18px 0 0;
            color: #555555;
            font-size: 16px;
            line-height: 1.7;
          }

          .dashboard-content {
            margin-top: 45px;
          }

          @media (max-width: 768px) {
            .dashboard-page {
              padding: 35px 20px;
            }
          }
        `}</style>
      </main>
    </>
  );
}
-----
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const NAV = [
  { href: '/dashboard',              icon: '🏠', label: 'HOME' },
  { href: '/dashboard/profile',      icon: '👤', label: 'PROFILE' },
  { href: '/dashboard/curriculum',   icon: '📖', label: 'CURRICULUM MAP' },
  { href: '/dashboard/sermon',       icon: '🎙️', label: 'SERMON PROJECT' },
  { href: '/dashboard/prayer',       icon: '🙏', label: 'PRAYER LOG' },
  { href: '/dashboard/testimony',    icon: '✍️', label: 'TESTIMONY DIARY' },
  { href: '/dashboard/grades',       icon: '📊', label: 'GRADES' },
  { href: '/dashboard/accomplishment',icon: '🏆', label: 'ACCOMPLISHMENT' },
  { href: '/dashboard/community',    icon: '🤝', label: 'JOIN COMMUNITY' },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <aside className="dash-sidebar">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-ln">COLIG FOUNDATION</div>
        <div className="sb-ls">LEADERSHIP FOUNDATION SCHOOL</div>
      </div>

      {/* User */}
      {session && (
        <div className="sb-user">
          <div className="sb-av">{session.user.name?.charAt(0).toUpperCase()}</div>
          <div>
            <div className="sb-un">{session.user.name}</div>
            <div className="sb-ur">Foundation Student</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sb-nav">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`ni ${router.pathname === item.href ? 'active' : ''}`}
          >
            <span className="ni-i">{item.icon}</span>
            <span className="ni-l">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="sb-bot">
        <button
          className="ni so"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <span className="ni-i">🚪</span>
          <span className="ni-l">SIGN OUT</span>
        </button>
      </div>
    </aside>
  );
}

-----
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const NAV = [
  { href: '/dashboard',              icon: '🏠', label: 'HOME' },
  { href: '/dashboard/profile',      icon: '👤', label: 'PROFILE' },
  { href: '/dashboard/curriculum',   icon: '📖', label: 'CURRICULUM MAP' },
  { href: '/dashboard/sermon',       icon: '🎙️', label: 'SERMON PROJECT' },
  { href: '/dashboard/prayer',       icon: '🙏', label: 'PRAYER LOG' },
  { href: '/dashboard/testimony',    icon: '✍️', label: 'TESTIMONY DIARY' },
  { href: '/dashboard/grades',       icon: '📊', label: 'GRADES' },
  { href: '/dashboard/accomplishment',icon: '🏆', label: 'ACCOMPLISHMENT' },
  { href: '/dashboard/community',    icon: '🤝', label: 'JOIN COMMUNITY' },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <aside className="dash-sidebar">
      {/* Logo */}
      <div className="sb-logo">
        <div className="sb-ln">COLIG FOUNDATION</div>
        <div className="sb-ls">LEADERSHIP FOUNDATION SCHOOL</div>
      </div>

      {/* User */}
      {session && (
        <div className="sb-user">
          <div className="sb-av">{session.user.name?.charAt(0).toUpperCase()}</div>
          <div>
            <div className="sb-un">{session.user.name}</div>
            <div className="sb-ur">Foundation Student</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sb-nav">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`ni ${router.pathname === item.href ? 'active' : ''}`}
          >
            <span className="ni-i">{item.icon}</span>
            <span className="ni-l">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="sb-bot">
        <button
          className="ni so"
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <span className="ni-i">🚪</span>
          <span className="ni-l">SIGN OUT</span>
        </button>
      </div>
    </aside>
  );
}

-----
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [sermonOpen, setSermonOpen] = useState(false);

  /*
   * PUBLIC NAVIGATION
   */
  const publicLinks = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/about',
      label: 'About Us',
    },
    {
      href: '/leadership-school',
      label: 'Leadership School',
    },
    {
      href: '/sermons',
      label: 'Sermons',
    },
    {
      href: '/contact',
      label: 'Contact',
    },
  ];

  /*
   * MAIN STUDENT SIDEBAR
   */
  const studentLinks = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: '⌂',
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: '○',
    },
    {
      href: '/dashboard/curriculum',
      label: 'Curriculum Map',
      icon: '▦',
      special: 'curriculum',
    },
    {
      href: '/dashboard/sermon-project',
      label: 'Sermon Project',
      icon: '◉',
      special: 'sermon',
    },
    {
      href: '/dashboard/prayer-log',
      label: 'Prayer Log',
      icon: '✦',
    },
    {
      href: '/dashboard/testimony-diary',
      label: 'Testimony Diary',
      icon: '✎',
    },
    {
      href: '/dashboard/grades',
      label: 'Grades',
      icon: '▤',
    },
    {
      href: '/dashboard/accomplishments',
      label: 'Accomplishments',
      icon: '★',
    },
    {
      href: '/dashboard/community',
      label: 'Join Community',
      icon: '♧',
    },
  ];

  /*
   * WHEN INSIDE CURRICULUM
   */
  const curriculumItems = [
    {
      id: 'orientation',
      title: 'Orientation',
      subtitle: 'Welcome to Leadership Foundation School',
      locked: false,
      lessons: [
        'Welcome & Introduction',
        'How the School Works',
        'Learning Guidelines',
        'Spiritual Growth Framework',
      ],
    },
    {
      id: 'c1',
      title: 'C1 — Foundations',
      subtitle: 'The Foundation of Your Faith',
      locked: false,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c2',
      title: 'C2 — New Birth',
      subtitle: 'Understanding the New Birth',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c3',
      title: 'C3 — Spiritual Milk',
      subtitle: 'Growing in the Word',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c4',
      title: 'C4 — Prayer & Fellowship',
      subtitle: 'Developing a Life of Prayer',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c5',
      title: 'C5 — Leadership',
      subtitle: 'Understanding Spiritual Leadership',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'c6',
      title: 'C6 — Ministry & Service',
      subtitle: 'Serving With Purpose',
      locked: true,
      lessons: [
        'Overview',
        'Video Lesson',
        'Knowledge Check',
        'Reflection',
      ],
    },
    {
      id: 'final',
      title: 'Final Assessment',
      subtitle: 'Complete your Leadership Foundation journey',
      locked: true,
      lessons: [
        'Final Review',
        'Final Examination',
        'Certificate Generation',
      ],
    },
  ];

  /*
   * SERMON PROJECT
   */
  const sermonSections = [
    {
      id: 1,
      title: 'Faith',
      description: 'Building your understanding of faith',
    },
    {
      id: 2,
      title: 'The Word',
      description: 'Understanding Scripture',
    },
    {
      id: 3,
      title: 'Prayer',
      description: 'Growing in prayer',
    },
    {
      id: 4,
      title: 'The Holy Spirit',
      description: 'Understanding the work of the Spirit',
    },
    {
      id: 5,
      title: 'Leadership',
      description: 'Growing as a spiritual leader',
    },
    {
      id: 6,
      title: 'Ministry',
      description: 'Serving and impacting others',
    },
  ];

  const isActive = (href) => {
    return router.pathname === href;
  };

  /*
   * =========================================================
   * LOGGED-IN SIDEBAR
   * =========================================================
   */

  if (session) {
    return (
      <>
        <style jsx>{`
          .student-sidebar {
            width: 260px;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
            background: rgba(10, 18, 15, 0.94);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.07);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }

          .student-main {
            margin-left: 260px;
            min-height: 100vh;
          }

          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 14px;
            width: 100%;
            padding: 13px 20px;
            color: rgba(255, 255, 255, 0.62);
            text-decoration: none;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            transition: all 0.2s ease;
            border-left: 2px solid transparent;
          }

          .sidebar-link:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.035);
          }

          .sidebar-link.active {
            color: #c9921a;
            background: rgba(201, 146, 26, 0.08);
            border-left-color: #c9921a;
          }

          .sidebar-icon {
            width: 24px;
            text-align: center;
            font-size: 16px;
            opacity: 0.9;
          }

          .mobile-header {
            display: none;
          }

          @media (max-width: 900px) {
            .student-sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }

            .student-sidebar.mobile-open {
              transform: translateX(0);
            }

            .student-main {
              margin-left: 0;
            }

            .mobile-header {
              height: 64px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 18px;
              background: rgba(10, 18, 15, 0.96);
              backdrop-filter: blur(20px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.07);
              position: sticky;
              top: 0;
              z-index: 90;
            }

            .mobile-menu-button {
              background: none;
              border: none;
              color: #fff;
              font-size: 25px;
              cursor: pointer;
            }
          }
        `}</style>

        {/* MOBILE HEADER */}
        <div className="mobile-header">
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#fff',
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            COLIG
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '×' : '☰'}
          </button>
        </div>

        {/* SIDEBAR */}
        <aside
          className={`student-sidebar ${
            mobileOpen ? 'mobile-open' : ''
          }`}
        >
          {/* LOGO */}
          <div
            style={{
              padding: '28px 22px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <Link
              href="/dashboard"
              style={{
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 21,
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: 1,
                }}
              >
                COLIG
              </div>

              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  color: '#c9921a',
                  letterSpacing: 2,
                  marginTop: 3,
                }}
              >
                LEADERSHIP FOUNDATION SCHOOL
              </div>
            </Link>
          </div>

          {/* STUDENT */}
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt=""
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#c9921a',
                  color: '#07110c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800,
                }}
              >
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {session.user.name || 'Student'}
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10,
                  letterSpacing: 1,
                  marginTop: 2,
                }}
              >
                STUDENT
              </div>
            </div>
          </div>

          {/* MAIN NAV */}
          <div
            style={{
              padding: '18px 0',
              flex: 1,
            }}
          >
            <div
              style={{
                padding: '0 20px 10px',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 2.5,
              }}
            >
              MY SCHOOL
            </div>

            {studentLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-link ${
                  isActive(item.href) ? 'active' : ''
                }`}
              >
                <span className="sidebar-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* SIGN OUT */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              padding: '14px 0',
            }}
          >
            <button
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
              className="sidebar-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'rgba(239,68,68,0.8)',
              }}
            >
              <span className="sidebar-icon">↪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="student-main">
          {/* This empty wrapper allows dashboard pages to sit beside sidebar */}
        </div>
      </>
    );
  }

  /*
   * =========================================================
   * PUBLIC NAVBAR
   * =========================================================
   */

  return (
    <>
      <style jsx>{`
        .public-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;

          /* MUCH MORE TRANSPARENT */
          background: rgba(7, 17, 12, 0.22);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .public-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 78px;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .public-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .public-link {
          /* WHITE DESKTOP NAVBAR TEXT */
          color: #ffffff;

          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: 0.2s ease;
        }

        .public-link:hover {
          color: #c9921a;
        }

        .public-login {
          /* WHITE LOGIN TEXT */
          color: #ffffff;

          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .public-signup {
          color: #ffffff;
          background: #c9921a;
          padding: 10px 18px;
          border-radius: 6px;
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        @media (max-width: 850px) {
          .public-links {
            display: none;
          }

          .public-nav-inner {
            height: 68px;
          }
        }
      `}</style>

      <header className="public-nav">
        <div className="public-nav-inner">

          <Link
            href="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                letterSpacing: 1,
              }}
            >
              COLIG
            </div>

            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                color: '#c9921a',
                letterSpacing: 2,
                marginTop: 2,
              }}
            >
              LEADERSHIP FOUNDATION SCHOOL
            </div>
          </Link>

          <nav className="public-links">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="public-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <Link
              href="/auth/login"
              className="public-login"
            >
              LOGIN
            </Link>

            <Link
              href="/auth/signup"
              className="public-signup"
            >
              JOIN SCHOOL
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
----
export default function Footer() {
  return (
    <footer className="ft">

      <div className="footer-main">

        <div>
          <div className="fl">
            COLIG FOUNDATION
          </div>

          <div className="fd">
            Leadership Foundation School — equipping believers with
            sound doctrine, spiritual discipline, and servant leadership
            for the 21st century.
          </div>
        </div>

        <div>
          <div className="fh">
            QUICK LINKS
          </div>

          <div className="flink">
            Student Login
          </div>

          <div className="flink">
            Enrol Now
          </div>

          <div className="flink">
            About COLIG
          </div>

          <div className="flink">
            Contact Us
          </div>
        </div>

        <div>
          <div className="fh">
            CONTACT
          </div>

          <div className="flink">
            📧 info@coligfoundation.org
          </div>

          <div className="flink">
            📞 +234 000 000 0000
          </div>

          <div className="flink">
            📍 Nigeria
          </div>
        </div>

      </div>

      <div className="fbot">
        <span>
          © 2025 COLIG Leadership Foundation School. All rights reserved.
        </span>

        <span>
          Rooted in the Word. Rising in Leadership.
        </span>
      </div>

      <style jsx>{`
        .ft {
          background: #04080a;
          padding: 36px 60px 20px;
          border-top: 1px solid rgba(201, 146, 26, 0.1);
        }

        .footer-main {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
          margin-bottom: 20px;
        }

        .fl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 4px;
          color: #c9921a;
          margin-bottom: 6px;
        }

        .fd {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.28);
          max-width: 280px;
          line-height: 1.7;
        }

        .fh {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.24);
          margin-bottom: 10px;
          font-weight: 700;
        }

        .flink {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.38);
          margin-bottom: 5px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .flink:hover {
          color: #c9921a;
        }

        .fbot {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          margin-top: 20px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.18);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 900px) {
          .ft {
            padding: 32px 22px 16px;
          }
        }
      `}</style>
    </footer>
  );
}
----
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const NAV_ITEMS = [
  { label: 'HOME',            href: '/dashboard' },
  { label: 'PROFILE',         href: '/dashboard/profile' },
  { label: 'CURRICULUM MAP',  href: '/dashboard/curriculum' },
  { label: 'SERMON PROJECT',  href: '/dashboard/sermon' },
  { label: 'PRAYER LOG',      href: '/dashboard/prayer' },
  { label: 'TESTIMONY DIARY', href: '/dashboard/testimony' },
  { label: 'GRADES',          href: '/dashboard/grades' },
  { label: 'ACCOMPLISHMENT',  href: '/dashboard/accomplishment' },
  { label: 'JOIN COMMUNITY',  href: '/dashboard/community' },
];

export default function DashboardLayout({ title, children }) {
  const router = useRouter();

  function isActive(href) {
    if (href === '/dashboard') return router.pathname === '/dashboard';
    return router.pathname.startsWith(href);
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} · COLIG Foundation` : 'COLIG Foundation'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="dl-shell">
        <aside className="dl-side">
          <div className="dl-brand">
            <div className="dl-brand-name">COLIG</div>
            <div className="dl-brand-sub">Leadership Foundation School</div>
          </div>

          <nav className="dl-nav">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} legacyBehavior>
                <a className={`dl-nav-item${isActive(item.href) ? ' dl-nav-item-active' : ''}`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          <button className="dl-signout" onClick={() => signOut({ callbackUrl: '/' })}>
            SIGN OUT
          </button>
        </aside>

        <main className="dl-main">
          {title && <h1 className="dl-title">{title}</h1>}
          <div className="dl-content">{children}</div>
        </main>
      </div>

      <style jsx global>{`
        :root {
          --navy: #0a1628;
          --gold: #c9921a;
          --gold-light: #e8b84b;
          --cream: #faf8f3;
          --txt: #1a1a2e;
          --mid: #4a5568;
          --gb: #4caf50;
          --pl: #9333ea;
        }
        body,
        button,
        input,
        textarea,
        select {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}</style>

      <style jsx>{`
        .dl-shell {
          display: flex;
          min-height: 100vh;
          background: var(--cream);
        }

        .dl-side {
          width: 240px;
          flex-shrink: 0;
          background: var(--navy);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .dl-brand {
          padding: 28px 24px 22px;
          border-bottom: 1px solid rgba(201, 146, 26, 0.16);
        }
        .dl-brand-name {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #fff;
        }
        .dl-brand-sub {
          font-size: 10px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 4px;
        }

        .dl-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 14px 0;
          overflow-y: auto;
        }

        .dl-nav-item {
          display: block;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.55);
          padding: 13px 24px;
          border-left: 3px solid transparent;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .dl-nav-item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
        }
        .dl-nav-item-active {
          background: rgba(201, 146, 26, 0.1);
          border-left-color: var(--gold);
          color: var(--gold);
        }

        .dl-signout {
          margin: 16px 20px 24px;
          padding: 11px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .dl-signout:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .dl-main {
          flex: 1;
          padding: 36px 44px;
          max-width: 1160px;
        }

        .dl-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 22px;
        }

        @media (max-width: 900px) {
          .dl-shell {
            flex-direction: column;
          }
          .dl-side {
            width: 100%;
            height: auto;
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
          }
          .dl-brand {
            width: 100%;
            border-bottom: none;
          }
          .dl-nav {
            flex-direction: row;
            flex-wrap: wrap;
            padding: 6px 12px 14px;
          }
          .dl-nav-item {
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 8px 10px;
          }
          .dl-nav-item-active {
            border-bottom-color: var(--gold);
          }
          .dl-signout {
            margin: 0 12px 14px auto;
          }
          .dl-main {
            padding: 24px 20px;
          }
        }
      `}</style>
    </>
  );
}
----
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const adminNav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/investments', label: 'Investments' },
];

export default function AdminLayout({ children, title }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // auto-close sidebar on mobile
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1b2e' }}>

      {/* ================= HAMBURGER ================= */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 300,
            background: '#071020',
            border: '1px solid rgba(201,146,26,0.2)',
            borderRadius: 10,
            width: 48,
            height: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 22, height: 2, background: '#fff' }} />
          <span style={{ width: 22, height: 2, background: '#fff' }} />
          <span style={{ width: 22, height: 2, background: '#fff' }} />
        </button>
      )}

      {/* ================= OVERLAY (mobile only) ================= */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 200,
          }}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          width: 240,
          background: '#071020',
          borderRight: '1px solid rgba(201,146,26,0.1)',
          minHeight: '100vh',
          position: 'fixed',
          left: isMobile ? (sidebarOpen ? 0 : -260) : 0,
          top: 0,
          zIndex: 250,
          transition: 'left 0.3s ease',
        }}
      >
        <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(201,146,26,0.1)' }}>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 800, letterSpacing: 4, color: 'var(--gold)' }}>
            CIVORA FARMS
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.3)' }}>
            ADMIN CONSOLE
          </div>
        </div>

        <nav style={{ padding: '16px 12px' }}>
          {adminNav.map((item) => {
            const active = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '11px 14px',
                  borderRadius: 8,
                  marginBottom: 4,
                  textDecoration: 'none',
                  background: active ? 'rgba(201,146,26,0.12)' : 'transparent'
                }}
              >
                <span style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 13,
                  fontWeight: 700,
                  color: active ? 'var(--gold)' : 'rgba(255,255,255,0.6)'
                }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16 }}>
          <Link href="/dashboard">
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              My Dashboard
            </span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              width: '100%',
              marginTop: 10,
              background: 'none',
              border: 'none',
              color: 'rgba(239,68,68,0.7)',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        style={{
          marginLeft: isMobile ? 0 : 240,
          flex: 1,
          padding: isMobile ? 16 : 32,
          width: '100%',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 32
        }}>
          <h1 style={{ fontSize: isMobile ? 22 : 28, color: '#fff' }}>
            {title}
          </h1>

          <div style={{ color: 'rgba(201,146,26,0.7)' }}>
            Logged in: {session?.user?.name}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}
---
export default function SermonCard({
  sermon,
  completed = false,
  onPlay,
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: 'rgba(201,146,26,0.1)',
          border: '1px solid rgba(201,146,26,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c9921a',
          flexShrink: 0,
        }}
      >
        {completed ? '✓' : '▶'}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Playfair Display'",
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {sermon.title}
        </div>

        <div
          style={{
            fontFamily: "'Barlow Condensed'",
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 4,
            letterSpacing: 1,
          }}
        >
          {sermon.speaker}
        </div>
      </div>

      <button
        onClick={() => onPlay?.(sermon)}
        style={{
          border: '1px solid rgba(201,146,26,0.35)',
          background: 'rgba(201,146,26,0.06)',
          color: '#c9921a',
          borderRadius: 6,
          padding: '8px 14px',
          cursor: 'pointer',
          fontFamily: "'Barlow Condensed'",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        PLAY
      </button>
    </div>
  );
}
----
import { useState } from 'react';

const SECTIONS = [
  { id: 'all', label: 'All Sermons' },
  { id: '1',   label: 'Section 1 — Faith & the Word',      color: '#c9921a' },
  { id: '2',   label: 'Section 2 — Prayer & Intercession',  color: '#9333ea' },
  { id: '3',   label: 'Section 3 — The New Birth',          color: '#4caf50' },
  { id: '4',   label: 'Section 4 — Walking in the Spirit',  color: '#2196f3' },
  { id: '5',   label: 'Section 5 — Kingdom Authority',      color: '#ef4444' },
  { id: '6',   label: 'Section 6 — Servant Leadership',     color: '#ff9800' },
];

export default function SermonLibrary({ sermons, currentId, completedIds, onPlay }) {
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all'
    ? sermons
    : sermons.filter(s => String(s.section) === filter);

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => setFilter(sec.id)}
            className="bs"
            style={{
              fontSize: 11, padding: '7px 13px',
              background: filter === sec.id ? 'var(--gold)' : 'transparent',
              color:      filter === sec.id ? 'var(--navy)' : 'var(--mid)',
              border:     filter === sec.id ? 'none' : '1.5px solid #e0e0e0',
            }}
          >
            {sec.id === 'all' ? 'ALL (61)' : `S${sec.id}`}
          </button>
        ))}
      </div>

      {/* Sermon rows */}
      {visible.map(sermon => {
        const locked    = sermon.id > 5 && !completedIds.includes(sermon.id - 1);
        const done      = completedIds.includes(sermon.id);
        const isPlaying = currentId === sermon.id;
        const sec       = SECTIONS.find(s => String(s.id) === String(sermon.section));

        return (
          <div
            key={sermon.id}
            className={`srow ${locked ? 'lk2' : ''} ${done ? 'done' : ''} ${isPlaying ? 'playing' : ''}`}
            onClick={() => !locked && onPlay(sermon)}
          >
            <div className="s-num">{sermon.id}</div>

            <div className="s-inf">
              <div className="s-title">{sermon.title}</div>
              <div className="s-meta">{sermon.speaker}</div>
              <div className="s-sec" style={{ color: sec?.color || 'var(--gold)' }}>
                {sec?.label || ''}
              </div>
            </div>

            <div className="s-acts">
              {locked ? (
                <span style={{ fontSize: 18, color: '#ccc' }}>🔒</span>
              ) : isPlaying ? (
                <div className="ppeq" style={{ display: 'flex' }}>
                  <span /><span /><span />
                </div>
              ) : done ? (
                <span style={{ fontSize: 16 }}>✅</span>
              ) : null}
              {!locked && (
                <button className="splay" onClick={e => { e.stopPropagation(); onPlay(sermon); }}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

----
import { useEffect, useRef, useState } from 'react';

export default function SermonPlayer({ sermon }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [sermon]);

  if (!sermon) {
    return (
      <div
        style={{
          padding: 50,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        Select a sermon from the library to begin listening.
      </div>
    );
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '00:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: 28,
      }}
    >
      <audio
        ref={audioRef}
        src={sermon.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />

      <div
        style={{
          fontFamily: "'Barlow Condensed'",
          color: '#c9921a',
          fontSize: 10,
          letterSpacing: 2.5,
          fontWeight: 700,
        }}
      >
        NOW PLAYING
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display'",
          color: '#fff',
          fontSize: 23,
          fontWeight: 700,
          marginTop: 7,
        }}
      >
        {sermon.title}
      </div>

      <div
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontFamily: "'Barlow Condensed'",
          fontSize: 11,
          marginTop: 5,
        }}
      >
        {sermon.speaker}
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        style={{
          width: '100%',
          marginTop: 28,
          accentColor: '#c9921a',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'rgba(255,255,255,0.35)',
          fontFamily: "'Barlow Condensed'",
          fontSize: 10,
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
          marginTop: 20,
        }}
      >
        <button
          onClick={() => {
            audioRef.current.currentTime = Math.max(
              0,
              currentTime - 10
            );
          }}
          style={controlButton}
        >
          ↶ 10
        </button>

        <button
          onClick={togglePlay}
          style={{
            ...controlButton,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#c9921a',
            color: '#07110c',
            fontSize: 18,
          }}
        >
          {playing ? '❚❚' : '▶'}
        </button>

        <button
          onClick={() => {
            audioRef.current.currentTime = Math.min(
              duration,
              currentTime + 10
            );
          }}
          style={controlButton}
        >
          10 ↷
        </button>
      </div>

      <a
        href={sermon.audioUrl}
        download
        style={{
          display: 'block',
          textAlign: 'center',
          marginTop: 24,
          color: '#c9921a',
          fontFamily: "'Barlow Condensed'",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          textDecoration: 'none',
        }}
      >
        ↓ DOWNLOAD AUDIO
      </a>
    </div>
  );
}

const controlButton = {
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  borderRadius: 6,
  padding: '9px 13px',
  cursor: 'pointer',
  fontFamily: "'Barlow Condensed'",
  fontSize: 10,
};
-------
import mongoose from 'mongoose';

const GradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      default: null,
    },

    type: {
      type: String,
      enum: [
        'knowledge-check',
        'assignment',
        'reflection',
        'final-exam',
      ],
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    passingScore: {
      type: Number,
      default: 70,
    },

    passed: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 1,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

GradeSchema.pre('save', function (next) {
  this.passed = this.score >= this.passingScore;
  next();
});

export default mongoose.models.Grade ||
  mongoose.model('Grade', GradeSchema);
  ----
  import mongoose from 'mongoose';
  
  const CertificateSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true,
      },
  
      certificateNumber: {
        type: String,
        required: true,
        unique: true,
      },
  
      studentName: {
        type: String,
        required: true,
      },
  
      programName: {
        type: String,
        default: 'Leadership Foundation School',
      },
  
      finalScore: {
        type: Number,
        default: 0,
      },
  
      issueDate: {
        type: Date,
        default: Date.now,
      },
  
      certificateUrl: {
        type: String,
        default: '',
      },
  
      pdfUrl: {
        type: String,
        default: '',
      },
  
      verificationCode: {
        type: String,
        unique: true,
      },
  
      status: {
        type: String,
        enum: ['issued', 'revoked'],
        default: 'issued',
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.models.Certificate ||
    mongoose.model('Certificate', CertificateSchema);
    ----------
    import mongoose from 'mongoose';
    
    const CertificateSchema = new mongoose.Schema(
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          unique: true,
          index: true,
        },
    
        certificateNumber: {
          type: String,
          required: true,
          unique: true,
        },
    
        studentName: {
          type: String,
          required: true,
        },
    
        programName: {
          type: String,
          default: 'Leadership Foundation School',
        },
    
        finalScore: {
          type: Number,
          default: 0,
        },
    
        issueDate: {
          type: Date,
          default: Date.now,
        },
    
        certificateUrl: {
          type: String,
          default: '',
        },
    
        pdfUrl: {
          type: String,
          default: '',
        },
    
        verificationCode: {
          type: String,
          unique: true,
        },
    
        status: {
          type: String,
          enum: ['issued', 'revoked'],
          default: 'issued',
        },
      },
      {
        timestamps: true,
      }
    );
    
    export default mongoose.models.Certificate ||
      mongoose.model('Certificate', CertificateSchema);
      ----------------
      import mongoose from 'mongoose';
      import bcrypt from 'bcryptjs';
      
      const UserSchema = new mongoose.Schema(
        {
          name: { type: String, required: true, trim: true },
          email: { type: String, required: true, unique: true, lowercase: true, trim: true },
          password: { type: String },
          image: { type: String, default: '' },
          phone: { type: String, default: '' },
          state: { type: String, default: '' },
          role: { type: String, enum: ['student', 'admin'], default: 'student' },
          provider: { type: String, default: 'credentials' },
          resetPasswordToken: { type: String },
          resetPasswordExpires: { type: Date },
          // Progress tracking
          currentModule: { type: String, default: 'cc' },
          completedModules: { type: [String], default: [] },
          completedLessons: { type: [String], default: [] },
          sermonsCompleted: { type: Number, default: 0 },
          overallProgress: { type: Number, default: 0 },
          certificateIssued: { type: Boolean, default: false },
        },
        { timestamps: true }
      );
      
      UserSchema.pre('save', async function (next) {
        if (!this.isModified('password') || !this.password) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
      });
      
      UserSchema.methods.comparePassword = async function (candidate) {
        return bcrypt.compare(candidate, this.password);
      };
      
      export default mongoose.models.User || mongoose.model('User', UserSchema);
      
      ---------------
import mongoose from 'mongoose';

const TestimonySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    testimony: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        'answered-prayer',
        'spiritual-growth',
        'healing',
        'provision',
        'breakthrough',
        'other',
      ],
      default: 'other',
    },

    dateOfTestimony: {
      type: Date,
      default: Date.now,
    },

    isPrivate: {
      type: Boolean,
      default: true,
    },

    sharedWithCommunity: {
      type: Boolean,
      default: false,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Testimony ||
  mongoose.model('Testimony', TestimonySchema);
  ------------------
  import mongoose from 'mongoose';
  import bcrypt from 'bcryptjs';
  
  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String },
      image: { type: String, default: '' },
      phone: { type: String, default: '' },
      state: { type: String, default: '' },
      role: { type: String, enum: ['student', 'admin'], default: 'student' },
      provider: { type: String, default: 'credentials' },
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
      // Progress tracking
      currentModule: { type: String, default: 'cc' },
      completedModules: { type: [String], default: [] },
      completedLessons: { type: [String], default: [] },
      sermonsCompleted: { type: Number, default: 0 },
      overallProgress: { type: Number, default: 0 },
      certificateIssued: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  UserSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
  };
  
  export default mongoose.models.User || mongoose.model('User', UserSchema);
  ---------------------
  import mongoose from 'mongoose';
  
  const CourseSchema = new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
  
      title: {
        type: String,
        required: true,
        trim: true,
      },
  
      subtitle: {
        type: String,
        default: '',
        trim: true,
      },
  
      description: {
        type: String,
        default: '',
      },
  
      order: {
        type: Number,
        required: true,
        unique: true,
      },
  
      type: {
        type: String,
        enum: ['orientation', 'course', 'final-assessment'],
        default: 'course',
      },
  
      thumbnail: {
        type: String,
        default: '',
      },
  
      isActive: {
        type: Boolean,
        default: true,
      },
  
      lessonsCount: {
        type: Number,
        default: 0,
      },
  
      passingScore: {
        type: Number,
        default: 70,
      },
  
      requiresPreviousCourse: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.models.Course ||
    mongoose.model('Course', CourseSchema);

    -------------------------
    import mongoose from 'mongoose';
    
    const NotificationSchema = new mongoose.Schema(
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: {
          type: String,
          enum: ['module_unlocked', 'grade_posted', 'certificate', 'reminder', 'system'],
          default: 'system',
        },
        read: { type: Boolean, default: false },
        link: { type: String, default: '' },
      },
      { timestamps: true }
    );
    
    export default mongoose.models.Notification ||
      mongoose.model('Notification', NotificationSchema);

      ---------------------
      import mongoose from 'mongoose';
      
      const PrayerSchema = new mongoose.Schema(
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
          title: { type: String, required: true },
          text: { type: String, required: true },
          answered: { type: Boolean, default: false },
          sharedWithCommunity: { type: Boolean, default: false },
        },
        { timestamps: true }
      );
      
      export default mongoose.models.Prayer || mongoose.model('Prayer', PrayerSchema);
      
      ----------------------
      import mongoose from 'mongoose';
      
      const SermonProgressSchema = new mongoose.Schema(
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
          },
      
          sermon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sermon',
            required: true,
            index: true,
          },
      
          completed: {
            type: Boolean,
            default: false,
          },
      
          progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
          },
      
          listenedSeconds: {
            type: Number,
            default: 0,
          },
      
          completedAt: {
            type: Date,
            default: null,
          },
      
          lastPlayedAt: {
            type: Date,
            default: null,
          },
        },
        {
          timestamps: true,
        }
      );
      
      SermonProgressSchema.index(
        { user: 1, sermon: 1 },
        { unique: true }
      );
      
      export default mongoose.models.SermonProgress ||
        mongoose.model('SermonProgress', SermonProgressSchema);
        -----------------------
        import mongoose from 'mongoose';
        
        const ProgressSchema = new mongoose.Schema(
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
            completedLessons: { type: [String], default: [] },
            completedModules: { type: [String], default: [] },
            sermonsCompleted: { type: Number, default: 0 },
            completedSermonIds: { type: [Number], default: [] },
            currentModule: { type: String, default: 'cc' },
            grades: {
              cc: { score: Number, submitted: Boolean },
              c2: { score: Number, submitted: Boolean },
              c3: { score: Number, submitted: Boolean },
              c4: { score: Number, submitted: Boolean },
              c5: { score: Number, submitted: Boolean },
              c6: { score: Number, submitted: Boolean },
            },
            certificateIssued: { type: Boolean, default: false },
            certificateIssuedAt: { type: Date },
          },
          { timestamps: true }
        );
        
        export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
        
        ------------------------
        import mongoose from 'mongoose';
        
        const SermonSchema = new mongoose.Schema(
          {
            title: {
              type: String,
              required: true,
              trim: true,
            },
        
            slug: {
              type: String,
              required: true,
              unique: true,
              trim: true,
            },
        
            speaker: {
              type: String,
              default: '',
              trim: true,
            },
        
            description: {
              type: String,
              default: '',
            },
        
            category: {
              type: String,
              enum: [
                'faith',
                'the-word',
                'prayer',
                'holy-spirit',
                'leadership',
                'ministry',
              ],
              required: true,
            },
        
            section: {
              type: Number,
              min: 1,
              max: 6,
              required: true,
            },
        
            order: {
              type: Number,
              required: true,
            },
        
            audioUrl: {
              type: String,
              required: true,
            },
        
            duration: {
              type: Number,
              default: 0,
            },
        
            thumbnail: {
              type: String,
              default: '',
            },
        
            scripture: {
              type: String,
              default: '',
            },
        
            isActive: {
              type: Boolean,
              default: true,
            },
        
            requiresPreviousSermon: {
              type: Boolean,
              default: true,
            },
          },
          {
            timestamps: true,
          }
        );
        
        SermonSchema.index({
          category: 1,
          order: 1,
        });
        
        export default mongoose.models.Sermon ||
          mongoose.model('Sermon', SermonSchema);
          ------------------------
import mongoose from 'mongoose';

const SermonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    speaker: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      enum: [
        'faith',
        'the-word',
        'prayer',
        'holy-spirit',
        'leadership',
        'ministry',
      ],
      required: true,
    },

    section: {
      type: Number,
      min: 1,
      max: 6,
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String,
      default: '',
    },

    scripture: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    requiresPreviousSermon: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

SermonSchema.index({
  category: 1,
  order: 1,
});

export default mongoose.models.Sermon ||
  mongoose.model('Sermon', SermonSchema);
  -------------------------
  import mongoose from 'mongoose';
  
  const SermonProgressSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
  
      sermon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sermon',
        required: true,
        index: true,
      },
  
      completed: {
        type: Boolean,
        default: false,
      },
  
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
  
      listenedSeconds: {
        type: Number,
        default: 0,
      },
  
      completedAt: {
        type: Date,
        default: null,
      },
  
      lastPlayedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );
  
  SermonProgressSchema.index(
    { user: 1, sermon: 1 },
    { unique: true }
  );
  
  export default mongoose.models.SermonProgress ||
    mongoose.model('SermonProgress', SermonProgressSchema);
    ------------------------
    import mongoose from 'mongoose';
    
    const SermonProgressSchema = new mongoose.Schema(
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          index: true,
        },
    
        sermon: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sermon',
          required: true,
          index: true,
        },
    
        completed: {
          type: Boolean,
          default: false,
        },
    
        progress: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
    
        listenedSeconds: {
          type: Number,
          default: 0,
        },
    
        completedAt: {
          type: Date,
          default: null,
        },
    
        lastPlayedAt: {
          type: Date,
          default: null,
        },
      },
      {
        timestamps: true,
      }
    );
    
    SermonProgressSchema.index(
      { user: 1, sermon: 1 },
      { unique: true }
    );
    
    export default mongoose.models.SermonProgress ||
      mongoose.model('SermonProgress', SermonProgressSchema);
      ---------------------------
      import mongoose from 'mongoose';
      import bcrypt from 'bcryptjs';
      
      const UserSchema = new mongoose.Schema(
        {
          name: { type: String, required: true, trim: true },
          email: { type: String, required: true, unique: true, lowercase: true, trim: true },
          password: { type: String },
          image: { type: String, default: '' },
          phone: { type: String, default: '' },
          state: { type: String, default: '' },
          role: { type: String, enum: ['student', 'admin'], default: 'student' },
          provider: { type: String, default: 'credentials' },
          resetPasswordToken: { type: String },
          resetPasswordExpires: { type: Date },
          // Progress tracking
          currentModule: { type: String, default: 'orientation' },
        completedModules: {
        type: [String],
        default: [],
      },
      
      completedLessons: {
        type: [String],
        default: [],
      },
          sermonsCompleted: { type: Number, default: 0 },
          overallProgress: { type: Number, default: 0 },
          certificateIssued: { type: Boolean, default: false },
        },
        { timestamps: true }
      );
      
      UserSchema.pre('save', async function (next) {
        if (!this.isModified('password') || !this.password) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
      });
      
      UserSchema.methods.comparePassword = async function (candidate) {
        return bcrypt.compare(candidate, this.password);
      };
      
      export default mongoose.models.User || mongoose.model('User', UserSchema);
      ---------------------

      -in Pages folder
      -api folder
      -admin folder
      -authfolder
      -dashbaord folder
      _app.js
      _document.jsabout.js
      contact.js
      index.js
      leadershipSchool.js
      sermons.js
      ====
      // import { getServerSession } from 'next-auth/next';
      // import { authOptions } from '../auth/[...nextauth]';
      // import dbConnect from '../../../lib/dbConnect';
      // import Progress from '../../../models/Progress';
      // import User from '../../../models/User';
      
      // const REQUIRED_MODULES = ['cc', 'c2', 'c3', 'c4', 'c5', 'c6'];
      // const REQUIRED_PRAYER_HOURS = 12;
      
      // function buildCertNumber(userId, issuedAt) {
      //   const y = new Date(issuedAt).getFullYear();
      //   const shortId = userId.toString().slice(-6).toUpperCase();
      //   return `COLIG-${y}-${shortId}`;
      // }
      
      // export default async function handler(req, res) {
      //   const session = await getServerSession(req, res, authOptions);
      //   if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
      //   await dbConnect();
      //   const userId = session.user.id;
      
      //   if (req.method === 'GET') {
      //     try {
      //       const [progress, user] = await Promise.all([
      //         Progress.findOne({ userId }).lean(),
      //         User.findById(userId).lean(),
      //       ]);
      
      //       const completedModules = progress?.completedModules || [];
      //       const modulesComplete = REQUIRED_MODULES.every((m) => completedModules.includes(m));
      //       const finalExamPassed = !!progress?.grades?.final?.submitted;
      //       const prayerHoursLogged = user?.prayerHoursLogged || 0;
      //       const prayerComplete = prayerHoursLogged >= REQUIRED_PRAYER_HOURS;
      
      //       const eligible = modulesComplete && finalExamPassed && prayerComplete;
      //       const issued = !!progress?.certificateIssued;
      
      //       return res.status(200).json({
      //         eligible,
      //         issued,
      //         requirements: {
      //           modulesComplete,
      //           finalExamPassed,
      //           prayerComplete,
      //           prayerHoursLogged,
      //           prayerHoursRequired: REQUIRED_PRAYER_HOURS,
      //         },
      //         certificate: issued
      //           ? {
      //               name: user?.name,
      //               certificateNumber: buildCertNumber(userId, progress.certificateIssuedAt),
      //               issuedAt: progress.certificateIssuedAt,
      //             }
      //           : null,
      //       });
      //     } catch (err) {
      //       console.error('GET /api/certificates error:', err);
      //       return res.status(500).json({ error: 'Failed to check certificate eligibility' });
      //     }
      //   }
      
      //   if (req.method === 'POST') {
      //     try {
      //       const [progress, user] = await Promise.all([
      //         Progress.findOne({ userId }),
      //         User.findById(userId),
      //       ]);
      
      //       if (!progress || !user) return res.status(404).json({ error: 'Profile not found' });
      
      //       const completedModules = progress.completedModules || [];
      //       const modulesComplete = REQUIRED_MODULES.every((m) => completedModules.includes(m));
      //       const finalExamPassed = !!progress.grades?.final?.submitted;
      //       const prayerComplete = (user.prayerHoursLogged || 0) >= REQUIRED_PRAYER_HOURS;
      
      //       if (!modulesComplete || !finalExamPassed || !prayerComplete) {
      //         return res.status(400).json({
      //           error: 'Requirements not yet met',
      //           requirements: { modulesComplete, finalExamPassed, prayerComplete },
      //         });
      //       }
      
      //       if (!progress.certificateIssued) {
      //         progress.certificateIssued = true;
      //         progress.certificateIssuedAt = new Date();
      //         await progress.save();
      
      //         user.certificateIssued = true;
      //         await user.save();
      //       }
      
      //       return res.status(200).json({
      //         issued: true,
      //         certificate: {
      //           name: user.name,
      //           certificateNumber: buildCertNumber(userId, progress.certificateIssuedAt),
      //           issuedAt: progress.certificateIssuedAt,
      //         },
      //       });
      //     } catch (err) {
      //       console.error('POST /api/certificates error:', err);
      //       return res.status(500).json({ error: 'Failed to issue certificate' });
      //     }
      //   }
      
      //   res.setHeader('Allow', ['GET', 'POST']);
      //   return res.status(405).json({ error: `Method ${req.method} not allowed` });
      // }
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import dbConnect from '../../../lib/dbConnect';
      import Notification from '../../../models/Notification';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
        await dbConnect();
        const userId = session.user.id;
      
        if (req.method === 'GET') {
          try {
            const notifications = await Notification.find({ userId })
              .sort({ createdAt: -1 })
              .limit(50)
              .lean();
            const unreadCount = notifications.filter((n) => !n.read).length;
            return res.status(200).json({ notifications, unreadCount });
          } catch (err) {
            console.error('GET /api/notification error:', err);
            return res.status(500).json({ error: 'Failed to load notifications' });
          }
        }
      
        if (req.method === 'POST') {
          try {
            const { title, message, type, link } = req.body || {};
            if (!title || !message) {
              return res.status(400).json({ error: 'title and message are required' });
            }
            const notification = await Notification.create({
              userId,
              title,
              message,
              type: type || 'system',
              link: link || '',
            });
            return res.status(201).json({ notification });
          } catch (err) {
            console.error('POST /api/notification error:', err);
            return res.status(500).json({ error: 'Failed to create notification' });
          }
        }
      
        if (req.method === 'PATCH') {
          try {
            const { id, markAllRead } = req.body || {};
      
            if (markAllRead) {
              await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
              return res.status(200).json({ success: true });
            }
      
            if (!id) return res.status(400).json({ error: 'id is required' });
      
            const notification = await Notification.findOneAndUpdate(
              { _id: id, userId },
              { $set: { read: true } },
              { new: true }
            );
            if (!notification) return res.status(404).json({ error: 'Notification not found' });
      
            return res.status(200).json({ notification });
          } catch (err) {
            console.error('PATCH /api/notification error:', err);
            return res.status(500).json({ error: 'Failed to update notification' });
          }
        }
      
        res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
      ------------
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import dbConnect from '../../../lib/dbConnect';
      import Course from '../../../models/Course';
      import Progress from '../../../models/Progress';
      import { COURSES, isUnlocked, computeStatus } from '../../../lib/curriculumData';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
        await dbConnect();
      
        if (req.method === 'GET') {
          try {
            // Course docs (title/description/thumbnail etc.) keyed by code, if present in DB.
            const dbCourses = await Course.find({ isActive: true }).sort({ order: 1 }).lean();
            const dbByCode = Object.fromEntries(dbCourses.map((c) => [c.code, c]));
      
            let progress = await Progress.findOne({ userId: session.user.id }).lean();
            const completedModules = progress?.completedModules || [];
            const currentModule = progress?.currentModule || 'cc';
      
            const curriculum = COURSES.map((c) => {
              const dbCourse = dbByCode[c.code];
              return {
                key: c.key,
                code: c.code,
                order: c.order,
                type: c.type,
                title: dbCourse?.title || c.title,
                subtitle: dbCourse?.subtitle || '',
                description: dbCourse?.description || '',
                lessonsCount: dbCourse?.lessonsCount || 0,
                passingScore: dbCourse?.passingScore ?? 70,
                unlocked: isUnlocked(c.key, completedModules),
                completed: completedModules.includes(c.key),
                status: computeStatus(c.key, completedModules, currentModule),
                isCurrent: c.key === currentModule,
              };
            });
      
            return res.status(200).json({ curriculum, currentModule, completedModules });
          } catch (err) {
            console.error('GET /api/curriculum error:', err);
            return res.status(500).json({ error: 'Failed to load curriculum' });
          }
        }
      
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
      ========
      grades==
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import dbConnect from '../../../lib/dbConnect';
      import Progress from '../../../models/Progress';
      import { COURSES, computeStatus } from '../../../lib/curriculumData';
      
      function letterGrade(score) {
        if (score == null) return '—';
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
      }
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
        await dbConnect();
      
        if (req.method === 'GET') {
          try {
            const progress = await Progress.findOne({ userId: session.user.id }).lean();
            const completedModules = progress?.completedModules || [];
            const currentModule = progress?.currentModule || 'cc';
            const grades = progress?.grades || {};
      
            const rows = COURSES.map((c) => {
              const g = grades[c.code] || {};
              const done = !!completedModules.includes(c.key);
              return {
                key: c.key,
                module: c.title,
                knowledgeCheck: g.score != null ? `${g.score}%` : '—',
                reflection: g.submitted ? 'Submitted' : '—',
                status: computeStatus(c.key, completedModules, currentModule),
                grade: done ? letterGrade(g.score) : '—',
                done,
              };
            });
      
            const scored = rows.filter((r) => r.done && r.knowledgeCheck !== '—');
            const avgScore = scored.length
              ? Math.round(
                  scored.reduce((sum, r) => sum + parseInt(r.knowledgeCheck, 10), 0) / scored.length
                )
              : 0;
      
            return res.status(200).json({
              rows,
              summary: {
                lessonsDone: completedModules.length,
                totalLessons: COURSES.length - 1, // excludes final exam
                avgScore,
                overallGrade: avgScore ? letterGrade(avgScore) : '—',
                finalExamLocked: !completedModules.includes('c6'),
              },
            });
          } catch (err) {
            console.error('GET /api/grades error:', err);
            return res.status(500).json({ error: 'Failed to load grades' });
          }
        }
      
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
      =====
      =>notifcations
      
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import connectDB from '../../../lib/mongodb';
      import Notification from '../../../models/Notification';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
        await connectDB();
      
        if (req.method === 'GET') {
          const notifications = await Notification.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(50);
          return res.status(200).json({ notifications });
        }
      
        if (req.method === 'PATCH') {
          // Mark all as read
          await Notification.updateMany({ userId: session.user.id, read: false }, { read: true });
          return res.status(200).json({ success: true });
        }
      
        return res.status(405).end();
      }
      
      ===
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import connectDB from '../../../lib/mongodb';
      import Prayer from '../../../models/Prayer';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated.' });
      
        await connectDB();
      
        if (req.method === 'GET') {
          const prayers = await Prayer.find({ userId: session.user.id }).sort({ createdAt: -1 });
          return res.status(200).json({ prayers });
        }
      
        if (req.method === 'POST') {
          const { title, text } = req.body;
          if (!title || !text) {
            return res.status(400).json({ error: 'Title and text are required.' });
          }
          const prayer = await Prayer.create({ userId: session.user.id, title, text });
          return res.status(201).json({ prayer });
        }
      
        if (req.method === 'PATCH') {
          const { prayerId, answered } = req.body;
          const prayer = await Prayer.findOneAndUpdate(
            { _id: prayerId, userId: session.user.id },
            { answered },
            { new: true }
          );
          return res.status(200).json({ prayer });
        }
      
        return res.status(405).end();
      }
      
      ====
      progress
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import connectDB from '../../../lib/mongodb';
      import Progress from '../../../models/Progress';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated.' });
      
        await connectDB();
      
        if (req.method === 'GET') {
          let progress = await Progress.findOne({ userId: session.user.id });
          if (!progress) {
            progress = await Progress.create({ userId: session.user.id });
          }
          return res.status(200).json({ progress });
        }
      
        if (req.method === 'PATCH') {
          const { lessonKey, sermonId, moduleId } = req.body;
      
          let progress = await Progress.findOne({ userId: session.user.id });
          if (!progress) {
            progress = await Progress.create({ userId: session.user.id });
          }
      
          if (lessonKey && !progress.completedLessons.includes(lessonKey)) {
            progress.completedLessons.push(lessonKey);
          }
      
          if (sermonId && !progress.completedSermonIds.includes(sermonId)) {
            progress.completedSermonIds.push(sermonId);
            progress.sermonsCompleted = progress.completedSermonIds.length;
          }
      
          if (moduleId && !progress.completedModules.includes(moduleId)) {
            progress.completedModules.push(moduleId);
          }
      
          await progress.save();
          return res.status(200).json({ progress });
        }
      
        return res.status(405).end();
      }
      ========
      testimonies
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import connectDB from '../../../lib/mongodb';
      import Testimony from '../../../models/Testimony';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated.' });
      
        await connectDB();
      
        if (req.method === 'GET') {
          const shared = req.query.shared === 'true';
          const query = shared ? { sharedWithCommunity: true } : { userId: session.user.id };
          const testimonies = await Testimony.find(query)
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
          return res.status(200).json({ testimonies });
        }
      
        if (req.method === 'POST') {
          const { title, text, sharedWithCommunity } = req.body;
          if (!title || !text) {
            return res.status(400).json({ error: 'Title and text are required.' });
          }
          const testimony = await Testimony.create({
            userId: session.user.id,
            authorName: session.user.name,
            title,
            text,
            sharedWithCommunity: !!sharedWithCommunity,
          });
          return res.status(201).json({ testimony });
        }
      
        return res.status(405).end();
      }
      
      =====
      
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import connectDB from '../../../lib/mongodb';
      import User from '../../../models/User';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
        await connectDB();
      
        if (req.method === 'GET') {
          const user = await User.findById(session.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
          return res.status(200).json({ user });
        }
      
        if (req.method === 'PATCH') {
          const { name, phone, state } = req.body;
          const user = await User.findByIdAndUpdate(
            session.user.id,
            { name, phone, state },
            { new: true }
          ).select('-password');
          return res.status(200).json({ user });
        }
      
        return res.status(405).end();
      }
      ==
      
      import { getServerSession } from 'next-auth/next';
      import { authOptions } from '../auth/[...nextauth]';
      import connectDB from '../../../lib/mongodb';
      import User from '../../../models/User';
      
      export default async function handler(req, res) {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ error: 'Not authenticated' });
      
        await connectDB();
      
        if (req.method === 'PATCH') {
          const { bankName, bankAccountNumber, bankAccountName, emailNotifications, whatsappNotifications } = req.body;
          const user = await User.findByIdAndUpdate(
            session.user.id,
            { bankName, bankAccountNumber, bankAccountName, emailNotifications, whatsappNotifications },
            { new: true }
          ).select('-password');
          return res.status(200).json({ user });
        }
      
        return res.status(405).end();
      }
      
      
      ====
      in dashboard folder
      curricullum folder
      in curriculm folder
      - [course].js folder
      =>[course].js files
      =>index.js

      in [course].js folder
      =>lesson.js file
      import { useEffect, useState } from 'react';
      import { useRouter } from 'next/router';
      import Link from 'next/link';
      import DashboardPage from '../../../components/dashboard/DashboardPage';
      import CurriculumSidebar from '../../../components/curriculum/CurriculumSidebar';
      
      export default function CoursePage() {
        const router = useRouter();
        const { course } = router.query;
      
        const [courses, setCourses] = useState([]);
        const [currentCourse, setCurrentCourse] =
          useState(null);
        const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          if (!course) return;
      
          let mounted = true;
      
          Promise.all([
            fetch('/api/curriculum/courses').then((r) =>
              r.json()
            ),
            fetch(`/api/curriculum/courses/${course}`).then(
              (r) => r.json()
            ),
          ])
            .then(([courseData, currentData]) => {
              if (!mounted) return;
      
              setCourses(courseData.courses || []);
              setCurrentCourse(currentData.course || null);
              setLoading(false);
            })
            .catch(() => {
              if (mounted) {
                setLoading(false);
              }
            });
      
          return () => {
            mounted = false;
          };
        }, [course]);
      
        if (loading) {
          return (
            <DashboardPage
              eyebrow="Curriculum"
              title="Loading Course..."
            >
              <div className="loading">
                Loading course...
              </div>
            </DashboardPage>
          );
        }
      
        if (!currentCourse) {
          return (
            <DashboardPage
              eyebrow="Curriculum"
              title="Course Not Found"
            >
              <Link href="/dashboard/curriculum">
                <button className="back">
                  ← BACK TO CURRICULUM
                </button>
              </Link>
      
              <style jsx>{`
                .back {
                  padding: 12px 16px;
                  border: 0;
                  border-radius: 7px;
                  background: #0a1628;
                  color: #fff;
                  cursor: pointer;
                  font-family: 'Montserrat', sans-serif;
                  font-size: 9px;
                  font-weight: 700;
                }
              `}</style>
            </DashboardPage>
          );
        }
      
        return (
          <DashboardPage
            eyebrow={currentCourse.code}
            title={currentCourse.title}
            description={
              currentCourse.description ||
              currentCourse.subtitle ||
              ''
            }
          >
            <div className="layout">
      
              <CurriculumSidebar courses={courses} />
      
              <main className="content">
      
                <div className="course-header">
                  <span>
                    {currentCourse.code}
                  </span>
      
                  <h2>
                    {currentCourse.title}
                  </h2>
      
                  <p>
                    {currentCourse.description ||
                      currentCourse.subtitle}
                  </p>
      
                  <div className="progress">
                    <div>
                      COURSE PROGRESS
                    </div>
      
                    <strong>
                      {currentCourse.progress || 0}%
                    </strong>
                  </div>
      
                  <div className="bar">
                    <div
                      style={{
                        width: `${currentCourse.progress || 0}%`,
                      }}
                    />
                  </div>
                </div>
      
                <div className="lessons-title">
                  COURSE CONTENT
                </div>
      
                <div className="lessons">
      
                  {(currentCourse.lessons || []).map(
                    (lesson, index) => {
                      const locked =
                        lesson.locked === true ||
                        lesson.status === 'locked';
      
                      const completed =
                        lesson.completed === true ||
                        lesson.status === 'completed';
      
                      return (
                        <Link
                          key={
                            lesson._id ||
                            lesson.slug ||
                            index
                          }
                          href={
                            locked
                              ? '#'
                              : `/dashboard/curriculum/${course}/${lesson.slug}`
                          }
                          className={`lesson ${
                            locked ? 'locked' : ''
                          }`}
                          onClick={(event) => {
                            if (locked) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <div className="lesson-number">
                            {String(index + 1).padStart(2, '0')}
                          </div>
      
                          <div className="lesson-info">
                            <div className="lesson-type">
                              {formatType(lesson.type)}
                            </div>
      
                            <h3>
                              {lesson.title}
                            </h3>
      
                            {lesson.description && (
                              <p>
                                {lesson.description}
                              </p>
                            )}
                          </div>
      
                          <div className="lesson-status">
                            {completed
                              ? '✓ COMPLETE'
                              : locked
                              ? '🔒 LOCKED'
                              : 'START →'}
                          </div>
                        </Link>
                      );
                    }
                  )}
      
                </div>
      
              </main>
      
            </div>
      
            <style jsx>{`
              .layout {
                display: grid;
                grid-template-columns: 240px 1fr;
                gap: 25px;
                font-family: 'Montserrat', sans-serif;
              }
      
              .course-header {
                padding: 25px;
                background: #0a1628;
                border-radius: 15px;
                color: #fff;
              }
      
              .course-header > span {
                color: #c9921a;
                font-size: 8px;
                font-weight: 700;
                letter-spacing: 2px;
              }
      
              .course-header h2 {
                margin: 7px 0;
                font-size: 23px;
              }
      
              .course-header p {
                max-width: 650px;
                margin: 0;
                color: #b9c0ca;
                font-size: 10px;
                line-height: 1.7;
              }
      
              .progress {
                display: flex;
                justify-content: space-between;
                margin-top: 22px;
                color: #aaa;
                font-size: 8px;
                font-weight: 700;
                letter-spacing: 1px;
              }
      
              .progress strong {
                color: #c9921a;
              }
      
              .bar {
                height: 5px;
                margin-top: 7px;
                overflow: hidden;
                border-radius: 20px;
                background: rgba(255,255,255,.15);
              }
      
              .bar div {
                height: 100%;
                background: #c9921a;
                border-radius: 20px;
              }
      
              .lessons-title {
                margin: 25px 0 12px;
                color: #c9921a;
                font-size: 8px;
                font-weight: 800;
                letter-spacing: 2px;
              }
      
              .lessons {
                display: grid;
                gap: 9px;
              }
      
              .lesson {
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 17px;
                background: #fff;
                border: 1px solid #e5e5e5;
                border-radius: 11px;
                text-decoration: none;
              }
      
              .lesson:hover {
                box-shadow: 0 8px 25px rgba(0,0,0,.04);
              }
      
              .lesson.locked {
                opacity: .55;
              }
      
              .lesson-number {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                flex-shrink: 0;
                border-radius: 9px;
                background: #f7f2e4;
                color: #c9921a;
                font-size: 10px;
                font-weight: 800;
              }
      
              .lesson-info {
                flex: 1;
              }
      
              .lesson-type {
                color: #c9921a;
                font-size: 7px;
                font-weight: 700;
                letter-spacing: 1px;
              }
      
              .lesson h3 {
                margin: 4px 0;
                color: #0a1628;
                font-size: 12px;
              }
      
              .lesson p {
                margin: 0;
                color: #888;
                font-size: 9px;
              }
      
              .lesson-status {
                color: #999;
                font-size: 8px;
                font-weight: 700;
                white-space: nowrap;
              }
      
              .loading {
                padding: 35px;
                background: #fff;
                border: 1px solid #eee;
                border-radius: 12px;
                color: #777;
                font-size: 10px;
              }
      
              @media (max-width: 850px) {
                .layout {
                  grid-template-columns: 1fr;
                }
              }
      
              @media (max-width: 600px) {
                .lesson-status {
                  display: none;
                }
              }
            `}</style>
          </DashboardPage>
        );
      }
      
      function formatType(type) {
        if (!type) return 'LESSON';
      
        return type
          .replace(/-/g, ' ')
          .toUpperCase();
      }
      -------
      import { useSession } from 'next-auth/react';
      import { useEffect, useState } from 'react';
      import Link from 'next/link';
      import DashboardLayout from '../../components/layout/DashboardLayout';
      
      const MODULES = [
        { l: 'CC Orientation', p: 12, lk: false },
        { l: 'C2 New Birth', p: 0, lk: true },
        { l: 'C3 Spiritual Milk', p: 0, lk: true },
        { l: 'C4 Growing in Love', p: 0, lk: true },
        { l: 'C5 Stewardship', p: 0, lk: true },
        { l: 'C6 COLIG Cultures', p: 0, lk: true },
      ];
      
      export default function DashboardHome() {
        const { data: session } = useSession();
        const [user, setUser] = useState(null);
      
        useEffect(() => {
          let mounted = true;
      
          fetch('/api/user/progress')
            .then((response) => response.json())
            .then((data) => {
              if (mounted) {
                setUser(data.user || null);
              }
            })
            .catch(() => {
              if (mounted) {
                setUser(null);
              }
            });
      
          return () => {
            mounted = false;
          };
        }, []);
      
        const firstName =
          session?.user?.name?.split(' ')[0] || 'Student';
      
        const sermonsDone =
          user?.completedSermons?.length ||
          user?.completedLessons?.length ||
          0;
      
        const lessonsDone =
          user?.completedLessons?.length || 0;
      
        const prayerHours =
          user?.prayerHoursLogged || 0;
      
        const overallProgress =
          user?.overallProgress ?? 12;
      
        return (
          <DashboardLayout title="Dashboard">
            <div className="dashboard-home">
      
              {/* Welcome Banner */}
              <section className="wb">
                <div className="wb-g" />
      
                <div className="wb-content">
                  <div className="wb-eyebrow">
                    WELCOME BACK
                  </div>
      
                  <h1 className="wb-title">
                    Good to see you, {firstName} 👋
                  </h1>
      
                  <p className="wb-subtitle">
                    You're on your discipleship journey. Keep pressing
                    forward — every lesson brings you closer to your
                    certificate.
                  </p>
      
                  <Link href="/dashboard/curriculum">
                    <button className="bs bs-g">
                      CONTINUE LEARNING →
                    </button>
                  </Link>
                </div>
      
                <div className="wb-b">
                  <div className="wb-bv">
                    {overallProgress}%
                  </div>
      
                  <div className="wb-bl">
                    COMPLETED
                  </div>
                </div>
              </section>
      
              {/* Statistics */}
              <section className="g4">
      
                <div className="sc">
                  <div className="sc-i">📖</div>
      
                  <div className="sc-l">
                    CURRENT MODULE
                  </div>
      
                  <div className="sc-v module-name">
                    CC Orientation
                  </div>
      
                  <div className="sc-s">
                    Overview in progress
                  </div>
                </div>
      
                <div className="sc">
                  <div className="sc-i">🎙️</div>
      
                  <div className="sc-l">
                    SERMONS HEARD
                  </div>
      
                  <div className="sc-v gold">
                    {sermonsDone}
                    <span>/61</span>
                  </div>
      
                  <div className="sc-s">
                    Complete all to unlock exam
                  </div>
                </div>
      
                <div className="sc">
                  <div className="sc-i">🙏</div>
      
                  <div className="sc-l">
                    PRAYER HOURS
                  </div>
      
                  <div className="sc-v purple">
                    {prayerHours}
                  </div>
      
                  <div className="sc-s">
                    of 12 required hours
                  </div>
                </div>
      
                <div className="sc">
                  <div className="sc-i">📊</div>
      
                  <div className="sc-l">
                    CURRENT GRADE
                  </div>
      
                  <div className="sc-v green">
                    A
                  </div>
      
                  <div className="sc-s">
                    Knowledge check: 95%
                  </div>
                </div>
      
              </section>
      
              {/* Progress + Quick Actions */}
              <section className="g32">
      
                {/* Module Progress */}
                <div className="wc">
                  <div className="wch">
                    <div className="wct">
                      Module Progress
                    </div>
      
                    <span className="tag">
                      CC ORIENTATION
                    </span>
                  </div>
      
                  <div className="wcb">
      
                    {MODULES.map((module, index) => (
                      <div
                        key={index}
                        className="module-row"
                      >
                        <div className="module-top">
                          <span
                            className={
                              module.lk
                                ? 'module-label locked'
                                : 'module-label'
                            }
                          >
                            {module.l}
      
                            {module.lk && (
                              <span className="lock">
                                🔒
                              </span>
                            )}
                          </span>
      
                          <span
                            className={
                              module.p > 0
                                ? 'module-percent active'
                                : 'module-percent'
                            }
                          >
                            {module.p}%
                          </span>
                        </div>
      
                        <div className="pw">
                          <div
                            className="pf"
                            style={{
                              width: `${module.p}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
      
                  </div>
                </div>
      
                {/* Quick Actions */}
                <div className="wc">
      
                  <div className="wch">
                    <div className="wct">
                      Quick Actions
                    </div>
                  </div>
      
                  <div className="quick-actions">
      
                    <QuickAction
                      icon="📖"
                      label="Continue Lesson"
                      sub="CC Overview"
                      href="/dashboard/curriculum"
                    />
      
                    <QuickAction
                      icon="🎙️"
                      label="Sermon Project"
                      sub={`${sermonsDone}/61 complete`}
                      href="/dashboard/sermon-project"
                    />
      
                    <QuickAction
                      icon="🙏"
                      label="Log a Prayer"
                      sub="Add new request"
                      href="/dashboard/prayer-log"
                    />
      
                    <QuickAction
                      icon="✍️"
                      label="Write Testimony"
                      sub="Journal entry"
                      href="/dashboard/testimony-diary"
                    />
      
                  </div>
      
                </div>
      
              </section>
      
              {/* Additional Progress */}
              <section className="bottom-card">
      
                <div>
                  <div className="bottom-eyebrow">
                    YOUR FOUNDATION
                  </div>
      
                  <h2>
                    Keep building your foundation.
                  </h2>
      
                  <p>
                    You have completed {lessonsDone} lessons so far.
                    Continue through the curriculum and complete each
                    requirement to progress toward your certificate.
                  </p>
                </div>
      
                <Link href="/dashboard/curriculum">
                  <button className="outline-button">
                    VIEW CURRICULUM
                  </button>
                </Link>
      
              </section>
      
            </div>
      
            <style jsx>{`
              .dashboard-home {
                width: 100%;
                font-family: 'Montserrat', sans-serif;
                color: #111827;
              }
      
              .wb {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 30px;
                padding: 28px 30px;
                margin-bottom: 20px;
                overflow: hidden;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
              }
      
              .wb-g {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 5px;
                background: #c9921a;
              }
      
              .wb-content {
                position: relative;
                z-index: 1;
                max-width: 760px;
              }
      
              .wb-eyebrow {
                margin-bottom: 8px;
                color: #c9921a;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 3px;
              }
      
              .wb-title {
                margin: 0;
                color: #0a1628;
                font-size: 25px;
                line-height: 1.3;
                font-weight: 700;
              }
      
              .wb-subtitle {
                max-width: 650px;
                margin: 9px 0 0;
                color: #707070;
                font-size: 13px;
                line-height: 1.7;
                font-weight: 400;
              }
      
              .wb-b {
                min-width: 100px;
                text-align: center;
              }
      
              .wb-bv {
                color: #0a1628;
                font-size: 30px;
                line-height: 1;
                font-weight: 800;
              }
      
              .wb-bl {
                margin-top: 6px;
                color: #999;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 2px;
              }
      
              .bs {
                border: 0;
                border-radius: 7px;
                padding: 12px 17px;
                margin-top: 14px;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.8px;
              }
      
              .bs-g {
                background: #0a1628;
                color: #ffffff;
              }
      
              .g4 {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 14px;
                margin-bottom: 20px;
              }
      
              .sc {
                min-height: 145px;
                padding: 18px;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 14px;
                box-shadow: 0 6px 22px rgba(0, 0, 0, 0.03);
              }
      
              .sc-i {
                margin-bottom: 12px;
                font-size: 20px;
              }
      
              .sc-l {
                color: #8a8a8a;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 1.7px;
              }
      
              .sc-v {
                margin-top: 7px;
                color: #0a1628;
                font-size: 25px;
                font-weight: 800;
              }
      
              .module-name {
                font-size: 15px;
                letter-spacing: 0.5px;
              }
      
              .sc-v span {
                color: #aaa;
                font-size: 14px;
                font-weight: 500;
              }
      
              .gold {
                color: #c9921a;
              }
      
              .purple {
                color: #7652a5;
              }
      
              .green {
                color: #39884a;
              }
      
              .sc-s {
                margin-top: 5px;
                color: #999;
                font-size: 10px;
              }
      
              .g32 {
                display: grid;
                grid-template-columns: 1.3fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
              }
      
              .wc {
                overflow: hidden;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 14px;
                box-shadow: 0 6px 22px rgba(0, 0, 0, 0.03);
              }
      
              .wch {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                padding: 16px 18px;
                border-bottom: 1px solid #eeeeee;
              }
      
              .wct {
                color: #0a1628;
                font-size: 13px;
                font-weight: 700;
              }
      
              .tag {
                padding: 5px 8px;
                border-radius: 5px;
                background: #f5f0df;
                color: #9a7318;
                font-size: 8px;
                font-weight: 700;
                letter-spacing: 1px;
              }
      
              .wcb {
                padding: 18px;
              }
      
              .module-row {
                margin-bottom: 16px;
              }
      
              .module-row:last-child {
                margin-bottom: 0;
              }
      
              .module-top {
                display: flex;
                justify-content: space-between;
                gap: 15px;
                margin-bottom: 7px;
              }
      
              .module-label {
                color: #0a1628;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.5px;
              }
      
              .module-label.locked {
                color: #c8c8c8;
              }
      
              .lock {
                margin-left: 4px;
                font-size: 9px;
              }
      
              .module-percent {
                color: #c9c9c9;
                font-size: 10px;
                font-weight: 700;
              }
      
              .module-percent.active {
                color: #39884a;
              }
      
              .pw {
                height: 5px;
                overflow: hidden;
                border-radius: 20px;
                background: #eeeeee;
              }
      
              .pf {
                height: 100%;
                border-radius: 20px;
                background: #c9921a;
              }
      
              .quick-actions {
                padding: 8px 10px;
              }
      
              .quick-action {
                display: flex;
                align-items: center;
                gap: 11px;
                padding: 11px 9px;
                text-decoration: none;
                border-bottom: 1px solid #f1f1f1;
                transition: background 0.15s ease;
              }
      
              .quick-action:last-child {
                border-bottom: none;
              }
      
              .quick-action:hover {
                background: #faf9f4;
              }
      
              .qa-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                flex-shrink: 0;
                border: 1px solid #e8e8e8;
                border-radius: 8px;
                background: #faf8ef;
                font-size: 16px;
              }
      
              .qa-label {
                color: #0a1628;
                font-size: 11px;
                font-weight: 700;
              }
      
              .qa-sub {
                margin-top: 3px;
                color: #999;
                font-size: 9px;
              }
      
              .qa-arrow {
                margin-left: auto;
                color: #c8c8c8;
                font-size: 18px;
              }
      
              .bottom-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 25px;
                padding: 25px;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 14px;
              }
      
              .bottom-eyebrow {
                margin-bottom: 7px;
                color: #c9921a;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 2px;
              }
      
              .bottom-card h2 {
                margin: 0;
                color: #0a1628;
                font-size: 18px;
              }
      
              .bottom-card p {
                max-width: 650px;
                margin: 7px 0 0;
                color: #777;
                font-size: 11px;
                line-height: 1.7;
              }
      
              .outline-button {
                flex-shrink: 0;
                padding: 11px 15px;
                border: 1px solid #0a1628;
                border-radius: 7px;
                background: transparent;
                color: #0a1628;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 1px;
              }
      
              @media (max-width: 1000px) {
                .g4 {
                  grid-template-columns: repeat(2, 1fr);
                }
      
                .g32 {
                  grid-template-columns: 1fr;
                }
              }
      
              @media (max-width: 650px) {
                .wb {
                  flex-direction: column;
                  align-items: flex-start;
                  padding: 23px 20px;
                }
      
                .wb-b {
                  text-align: left;
                }
      
                .g4 {
                  grid-template-columns: 1fr;
                }
      
                .bottom-card {
                  flex-direction: column;
                  align-items: flex-start;
                }
      
                .wb-title {
                  font-size: 21px;
                }
              }
            `}</style>
          </DashboardLayout>
        );
      }
      
      function QuickAction({ icon, label, sub, href }) {
        return (
          <Link
            href={href}
            className="quick-action"
          >
            <div className="qa-icon">
              {icon}
            </div>
      
            <div>
              <div className="qa-label">
                {label}
              </div>
      
              <div className="qa-sub">
                {sub}
              </div>
            </div>
      
            <span className="qa-arrow">
              ›
            </span>
          </Link>
        );
      }
      ------
      import { useState, useEffect } from 'react';
      import { useSession } from 'next-auth/react';
      import toast from 'react-hot-toast';
      import DashboardLayout from '../../../components/layout/DashboardLayout';
      import CurriculumSidebar from '../../../components/curriculum/CurriculumSidebar';
      import LessonView from '../../../components/curriculum/LessonView';
      
      export default function CurriculumPage() {
        const { data: session } = useSession();
        const [activeLesson,     setActiveLesson]     = useState('cc-overview');
        const [completedLessons, setCompletedLessons] = useState([]);
      
        useEffect(() => {
          fetch('/api/user/progress').then(r => r.json()).then(d => {
            setCompletedLessons(d.user?.completedLessons || []);
          });
        }, []);
      
        async function handleComplete(lessonKey, nextKey) {
          const updated = completedLessons.includes(lessonKey)
            ? completedLessons
            : [...completedLessons, lessonKey];
          setCompletedLessons(updated);
      
          await fetch('/api/user/progress', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completedLessons: updated }),
          });
      
          if (nextKey) setActiveLesson(nextKey);
          toast.success('✅ Lesson saved!');
        }
      
        return (
          <DashboardLayout title="Curriculum Map">
            <div className="cl">
              <CurriculumSidebar
                activeLesson={activeLesson}
                completedLessons={completedLessons}
                onSelect={setActiveLesson}
              />
              <div className="con">
                <LessonView
                  lessonKey={activeLesson}
                  onComplete={handleComplete}
                />
              </div>
            </div>
          </DashboardLayout>
        );
      }
      
      ---------
      in sermon folder
      =>index.js
      =>library.js
      =>player.js
      import DashboardPage from '../../../components/dashboard/DashboardPage';
      import Link from 'Next/Link'
      
      const categories = [
        'Faith',
        'The Word',
        'Prayer',
        'Holy Spirit',
        'Leadership',
        'Ministry',
      ];
      
      export default function SermonProjectPage() {
        return (
          <DashboardPage
            eyebrow="Sermon Project"
            title="Sermon Project"
            description="FAITH COMES BY HEARING AND HEARING BY THE WORD."
          >
            <div className="hero-card">
              <div>
                <span>YOUR PROGRESS</span>
                <strong>0 / 61 COMPLETED</strong>
              </div>
      
              <div className="lock">
                🔒
                <small>61 MORE TO UNLOCK FINAL EXAM</small>
              </div>
            </div>
      
            <div className="categories">
              {categories.map((category, index) => (
                <div className="category" key={category}>
                  <div className="icon">{index + 1}</div>
                  <h2>{category}</h2>
                  <p>View sermons in this section.</p>
                  <Link href="/dashboard/sermon/library.js">
        OPEN LIBRARY
      </Link>
                </div>
              ))}
            </div>
      
            <style jsx>{`
              .hero-card {
                padding: 35px;
                background: #111;
                color: #fff;
                border-radius: 22px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 30px;
              }
      
              .hero-card span {
                display: block;
                font-size: 11px;
                color: #aaa;
                letter-spacing: 2px;
              }
      
              .hero-card strong {
                display: block;
                margin-top: 10px;
                font-size: 28px;
              }
      
              .lock {
                text-align: center;
                font-size: 30px;
              }
      
              .lock small {
                display: block;
                font-size: 10px;
                color: #aaa;
                margin-top: 5px;
              }
      
              .categories {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin-top: 20px;
              }
      
              .category {
                padding: 25px;
                background: rgba(255, 255, 255, 0.7);
                border: 1px solid #ddd;
                border-radius: 18px;
              }
      
              .icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #111;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              }
      
              h2 {
                color: #111;
                margin: 20px 0 8px;
              }
      
              p {
                color: #666;
              }
      
              button {
                border: 0;
                background: #111;
                color: #fff;
                padding: 12px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 10px;
                font-weight: 700;
              }
      
              @media (max-width: 850px) {
                .categories {
                  grid-template-columns: 1fr;
                }
      
                .hero-card {
                  flex-direction: column;
                  align-items: flex-start;
                }
              }
            `}</style>
          </DashboardPage>
        );
      }
      ====
      import { useEffect, useState } from 'react';
      import Link from 'next/link';
      import { useSession } from 'next-auth/react';
      
      const SECTIONS = [
        { number: 1, name: 'Faith' },
        { number: 2, name: 'The Word' },
        { number: 3, name: 'Prayer' },
        { number: 4, name: 'The Holy Spirit' },
        { number: 5, name: 'Leadership' },
        { number: 6, name: 'Ministry' },
      ];
      
      export default function SermonLibrary() {
        const { status } = useSession();
      
        const [sermons, setSermons] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        const [playingId, setPlayingId] = useState(null);
      
        useEffect(() => {
          if (status !== 'authenticated') return;
      
          const fetchSermons = async () => {
            try {
              setLoading(true);
              setError('');
      
              const response = await fetch('/api/sermons');
      
              if (!response.ok) {
                throw new Error('Unable to load sermons.');
              }
      
              const data = await response.json();
      
              const sermonList = Array.isArray(data)
                ? data
                : Array.isArray(data.sermons)
                ? data.sermons
                : [];
      
              setSermons(sermonList);
            } catch (err) {
              console.error('Sermon library error:', err);
              setError('Unable to load the sermon library right now.');
            } finally {
              setLoading(false);
            }
          };
      
          fetchSermons();
        }, [status]);
      
        if (status === 'loading') {
          return (
            <main className="library-page">
              <div className="library-loading">
                <span className="loader"></span>
                <p>Loading library...</p>
              </div>
      
              <style jsx>{`
                .library-page {
                  min-height: 100vh;
                  background: #ffffff;
                  color: #0a1628;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: Arial, sans-serif;
                }
      
                .library-loading {
                  text-align: center;
                }
      
                .loader {
                  width: 32px;
                  height: 32px;
                  border: 3px solid #e5e7eb;
                  border-top-color: #c9921a;
                  border-radius: 50%;
                  display: block;
                  margin: 0 auto 15px;
                  animation: spin 0.8s linear infinite;
                }
      
                @keyframes spin {
                  to {
                    transform: rotate(360deg);
                  }
                }
      
                p {
                  margin: 0;
                  font-size: 14px;
                }
              `}</style>
            </main>
          );
        }
      
        if (status === 'unauthenticated') {
          return (
            <main className="library-page">
              <div className="message-box">
                <h1>Sign in required</h1>
                <p>Please sign in to access the sermon library.</p>
      
                <Link href="/auth/login" className="gold-button">
                  SIGN IN
                </Link>
              </div>
      
              <style jsx>{`
                .library-page {
                  min-height: 100vh;
                  background: #ffffff;
                  color: #0a1628;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 30px;
                  font-family: Arial, sans-serif;
                }
      
                .message-box {
                  width: 100%;
                  max-width: 500px;
                  text-align: center;
                  padding: 50px 30px;
                  border: 1px solid #e5e7eb;
                  border-radius: 16px;
                }
      
                h1 {
                  margin: 0 0 10px;
                  font-size: 28px;
                }
      
                p {
                  color: #64748b;
                  margin: 0 0 25px;
                }
      
                .gold-button {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  background: #c9921a;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 6px;
                  font-size: 13px;
                  font-weight: 700;
                }
              `}</style>
            </main>
          );
        }
      
        return (
          <main className="library-page">
            <div className="library-container">
      
              <div className="top-navigation">
                <Link href="/dashboard/sermon" className="back-link">
                  ← BACK TO SERMON PROJECT
                </Link>
              </div>
      
              <header className="library-header">
                <p className="eyebrow">SERMON PROJECT</p>
      
                <h1>SERMON LIBRARY</h1>
      
                <p className="subtitle">
                  Listen to the assigned messages and grow through the Word.
                </p>
      
                <div className="library-stats">
                  <div className="stat">
                    <strong>{sermons.length}</strong>
                    <span>SERMONS</span>
                  </div>
      
                  <div className="stat">
                    <strong>6</strong>
                    <span>SECTIONS</span>
                  </div>
      
                  <div className="stat">
                    <strong>61</strong>
                    <span>TOTAL MESSAGES</span>
                  </div>
                </div>
              </header>
      
              {loading && (
                <div className="loading-box">
                  <span className="loader"></span>
                  <p>Loading sermons...</p>
                </div>
              )}
      
              {error && (
                <div className="error-box">
                  <strong>Unable to load library</strong>
                  <p>{error}</p>
      
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                  >
                    TRY AGAIN
                  </button>
                </div>
              )}
      
              {!loading && !error && sermons.length === 0 && (
                <div className="empty-box">
                  <div className="empty-icon">♪</div>
      
                  <h2>No sermons available yet</h2>
      
                  <p>
                    Sermons will appear here once they have been added to the
                    library.
                  </p>
                </div>
              )}
      
              {!loading && !error && sermons.length > 0 && (
                <div className="sections">
                  {SECTIONS.map((section) => {
                    const sectionSermons = sermons
                      .filter(
                        (sermon) =>
                          Number(sermon.section) === section.number
                      )
                      .sort(
                        (a, b) =>
                          Number(a.order || 0) - Number(b.order || 0)
                      );
      
                    if (sectionSermons.length === 0) {
                      return null;
                    }
      
                    return (
                      <section
                        className="sermon-section"
                        key={section.number}
                      >
                        <div className="section-heading">
                          <div className="section-number">
                            0{section.number}
                          </div>
      
                          <div>
                            <p>SECTION 0{section.number}</p>
                            <h2>{section.name}</h2>
                          </div>
      
                          <span className="section-count">
                            {sectionSermons.length}{' '}
                            {sectionSermons.length === 1
                              ? 'MESSAGE'
                              : 'MESSAGES'}
                          </span>
                        </div>
      
                        <div className="sermon-list">
                          {sectionSermons.map((sermon, index) => (
                            <SermonCard
                              key={sermon._id || sermon.slug || index}
                              sermon={sermon}
                              index={index}
                              isPlaying={
                                playingId ===
                                (sermon._id || sermon.slug)
                              }
                              onPlay={() =>
                                setPlayingId(
                                  sermon._id || sermon.slug
                                )
                              }
                              onStop={() => setPlayingId(null)}
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
      
            <style jsx>{`
              .library-page {
                min-height: 100vh;
                background: #ffffff;
                color: #0a1628;
                padding: 100px 30px 80px;
                font-family: Arial, sans-serif;
              }
      
              .library-container {
                width: 100%;
                max-width: 1180px;
                margin: 0 auto;
              }
      
              .top-navigation {
                margin-bottom: 35px;
              }
      
              .back-link {
                color: #64748b;
                text-decoration: none;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.08em;
                transition: color 0.2s ease;
              }
      
              .back-link:hover {
                color: #c9921a;
              }
      
              .library-header {
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 35px;
                margin-bottom: 45px;
              }
      
              .eyebrow {
                color: #c9921a;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 0.16em;
                margin: 0 0 12px;
              }
      
              .library-header h1 {
                margin: 0;
                font-size: clamp(38px, 6vw, 68px);
                line-height: 0.95;
                letter-spacing: -0.04em;
                font-weight: 900;
              }
      
              .subtitle {
                color: #64748b;
                font-size: 16px;
                line-height: 1.6;
                margin: 18px 0 0;
                max-width: 650px;
              }
      
              .library-stats {
                display: flex;
                gap: 45px;
                margin-top: 32px;
                flex-wrap: wrap;
              }
      
              .stat {
                display: flex;
                flex-direction: column;
                gap: 5px;
              }
      
              .stat strong {
                font-size: 25px;
                color: #0a1628;
              }
      
              .stat span {
                font-size: 10px;
                font-weight: 800;
                letter-spacing: 0.1em;
                color: #94a3b8;
              }
      
              .sections {
                display: flex;
                flex-direction: column;
                gap: 55px;
              }
      
              .sermon-section {
                width: 100%;
              }
      
              .section-heading {
                display: flex;
                align-items: center;
                gap: 18px;
                margin-bottom: 20px;
              }
      
              .section-number {
                width: 52px;
                height: 52px;
                flex-shrink: 0;
                border: 1px solid #c9921a;
                color: #c9921a;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                font-weight: 800;
              }
      
              .section-heading p {
                margin: 0 0 3px;
                color: #94a3b8;
                font-size: 9px;
                font-weight: 800;
                letter-spacing: 0.12em;
              }
      
              .section-heading h2 {
                margin: 0;
                font-size: 25px;
                font-weight: 800;
              }
      
              .section-count {
                margin-left: auto;
                color: #64748b;
                font-size: 10px;
                font-weight: 800;
                letter-spacing: 0.08em;
              }
      
              .sermon-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }
      
              .loading-box,
              .empty-box,
              .error-box {
                text-align: center;
                padding: 60px 25px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
              }
      
              .loading-box p {
                color: #64748b;
                margin: 15px 0 0;
                font-size: 14px;
              }
      
              .loader {
                width: 30px;
                height: 30px;
                display: inline-block;
                border: 3px solid #e5e7eb;
                border-top-color: #c9921a;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
              }
      
              .empty-icon {
                font-size: 35px;
                color: #c9921a;
                margin-bottom: 15px;
              }
      
              .empty-box h2,
              .error-box strong {
                margin: 0;
                font-size: 20px;
              }
      
              .empty-box p,
              .error-box p {
                color: #64748b;
                font-size: 14px;
                line-height: 1.6;
              }
      
              .error-box button {
                border: none;
                background: #0a1628;
                color: #ffffff;
                padding: 12px 20px;
                border-radius: 5px;
                font-size: 11px;
                font-weight: 800;
                cursor: pointer;
              }
      
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
      
              @media (max-width: 700px) {
                .library-page {
                  padding: 90px 18px 50px;
                }
      
                .library-header h1 {
                  font-size: 42px;
                }
      
                .library-stats {
                  gap: 25px;
                }
      
                .section-heading {
                  align-items: flex-start;
                }
      
                .section-number {
                  width: 44px;
                  height: 44px;
                }
      
                .section-heading h2 {
                  font-size: 21px;
                }
      
                .section-count {
                  display: none;
                }
              }
            `}</style>
          </main>
        );
      }
      
      function SermonCard({
        sermon,
        index,
        isPlaying,
        onPlay,
        onStop,
      }) {
        const sermonId = sermon._id || sermon.slug;
      
        /*
         * If audioUrl exists in MongoDB, use it.
         *
         * Otherwise, automatically look for the file in:
         *
         * public/audio/
         *
         * Example:
         * public/audio/faith-01.mp3
         *
         * can be played using:
         * /audio/faith-01.mp3
         */
      
        const audioSource = getAudioSource(sermon);
      
        return (
          <article className={`sermon-card ${isPlaying ? 'active' : ''}`}>
            <div className="sermon-number">
              {String(sermon.order || index + 1).padStart(2, '0')}
            </div>
      
            <div className="sermon-information">
              <div className="sermon-top">
                <span className="message-label">
                  MESSAGE {String(sermon.order || index + 1).padStart(2, '0')}
                </span>
      
                {sermon.duration ? (
                  <span className="duration">
                    {formatDuration(sermon.duration)}
                  </span>
                ) : null}
              </div>
      
              <h3>{sermon.title || 'Untitled Sermon'}</h3>
      
              {sermon.speaker && (
                <p className="speaker">
                  {sermon.speaker}
                </p>
              )}
      
              {sermon.description && (
                <p className="description">
                  {sermon.description}
                </p>
              )}
      
              {sermon.scripture && (
                <p className="scripture">
                  {sermon.scripture}
                </p>
              )}
            </div>
      
            <div className="sermon-actions">
              <Link
                href={`/dashboard/sermon/${sermon.slug}`}
                className="details-button"
              >
                DETAILS
              </Link>
      
              {audioSource ? (
                <button
                  type="button"
                  className={`play-button ${isPlaying ? 'playing' : ''}`}
                  onClick={isPlaying ? onStop : onPlay}
                >
                  {isPlaying ? 'STOP' : 'PLAY'}
                </button>
              ) : (
                <span className="no-audio">
                  AUDIO NOT FOUND
                </span>
              )}
            </div>
      
            {isPlaying && audioSource && (
              <div className="audio-player">
                <audio
                  src={audioSource}
                  controls
                  autoPlay
                  onEnded={onStop}
                />
              </div>
            )}
      
            <style jsx>{`
              .sermon-card {
                position: relative;
                display: grid;
                grid-template-columns: 55px 1fr auto;
                gap: 20px;
                align-items: center;
                padding: 22px;
                border: 1px solid #e5e7eb;
                background: #ffffff;
                border-radius: 10px;
                transition: border-color 0.2s ease,
                  box-shadow 0.2s ease;
              }
      
              .sermon-card:hover,
              .sermon-card.active {
                border-color: #c9921a;
                box-shadow: 0 8px 30px rgba(10, 22, 40, 0.06);
              }
      
              .sermon-number {
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0a1628;
                color: #ffffff;
                border-radius: 50%;
                font-size: 12px;
                font-weight: 800;
              }
      
              .sermon-top {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 6px;
              }
      
              .message-label {
                color: #c9921a;
                font-size: 9px;
                font-weight: 800;
                letter-spacing: 0.1em;
              }
      
              .duration {
                color: #94a3b8;
                font-size: 10px;
              }
      
              .sermon-information h3 {
                margin: 0;
                color: #0a1628;
                font-size: 17px;
                line-height: 1.35;
              }
      
              .speaker {
                margin: 5px 0 0;
                color: #64748b;
                font-size: 12px;
              }
      
              .description {
                margin: 8px 0 0;
                color: #64748b;
                font-size: 12px;
                line-height: 1.5;
              }
      
              .scripture {
                margin: 8px 0 0;
                color: #c9921a;
                font-size: 11px;
                font-style: italic;
              }
      
              .sermon-actions {
                display: flex;
                align-items: center;
                gap: 8px;
              }
      
              .details-button,
              .play-button {
                height: 38px;
                padding: 0 15px;
                border-radius: 5px;
                font-size: 9px;
                font-weight: 800;
                letter-spacing: 0.06em;
              }
      
              .details-button {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #dbe1e8;
                color: #0a1628;
                text-decoration: none;
              }
      
              .details-button:hover {
                border-color: #0a1628;
              }
      
              .play-button {
                border: 1px solid #c9921a;
                background: #c9921a;
                color: #ffffff;
                cursor: pointer;
              }
      
              .play-button.playing {
                background: #0a1628;
                border-color: #0a1628;
              }
      
              .no-audio {
                color: #dc2626;
                font-size: 8px;
                font-weight: 800;
              }
      
              .audio-player {
                grid-column: 2 / 4;
                padding-top: 10px;
              }
      
              .audio-player audio {
                width: 100%;
                height: 42px;
              }
      
              @media (max-width: 700px) {
                .sermon-card {
                  grid-template-columns: 44px 1fr;
                  gap: 14px;
                  padding: 17px;
                }
      
                .sermon-information h3 {
                  font-size: 15px;
                }
      
                .sermon-actions {
                  grid-column: 1 / -1;
                  width: 100%;
                }
      
                .details-button,
                .play-button {
                  flex: 1;
                }
      
                .audio-player {
                  grid-column: 1 / -1;
                }
              }
            `}</style>
          </article>
        );
      }
      
      function getAudioSource(sermon) {
        if (sermon.audioUrl) {
          return sermon.audioUrl;
        }
      
        if (sermon.audio) {
          return sermon.audio;
        }
      
        /*
         * This creates a predictable filename from the sermon slug.
         *
         * Example:
         * slug: "faith-and-believing"
         *
         * becomes:
         * /audio/faith-and-believing.mp3
         */
      
        if (sermon.slug) {
          return `/audio/${sermon.slug}.mp3`;
        }
      
        return '';
      }
      
      function formatDuration(seconds) {
        const totalSeconds = Number(seconds);
      
        if (!totalSeconds || totalSeconds <= 0) {
          return '';
        }
      
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = Math.floor(totalSeconds % 60);
      
        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
      }
      ```
      ====
      other files in dashboard folder
      import { useSession } from 'next-auth/react';
      import { useState } from 'react';
      import toast from 'react-hot-toast';
      import DashboardLayout from '../../components/layout/DashboardLayout';
      
      const BADGES = [
        { icon: '🌱', label: 'Enrolled',    earned: true  },
        { icon: '🔥', label: 'First Lesson', earned: false },
        { icon: '📖', label: 'Word Seeker',  earned: false },
        { icon: '🎙️', label: 'Faith Hearer', earned: false },
        { icon: '🏆', label: 'Graduate',     earned: false },
        { icon: '👑', label: 'Leader',       earned: false },
      ];
      
      const MILESTONES = [
        { l: 'Account Created',         done: true  },
        { l: 'CC Orientation Complete', done: false },
        { l: 'All 61 Sermons Heard',    val: '0/61', done: false },
        { l: 'Final Exam Passed',       done: false },
        { l: 'Certificate Issued',      done: false },
      ];
      
      export default function AccomplishmentPage() {
        const { data: session } = useSession();
        const [showCert, setShowCert] = useState(false);
      
        function handlePreview() {
          setShowCert(true);
          toast.success('🎉 Certificate preview generated!');
        }
      
        const today = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
        const certNum = `COLIG-2025-${Math.floor(Math.random() * 9000) + 1000}`;
      
        return (
          <DashboardLayout title="Accomplishments">
            <div style={{ marginBottom: 16 }}>
              <div className="pg-t">Accomplishments</div>
              <div className="pg-s">COLIG FOUNDATION · STUDENT ACHIEVEMENTS</div>
            </div>
      
            <div className="g2" style={{ marginBottom: 20 }}>
              {/* Badges */}
              <div className="wc">
                <div className="wch"><div className="wct">Badges Earned</div><span className="tag tgg">1/6 EARNED</span></div>
                <div className="wcb">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13, textAlign: 'center' }}>
                    {BADGES.map((b, i) => (
                      <div key={i} style={{ opacity: b.earned ? 1 : 0.3 }}>
                        <div style={{ fontSize: 32, marginBottom: 5 }}>{b.icon}</div>
                        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--navy)' }}>{b.label}</div>
                        <div style={{ fontSize: 10, color: b.earned ? 'var(--gb)' : '#ccc', marginTop: 2 }}>
                          {b.earned ? '✓ Earned' : '🔒 Locked'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
      
              {/* Milestones */}
              <div className="wc">
                <div className="wch"><div className="wct">Completion Milestones</div></div>
                <div className="wcb">
                  {MILESTONES.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < MILESTONES.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                      <div style={{ fontSize: 13, color: m.done ? 'var(--navy)' : '#bbb' }}>{m.l}</div>
                      <span className={`tag ${m.done ? 'tgg' : 'tgl'}`}>{m.done ? '✓ Done' : m.val || 'PENDING'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
      
            {/* Certificate */}
            {!showCert ? (
              <div className="cert-locked">
                <div style={{ fontSize: 46, marginBottom: 13 }}>🏆</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 21, fontWeight: 700, color: 'var(--navy)', marginBottom: 7 }}>Certificate of Completion</div>
                <div style={{ fontSize: 13, color: '#9a9a9a', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 14px' }}>
                  Complete all six course modules, listen to all 61 sermons, and pass the Final Exam to receive your official COLIG Leadership Foundation School certificate — personalised with your name and digitally signed.
                </div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: '#bbb', marginBottom: 14 }}>
                  🔒 LOCKED — COMPLETE ALL REQUIREMENTS TO UNLOCK
                </div>
                <button className="bs bs-g" onClick={handlePreview}>PREVIEW CERTIFICATE →</button>
              </div>
            ) : (
              <div className="certprev">
                <div style={{ fontSize: 52, marginBottom: 13 }}>🏆</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 5, color: 'rgba(201,146,26,0.68)', marginBottom: 6 }}>COLIG LEADERSHIP FOUNDATION SCHOOL</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 13, color: 'rgba(255,255,255,0.48)', marginBottom: 18 }}>This is to certify that</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 34, fontWeight: 900, color: 'var(--gold)', marginBottom: 6 }}>{session?.user?.name || 'Your Name'}</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, letterSpacing: 3, color: 'rgba(255,255,255,0.48)', marginBottom: 20 }}>LEADERSHIP FOUNDATION PROGRAMME</div>
                <div style={{ width: 100, height: 2, background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', margin: '0 auto 20px' }} />
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 20px' }}>
                  has successfully completed all six course modules, the Sermon Project comprising 61 messages, and passed the Final Assessment with distinction.
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 18 }}>
                  {['STUDENT SIGNATURE', 'SCHOOL DIRECTOR'].map(lbl => (
                    <div key={lbl} style={{ textAlign: 'center' }}>
                      <div style={{ width: 100, height: 1, background: 'rgba(201,146,26,0.4)', margin: '8px auto 4px' }} />
                      <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.28)' }}>{lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.24)' }}>
                  Issued: {today} · Certificate No. {certNum}
                </div>
                <button
                  onClick={() => { const el = document.createElement('a'); el.href = '#'; el.download = 'certificate.pdf'; toast.success('⬇ Certificate downloading…'); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,146,26,0.12)', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 8, padding: '10px 18px', marginTop: 18, cursor: 'pointer', fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--gold)', transition: 'background .2s' }}
                >
                  ⬇ DOWNLOAD CERTIFICATE PDF
                </button>
              </div>
            )}
          </DashboardLayout>
        );
      }
      ====
      import { useState } from 'react';
      import { useSession } from 'next-auth/react';
      import toast from 'react-hot-toast';
      import DashboardLayout from '../../components/layout/DashboardLayout';
      
      const INITIAL_POSTS = [
        { id: 1, name: 'TUNDE A.', bg: 'var(--navy)', text: 'Just completed the CC Overview lesson. The section on the vision of COLIG really stirred something in my spirit. I feel like God placed me here intentionally for this season. Who else feels this way?', time: '2 hours ago · CC Orientation', likes: 12 },
        { id: 2, name: 'CHIOMA B.', bg: '#6b21a8', text: "Sermon 1 really blessed me — 'The just shall live by faith.' I had to pause it three times to write notes. Faith really does come by hearing! Don't skip the Sermon Project.", time: 'Yesterday · Sermon Project', likes: 27 },
        { id: 3, name: 'EMEKA S.', bg: '#4caf50', text: 'A prayer I logged 3 weeks ago has been answered! I prayed for a job and yesterday I got a call. God is faithful — He keeps His Word. Please join me in praise! 🙌', time: '2 days ago · Prayer Log', likes: 54 },
      ];
      
      export default function CommunityPage() {
        const { data: session } = useSession();
        const [posts, setPosts] = useState(INITIAL_POSTS);
        const [text,  setText]  = useState('');
      
        function addPost() {
          if (!text.trim()) { toast.error('Write something first'); return; }
          setPosts(p => [{
            id: Date.now(),
            name: session?.user?.name?.toUpperCase() || 'YOU',
            bg: 'var(--navy)',
            text, time: 'Just now', likes: 0,
          }, ...p]);
          setText('');
          toast.success('✅ Posted to the community!');
        }
      
        function likePost(id) {
          setPosts(p => p.map(x => x.id === id ? { ...x, likes: x.likes + 1 } : x));
        }
      
        return (
          <DashboardLayout title="Community">
            {/* Header */}
            <div className="com-h">
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 4, color: 'rgba(201,146,26,0.68)', marginBottom: 8 }}>STUDENT COMMUNITY</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 7 }}>The Foundation Family 🤝</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.46)', maxWidth: 460, margin: '0 auto 16px' }}>
                Connect with fellow students. Share revelations, prayer requests, and testimonies. Iron sharpens iron.
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {[{ v: '142', l: 'STUDENTS' }, { v: '38', l: 'ONLINE NOW' }].map(s => (
                  <div key={s.l} style={{ background: 'rgba(201,146,26,0.15)', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 10, padding: '11px 18px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>{s.v}</div>
                    <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.38)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
      
            {/* Post box */}
            <div className="prform" style={{ marginBottom: 13 }}>
              <textarea className="rta" placeholder="Share a thought, revelation, or encouragement with your cohort…"
                style={{ minHeight: 75, marginBottom: 11 }}
                value={text} onChange={e => setText(e.target.value)} />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="bs bs-g" onClick={addPost}>POST →</button>
                <button className="bs bs-o" onClick={() => toast.success('🙏 Prayer request shared!')}>SHARE PRAYER REQUEST</button>
              </div>
            </div>
      
            {/* Posts */}
            {posts.map(p => (
              <div key={p.id} className="pc">
                <div className="pa">
                  <div className="pa-av" style={{ background: p.bg }}>{p.name.charAt(0)}</div>
                  <div><div className="pa-n">{p.name}</div><div className="pa-t">{p.time}</div></div>
                </div>
                <div className="ptxt">{p.text}</div>
                <div className="pacts">
                  <button className="pab" onClick={() => likePost(p.id)}>❤ {p.likes}</button>
                  <button className="pab" onClick={() => toast.success('💬 Reply coming soon!')}>💬 Reply</button>
                  <button className="pab" onClick={() => toast.success('🙏 Amen!')}>🙏 Amen</button>
                </div>
              </div>
            ))}
          </DashboardLayout>
        );
      }
      
      ========
      import DashboardLayout from '../../components/layout/DashboardLayout';
      
      const ROWS = [
        { module: 'CC Orientation',        kc: '95%',  ref: 'Submitted', status: 'IN PROGRESS', grade: 'A', done: true },
        { module: 'C2 New Birth 🔒',       kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
        { module: 'C3 Spiritual Milk 🔒',  kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
        { module: 'C4 Growing in Love 🔒', kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
        { module: 'C5 Stewardship 🔒',     kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
        { module: 'C6 COLIG Cultures 🔒',  kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
        { module: '🏁 Final Exam',          kc: '—',    ref: '—',         status: 'LOCKED',      grade: '—', done: false },
      ];
      
      export default function GradesPage() {
        return (
          <DashboardLayout title="Grades">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div><div className="pg-t">My Grades</div><div className="pg-s">COLIG FOUNDATION · ACADEMIC RECORD</div></div>
              <span className="tag tgg" style={{ fontSize: 11, padding: '8px 16px' }}>OVERALL: A (95%)</span>
            </div>
      
            <div className="g3" style={{ marginBottom: 20 }}>
              <div className="sc"><div className="sc-i">📝</div><div className="sc-l">LESSONS DONE</div><div className="sc-v" style={{ color: 'var(--gold)' }}>1<span style={{ fontSize: 15, color: '#9a9a9a' }}>/24</span></div><div className="sc-s">Of total lessons</div></div>
              <div className="sc"><div className="sc-i">✅</div><div className="sc-l">AVG SCORE</div><div className="sc-v" style={{ color: 'var(--gb)' }}>95%</div><div className="sc-s">Knowledge checks</div></div>
              <div className="sc"><div className="sc-i">🏁</div><div className="sc-l">FINAL EXAM</div><div className="sc-v" style={{ color: '#ccc', fontSize: 16, fontFamily: "'Barlow Condensed'", fontWeight: 800 }}>LOCKED</div><div className="sc-s">Complete all modules</div></div>
            </div>
      
            <div className="wc">
              <div className="wch"><div className="wct">Grade Breakdown by Module</div></div>
              <table className="gtbl">
                <thead>
                  <tr><th>MODULE</th><th>KNOWLEDGE CHECK</th><th>REFLECTION</th><th>STATUS</th><th>GRADE</th></tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr key={i}>
                      <td><strong>{row.module}</strong></td>
                      <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.kc}</td>
                      <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.ref}</td>
                      <td><span className={`tag ${row.done ? 'tg' : 'tgl'}`}>{row.status}</span></td>
                      <td><span className={`gb2 ${row.done ? 'ga' : 'gp'}`}>{row.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardLayout>
        );
      }
      =========
      import { useSession } from 'next-auth/react';
      import { useEffect, useState } from 'react';
      import Link from 'next/link';
      import DashboardLayout from '../../components/layout/DashboardLayout';
      
      const MODULES = [
        { l: 'CC Orientation', p: 12, lk: false },
        { l: 'C2 New Birth', p: 0, lk: true },
        { l: 'C3 Spiritual Milk', p: 0, lk: true },
        { l: 'C4 Growing in Love', p: 0, lk: true },
        { l: 'C5 Stewardship', p: 0, lk: true },
        { l: 'C6 COLIG Cultures', p: 0, lk: true },
      ];
      
      export default function DashboardHome() {
        const { data: session } = useSession();
        const [user, setUser] = useState(null);
      
        useEffect(() => {
          let mounted = true;
      
          fetch('/api/user/progress')
            .then((response) => response.json())
            .then((data) => {
              if (mounted) {
                setUser(data.user || null);
              }
            })
            .catch(() => {
              if (mounted) {
                setUser(null);
              }
            });
      
          return () => {
            mounted = false;
          };
        }, []);
      
        const firstName =
          session?.user?.name?.split(' ')[0] || 'Student';
      
        const sermonsDone =
          user?.completedSermons?.length ||
          user?.completedLessons?.length ||
          0;
      
        const lessonsDone =
          user?.completedLessons?.length || 0;
      
        const prayerHours =
          user?.prayerHoursLogged || 0;
      
        const overallProgress =
          user?.overallProgress ?? 12;
      
        return (
          <DashboardLayout title="Dashboard">
            <div className="dashboard-home">
      
              {/* Welcome Banner */}
              <section className="wb">
                <div className="wb-g" />
      
                <div className="wb-content">
                  <div className="wb-eyebrow">
                    WELCOME BACK
                  </div>
      
                  <h1 className="wb-title">
                    Good to see you, {firstName}
                  </h1>
      
                  <p className="wb-subtitle">
                    You're on your discipleship journey. Keep pressing
                    forward — every lesson brings you closer to your
                    certificate.
                  </p>
      
                  <Link href="/dashboard/curriculum">
                    <button className="bs bs-g">
                      CONTINUE LEARNING →
                    </button>
                  </Link>
                </div>
      
                <div className="wb-b">
                  <div className="wb-bv">
                    {overallProgress}%
                  </div>
      
                  <div className="wb-bl">
                    COMPLETED
                  </div>
                </div>
              </section>
      
              {/* Statistics */}
              <section className="g4">
      
                <div className="sc">
                  <div className="sc-l">
                    CURRENT MODULE
                  </div>
      
                  <div className="sc-v module-name">
                    CC Orientation
                  </div>
      
                  <div className="sc-s">
                    Overview in progress
                  </div>
                </div>
      
                <div className="sc">
                  <div className="sc-l">
                    SERMONS HEARD
                  </div>
      
                  <div className="sc-v gold">
                    {sermonsDone}
                    <span>/61</span>
                  </div>
      
                  <div className="sc-s">
                    Complete all to unlock exam
                  </div>
                </div>
      
                <div className="sc">
                  <div className="sc-l">
                    PRAYER HOURS
                  </div>
      
                  <div className="sc-v purple">
                    {prayerHours}
                  </div>
      
                  <div className="sc-s">
                    of 12 required hours
                  </div>
                </div>
      
                <div className="sc">
                  <div className="sc-l">
                    CURRENT GRADE
                  </div>
      
                  <div className="sc-v green">
                    A
                  </div>
      
                  <div className="sc-s">
                    Knowledge check: 95%
                  </div>
                </div>
      
              </section>
      
              {/* Progress + Quick Actions */}
              <section className="g32">
      
                {/* Module Progress */}
                <div className="wc">
                  <div className="wch">
                    <div className="wct">
                      Module Progress
                    </div>
      
                    <span className="tag">
                      CC ORIENTATION
                    </span>
                  </div>
      
                  <div className="wcb">
      
                    {MODULES.map((module, index) => (
                      <div
                        key={index}
                        className="module-row"
                      >
                        <div className="module-top">
                          <span
                            className={
                              module.lk
                                ? 'module-label locked'
                                : 'module-label'
                            }
                          >
                            {module.l}
                          </span>
      
                          <span
                            className={
                              module.p > 0
                                ? 'module-percent active'
                                : 'module-percent'
                            }
                          >
                            {module.p}%
                          </span>
                        </div>
      
                        <div className="pw">
                          <div
                            className="pf"
                            style={{
                              width: `${module.p}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
      
                  </div>
                </div>
      
                {/* Quick Actions */}
                <div className="wc">
      
                  <div className="wch">
                    <div className="wct">
                      Quick Actions
                    </div>
                  </div>
      
                  <div className="quick-actions">
      
                    <QuickAction
                      label="Continue Lesson"
                      sub="CC Overview"
                      href="/dashboard/curriculum"
                    />
      
                    <QuickAction
                      label="Sermon Project"
                      sub={`${sermonsDone}/61 complete`}
                      href="/dashboard/sermon-project"
                    />
      
                    <QuickAction
                      label="Log a Prayer"
                      sub="Add new request"
                      href="/dashboard/prayer-log"
                    />
      
                    <QuickAction
                      label="Write Testimony"
                      sub="Journal entry"
                      href="/dashboard/testimony-diary"
                    />
      
                  </div>
      
                </div>
      
              </section>
      
              {/* Additional Progress */}
              <section className="bottom-card">
      
                <div>
                  <div className="bottom-eyebrow">
                    YOUR FOUNDATION
                  </div>
      
                  <h2>
                    Keep building your foundation.
                  </h2>
      
                  <p>
                    You have completed {lessonsDone} lessons so far.
                    Continue through the curriculum and complete each
                    requirement to progress toward your certificate.
                  </p>
                </div>
      
                <Link href="/dashboard/curriculum">
                  <button className="outline-button">
                    VIEW CURRICULUM
                  </button>
                </Link>
      
              </section>
      
            </div>
      
            <style jsx>{`
              .dashboard-home {
                width: 100%;
                font-family: 'Montserrat', sans-serif;
                color: #111827;
              }
      
              .wb {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 30px;
                padding: 28px 30px;
                margin-bottom: 20px;
                overflow: hidden;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
              }
      
              .wb-g {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 5px;
                background: #c9921a;
              }
      
              .wb-content {
                position: relative;
                z-index: 1;
                max-width: 760px;
              }
      
              .wb-eyebrow {
                margin-bottom: 8px;
                color: #c9921a;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 3px;
              }
      
              .wb-title {
                margin: 0;
                color: #0a1628;
                font-size: 25px;
                line-height: 1.3;
                font-weight: 700;
              }
      
              .wb-subtitle {
                max-width: 650px;
                margin: 9px 0 0;
                color: #707070;
                font-size: 13px;
                line-height: 1.7;
                font-weight: 400;
              }
      
              .wb-b {
                min-width: 100px;
                text-align: center;
              }
      
              .wb-bv {
                color: #0a1628;
                font-size: 30px;
                line-height: 1;
                font-weight: 800;
              }
      
              .wb-bl {
                margin-top: 6px;
                color: #999;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 2px;
              }
      
              .bs {
                border: 0;
                border-radius: 7px;
                padding: 12px 17px;
                margin-top: 14px;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.8px;
              }
      
              .bs-g {
                background: #0a1628;
                color: #ffffff;
              }
      
              .g4 {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 14px;
                margin-bottom: 20px;
              }
      
              .sc {
                min-height: 145px;
                padding: 18px;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 14px;
                box-shadow: 0 6px 22px rgba(0, 0, 0, 0.03);
              }
      
              .sc-l {
                color: #8a8a8a;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 1.7px;
              }
      
              .sc-v {
                margin-top: 7px;
                color: #0a1628;
                font-size: 25px;
                font-weight: 800;
              }
      
              .module-name {
                font-size: 15px;
                letter-spacing: 0.5px;
              }
      
              .sc-v span {
                color: #aaa;
                font-size: 14px;
                font-weight: 500;
              }
      
              .gold {
                color: #c9921a;
              }
      
              .purple {
                color: #7652a5;
              }
      
              .green {
                color: #39884a;
              }
      
              .sc-s {
                margin-top: 5px;
                color: #999;
                font-size: 10px;
              }
      
              .g32 {
                display: grid;
                grid-template-columns: 1.3fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
              }
      
              .wc {
                overflow: hidden;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 14px;
                box-shadow: 0 6px 22px rgba(0, 0, 0, 0.03);
              }
      
              .wch {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                padding: 16px 18px;
                border-bottom: 1px solid #eeeeee;
              }
      
              .wct {
                color: #0a1628;
                font-size: 13px;
                font-weight: 700;
              }
      
              .tag {
                padding: 5px 8px;
                border-radius: 5px;
                background: #f5f0df;
                color: #9a7318;
                font-size: 8px;
                font-weight: 700;
                letter-spacing: 1px;
              }
      
              .wcb {
                padding: 18px;
              }
      
              .module-row {
                margin-bottom: 16px;
              }
      
              .module-row:last-child {
                margin-bottom: 0;
              }
      
              .module-top {
                display: flex;
                justify-content: space-between;
                gap: 15px;
                margin-bottom: 7px;
              }
      
              .module-label {
                color: #0a1628;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.5px;
              }
      
              .module-label.locked {
                color: #c8c8c8;
              }
      
              .module-percent {
                color: #c9c9c9;
                font-size: 10px;
                font-weight: 700;
              }
      
              .module-percent.active {
                color: #39884a;
              }
      
              .pw {
                height: 5px;
                overflow: hidden;
                border-radius: 20px;
                background: #eeeeee;
              }
      
              .pf {
                height: 100%;
                border-radius: 20px;
                background: #c9921a;
              }
      
              .quick-actions {
                padding: 8px 10px;
              }
      
              .quick-action {
                display: flex;
                align-items: center;
                gap: 11px;
                padding: 11px 9px;
                text-decoration: none;
                border-bottom: 1px solid #f1f1f1;
                transition: background 0.15s ease;
              }
      
              .quick-action:last-child {
                border-bottom: none;
              }
      
              .quick-action:hover {
                background: #faf9f4;
              }
      
              .qa-label {
                color: #0a1628;
                font-size: 11px;
                font-weight: 700;
              }
      
              .qa-sub {
                margin-top: 3px;
                color: #999;
                font-size: 9px;
              }
      
              .bottom-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 25px;
                padding: 25px;
                background: #ffffff;
                border: 1px solid #e7e7e7;
                border-radius: 14px;
              }
      
              .bottom-eyebrow {
                margin-bottom: 7px;
                color: #c9921a;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 2px;
              }
      
              .bottom-card h2 {
                margin: 0;
                color: #0a1628;
                font-size: 18px;
              }
      
              .bottom-card p {
                max-width: 650px;
                margin: 7px 0 0;
                color: #777;
                font-size: 11px;
                line-height: 1.7;
              }
      
              .outline-button {
                flex-shrink: 0;
                padding: 11px 15px;
                border: 1px solid #0a1628;
                border-radius: 7px;
                background: transparent;
                color: #0a1628;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 1px;
              }
      
              @media (max-width: 1000px) {
                .g4 {
                  grid-template-columns: repeat(2, 1fr);
                }
      
                .g32 {
                  grid-template-columns: 1fr;
                }
              }
      
              @media (max-width: 650px) {
                .wb {
                  flex-direction: column;
                  align-items: flex-start;
                  padding: 23px 20px;
                }
      
                .wb-b {
                  text-align: left;
                }
      
                .g4 {
                  grid-template-columns: 1fr;
                }
      
                .bottom-card {
                  flex-direction: column;
                  align-items: flex-start;
                }
      
                .wb-title {
                  font-size: 21px;
                }
              }
            `}</style>
          </DashboardLayout>
        );
      }
      
      function QuickAction({ label, sub, href }) {
        return (
          <Link
            href={href}
            className="quick-action"
          >
            <div>
              <div className="qa-label">
                {label}
              </div>
      
              <div className="qa-sub">
                {sub}
              </div>
            </div>
          </Link>
        );
      }
        ==================
        import { useEffect, useState } from 'react';
        import Head from 'next/head';
        import { motion } from 'framer-motion';
        import toast from 'react-hot-toast';
        import DashboardLayout from '../../components/layout/DashboardLayout';
        
        const TYPE_CONFIG = {
          success: { bg: 'rgba(31,107,59,0.08)', border: 'rgba(31,107,59,0.22)' },
          harvest: { bg: 'rgba(15,47,29,0.08)', border: 'rgba(15,47,29,0.22)' },
          warning: { bg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.12)' },
          info: { bg: 'rgba(15,47,29,0.06)', border: 'rgba(15,47,29,0.18)' },
        };
        
        export default function NotificationsPage() {
          const [notifications, setNotifications] = useState([]);
          const [loading, setLoading] = useState(true);
        
          useEffect(() => {
            fetch('/api/notifications')
              .then((r) => r.json())
              .then((d) => {
                setNotifications(d.notifications || []);
                setLoading(false);
              });
          }, []);
        
          const markAllRead = async () => {
            await fetch('/api/notifications', { method: 'PATCH' });
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            toast.success('All notifications marked as read');
          };
        
          const unread = notifications.filter((n) => !n.read).length;
        
          return (
            <>
              <Head>
                <title>Notifications — CIVORA FARMS</title>
              </Head>
        
              <DashboardLayout title="Notifications">
                <div style={{ maxWidth: 700 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      {unread > 0 && (
                        <div style={{ background: '#0f2f1d', color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: 1, padding: '4px 12px', borderRadius: 20 }}>
                          {unread} UNREAD
                        </div>
                      )}
                    </div>
        
                    {unread > 0 && (
                      <button
                        onClick={markAllRead}
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: 2,
                          color: '#1f6b3b',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        MARK ALL READ
                      </button>
                    )}
                  </div>
        
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: 80, color: '#6f7a75' }}>Loading notifications...</div>
                  ) : notifications.length === 0 ? (
                    <div style={{ background: '#fff', borderRadius: 12, padding: 80, textAlign: 'center', border: '1px solid #e8ece9' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#0b1f14' }}>No notifications yet</div>
                      <p style={{ fontSize: 14, color: '#6f7a75', marginTop: 8, lineHeight: 1.6 }}>
                        You&apos;ll receive updates about your investments, farm progress, and payouts here.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {notifications.map((notif, i) => {
                        const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info;
                        return (
                          <motion.div
                            key={notif._id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            style={{
                              background: notif.read ? '#fff' : cfg.bg,
                              border: `1px solid ${notif.read ? '#e8ece9' : cfg.border}`,
                              borderRadius: 10,
                              padding: '20px 24px',
                              display: 'flex',
                              gap: 16,
                              alignItems: 'flex-start',
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, gap: 12, flexWrap: 'wrap' }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#0b1f14' }}>
                                  {notif.title}
                                </div>
                                <div style={{ fontSize: 10, letterSpacing: 2, color: '#6f7a75', flexShrink: 0 }}>
                                  {new Date(notif.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                              </div>
                              <div style={{ fontSize: 13, color: '#44514b', lineHeight: 1.7 }}>
                                {notif.message}
                              </div>
                            </div>
        
                            {!notif.read && (
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1f6b3b', flexShrink: 0, marginTop: 8 }} />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </DashboardLayout>
            </>
          );
        }

        =======
        import { useEffect, useState } from 'react';
        import { format } from 'date-fns';
        import toast from 'react-hot-toast';
        import DashboardLayout from '../../components/layout/DashboardLayout';
        
        export default function PrayerPage() {
          const [prayers,  setPrayers]  = useState([]);
          const [form,     setForm]     = useState({ title: '', text: '' });
          const [loading,  setLoading]  = useState(false);
        
          useEffect(() => {
            fetch('/api/prayer').then(r => r.json()).then(d => setPrayers(d.prayers || []));
          }, []);
        
          async function addPrayer(e) {
            e.preventDefault();
            if (!form.title || !form.text) { toast.error('Fill in both fields'); return; }
            setLoading(true);
            const res  = await fetch('/api/prayer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            const data = await res.json();
            setPrayers(p => [data.prayer, ...p]);
            setForm({ title: '', text: '' });
            setLoading(false);
            toast.success('🙏 Prayer logged!');
          }
        
          async function markAnswered(id) {
            await fetch('/api/prayer', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
            setPrayers(p => p.map(x => x._id === id ? { ...x, answered: true } : x));
            toast.success('🙌 Praise God — marked as answered!');
          }
        
          return (
            <DashboardLayout title="Prayer Log">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div className="pg-t">Prayer Log</div>
                  <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div className="sc" style={{ padding: '13px 18px', minWidth: 90, textAlign: 'center' }}>
                    <div className="sc-l">REQUESTS</div>
                    <div className="sc-v" style={{ fontSize: 22, color: 'var(--pl)' }}>{prayers.length}</div>
                  </div>
                  <div className="sc" style={{ padding: '13px 18px', minWidth: 90, textAlign: 'center' }}>
                    <div className="sc-l">ANSWERED</div>
                    <div className="sc-v" style={{ fontSize: 22, color: 'var(--gb)' }}>{prayers.filter(p => p.answered).length}</div>
                  </div>
                </div>
              </div>
        
              {/* Form */}
              <div className="prform">
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>Add New Prayer Request 🙏</div>
                <form onSubmit={addPrayer}>
                  <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>PRAYER TITLE</label>
                  <input className="fi" type="text" required placeholder="e.g. Healing for my father"
                    style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
                    value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
                  <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR PRAYER</label>
                  <textarea className="rta" required placeholder="Write your prayer request here…" style={{ marginBottom: 12 }}
                    value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} />
                  <button type="submit" className="bs bs-g" disabled={loading}>
                    {loading ? 'SAVING…' : 'LOG PRAYER →'}
                  </button>
                </form>
              </div>
        
              {/* List */}
              {prayers.map(p => (
                <div key={p._id} className="prit">
                  <div className="pi-i">🙏</div>
                  <div style={{ flex: 1 }}>
                    <div className="pi-t">{p.title}</div>
                    <div className="pi-tx">{p.text}</div>
                    <div className="pi-dt">{format(new Date(p.createdAt), 'd MMM yyyy')}</div>
                    {p.answered ? (
                      <div className="pi-ans">✓ ANSWERED</div>
                    ) : (
                      <button className="bs" style={{ marginTop: 8, padding: '5px 12px', fontSize: 10, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)', color: 'var(--gb)', cursor: 'pointer', borderRadius: 20, letterSpacing: 1, fontFamily: "'Barlow Condensed'", fontWeight: 700 }}
                        onClick={() => markAnswered(p._id)}>
                        MARK ANSWERED 🙌
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </DashboardLayout>
          );
        }


        =============================

        import { useEffect, useState } from 'react';
        import { useSession } from 'next-auth/react';
        import Head from 'next/head';
        import toast from 'react-hot-toast';
        import DashboardLayout from '../../components/layout/DashboardLayout';
        
        export default function ProfilePage() {
          const { data: session } = useSession();
          const [form, setForm] = useState({ name: '', phone: '', state: '' });
          const [loading, setLoading] = useState(false);
        
          useEffect(() => {
            fetch('/api/user/progress').then(r => r.json()).then(d => {
              if (d.user) setForm({ name: d.user.name || '', phone: d.user.phone || '', state: d.user.state || '' });
            });
          }, []);
        
          async function save(e) {
            e.preventDefault();
            setLoading(true);
            await fetch('/api/user/progress', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            setLoading(false);
            toast.success('✅ Profile updated!');
          }
        
          return (
            <DashboardLayout title="Profile">
              <div style={{ maxWidth: 580 }}>
                {/* Avatar card */}
                <div className="wc" style={{ marginBottom: 16 }}>
                  <div className="wcb">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                      <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 900, color: 'var(--gold)', flexShrink: 0 }}>
                        {session?.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>{session?.user?.name}</div>
                        <div style={{ fontSize: 13, color: '#9a9a9a', marginTop: 3 }}>{session?.user?.email}</div>
                        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 3, color: 'var(--gold)', marginTop: 7, fontWeight: 700 }}>FOUNDATION STUDENT · CC ORIENTATION</div>
                      </div>
                    </div>
                  </div>
                </div>
        
                {/* Edit form */}
                <div className="wc">
                  <div className="wch"><div className="wct">Edit Profile</div></div>
                  <div className="wcb">
                    <form onSubmit={save}>
                      <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>FULL NAME</label>
                      <input className="fi" type="text" required
                        style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 13 }}
                        value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        
                      <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>EMAIL ADDRESS</label>
                      <input className="fi" type="email" disabled value={session?.user?.email || ''}
                        style={{ background: '#f5f5f5', borderColor: '#e0e0e0', marginBottom: 4 }} />
                      <div style={{ fontSize: 11, color: '#9a9a9a', fontStyle: 'italic', marginBottom: 13 }}>Email cannot be changed. Contact support if needed.</div>
        
                      <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>PHONE NUMBER</label>
                      <input className="fi" type="tel" placeholder="+234 000 000 0000"
                        style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 13 }}
                        value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
        
                      <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>STATE / LOCATION</label>
                      <input className="fi" type="text" placeholder="e.g. Lagos, Nigeria"
                        style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 16 }}
                        value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} />
        
                      <button type="submit" className="bs bs-g" disabled={loading}>
                        {loading ? 'SAVING…' : 'SAVE CHANGES'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DashboardLayout>
          );
        }
        

        ===============================
        import { useEffect, useState } from 'react';
        import Head from 'next/head';
        import toast from 'react-hot-toast';
        import DashboardLayout from '../../components/layout/DashboardLayout';
        
        export default function SettingsPage() {
          const [settings, setSettings] = useState({
            bankName: '',
            bankAccountNumber: '',
            bankAccountName: '',
            emailNotifications: true,
            whatsappNotifications: true,
          });
          const [loading, setLoading] = useState(false);
        
          useEffect(() => {
            fetch('/api/user/profile')
              .then((r) => r.json())
              .then((d) => {
                if (d.user) {
                  setSettings({
                    bankName: d.user.bankName || '',
                    bankAccountNumber: d.user.bankAccountNumber || '',
                    bankAccountName: d.user.bankAccountName || '',
                    emailNotifications: d.user.emailNotifications ?? true,
                    whatsappNotifications: d.user.whatsappNotifications ?? true,
                  });
                }
              });
          }, []);
        
          const handleSave = async () => {
            setLoading(true);
            try {
              const res = await fetch('/api/user/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
              });
              if (!res.ok) throw new Error();
              toast.success('Settings saved!');
            } catch {
              toast.error('Save failed');
            } finally {
              setLoading(false);
            }
          };
        
          const sectionStyle = {
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            border: '1px solid #e8ece9',
            marginBottom: 20,
          };
        
          const sectionTitle = {
            fontSize: 18,
            fontWeight: 800,
            color: '#0b1f14',
            marginBottom: 6,
          };
        
          const sectionSub = {
            fontSize: 13,
            color: '#6f7a75',
            marginBottom: 24,
            lineHeight: 1.6,
          };
        
          return (
            <>
              <Head>
                <title>Settings — CIVORA FARMS</title>
              </Head>
        
              <DashboardLayout title="Settings">
                <div style={{ maxWidth: 640 }}>
                  <div style={sectionStyle}>
                    <div style={sectionTitle}>Bank / Payout Account</div>
                    <div style={sectionSub}>
                      This is where your harvest returns will be transferred. Please ensure details are accurate.
                    </div>
        
                    {[
                      { label: 'Bank Name', key: 'bankName', placeholder: 'e.g. Zenith Bank, GTBank, Access Bank' },
                      { label: 'Account Number', key: 'bankAccountNumber', placeholder: '10-digit NUBAN account number' },
                      { label: 'Account Name', key: 'bankAccountName', placeholder: 'Must match your bank records exactly' },
                    ].map((f) => (
                      <div key={f.key} className="form-group">
                        <label className="form-label" style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#0b1f14', marginBottom: 8 }}>
                          {f.label}
                        </label>
                        <input
                          className="form-input"
                          value={settings[f.key]}
                          onChange={(e) => setSettings((p) => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          style={{
                            width: '100%',
                            border: '1px solid #dfe5e1',
                            borderRadius: 10,
                            padding: '14px 16px',
                            marginBottom: 18,
                            fontFamily: 'Montserrat, sans-serif',
                            outline: 'none',
                          }}
                        />
                      </div>
                    ))}
        
                    <div style={{ background: 'rgba(15,47,29,0.06)', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 12, color: '#44514b', lineHeight: 1.7 }}>
                      Returns are paid within 14 business days of harvest confirmation. Ensure your bank details are correct before harvest date.
                    </div>
                  </div>
        
                  <div style={sectionStyle}>
                    <div style={sectionTitle}>Notification Preferences</div>
                    <div style={sectionSub}>
                      Choose how you want to receive farm updates and payment alerts.
                    </div>
        
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive farm updates, ROI reports, and payment confirmations via email.' },
                      { key: 'whatsappNotifications', label: 'WhatsApp Notifications', desc: 'Get monthly farm photos, harvest alerts, and support messages on WhatsApp.' },
                    ].map((pref) => (
                      <div
                        key={pref.key}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px 0',
                          borderBottom: '1px solid #f0f2f0',
                          gap: 16,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1, color: '#0b1f14', marginBottom: 2 }}>
                            {pref.label}
                          </div>
                          <div style={{ fontSize: 12, color: '#6f7a75', lineHeight: 1.6 }}>
                            {pref.desc}
                          </div>
                        </div>
        
                        <button
                          onClick={() => setSettings((p) => ({ ...p, [pref.key]: !p[pref.key] }))}
                          style={{
                            width: 48,
                            height: 26,
                            borderRadius: 13,
                            border: 'none',
                            cursor: 'pointer',
                            background: settings[pref.key] ? '#1f6b3b' : '#d7ddd9',
                            position: 'relative',
                            flexShrink: 0,
                            transition: 'background 0.2s',
                            marginLeft: 20,
                          }}
                        >
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: 3,
                              left: settings[pref.key] ? 25 : 3,
                              transition: 'left 0.2s',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
        
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                      padding: '14px 40px',
                      background: loading ? '#6a776f' : '#0f2f1d',
                      color: '#fff',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: 3,
                      border: 'none',
                      borderRadius: 8,
                      cursor: loading ? 'default' : 'pointer',
                    }}
                  >
                    {loading ? 'SAVING...' : 'SAVE ALL SETTINGS'}
                  </button>
                </div>
              </DashboardLayout>
            </>
          );
        }
import { useEffect, useState } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
    emailNotifications: true,
    whatsappNotifications: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setSettings({
            bankName: d.user.bankName || '',
            bankAccountNumber: d.user.bankAccountNumber || '',
            bankAccountName: d.user.bankAccountName || '',
            emailNotifications: d.user.emailNotifications ?? true,
            whatsappNotifications: d.user.whatsappNotifications ?? true,
          });
        }
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      toast.success('Settings saved!');
    } catch {
      toast.error('Save failed');
    } finally {
      setLoading(false);
    }
  };

  const sectionStyle = {
    background: '#fff',
    borderRadius: 12,
    padding: 32,
    border: '1px solid #e8ece9',
    marginBottom: 20,
  };

  const sectionTitle = {
    fontSize: 18,
    fontWeight: 800,
    color: '#0b1f14',
    marginBottom: 6,
  };

  const sectionSub = {
    fontSize: 13,
    color: '#6f7a75',
    marginBottom: 24,
    lineHeight: 1.6,
  };

  return (
    <>
      <Head>
        <title>Settings — CIVORA FARMS</title>
      </Head>

      <DashboardLayout title="Settings">
        <div style={{ maxWidth: 640 }}>
          <div style={sectionStyle}>
            <div style={sectionTitle}>Bank / Payout Account</div>
            <div style={sectionSub}>
              This is where your harvest returns will be transferred. Please ensure details are accurate.
            </div>

            {[
              { label: 'Bank Name', key: 'bankName', placeholder: 'e.g. Zenith Bank, GTBank, Access Bank' },
              { label: 'Account Number', key: 'bankAccountNumber', placeholder: '10-digit NUBAN account number' },
              { label: 'Account Name', key: 'bankAccountName', placeholder: 'Must match your bank records exactly' },
            ].map((f) => (
              <div key={f.key} className="form-group">
                <label className="form-label" style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#0b1f14', marginBottom: 8 }}>
                  {f.label}
                </label>
                <input
                  className="form-input"
                  value={settings[f.key]}
                  onChange={(e) => setSettings((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{
                    width: '100%',
                    border: '1px solid #dfe5e1',
                    borderRadius: 10,
                    padding: '14px 16px',
                    marginBottom: 18,
                    fontFamily: 'Montserrat, sans-serif',
                    outline: 'none',
                  }}
                />
              </div>
            ))}

            <div style={{ background: 'rgba(15,47,29,0.06)', border: '1px solid rgba(15,47,29,0.18)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 12, color: '#44514b', lineHeight: 1.7 }}>
              Returns are paid within 14 business days of harvest confirmation. Ensure your bank details are correct before harvest date.
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={sectionTitle}>Notification Preferences</div>
            <div style={sectionSub}>
              Choose how you want to receive farm updates and payment alerts.
            </div>

            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive farm updates, ROI reports, and payment confirmations via email.' },
              { key: 'whatsappNotifications', label: 'WhatsApp Notifications', desc: 'Get monthly farm photos, harvest alerts, and support messages on WhatsApp.' },
            ].map((pref) => (
              <div
                key={pref.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid #f0f2f0',
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1, color: '#0b1f14', marginBottom: 2 }}>
                    {pref.label}
                  </div>
                  <div style={{ fontSize: 12, color: '#6f7a75', lineHeight: 1.6 }}>
                    {pref.desc}
                  </div>
                </div>

                <button
                  onClick={() => setSettings((p) => ({ ...p, [pref.key]: !p[pref.key] }))}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    border: 'none',
                    cursor: 'pointer',
                    background: settings[pref.key] ? '#1f6b3b' : '#d7ddd9',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                    marginLeft: 20,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: settings[pref.key] ? 25 : 3,
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: '14px 40px',
              background: loading ? '#6a776f' : '#0f2f1d',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 3,
              border: 'none',
              borderRadius: 8,
              cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'SAVING...' : 'SAVE ALL SETTINGS'}
          </button>
        </div>
      </DashboardLayout>
    </>
  );
}
  ======


  import { useEffect, useState } from 'react';
  import { format } from 'date-fns';
  import toast from 'react-hot-toast';
  import { useSession } from 'next-auth/react';
  import DashboardLayout from '../../components/layout/DashboardLayout';
  
  export default function TestimonyPage() {
    const { data: session } = useSession();
    const [list,  setList]  = useState([
      { _id: '1', title: 'Fear Lifted Off Me', text: 'I had been struggling with fear and anxiety for years. The lesson on New Birth and walking in the Spirit completely transformed my perspective. I am no longer a slave to fear — I am a child of God.', author: 'ADENIKE O.', date: '2025-08-20' },
      { _id: '2', title: 'Three Prayers Answered', text: 'The Prayer Log held me accountable. I started writing prayers in July and by month end, three had been answered visibly. God is faithful.', author: 'EMEKA J.', date: '2025-08-15' },
    ]);
    const [form,  setForm]  = useState({ title: '', text: '' });
    const [loading,setLoading]=useState(false);
  
    function handleAdd(e) {
      e.preventDefault();
      if (!form.title || !form.text) { toast.error('Fill in both fields'); return; }
      const entry = {
        _id: Date.now().toString(),
        title: form.title, text: form.text,
        author: session?.user?.name?.toUpperCase() || 'YOU',
        date: new Date().toISOString(),
      };
      setList(l => [entry, ...l]);
      setForm({ title: '', text: '' });
      toast.success('✍️ Testimony saved!');
    }
  
    return (
      <DashboardLayout title="Testimony Diary">
        <div style={{ marginBottom: 16 }}>
          <div className="pg-t">Testimony Diary</div>
          <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
        </div>
  
        {/* Form */}
        <div className="prform" style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>Write a Testimony ✍️</div>
          <form onSubmit={handleAdd}>
            <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>TITLE</label>
            <input className="fi" type="text" required placeholder="Give your testimony a title…"
              style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
              value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR TESTIMONY</label>
            <textarea className="rta" required placeholder="Share what God has done in your life…"
              style={{ minHeight: 110, marginBottom: 12 }}
              value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button type="submit" className="bs bs-g">SAVE TESTIMONY →</button>
              <button type="button" className="bs bs-o" onClick={() => toast.success('📤 Shared with community!')}>SHARE WITH COMMUNITY</button>
            </div>
          </form>
        </div>
  
        {/* List */}
        {list.map(t => (
          <div key={t._id} className="tsit">
            <div className="tsiq">"</div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>{t.title}</div>
            <div className="tsi-tx">{t.text}</div>
            <div className="tsi-au">— {t.author}</div>
            <div className="tsi-dt">{format(new Date(t.date), 'MMMM yyyy')}</div>
          </div>
        ))}
      </DashboardLayout>
    );
  }
  

  ==========

  import { SessionProvider } from 'next-auth/react';
  import { Toaster } from 'react-hot-toast';
  import '../styles/globals.css';
  
  export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#112240',
              color: '#fff',
              border: '1px solid rgba(201,146,26,0.3)',
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '1px',
            },
            success: { iconTheme: { primary: '#4caf50', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </SessionProvider>
    );
  }


  =========

  
  import { Html, Head, Main, NextScript } from 'next/document';
  
  export default function Document() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Barlow+Condensed:wght@200;300;400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="COLIG Leadership Foundation School — Rooted in the Word. Rising in Leadership." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }


  ==================
  import Link from 'next/link';
  import Navbar from '../components/layout/Navbar';
  import Footer from '../components/layout/Footer';
  import SupportButton from '../components/ui/SupportButton';
  import ScrollReveal from '../components/ui/ScrollReveal';
  import Trust from '../components/home/Trust';
  
  export default function AboutPage() {
    return (
      <>
        <title>COLIG Leadership Foundation School</title>
  
        <Navbar />
  
        <div style={{ paddingTop: 72 }}>
  
          {/* HERO */}
          <div
            style={{
              background: 'var(--navy)',
              padding: '80px 60px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="hero-bg-glow" style={{ opacity: 0.6 }} />
            <div className="hero-dots" />
  
            <div
              style={{
                maxWidth: 800,
                margin: '0 auto',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 11,
                  letterSpacing: 5,
                  color: 'rgba(201,146,26,0.7)',
                  marginBottom: 16,
                }}
              >
                OUR STORY
              </div>
  
              <h1
                style={{
                  fontFamily: "'Playfair Display'",
                  fontSize: 'clamp(36px,5vw,60px)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                  Growing
                </em>{' '}
                Wealth From the Ground Up
              </h1>
  
              <p
                style={{
                  fontFamily: "'Barlow'",
                  fontSize: 17,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.9,
                  maxWidth: 620,
                  margin: '0 auto',
                }}
              >
                CIVORA FARMS was founded with a single mission: to make the wealth
                of Nigerian agriculture accessible to every Nigerian, regardless of
                how much land they own or how much money they have.
              </p>
            </div>
          </div>
  
          {/* MISSION + VALUES */}
          <section className="section about">
            <div className="section-inner">
  
              <div
                className="about-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 60,
                  alignItems: 'start',
                }}
              >
  
                {/* LEFT - MISSION */}
                <ScrollReveal>
                  <div className="about-text" style={{ textAlign: 'left' }}>
  
                    {/* TITLE */}
                    <div style={{ marginBottom: 18 }}>
                      <span
                        style={{
                          color: '#fff',
                          fontFamily: "'Playfair Display'",
                          fontSize: 34,
                          fontWeight: 900,
                        }}
                      >
                        Our{' '}
                      </span>
                      <span
                        style={{
                          color: 'var(--gold)',
                          fontFamily: "'Playfair Display'",
                          fontSize: 34,
                          fontWeight: 900,
                        }}
                      >
                        Mission
                      </span>
                    </div>
  
                    <h2 className="sec-title" style={{ marginBottom: 24 }}>
                      Democratizing <em>Agricultural Wealth</em>
                    </h2>
  
                    <div style={{ paddingTop: 10 }}>
                      <p>
                        For generations, the wealth created by Nigerian farmland has been
                        concentrated in the hands of those who already own land. CIVORA FARMS changes that.
                      </p>
  
                      <p>
                        We believe that a civil servant in Kaduna, a student in Lagos, or a trader in Kano
                        should be able to invest in real, productive farmland and earn real returns.
                      </p>
  
                      <p>
                        Our technology platform makes this possible by pooling investor capital into managed farm units.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
  
                {/* RIGHT - VALUES */}
                <ScrollReveal delay={0.15}>
                  <div style={{ textAlign: 'left' }}>
  
                    {/* TITLE */}
                    <div style={{ marginBottom: 20 }}>
                      <span
                        style={{
                          color: '#fff',
                          fontFamily: "'Playfair Display'",
                          fontSize: 34,
                          fontWeight: 900,
                        }}
                      >
                        Our{' '}
                      </span>
                      <span
                        style={{
                          color: 'var(--gold)',
                          fontFamily: "'Playfair Display'",
                          fontSize: 34,
                          fontWeight: 900,
                        }}
                      >
                        Values
                      </span>
                    </div>
  
                    {/* VALUES LIST */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
  
                      {[
                        {
                          title: 'Transparency First',
                          desc: 'Every naira is tracked. Every investor has a legal contract. Independent audits before every payout.',
                        },
                        {
                          title: 'Community Impact',
                          desc: "We employ local Kaduna farmers, support rural agriculture, and contribute to Nigeria's food security.",
                        },
                        {
                          title: 'Excellence in Agriculture',
                          desc: 'Our farm management team brings decades of experience in Kaduna State crop production.',
                        },
                        {
                          title: 'Investor Protection',
                          desc: 'Escrow-held capital. NAIC crop insurance. Legal agreements. Multiple layers of protection.',
                        },
                      ].map((v, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            gap: 14,
                            alignItems: 'flex-start',
                          }}
                        >
                          {/* CHECK ICON */}
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: '50%',
                              background: 'var(--gold)',
                              color: 'var(--navy)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 900,
                              fontSize: 14,
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          >
                            ✓
                          </div>
  
                          <div>
                            <div
                              style={{
                                fontFamily: "'Barlow Condensed'",
                                fontSize: 15,
                                fontWeight: 800,
                                letterSpacing: 1,
                                color: '#fff',
                                marginBottom: 4,
                              }}
                            >
                              {v.title}
                            </div>
  
                            <div
                              style={{
                                fontSize: 13,
                                color: 'var(--text-mid)',
                                lineHeight: 1.7,
                              }}
                            >
                              {v.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
  
                  </div>
                </ScrollReveal>
  
              </div>
            </div>
  
            {/* RESPONSIVE */}
            <style jsx>{`
              @media (max-width: 768px) {
                .about-grid {
                  grid-template-columns: 1fr !important;
                  text-align: center;
                }
  
                .about-text {
                  text-align: center !important;
                }
              }
            `}</style>
          </section>
  
          {/* TRUST */}
          <Trust />
  
          {/* CTA */}
          <section
            style={{
              background: 'var(--navy)',
              padding: '80px 60px',
              textAlign: 'center',
            }}
          >
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              <div
                style={{
                  fontFamily: "'Barlow Condensed'",
                  fontSize: 11,
                  letterSpacing: 5,
                  color: 'rgba(201,146,26,0.7)',
                  marginBottom: 16,
                }}
              >
                READY TO START?
              </div>
  
              <h2
                style={{
                  fontFamily: "'Playfair Display'",
                  fontSize: 'clamp(28px,4vw,44px)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Join the CIVORA{' '}
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
                  Farm Family
                </em>
              </h2>
  
              <p
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                  marginBottom: 36,
                }}
              >
                Start investing from ₦50,000. Create your account and pick your first farm today.
              </p>
  
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  href="/invest"
                  style={{
                    fontFamily: "'Barlow Condensed'",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: 3,
                    color: 'var(--navy)',
                    background: 'var(--gold)',
                    padding: '16px 40px',
                    borderRadius: 4,
                    textDecoration: 'none',
                  }}
                >
                  INVEST NOW →
                </Link>
  
                <Link
                  href="/auth/signup"
                  style={{
                    fontFamily: "'Barlow Condensed'",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: 3,
                    color: 'var(--gold)',
                    background: 'transparent',
                    border: '2px solid rgba(201,146,26,0.4)',
                    padding: '16px 40px',
                    borderRadius: 4,
                    textDecoration: 'none',
                  }}
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </section>
  
        </div>
  
        <Footer />
        <SupportButton />
      </>
    );
  }
  =======
  
  import Head from 'next/head';
  import Navbar from '../components/layout/Navbar';
  import Footer from '../components/layout/Footer';
  import HeroMain from '../components/home/HeroMain';
  import About from '../components/home/About';
  import Curriculum from '../components/home/Curriculum';
  import Journey from '../components/home/Journey';
  import Community from '../components/home/Community';
  import CTA from '../components/home/CTA';
  import HowItWorks from '../components/home/HowItWorks';
  import NewsSection from '../components/home/NewsSection';
  import SupportButton from '../components/ui/SupportButton';
  import ScrollTags from '../components/ui/ScrollTags';
  
  export default function Home() {
    return (
      <>
        <Head>
          <title>COLIG LEADERSHIP FOUNDATION SCHOOL</title>
          <meta name="description" content="Become a leader in City Of Light Global" />
        </Head>
        <Navbar />
        <main>
          <HeroMain />
          <ScrollTags/>
          <About />
             <Curriculum />
          <Journey />
          <Community />
          <CTA />
          <HowItWorks />
          <NewsSection />
        </main>
        <Footer />
        <SupportButton />
         <style jsx global>{`
          :root {
            --navy: #0a1628;
            --nm: #112240;
            --gold: #c9921a;
            --gl: #e8b84b;
            --cream: #faf8f3;
            --txt: #1a1a2e;
            --mid: #4a5568;
          }
  
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
  
          html {
            scroll-behavior: smooth;
          }
  
          body {
            font-family: 'Barlow', sans-serif;
            background: var(--cream);
            color: var(--txt);
            overflow-x: hidden;
          }
        `}</style>
      </>
    );
  }
  
  // import { useEffect, useState } from 'react';
  // import { useSession } from 'next-auth/react';
  // import { useRouter } from 'next/router';
  // import Link from 'next/link';
  // import Head from 'next/head';
  
  // export default function LandingPage() {
  //   const { data: session } = useSession();
  //   const router = useRouter();
  //   const [scrolled, setScrolled] = useState(false);
  
  //   useEffect(() => {
  //     if (session) router.push('/dashboard');
  //   }, [session]);
  
  //   useEffect(() => {
  //     const onScroll = () => setScrolled(window.scrollY > 50);
  //     window.addEventListener('scroll', onScroll);
  
  //     // Scroll reveal
  //     const observer = new IntersectionObserver(
  //       (entries) =>
  //         entries.forEach((e) => {
  //           if (e.isIntersecting) {
  //             e.target.classList.add('visible');
  //             observer.unobserve(e.target);
  //           }
  //         }),
  //       { threshold: 0.15 }
  //     );
  
  //     document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  
  //     return () => {
  //       window.removeEventListener('scroll', onScroll);
  //       observer.disconnect();
  //     };
  //   }, []);
  
  //   const features = [
  //     {
  //       title: 'Structured Curriculum',
  //       desc: 'Six progressive modules from CC Orientation through C6, each with video lessons, knowledge checks, and reflections.'
  //     },
  //     {
  //       title: 'Sermon Project',
  //       desc: '61 curated sermon messages across 6 sections. Listen, download, and complete each to unlock your final exam.'
  //     },
  //     {
  //       title: 'Prayer Log',
  //       desc: 'Keep a living record of your prayers. Mark them answered and build a personal testimony of His faithfulness.'
  //     },
  //     {
  //       title: 'Testimony Diary',
  //       desc: 'Journal your spiritual milestones. Share with the community to encourage fellow students.'
  //     },
  //     {
  //       title: 'Grades & Certification',
  //       desc: 'Track your scores. Pass the final exam to receive your personalised digital certificate.'
  //     },
  //     {
  //       title: 'Student Community',
  //       desc: 'Connect with fellow believers. Share revelations, prayer requests, and testimonies in a safe space.'
  //     }
  //   ];
  
  //   const modules = [
  //     {
  //       num: 'CC',
  //       title: 'Orientation',
  //       desc: 'Welcome to Leadership Foundation School. Understand the vision, structure, and your journey ahead.',
  //       locked: false
  //     },
  //     {
  //       num: 'C2',
  //       title: 'New Birth',
  //       desc: 'Foundations of salvation, repentance, and what it truly means to be born again in Christ.',
  //       locked: true
  //     },
  //     {
  //       num: 'C3',
  //       title: 'Spiritual Milk',
  //       desc: 'The elementary principles of Christ — foundational truths every believer must be grounded in.',
  //       locked: true
  //     },
  //     {
  //       num: 'C4',
  //       title: 'Spiritual Growth',
  //       desc: 'Moving from milk to meat — growing in prayer, the Word, fellowship, and servant leadership.',
  //       locked: true
  //     },
  //     {
  //       num: 'C5',
  //       title: 'Kingdom Mandate',
  //       desc: 'Your calling, spiritual gifts, and operating as a kingdom citizen in every sphere of life.',
  //       locked: true
  //     },
  //     {
  //       num: 'C6',
  //       title: 'Servant Leadership',
  //       desc: 'The capstone module. Learn to lead like Christ — through humility, sacrifice, and love.',
  //       locked: true
  //     }
  //   ];
  
  //   return (
  //     <>
  //       <Head>
  //         <title>
  //           COLIG Leadership Foundation School — Rooted in the Word. Rising in Leadership.
  //         </title>
  //       </Head>
  
  //       {/* NAV */}
  //       <nav className={`lnav ${scrolled ? 'scrolled' : ''}`}>
  //         <div>
  //           <div
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 19,
  //               fontWeight: 800,
  //               letterSpacing: 3,
  //               color: '#fff'
  //             }}
  //           >
  //             COLIG <span style={{ color: 'var(--gold)' }}>FOUNDATION</span>
  //           </div>
  
  //           <div
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 8,
  //               letterSpacing: 3,
  //               color: 'rgba(255,255,255,0.28)',
  //               marginTop: 2
  //             }}
  //           >
  //             LEADERSHIP FOUNDATION SCHOOL
  //           </div>
  //         </div>
  
  //         <div
  //           style={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             gap: 20
  //           }}
  //         >
  //           <div className="live-badge">Enrolment Open</div>
  
  //           <Link
  //             href="/auth/login"
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 12,
  //               fontWeight: 700,
  //               letterSpacing: 2,
  //               color: 'rgba(255,255,255,0.65)',
  //               textDecoration: 'none',
  //               padding: '8px 12px'
  //             }}
  //           >
  //             LOGIN
  //           </Link>
  
  //           <Link
  //             href="/auth/signup"
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 12,
  //               fontWeight: 800,
  //               letterSpacing: 2,
  //               color: 'var(--navy)',
  //               background: 'var(--gold)',
  //               padding: '10px 20px',
  //               borderRadius: 4,
  //               textDecoration: 'none'
  //             }}
  //           >
  //             ENROL FREE
  //           </Link>
  //         </div>
  //       </nav>
  
  //       {/* HERO */}
  //       <section className="hero">
  //         <div className="hero-glow-1" />
  //         <div className="hero-glow-2" />
  //         <div className="hero-dots" />
  
  //         <div className="hero-body">
  //           <div className="hero-eyebrow">
  //             COLIG Leadership Foundation School · Est. 2025
  //           </div>
  
  //           <h1 className="hero-h1">
  //             Rooted in the Word.
  //             <em>Rising in Leadership.</em>
  //           </h1>
  
  //           <div className="hero-rule" />
  
  //           <p className="hero-sub">
  //             COLIG Leadership Foundation School is a{' '}
  //             <strong>structured discipleship programme</strong> equipping
  //             believers with sound doctrine, spiritual discipline, and servant
  //             leadership — through curriculum, sermons, prayer, and community.
  //           </p>
  
  //           <div
  //             style={{
  //               display: 'flex',
  //               gap: 14,
  //               marginTop: 40,
  //               flexWrap: 'wrap',
  //               justifyContent: 'center',
  //               animation: 'fadeUp 0.8s ease 0.65s both'
  //             }}
  //           >
  //             <Link href="/auth/signup" className="cta-gold">
  //               Begin Your Journey →
  //             </Link>
  
  //             <Link href="/auth/login" className="cta-outline">
  //               Student Login
  //             </Link>
  //           </div>
  //         </div>
  
  //         <div className="stats-bar">
  //           {[
  //             { v: '6', l: 'Course Modules' },
  //             { v: '61', l: 'Sermon Messages' },
  //             { v: '100%', l: 'Scripture-Based' },
  //             { v: 'Free', l: 'Open Enrolment' }
  //           ].map((s, i) => (
  //             <div className="stat-item" key={i}>
  //               <div className="stat-val">{s.v}</div>
  //               <div className="stat-lbl">{s.l}</div>
  //             </div>
  //           ))}
  //         </div>
  //       </section>
  
  //       {/* FEATURES */}
  //       <section
  //         style={{
  //           padding: '80px 60px',
  //           background: '#fff'
  //         }}
  //       >
  //         <div
  //           style={{
  //             maxWidth: 1100,
  //             margin: '0 auto'
  //           }}
  //         >
  //           <div
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 10,
  //               letterSpacing: 4,
  //               fontWeight: 700,
  //               color: 'var(--gold)',
  //               textTransform: 'uppercase',
  //               marginBottom: 10
  //             }}
  //           >
  //             What Awaits You
  //           </div>
  
  //           <h2
  //             style={{
  //               fontFamily: "'Playfair Display'",
  //               fontSize: 'clamp(26px,4vw,42px)',
  //               fontWeight: 900,
  //               color: 'var(--navy)',
  //               marginBottom: 14
  //             }}
  //           >
  //             A Complete School of{' '}
  //             <em
  //               style={{
  //                 fontStyle: 'italic',
  //                 color: 'var(--gold)'
  //               }}
  //             >
  //               Discipleship
  //             </em>
  //           </h2>
  
  //           <p
  //             style={{
  //               fontSize: 15,
  //               color: 'var(--mid)',
  //               lineHeight: 1.75,
  //               maxWidth: 600,
  //               marginBottom: 42
  //             }}
  //           >
  //             Every module is carefully sequenced to build spiritual maturity
  //             step by step — from new birth to full servant leadership.
  //           </p>
  
  //           <div
  //             style={{
  //               display: 'grid',
  //               gridTemplateColumns: 'repeat(3,1fr)',
  //               gap: 20
  //             }}
  //           >
  //             {features.map((f, i) => (
  //               <div
  //                 key={i}
  //                 className="reveal"
  //                 style={{
  //                   background: 'var(--cream)',
  //                   border: '1px solid #e8e8e8',
  //                   borderRadius: 12,
  //                   padding: '28px 24px',
  //                   transition:
  //                     'border-color 0.2s, box-shadow 0.2s, transform 0.2s'
  //                 }}
  //                 onMouseEnter={(e) => {
  //                   e.currentTarget.style.borderColor = 'var(--gold)';
  //                   e.currentTarget.style.boxShadow =
  //                     '0 6px 28px rgba(201,146,26,0.1)';
  //                   e.currentTarget.style.transform = 'translateY(-3px)';
  //                 }}
  //                 onMouseLeave={(e) => {
  //                   e.currentTarget.style.borderColor = '#e8e8e8';
  //                   e.currentTarget.style.boxShadow = 'none';
  //                   e.currentTarget.style.transform = 'none';
  //                 }}
  //               >
  //                 <div
  //                   style={{
  //                     fontFamily: "'Barlow Condensed'",
  //                     fontSize: 15,
  //                     fontWeight: 800,
  //                     letterSpacing: 1,
  //                     color: 'var(--navy)',
  //                     marginBottom: 8
  //                   }}
  //                 >
  //                   {f.title}
  //                 </div>
  
  //                 <div
  //                   style={{
  //                     fontSize: 13,
  //                     color: 'var(--mid)',
  //                     lineHeight: 1.65
  //                   }}
  //                 >
  //                   {f.desc}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </section>
  
  //       {/* MODULES */}
  //       <section
  //         style={{
  //           padding: '80px 60px',
  //           background: 'var(--navy)'
  //         }}
  //       >
  //         <div
  //           style={{
  //             maxWidth: 1100,
  //             margin: '0 auto'
  //           }}
  //         >
  //           <div
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 10,
  //               letterSpacing: 4,
  //               fontWeight: 700,
  //               color: 'var(--gold)',
  //               textTransform: 'uppercase',
  //               marginBottom: 10
  //             }}
  //           >
  //             The Curriculum
  //           </div>
  
  //           <h2
  //             style={{
  //               fontFamily: "'Playfair Display'",
  //               fontSize: 'clamp(26px,4vw,42px)',
  //               fontWeight: 900,
  //               color: '#fff',
  //               marginBottom: 14
  //             }}
  //           >
  //             Six Pillars of{' '}
  //             <em
  //               style={{
  //                 fontStyle: 'italic',
  //                 color: 'var(--gold)'
  //               }}
  //             >
  //               Foundation
  //             </em>
  //           </h2>
  
  //           <p
  //             style={{
  //               fontSize: 15,
  //               color: 'rgba(255,255,255,0.42)',
  //               lineHeight: 1.75,
  //               maxWidth: 600,
  //               marginBottom: 30
  //             }}
  //           >
  //             Each class builds upon the last. Complete every lesson, knowledge
  //             check and reflection to advance.
  //           </p>
  
  //           <div
  //             style={{
  //               display: 'grid',
  //               gridTemplateColumns: 'repeat(3,1fr)',
  //               gap: 18
  //             }}
  //           >
  //             {modules.map((m, i) => (
  //               <div
  //                 key={i}
  //                 className="reveal"
  //                 style={{
  //                   background: 'rgba(255,255,255,0.05)',
  //                   border: '1px solid rgba(201,146,26,0.18)',
  //                   borderRadius: 12,
  //                   padding: '26px 22px',
  //                   transition: 'border-color 0.2s, transform 0.2s'
  //                 }}
  //                 onMouseEnter={(e) => {
  //                   e.currentTarget.style.borderColor = 'var(--gold)';
  //                   e.currentTarget.style.transform = 'translateY(-3px)';
  //                 }}
  //                 onMouseLeave={(e) => {
  //                   e.currentTarget.style.borderColor =
  //                     'rgba(201,146,26,0.18)';
  //                   e.currentTarget.style.transform = 'none';
  //                 }}
  //               >
  //                 <div
  //                   style={{
  //                     fontFamily: "'Playfair Display'",
  //                     fontSize: 40,
  //                     fontWeight: 900,
  //                     color: 'rgba(201,146,26,0.2)',
  //                     lineHeight: 1,
  //                     marginBottom: 8
  //                   }}
  //                 >
  //                   {m.num}
  //                 </div>
  
  //                 <div
  //                   style={{
  //                     fontFamily: "'Barlow Condensed'",
  //                     fontSize: 16,
  //                     fontWeight: 800,
  //                     letterSpacing: 2,
  //                     color: 'var(--gold)',
  //                     marginBottom: 8
  //                   }}
  //                 >
  //                   {m.title}
  //                 </div>
  
  //                 <div
  //                   style={{
  //                     fontSize: 13,
  //                     color: 'rgba(255,255,255,0.42)',
  //                     lineHeight: 1.65,
  //                     marginBottom: 12
  //                   }}
  //                 >
  //                   {m.desc}
  //                 </div>
  
  //                 <div
  //                   style={{
  //                     fontFamily: "'Barlow Condensed'",
  //                     fontSize: 10,
  //                     letterSpacing: 1,
  //                     color: m.locked
  //                       ? '#9ca3af'
  //                       : 'var(--green-bright)'
  //                   }}
  //                 >
  //                   {m.locked
  //                     ? 'Complete previous module to unlock'
  //                     : '✓ Unlocked on enrolment'}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </section>
  
  //       {/* CTA BAND */}
  //       <div
  //         style={{
  //           background:
  //             'linear-gradient(135deg,#0a1628 0%,#1a0a3a 100%)',
  //           padding: '80px 60px',
  //           textAlign: 'center',
  //           borderTop: '1px solid rgba(201,146,26,0.14)'
  //         }}
  //       >
  //         <div
  //           style={{
  //             maxWidth: 600,
  //             margin: '0 auto'
  //           }}
  //         >
  //           <div
  //             style={{
  //               fontFamily: "'Barlow Condensed'",
  //               fontSize: 10,
  //               letterSpacing: 4,
  //               fontWeight: 700,
  //               color: 'var(--gold)',
  //               textTransform: 'uppercase',
  //               marginBottom: 14
  //             }}
  //           >
  //             Ready to Begin?
  //           </div>
  
  //           <h2
  //             style={{
  //               fontFamily: "'Playfair Display'",
  //               fontSize: 'clamp(26px,4vw,44px)',
  //               fontWeight: 900,
  //               color: '#fff',
  //               marginBottom: 14
  //             }}
  //           >
  //             Enrol in COLIG Leadership Foundation School{' '}
  //             <em
  //               style={{
  //                 color: 'var(--gold)',
  //                 fontStyle: 'italic'
  //               }}
  //             >
  //               Today
  //             </em>
  //           </h2>
  
  //           <p
  //             style={{
  //               fontSize: 15,
  //               color: 'rgba(255,255,255,0.48)',
  //               maxWidth: 500,
  //               margin: '0 auto 32px',
  //               lineHeight: 1.8
  //             }}
  //           >
  //             Join believers across the nation being equipped, grounded, and
  //             sent. Your journey starts here — free of charge.
  //           </p>
  
  //           <div
  //             style={{
  //               display: 'flex',
  //               gap: 14,
  //               justifyContent: 'center',
  //               flexWrap: 'wrap'
  //             }}
  //           >
  //             <Link href="/auth/signup" className="cta-gold">
  //               CREATE ACCOUNT →
  //             </Link>
  
  //             <Link href="/auth/login" className="cta-outline">
  //               STUDENT LOGIN
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  
  //       {/* FOOTER */}
  //       <footer
  //         style={{
  //           background: '#04080a',
  //           padding: '40px 60px 22px',
  //           borderTop: '1px solid rgba(201,146,26,0.1)'
  //         }}
  //       >
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //             flexWrap: 'wrap',
  //             gap: 28,
  //             marginBottom: 20
  //           }}
  //         >
  //           <div>
  //             <div
  //               style={{
  //                 fontFamily: "'Barlow Condensed'",
  //                 fontSize: 18,
  //                 fontWeight: 800,
  //                 letterSpacing: 4,
  //                 color: 'var(--gold)',
  //                 marginBottom: 6
  //               }}
  //             >
  //               COLIG FOUNDATION
  //             </div>
  
  //             <div
  //               style={{
  //                 fontSize: 12,
  //                 color: 'rgba(255,255,255,0.28)',
  //                 maxWidth: 280,
  //                 lineHeight: 1.7
  //               }}
  //             >
  //               Leadership Foundation School — equipping believers with sound
  //               doctrine, spiritual discipline, and servant leadership for the
  //               21st century.
  //             </div>
  //           </div>
  
  //           <div>
  //             <div
  //               style={{
  //                 fontFamily: "'Barlow Condensed'",
  //                 fontSize: 9,
  //                 letterSpacing: 3,
  //                 color: 'rgba(255,255,255,0.24)',
  //                 marginBottom: 10,
  //                 fontWeight: 700
  //               }}
  //             >
  //               QUICK LINKS
  //             </div>
  
  //             {[
  //               { href: '/auth/login', l: 'Student Login' },
  //               { href: '/auth/signup', l: 'Enrol Now' }
  //             ].map((link, i) => (
  //               <div key={i}>
  //                 <Link
  //                   href={link.href}
  //                   style={{
  //                     fontSize: 12,
  //                     color: 'rgba(255,255,255,0.38)',
  //                     display: 'block',
  //                     marginBottom: 5,
  //                     textDecoration: 'none'
  //                   }}
  //                 >
  //                   {link.l}
  //                 </Link>
  //               </div>
  //             ))}
  //           </div>
  
  //           <div>
  //             <div
  //               style={{
  //                 fontFamily: "'Barlow Condensed'",
  //                 fontSize: 9,
  //                 letterSpacing: 3,
  //                 color: 'rgba(255,255,255,0.24)',
  //                 marginBottom: 10,
  //                 fontWeight: 700
  //               }}
  //             >
  //               CONTACT
  //             </div>
  
  //             <div
  //               style={{
  //                 fontSize: 12,
  //                 color: 'rgba(255,255,255,0.38)',
  //                 marginBottom: 5
  //               }}
  //             >
  //               info@coligfoundation.org
  //             </div>
  
  //             <div
  //               style={{
  //                 fontSize: 12,
  //                 color: 'rgba(255,255,255,0.38)',
  //                 marginBottom: 5
  //               }}
  //             >
  //               +234 000 000 0000
  //             </div>
  
  //             <div
  //               style={{
  //                 fontSize: 12,
  //                 color: 'rgba(255,255,255,0.38)'
  //               }}
  //             >
  //               Nigeria
  //             </div>
  //           </div>
  //         </div>
  
  //         <div
  //           style={{
  //             borderTop: '1px solid rgba(255,255,255,0.05)',
  //             paddingTop: 16,
  //             fontSize: 11,
  //             color: 'rgba(255,255,255,0.18)',
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //             flexWrap: 'wrap',
  //             gap: 8
  //           }}
  //         >
  //           <span>
  //             © 2025 COLIG Leadership Foundation School. All rights reserved.
  //           </span>
  
  //           <span>
  //             Rooted in the Word. Rising in Leadership.
  //           </span>
  //         </div>
  //       </footer>
  //     </>
  //   );
  // }
  ===
  -leadership-school.js file
  -sermons.js file

  ===new
  import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function TestimonyPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', text: '', showOnHome: false });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonies')
      .then((r) => r.json())
      .then((d) => setList(d.testimonies || []))
      .catch(() => toast.error('Could not load your testimonies'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.text.trim()) return toast.error('Fill in both fields');
    setSaving(true);
    try {
      const res = await fetch('/api/testimonies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setList((l) => [data.testimony, ...l]);
      setForm({ title: '', text: '', showOnHome: false });
      toast.success(form.showOnHome ? 'Saved and shown on the home page.' : 'Testimony saved.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleHome(t) {
    const next = !t.showOnHome;
    setList((l) => l.map((x) => (x._id === t._id ? { ...x, showOnHome: next } : x))); // instant
    try {
      const res = await fetch('/api/testimonies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: t._id, showOnHome: next }),
      });
      if (!res.ok) throw new Error();
      toast.success(next ? 'Now showing on the home page.' : 'Removed from the home page.');
    } catch {
      setList((l) => l.map((x) => (x._id === t._id ? { ...x, showOnHome: !next } : x)));
      toast.error('Could not update — try again');
    }
  }

  return (
    <DashboardLayout title="Testimony Diary">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Testimony Diary</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
      </div>

      <div className="prform" style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>
          Write a Testimony ✍️
        </div>
        <form onSubmit={handleAdd}>
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>TITLE</label>
          <input className="fi" type="text" required placeholder="Give your testimony a title…"
            style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
            value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR TESTIMONY</label>
          <textarea className="rta" required placeholder="Share what God has done in your life…"
            style={{ minHeight: 110, marginBottom: 12 }}
            value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--mid)', marginBottom: 14, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.showOnHome}
              onChange={(e) => setForm((p) => ({ ...p, showOnHome: e.target.checked }))} />
            Also show this on the school home page
          </label>
          <button type="submit" className="bs bs-g" disabled={saving}>
            {saving ? 'SAVING…' : 'SAVE TESTIMONY →'}
          </button>
        </form>
      </div>

      {loading && <div style={{ color: '#888', padding: 20 }}>Loading…</div>}
      {!loading && list.length === 0 && <div style={{ color: '#888', padding: 20 }}>You haven't written a testimony yet.</div>}

      {list.map((t) => (
        <div key={t._id} className="tsit">
          <div className="tsiq">"</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>
            {t.title}
          </div>
          <div className="tsi-tx">{t.text}</div>
          <div className="tsi-au">— {t.authorName}</div>
          <div className="tsi-dt">{format(new Date(t.createdAt), 'MMMM yyyy')}</div>
          <button
            className="bs bs-o"
            style={{ marginTop: 12, fontSize: 10, padding: '8px 14px' }}
            onClick={() => toggleHome(t)}
          >
            {t.showOnHome ? 'REMOVE FROM HOME PAGE' : 'SHOW ON HOME PAGE'}
          </button>
          {t.showOnHome && (
            <span style={{ marginLeft: 10, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--gb)' }}>
              LIVE ON HOME PAGE
            </span>
          )}
        </div>
      ))}
    </DashboardLayout>
  );
}
  ===
  home/testimonies
  import { useEffect, useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  export default function Testimonies() {
    const [items, setItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
  
     useEffect(() => {
      let mounted = true;
  
      const load = () =>
        fetch('/api/testimonies/public', { cache: 'no-store' })
          .then((r) => r.json())
          .then((d) => {
            if (!mounted) return;
            const fresh = d.testimonies || [];
            setItems((prev) => {
              if (!prev.length) return shuffle(fresh);
              const byId = new Map(fresh.map((f) => [f._id, f]));
              const kept = prev.filter((p) => byId.has(p._id)).map((p) => byId.get(p._id));
              const known = new Set(prev.map((p) => p._id));
              const added = shuffle(fresh.filter((f) => !known.has(f._id)));
              return [...kept, ...added];
            });
            setIndex((i) => i);
          })
          .catch(() => {});
  
      load();
      const timer = setInterval(load, 30000);
      window.addEventListener('focus', load);
      return () => {
        mounted = false;
        clearInterval(timer);
        window.removeEventListener('focus', load);
      };
    }, []);
    
  
    useEffect(() => {
      if (items.length < 2 || paused) return;
      const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
      return () => clearInterval(t);
    }, [items, paused]);
  
    if (!items.length) return null;
    const t = items[index];
    const preview = items.slice(1, 4).map((_, k) => items[(index + 1 + k) % items.length]);
  
    return (
      <section className="tm" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="tm-inner">
          <div className="tm-eyebrow">TESTIMONIES</div>
          <h2 className="tm-title">What God Is <em>Doing</em></h2>
  
          <div className="tm-stage">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t._id}
                className="tm-card"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.97 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="tm-quote">“</div>
                <div className="tm-head">{t.title}</div>
                <p className="tm-text">{t.text}</p>
                <footer className="tm-author">— {t.authorName || 'A student'}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
  
          {preview.length > 0 && (
            <div className="tm-row">
              {preview.map((p, k) => (
                <motion.button
                  key={`${p._id}-${index}`}
                  className="tm-mini"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.75, y: 0 }}
                  transition={{ delay: 0.15 * k, duration: 0.5 }}
                  whileHover={{ opacity: 1, y: -4 }}
                  onClick={() => setIndex(items.indexOf(p))}
                >
                  <strong>{p.title}</strong>
                  <span>{p.authorName || 'A student'}</span>
                </motion.button>
              ))}
            </div>
          )}
  
          {items.length > 1 && (
            <div className="tm-dots">
              {items.slice(0, 12).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Testimony ${i + 1}`}
                  className={i === index % 12 ? 'on' : ''}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
  
        <style jsx>{`
          .tm { background: #0a1628; padding: 90px 24px; }
          .tm-inner { max-width: 860px; margin: 0 auto; text-align: center; }
          .tm-eyebrow { font-size: 11px; letter-spacing: 5px; color: rgba(201,146,26,0.75); margin-bottom: 14px; font-weight: 700; }
          .tm-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: #fff; margin-bottom: 38px; }
          .tm-title em { color: #c9921a; font-style: italic; }
          .tm-stage { min-height: 280px; display: flex; align-items: center; justify-content: center; }
          .tm-card { margin: 0; width: 100%; padding: 38px 34px; border-radius: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(201,146,26,0.25); backdrop-filter: blur(10px); }
          .tm-quote { font-family: 'Playfair Display', serif; font-size: 60px; line-height: 0.6; color: #c9921a; }
          .tm-head { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 2px; color: #c9921a; margin: 12px 0; text-transform: uppercase; }
          .tm-text { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.82); max-height: 220px; overflow-y: auto; }
          .tm-author { margin-top: 18px; font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
          .tm-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 26px; }
          .tm-mini { flex: 1; min-width: 170px; max-width: 240px; padding: 14px; text-align: left; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #fff; cursor: pointer; display: flex; flex-direction: column; gap: 4px; }
          .tm-mini strong { font-size: 12px; }
          .tm-mini span { font-size: 10px; color: rgba(255,255,255,0.45); letter-spacing: 1px; }
          .tm-dots { display: flex; gap: 8px; justify-content: center; margin-top: 26px; }
          .tm-dots button { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,0.2); cursor: pointer; padding: 0; }
          .tm-dots button.on { background: #c9921a; transform: scale(1.3); }
        `}</style>
      </section>
    );
  }
    -=======
    email.js in lib
    import nodemailer from 'nodemailer';
    
    export const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    export async function sendPasswordResetEmail(email, token, name) {
      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;
    
      await transporter.sendMail({
        from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password — COLIG Foundation School',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">
                COLIG FOUNDATION
              </h1>
              <p style="color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:3px;">
                LEADERSHIP FOUNDATION SCHOOL
              </p>
            </div>
    
            <h2 style="color:#fff;font-size:22px;">
              Hello, ${name}
            </h2>
    
            <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
              We received a request to reset your password.
              Click the button below to set a new password.
              This link expires in
              <strong style="color:#c9921a;">1 hour</strong>.
            </p>
    
            <div style="text-align:center;margin:32px 0;">
              <a
                href="${resetUrl}"
                style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;"
              >
                RESET MY PASSWORD
              </a>
            </div>
    
            <p style="color:rgba(255,255,255,0.4);font-size:12px;">
              If you didn't request this, you can safely ignore this email.
            </p>
    
            <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0;" />
    
            <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;">
              © 2026 COLIG Leadership Foundation School · Nigeria
            </p>
          </div>
        `,
      });
    }
    export async function sendInactivityEmail(email, name, daysAway) {
      await transporter.sendMail({
        from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We've missed you — continue your course at COLIG Foundation School",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
            <h1 style="font-size:26px;color:#c9921a;letter-spacing:4px;text-align:center;">COLIG FOUNDATION</h1>
            <h2 style="color:#fff;font-size:20px;">Hello, ${name}</h2>
            <p style="color:rgba(255,255,255,0.75);line-height:1.8;">
              You've been away from the Leadership Foundation School for ${daysAway} days.
              Your course is waiting for you — pick up where you stopped, keep your prayer
              charges going, and keep moving toward your certificate.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${process.env.NEXTAUTH_URL}/dashboard/curriculum"
                 style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;">
                COMPLETE YOUR COURSE NOW
              </a>
            </div>
            <p style="color:rgba(255,255,255,0.4);font-size:12px;">
              "Be steadfast, immovable, always abounding in the work of the Lord." — 1 Corinthians 15:58
            </p>
          </div>
        `,
      });
    }
    
    export async function sendWelcomeEmail(email, name) {
      await transporter.sendMail({
        from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to COLIG Leadership Foundation School',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
            <h1 style="font-size:28px;color:#c9921a;letter-spacing:4px;">
              COLIG FOUNDATION
            </h1>
    
            <h2 style="color:#fff;">
              Welcome, ${name}!
            </h2>
    
            <p style="color:rgba(255,255,255,0.7);line-height:1.8;">
              Your account has been created successfully.
              You are now enrolled in the COLIG Leadership Foundation School.
            </p>
    
            <div style="background:rgba(201,146,26,0.1);border:1px solid rgba(201,146,26,0.3);border-radius:8px;padding:20px;margin:24px 0;">
              <p style="color:#c9921a;font-weight:bold;">
                Your first steps:
              </p>
    
              <p style="color:rgba(255,255,255,0.7);font-size:14px;">
                ✓ Start with CC Orientation<br/>
                ✓ Log your first prayer request<br/>
                ✓ Join the Community<br/>
                ✓ Begin the Sermon Project
              </p>
            </div>
    
            <div style="text-align:center;margin:32px 0;">
              <a
                href="${process.env.NEXTAUTH_URL}/dashboard"
                style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;"
              >
                GO TO DASHBOARD
              </a>
            </div>
          </div>
        `,
      });
    }
      ======
      api/cron/inactivity.js
      import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import Progress from '../../../models/Progress';
import { sendInactivityEmail } from '../../../lib/Email';

const AWAY_DAYS = 2;
const REMIND_EVERY_DAYS = 7;
const DAY = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();
  const now = Date.now();
  const awayCutoff = new Date(now - AWAY_DAYS * DAY);
  const remindCutoff = new Date(now - REMIND_EVERY_DAYS * DAY);

  const finished = await Progress.find({ completedModules: 'final' }).distinct('userId');

  const users = await User.find({
    role: 'student',
    _id: { $nin: finished },
    $and: [
      { $or: [{ lastActiveAt: { $lt: awayCutoff } }, { lastActiveAt: null, createdAt: { $lt: awayCutoff } }] },
      { $or: [{ lastReminderAt: null }, { lastReminderAt: { $lt: remindCutoff } }] },
    ],
  })
    .select('name email lastActiveAt createdAt')
    .limit(200);

  let sent = 0;
  const failed = [];
  for (const u of users) {
    const last = new Date(u.lastActiveAt || u.createdAt).getTime();
    const daysAway = Math.max(AWAY_DAYS, Math.floor((now - last) / DAY));
    try {
      await sendInactivityEmail(u.email, u.name, daysAway);
      await User.updateOne({ _id: u._id }, { $set: { lastReminderAt: new Date() } });
      sent++;
    } catch (err) {
      console.error('Inactivity email failed for', u.email, err.message);
      failed.push(u.email);
    }
  }

  return res.status(200).json({ checked: users.length, sent, failed: failed.length });
}
  ====
  

const { default: DashboardHome } = require("./components/dashboard") const { default: Accomplishment } = require("./models/Accomplishment") const { default: Prayer } = require("./models/Prayer") const { default: SermonProgress } = require("./models/SermonProgress") folders- component lib

pasted

from 10 - 12pm - COLI SITE
12PM - 3PM - ARTICO SITE

http://localhost:3000/dashboard/curriculum
http://localhost:3000/dashboard/sermon-project
http://localhost:3000/dashboard/testimony-diary

Every testimony from testimony diary should be pushed to the main home page testimony section, all testimonies in the database should show randomly, animatedly
http://localhost:3000/dashboard/prayer
shouldn be to log in payer reqiues,. its to finish 10 hours prayers 6 times. so, do six cards. finished one, if finihsed on, user should click i have finished fistr prayer charge, a prompt come up and says are yous ure you have charged for first 10 hours? In smaller fonts, don't lie, it's an app but in reality between God and you. ...then a button that says yes i have and another, no ive not. so, they are padlocked too. if you finished the first, the next opens. 
http://localhost:3000/dashboard/sermon-project shpuld work

http://localhost:3000/dashboard/sermon/library.js
everything here should wwork. attend to the library.js page

http://localhost:3000/dashboard/accomplishment page is nice. very. but remove those icons there with medals. first medal is a wooden circle or so, but use bronze, another, two bronxze, word seeker, silver, faith hearer two silver, gradutae, a golde, leader, a crown. so remove those icons., replace with medals, but keep them pladlocked unless finished, and keep the names of each too. firstlesson, word seeker, faith heaere, graduate, leader. keep those words. 

Everything in dashboard shuld work perfectly.
remove all the icons in grades section. keep only the padlocked icons. remove that green tick, and note icon. keep the flag and padlocks.

please http://localhost:3000/dashboard/curriculum should work. extremly important. send the refined codes having all working perfectly, then in the home page, the navbar texts are black and he backgrouynd is dark. mark the namvebar textx visiblee.  you can use white text color on the navitems. Dont change the structure. just edit to make the church school web aopp work.

Added 2 memories
I went through everything you pasted. Below is the full refactor. I kept your folder structure, and I couldn’t run any of this, so test each page once it’s in.

Why things were broken
Curriculum: the sidebar and page used lesson keys like cc-overview, but LessonView and the API use course keys (cc, c2, …). The page also saved progress to a field the API ignores, and /api/user/progress returned {progress} while the pages read d.user.
Navbar text is black: your styles are in <style jsx>, which doesn’t reach <Link> children. The .public-link styles never applied.
Dashboard quick actions have the same scoping bug.
DashboardPage has a black background with #111 text, so it’s unreadable. I stopped using it.
Broken links and imports: /dashboard/sermon/library.js as a link, 'Next/Link' with the wrong case, a DETAILS link to a page that doesn’t exist, and lib/dbConnect and lib/mongodb that don’t exist (your file is MongoDBC.js).
Security: MongoDBC.js prints process.env (all your secrets) to the console and imports components. Fixed below.
0. Cleanup first
Delete pages/dashboard/curriculum/[course]/ and [course].js. They call APIs that don’t exist, and CourseCard and curriculum/index.js replace them. Also delete components/dashboard/DashboardPage.js usage.
Keep one copy each of User, Sermon, SermonProgress and Certificate in models/, since you pasted duplicates.
AdminLayout, Settings, Notifications and about.js are CIVORA FARMS leftovers. Remove them or ignore them.
Rename or move files so the routes match:
dashboard/sermon/index.js → dashboard/sermon-project/index.js
dashboard/sermon/library.js → dashboard/sermon-project/library.js
testimony page → dashboard/testimony-diary.js
prayer page → dashboard/prayer.js
accomplishment page → dashboard/accomplishment.js
pages/api/testimonies.js → pages/api/testimonies/index.js
next.config.js (merge with yours). The old URLs, including /dashboard/sermon/library.js, now redirect:

js
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/dashboard/sermon', destination: '/dashboard/sermon-project', permanent: false },
      { source: '/dashboard/sermon/library', destination: '/dashboard/sermon-project/library', permanent: false },
      { source: '/dashboard/sermon/library.js', destination: '/dashboard/sermon-project/library', permanent: false },
      { source: '/dashboard/testimony', destination: '/dashboard/testimony-diary', permanent: false },
      { source: '/dashboard/prayer-log', destination: '/dashboard/prayer', permanent: false },
      { source: '/dashboard/accomplishments', destination: '/dashboard/accomplishment', permanent: false },
    ];
  },
};
1. Lib
lib/MongoDBC.js

js
import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined in .env');

  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export default connectDB;
lib/dbConnect.js and lib/mongodb.js (same one line in both, so every import path in your API files works):

js
export { default } from './MongoDBC';
lib/curriculumData.js

js
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
lib/sermonSeed.js: reads public/audio and builds the sermon records.

js
import fs from 'fs';
import path from 'path';
import Sermon from '../models/Sermon';

export const SECTION_BY_CATEGORY = {
  faith: 1, 'the-word': 2, prayer: 3, 'holy-spirit': 4, leadership: 5, ministry: 6,
};

const LABEL = {
  faith: 'Faith', 'the-word': 'The Word', prayer: 'Prayer',
  'holy-spirit': 'The Holy Spirit', leadership: 'Leadership', ministry: 'Ministry',
};

// Files must be named  <category>-<number>.mp3  e.g. faith-01.mp3, the-word-03.mp3
export async function syncSermonsFromAudio() {
  const dir = path.join(process.cwd(), 'public', 'audio');
  if (!fs.existsSync(dir)) return { synced: 0, skipped: [] };

  const files = fs.readdirSync(dir).filter((f) => /\.(mp3|m4a|wav|ogg)$/i.test(f));
  const re = /^(faith|the-word|prayer|holy-spirit|leadership|ministry)-(\d+)\.[a-z0-9]+$/i;
  const parsed = [];
  const skipped = [];

  files.forEach((file) => {
    const m = file.match(re);
    if (!m) return skipped.push(file);
    parsed.push({ file, category: m[1].toLowerCase(), order: parseInt(m[2], 10) });
  });

  parsed.sort(
    (a, b) =>
      SECTION_BY_CATEGORY[a.category] - SECTION_BY_CATEGORY[b.category] || a.order - b.order
  );

  for (let i = 0; i < parsed.length; i++) {
    const p = parsed[i];
    const slug = `${p.category}-${String(p.order).padStart(2, '0')}`;
    await Sermon.updateOne(
      { slug },
      {
        $set: { number: i + 1, audioUrl: `/audio/${p.file}` },
        $setOnInsert: {
          title: `${LABEL[p.category]} — Message ${p.order}`,
          slug,
          speaker: '',
          category: p.category,
          section: SECTION_BY_CATEGORY[p.category],
          order: p.order,
        },
      },
      { upsert: true }
    );
  }
  return { synced: parsed.length, skipped };
}
2. Models
models/Progress.js

js
import mongoose from 'mongoose';

const grade = () => ({
  score: { type: Number },
  submitted: { type: Boolean, default: false },
  knowledge: { type: String, default: '' },   // 'submitted' | 'skipped'
  reflection: { type: String, default: '' },  // 'submitted' | 'skipped'
});

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    completedLessons: { type: [String], default: [] },
    completedModules: { type: [String], default: [] },
    currentModule: { type: String, default: 'cc' },
    sermonsCompleted: { type: Number, default: 0 },
    completedSermonIds: { type: [Number], default: [] },
    prayerChargesCompleted: { type: Number, default: 0, min: 0, max: 6 },
    overallProgress: { type: Number, default: 0 },
    grades: {
      cc: grade(), c2: grade(), c3: grade(), c4: grade(), c5: grade(), c6: grade(), final: grade(),
    },
    certificateIssued: { type: Boolean, default: false },
    certificateIssuedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
models/Testimony.js (now matches what the API writes)

js
import mongoose from 'mongoose';

const TestimonySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    authorName: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true },
    sharedWithCommunity: { type: Boolean, default: true },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimony || mongoose.model('Testimony', TestimonySchema);
models/Sermon.js: add this one field next to order:

js
    number: { type: Number, index: true },   // overall position 1..61
3. API
pages/api/user/progress.js: one endpoint for progress, profile, sermons, prayer charges and module completion.

js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Progress from '../../../models/Progress';
import User from '../../../models/User';
import {
  COURSES, isUnlocked, getNextCourseKey, TOTAL_SERMONS, TOTAL_PRAYER_CHARGES,
} from '../../../lib/curriculumData';

function recalc(p) {
  const m = (Math.min(p.completedModules.length, COURSES.length) / COURSES.length) * 40;
  const s = (Math.min(p.sermonsCompleted, TOTAL_SERMONS) / TOTAL_SERMONS) * 40;
  const pr = (Math.min(p.prayerChargesCompleted, TOTAL_PRAYER_CHARGES) / TOTAL_PRAYER_CHARGES) * 20;
  p.overallProgress = Math.round(m + s + pr);
}

function payload(user, progress) {
  const p = progress.toObject ? progress.toObject() : progress;
  const u = user?.toObject ? user.toObject() : user || {};
  const charges = p.prayerChargesCompleted || 0;
  return {
    progress: p,
    user: {
      _id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      state: u.state || '',
      completedModules: p.completedModules || [],
      completedLessons: p.completedLessons || [],
      currentModule: p.currentModule || 'cc',
      sermonsCompleted: p.sermonsCompleted || 0,
      completedSermonIds: p.completedSermonIds || [],
      prayerChargesCompleted: charges,
      prayerHoursLogged: charges * 10,
      overallProgress: p.overallProgress || 0,
      certificateIssued: !!p.certificateIssued,
    },
  };
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  await connectDB();
  const userId = session.user.id;

  let progress = await Progress.findOne({ userId });
  if (!progress) progress = await Progress.create({ userId });

  if (req.method === 'GET') {
    const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires');
    return res.status(200).json(payload(user, progress));
  }

  if (req.method === 'PATCH') {
    try {
      const { moduleId, knowledge, reflection, sermonId, prayerCharge, name, phone, state } = req.body || {};

      // 1) Finish a curriculum module
      if (moduleId) {
        if (!COURSES.some((c) => c.key === moduleId)) {
          return res.status(400).json({ error: 'Unknown module' });
        }
        if (!isUnlocked(moduleId, progress.completedModules)) {
          return res.status(403).json({ error: 'Complete the previous course first.' });
        }
        if (!progress.completedModules.includes(moduleId)) {
          progress.completedModules.push(moduleId);
        }
        progress.currentModule = getNextCourseKey(moduleId) || moduleId;
        progress.set(`grades.${moduleId}.submitted`, true);
        progress.set(`grades.${moduleId}.knowledge`, knowledge === 'submitted' ? 'submitted' : 'skipped');
        progress.set(`grades.${moduleId}.reflection`, reflection === 'submitted' ? 'submitted' : 'skipped');
        if (moduleId === 'final') {
          progress.certificateIssued = true;
          progress.certificateIssuedAt = new Date();
        }
      }

      // 2) Sermon heard
      if (sermonId != null) {
        const n = Number(sermonId);
        if (Number.isInteger(n) && n >= 1 && !progress.completedSermonIds.includes(n)) {
          progress.completedSermonIds.push(n);
          progress.sermonsCompleted = progress.completedSermonIds.length;
        }
      }

      // 3) Prayer charge (must be done in order)
      if (prayerCharge != null) {
        const n = Number(prayerCharge);
        if (n !== progress.prayerChargesCompleted + 1 || n > TOTAL_PRAYER_CHARGES) {
          return res.status(400).json({ error: 'Complete the previous prayer charge first.' });
        }
        progress.prayerChargesCompleted = n;
      }

      recalc(progress);
      await progress.save();

      // 4) Profile fields
      const profile = {};
      if (typeof name === 'string' && name.trim()) profile.name = name.trim();
      if (typeof phone === 'string') profile.phone = phone;
      if (typeof state === 'string') profile.state = state;
      if (Object.keys(profile).length) {
        await User.findByIdAndUpdate(userId, { $set: profile });
      }

      const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires');
      return res.status(200).json(payload(user, progress));
    } catch (err) {
      console.error('PATCH /api/user/progress error:', err);
      return res.status(500).json({ error: 'Failed to save progress' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
pages/api/curriculum/index.js: two one-line edits so descriptions have a fallback:

js
          subtitle: dbCourse?.subtitle || '',
          description: dbCourse?.description || c.description || '',
pages/api/grades/index.js

js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Progress from '../../../models/Progress';
import { COURSES, computeStatus } from '../../../lib/curriculumData';

function letterGrade(score) {
  if (score == null) return '—';
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

const label = (v) => (v === 'submitted' ? 'Submitted' : v === 'skipped' ? 'Skipped' : '—');

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  await dbConnect();

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const progress = await Progress.findOne({ userId: session.user.id }).lean();
    const completedModules = progress?.completedModules || [];
    const currentModule = progress?.currentModule || 'cc';
    const grades = progress?.grades || {};

    const rows = COURSES.map((c) => {
      const g = grades[c.code] || {};
      const done = completedModules.includes(c.key);
      const hasScore = g.score != null;
      return {
        key: c.key,
        module: c.title,
        knowledgeCheck: hasScore ? `${g.score}%` : label(g.knowledge),
        reflection: label(g.reflection),
        status: computeStatus(c.key, completedModules, currentModule),
        grade: done ? (hasScore ? letterGrade(g.score) : 'PASS') : '—',
        done,
      };
    });

    const scored = COURSES.map((c) => grades[c.code]?.score).filter((s) => s != null);
    const avgScore = scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : 0;

    return res.status(200).json({
      rows,
      summary: {
        lessonsDone: completedModules.filter((k) => k !== 'final').length,
        totalLessons: COURSES.length - 1,
        avgScore,
        overallGrade: avgScore ? letterGrade(avgScore) : completedModules.length ? 'PASS' : '—',
        finalExamLocked: !completedModules.includes('c6'),
        finalExamDone: completedModules.includes('final'),
      },
    });
  } catch (err) {
    console.error('GET /api/grades error:', err);
    return res.status(500).json({ error: 'Failed to load grades' });
  }
}
pages/api/sermons/index.js: the file your library calls but wasn’t in what you pasted. It auto-loads from public/audio the first time.

js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/dbConnect';
import Sermon from '../../../models/Sermon';
import Progress from '../../../models/Progress';
import { syncSermonsFromAudio } from '../../../lib/sermonSeed';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  await dbConnect();

  if (req.method !== 'GET') return res.status(405).end();

  try {
    const find = () => Sermon.find({ isActive: true }).sort({ section: 1, order: 1 }).lean();
    let sermons = await find();
    let sync = null;

    // Empty DB, or ?sync=1 after you drop new files in public/audio
    if (sermons.length === 0 || req.query.sync === '1') {
      sync = await syncSermonsFromAudio();
      sermons = await find();
    }

    const progress = await Progress.findOne({ userId: session.user.id }).lean();
    return res.status(200).json({
      sermons,
      completedIds: progress?.completedSermonIds || [],
      sync,
    });
  } catch (err) {
    console.error('GET /api/sermons error:', err);
    return res.status(500).json({ error: 'Failed to load sermons' });
  }
}
pages/api/testimonies/index.js

js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../lib/mongodb';
import Testimony from '../../../models/Testimony';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated.' });
  await connectDB();

  if (req.method === 'GET') {
    const testimonies = await Testimony.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ testimonies });
  }

  if (req.method === 'POST') {
    const { title, text } = req.body || {};
    if (!title?.trim() || !text?.trim()) {
      return res.status(400).json({ error: 'Title and text are required.' });
    }
    const testimony = await Testimony.create({
      userId: session.user.id,
      authorName: session.user.name || 'Student',
      title: title.trim(),
      text: text.trim(),
    });
    return res.status(201).json({ testimony });
  }

  return res.status(405).end();
}
pages/api/testimonies/public.js: no login needed, so the home page can call it. It returns a random sample of every testimony.

js
import connectDB from '../../../lib/mongodb';
import Testimony from '../../../models/Testimony';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    await connectDB();
    const testimonies = await Testimony.aggregate([
      { $match: { approved: true } },
      { $sample: { size: 50 } },
      { $project: { title: 1, text: 1, authorName: 1, createdAt: 1 } },
    ]);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ testimonies });
  } catch (err) {
    console.error('GET /api/testimonies/public error:', err);
    return res.status(500).json({ testimonies: [] });
  }
}
4. Curriculum (the important one)
pages/dashboard/curriculum/index.js

js
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import CurriculumSidebar from '../../../components/curriculum/CurriculumSidebar';
import LessonView from '../../../components/curriculum/LessonView';

export default function CurriculumPage() {
  const { status } = useSession();
  const router = useRouter();

  const [curriculum, setCurriculum] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (forceKey) => {
    try {
      const res = await fetch('/api/curriculum');
      if (!res.ok) throw new Error('Failed to load curriculum');
      const data = await res.json();
      setCurriculum(data.curriculum || []);
      setActiveKey((prev) => {
        const wanted = forceKey || prev || data.currentModule;
        const found = (data.curriculum || []).find((c) => c.key === wanted && c.unlocked);
        return found ? wanted : data.currentModule;
      });
      setError('');
    } catch (e) {
      setError('Could not load the curriculum. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login');
    if (status === 'authenticated') load();
  }, [status, load, router]);

  async function handleComplete(key, nextKey, meta = {}) {
    setBusy(true);
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: key, ...meta }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || 'Could not save your progress');
      }
      await load(nextKey || key);
      toast.success(nextKey ? 'Session complete — next one unlocked!' : 'Congratulations! You finished the curriculum.');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  const active = curriculum.find((c) => c.key === activeKey);

  return (
    <DashboardLayout title="Curriculum Map">
      {loading && <div className="cur-msg">Loading curriculum…</div>}
      {!loading && error && <div className="cur-msg cur-err">{error}</div>}

      {!loading && !error && (
        <div className="cur-grid">
          <CurriculumSidebar curriculum={curriculum} activeKey={activeKey} onSelect={setActiveKey} />

          <div className="cur-main">
            {active && active.unlocked ? (
              <LessonView
                key={active.key}
                lessonKey={active.key}
                course={active}
                busy={busy}
                onComplete={handleComplete}
              />
            ) : (
              <div className="cur-msg">
                🔒 Complete the previous course to unlock this one.
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .cur-grid { display: grid; grid-template-columns: 280px 1fr; gap: 22px; align-items: start; }
        .cur-main { background: #fff; border: 1px solid #ececec; border-radius: 14px; padding: 26px; min-height: 360px; }
        .cur-msg { padding: 40px; text-align: center; color: var(--mid); background: #fff; border: 1px solid #ececec; border-radius: 14px; }
        .cur-err { color: #b91c1c; }
        @media (max-width: 900px) { .cur-grid { grid-template-columns: 1fr; } }
      `}</style>
    </DashboardLayout>
  );
}
components/curriculum/CurriculumSidebar.js

js
export default function CurriculumSidebar({ curriculum = [], activeKey, onSelect }) {
  return (
    <aside className="cs">
      <div className="cs-head">CURRICULUM MAP</div>

      {curriculum.map((c, i) => {
        const locked = c.status === 'LOCKED';
        return (
          <button
            key={c.key}
            type="button"
            disabled={locked}
            className={`cs-item ${c.key === activeKey ? 'active' : ''} ${locked ? 'locked' : ''}`}
            onClick={() => onSelect(c.key)}
          >
            <span className="cs-num">{i + 1}</span>
            <span className="cs-title">{c.title}</span>
            <span className={`cs-status s-${c.status.replace(' ', '-').toLowerCase()}`}>
              {locked ? '🔒' : c.status}
            </span>
          </button>
        );
      })}

      <style jsx>{`
        .cs { background: #0a1628; border-radius: 14px; padding: 14px 0; }
        .cs-head { padding: 6px 20px 12px; font-size: 10px; letter-spacing: 3px; font-weight: 700; color: #c9921a; }
        .cs-item {
          display: flex; align-items: center; gap: 12px; width: 100%;
          padding: 13px 20px; background: none; border: none; border-left: 3px solid transparent;
          color: rgba(255,255,255,0.8); text-align: left; cursor: pointer; font-size: 12px; font-weight: 600;
        }
        .cs-item:hover:not(:disabled) { background: rgba(255,255,255,0.05); }
        .cs-item.active { background: rgba(201,146,26,0.12); border-left-color: #c9921a; color: #c9921a; }
        .cs-item.locked { opacity: 0.4; cursor: not-allowed; }
        .cs-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
        .cs-title { flex: 1; }
        .cs-status { font-size: 8px; letter-spacing: 1px; font-weight: 700; color: rgba(255,255,255,0.45); }
        .s-complete { color: #4caf50; }
        .s-in-progress { color: #c9921a; }
      `}</style>
    </aside>
  );
}
components/curriculum/LessonView.js

js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getCourseByKey, getNextCourseKey } from '../../lib/curriculumData';

/**
 * Props:
 *  lessonKey  'cc' | 'c2' | ... | 'final'
 *  course     course object from /api/curriculum (optional)
 *  busy       true while the parent is saving
 *  onComplete (lessonKey, nextKey, meta) => Promise
 *
 * Knowledge Check and Personal Reflection each have a Submit and a Skip button.
 */
export default function LessonView({ lessonKey, course: apiCourse, busy = false, onComplete }) {
  const course = apiCourse || getCourseByKey(lessonKey);
  const nextKey = getNextCourseKey(lessonKey);

  const [reflection, setReflection] = useState('');
  const [knowledgeAnswer, setKnowledgeAnswer] = useState('');
  const [knowledge, setKnowledge] = useState(null); // 'submitted' | 'skipped' | null

  if (!course) return <div className="lv-empty">Select a session to begin.</div>;

  function handleKnowledgeSubmit(e) {
    e.preventDefault();
    if (!knowledgeAnswer.trim()) return toast.error('Answer the check, or use Skip.');
    setKnowledge('submitted');
    toast.success('Knowledge check saved.');
  }

  function handleKnowledgeSkip() {
    setKnowledgeAnswer('');
    setKnowledge('skipped');
    toast('Knowledge check skipped.');
  }

  function handleReflectionSubmit(e) {
    e.preventDefault();
    if (!reflection.trim()) return toast.error('Write a short reflection, or use Skip.');
    onComplete(lessonKey, nextKey, { knowledge: knowledge || 'skipped', reflection: 'submitted' });
  }

  function handleReflectionSkip() {
    setReflection('');
    onComplete(lessonKey, nextKey, { knowledge: knowledge || 'skipped', reflection: 'skipped' });
  }

  const done = course.completed;

  return (
    <div className="lv">
      <div className="lv-head">
        <div className="lv-eyebrow">
          {course.type === 'final-assessment' ? 'CAPSTONE' : 'SESSION'}
          {done && ' · COMPLETED'}
        </div>
        <h2 className="lv-title">{course.title}</h2>
        {course.subtitle && <p className="lv-sub">{course.subtitle}</p>}
      </div>

      <div className="lv-body">
        <p>{course.description || 'Lesson content goes here.'}</p>
      </div>

      <div className="lv-section">
        <div className="lv-section-title">
          Knowledge Check {knowledge === 'submitted' && '— saved'}{knowledge === 'skipped' && '— skipped'}
        </div>
        <form onSubmit={handleKnowledgeSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="Answer the knowledge check question…"
            value={knowledgeAnswer}
            onChange={(e) => setKnowledgeAnswer(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" className="lv-btn lv-btn-primary">SUBMIT</button>
            <button type="button" className="lv-btn lv-btn-skip" onClick={handleKnowledgeSkip}>SKIP</button>
          </div>
        </form>
      </div>

      <div className="lv-section">
        <div className="lv-section-title">Personal Reflection</div>
        <form onSubmit={handleReflectionSubmit}>
          <textarea
            className="lv-textarea"
            placeholder="What is God speaking to you through this session?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
          <div className="lv-actions">
            <button type="submit" disabled={busy} className="lv-btn lv-btn-primary">
              {busy ? 'SAVING…' : 'SUBMIT & COMPLETE'}
            </button>
            <button type="button" disabled={busy} className="lv-btn lv-btn-skip" onClick={handleReflectionSkip}>
              SKIP
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .lv-empty { padding: 40px; text-align: center; color: var(--mid); }
        .lv-head { margin-bottom: 18px; }
        .lv-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--gold); margin-bottom: 6px; }
        .lv-title { font-size: 20px; font-weight: 700; color: var(--navy); }
        .lv-sub { font-size: 13px; color: var(--mid); margin-top: 4px; }
        .lv-body { font-size: 14px; color: var(--mid); line-height: 1.8; margin-bottom: 24px; }
        .lv-section { background: #fff; border: 1px solid #ececec; border-radius: 10px; padding: 20px; margin-bottom: 18px; }
        .lv-section-title { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 12px; }
        .lv-textarea { width: 100%; min-height: 100px; resize: vertical; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; font-size: 13px; color: var(--txt); margin-bottom: 12px; }
        .lv-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .lv-btn { font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 11px 22px; border-radius: 6px; cursor: pointer; border: none; }
        .lv-btn:disabled { opacity: 0.6; cursor: wait; }
        .lv-btn-primary { background: var(--gold); color: var(--navy); }
        .lv-btn-primary:hover:not(:disabled) { background: #e8b84b; }
        .lv-btn-skip { background: transparent; border: 1px solid #d8d8d8; color: var(--mid); }
        .lv-btn-skip:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
      `}</style>
    </div>
  );
}
5. Navbar text (white)
In components/layout/Navbar.js, change both <style jsx>{ to <style jsx global>{ (the student sidebar one and the public one). Then make the public link rules forceful:

css
        .public-link,
        .public-login {
          color: #ffffff !important;
        }
        .public-link:hover,
        .public-login:hover {
          color: #c9921a !important;
        }
        .public-signup {
          color: #ffffff !important;
        }
The structure is untouched. On screens under 850px the links are hidden and there’s no hamburger, which was already the case.

6. Dashboard layout links
In components/layout/DashboardLayout.js (and Sidebar.js), use these NAV_ITEMS hrefs so they match the real routes:

js
  { label: 'HOME',            href: '/dashboard' },
  { label: 'PROFILE',         href: '/dashboard/profile' },
  { label: 'CURRICULUM MAP',  href: '/dashboard/curriculum' },
  { label: 'SERMON PROJECT',  href: '/dashboard/sermon-project' },
  { label: 'PRAYER LOG',      href: '/dashboard/prayer' },
  { label: 'TESTIMONY DIARY', href: '/dashboard/testimony-diary' },
  { label: 'GRADES',          href: '/dashboard/grades' },
  { label: 'ACCOMPLISHMENT',  href: '/dashboard/accomplishment' },
  { label: 'JOIN COMMUNITY',  href: '/dashboard/community' },
7. Dashboard home: pages/dashboard/index.js
Keep your whole <style jsx> block, with one change: QuickAction is a separate component, so those rules need :global. Change these three selectors:

css
.dashboard-home :global(.quick-action) { /* same rules as before */ }
.dashboard-home :global(.quick-action:last-child) { border-bottom: none; }
.dashboard-home :global(.quick-action:hover) { background: #faf9f4; }
.dashboard-home :global(.qa-label) { /* same */ }
.dashboard-home :global(.qa-sub) { /* same */ }
Replace everything above <style jsx> with:

js
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function DashboardHome() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [currentModule, setCurrentModule] = useState('cc');
  const [grade, setGrade] = useState({ overallGrade: '—', avgScore: 0 });

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch('/api/user/progress').then((r) => r.json()),
      fetch('/api/curriculum').then((r) => r.json()),
      fetch('/api/grades').then((r) => r.json()),
    ])
      .then(([p, c, g]) => {
        if (!mounted) return;
        setUser(p.user || null);
        setCurriculum(c.curriculum || []);
        setCurrentModule(c.currentModule || 'cc');
        if (g.summary) setGrade(g.summary);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const firstName = session?.user?.name?.split(' ')[0] || 'Student';
  const sermonsDone = user?.sermonsCompleted || 0;
  const lessonsDone = user?.completedModules?.length || 0;
  const prayerHours = user?.prayerHoursLogged || 0;
  const overallProgress = user?.overallProgress ?? 0;

  const MODULES = curriculum
    .filter((c) => c.type !== 'final-assessment')
    .map((c) => ({ l: c.title, p: c.completed ? 100 : 0, lk: c.status === 'LOCKED' }));
  const current = curriculum.find((c) => c.key === currentModule);

  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard-home">
        <section className="wb">
          <div className="wb-g" />
          <div className="wb-content">
            <div className="wb-eyebrow">WELCOME BACK</div>
            <h1 className="wb-title">Good to see you, {firstName}</h1>
            <p className="wb-subtitle">
              You're on your discipleship journey. Keep pressing forward — every lesson brings you
              closer to your certificate.
            </p>
            <Link href="/dashboard/curriculum">
              <button className="bs bs-g">CONTINUE LEARNING →</button>
            </Link>
          </div>
          <div className="wb-b">
            <div className="wb-bv">{overallProgress}%</div>
            <div className="wb-bl">COMPLETED</div>
          </div>
        </section>

        <section className="g4">
          <div className="sc">
            <div className="sc-l">CURRENT MODULE</div>
            <div className="sc-v module-name">{current?.title || 'CC Orientation'}</div>
            <div className="sc-s">{current?.status === 'COMPLETE' ? 'Completed' : 'In progress'}</div>
          </div>
          <div className="sc">
            <div className="sc-l">SERMONS HEARD</div>
            <div className="sc-v gold">{sermonsDone}<span>/61</span></div>
            <div className="sc-s">Complete all to unlock exam</div>
          </div>
          <div className="sc">
            <div className="sc-l">PRAYER HOURS</div>
            <div className="sc-v purple">{prayerHours}</div>
            <div className="sc-s">of 60 required hours</div>
          </div>
          <div className="sc">
            <div className="sc-l">CURRENT GRADE</div>
            <div className="sc-v green">{grade.overallGrade}</div>
            <div className="sc-s">{grade.avgScore ? `Knowledge check: ${grade.avgScore}%` : 'No scores yet'}</div>
          </div>
        </section>

        <section className="g32">
          <div className="wc">
            <div className="wch">
              <div className="wct">Module Progress</div>
              <span className="tag">{(current?.title || 'CC ORIENTATION').toUpperCase()}</span>
            </div>
            <div className="wcb">
              {MODULES.map((module, index) => (
                <div key={index} className="module-row">
                  <div className="module-top">
                    <span className={module.lk ? 'module-label locked' : 'module-label'}>
                      {module.l}
                      {module.lk && <span className="lock">🔒</span>}
                    </span>
                    <span className={module.p > 0 ? 'module-percent active' : 'module-percent'}>
                      {module.p}%
                    </span>
                  </div>
                  <div className="pw"><div className="pf" style={{ width: `${module.p}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="wc">
            <div className="wch"><div className="wct">Quick Actions</div></div>
            <div className="quick-actions">
              <QuickAction label="Continue Lesson" sub={current?.title || 'CC Orientation'} href="/dashboard/curriculum" />
              <QuickAction label="Sermon Project" sub={`${sermonsDone}/61 complete`} href="/dashboard/sermon-project" />
              <QuickAction label="Prayer Charges" sub={`${user?.prayerChargesCompleted || 0}/6 complete`} href="/dashboard/prayer" />
              <QuickAction label="Write Testimony" sub="Journal entry" href="/dashboard/testimony-diary" />
            </div>
          </div>
        </section>

        <section className="bottom-card">
          <div>
            <div className="bottom-eyebrow">YOUR FOUNDATION</div>
            <h2>Keep building your foundation.</h2>
            <p>
              You have completed {lessonsDone} {lessonsDone === 1 ? 'session' : 'sessions'} so far.
              Continue through the curriculum and complete each requirement to progress toward your certificate.
            </p>
          </div>
          <Link href="/dashboard/curriculum">
            <button className="outline-button">VIEW CURRICULUM</button>
          </Link>
        </section>
      </div>

      {/* ⬇ KEEP YOUR EXISTING <style jsx> BLOCK HERE (with the :global changes above) ⬇ */}
    </DashboardLayout>
  );
}

function QuickAction({ label, sub, href }) {
  return (
    <Link href={href} className="quick-action">
      <div>
        <div className="qa-label">{label}</div>
        <div className="qa-sub">{sub}</div>
      </div>
    </Link>
  );
}
8. Prayer: pages/dashboard/prayer.js
Six 10-hour prayer charge cards. The next one unlocks only after you confirm the current one.

js
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

export default function PrayerPage() {
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null); // charge number being confirmed
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/user/progress')
      .then((r) => r.json())
      .then((d) => setCompleted(d.user?.prayerChargesCompleted || 0))
      .catch(() => toast.error('Could not load your prayer progress'))
      .finally(() => setLoading(false));
  }, []);

  async function confirmCharge() {
    setSaving(true);
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prayerCharge: confirming }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setCompleted(data.user.prayerChargesCompleted);
      toast.success(
        confirming === 6
          ? 'All six prayer charges completed. God be praised!'
          : `Prayer charge ${confirming} complete. Charge ${confirming + 1} is now open.`
      );
      setConfirming(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Prayer Charges">
      <div className="head">
        <div>
          <div className="pg-t">Prayer Charges</div>
          <div className="pg-s">SIX CHARGES · 10 HOURS EACH · 60 HOURS TOTAL</div>
        </div>
        <div className="count">
          <strong>{completed}</strong>/6 <span>COMPLETED</span>
        </div>
      </div>

      {loading ? (
        <div className="empty">Loading…</div>
      ) : (
        <div className="grid">
          {ORDINALS.map((name, i) => {
            const n = i + 1;
            const done = n <= completed;
            const open = n === completed + 1;
            const locked = n > completed + 1;
            return (
              <div key={n} className={`card ${done ? 'done' : ''} ${open ? 'open' : ''} ${locked ? 'locked' : ''}`}>
                <div className="num">{n}</div>
                <div className="title">Prayer Charge {n}</div>
                <div className="sub">10 hours of prayer</div>

                {done && <div className="state">COMPLETED</div>}
                {locked && <div className="state lockedtxt">🔒 LOCKED</div>}
                {open && (
                  <button className="btn" onClick={() => setConfirming(n)}>
                    I HAVE FINISHED {name.toUpperCase()} PRAYER CHARGE
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {confirming && (
        <div className="overlay" onClick={() => !saving && setConfirming(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you have charged for the {ORDINALS[confirming - 1]} 10 hours?</h3>
            <p className="small">
              Don't lie — it's an app, but in reality it's between God and you.
            </p>
            <div className="actions">
              <button className="btn" disabled={saving} onClick={confirmCharge}>
                {saving ? 'SAVING…' : 'YES, I HAVE'}
              </button>
              <button className="btn ghost" disabled={saving} onClick={() => setConfirming(null)}>
                NO, I HAVE NOT
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .count { font-size: 14px; color: var(--mid); }
        .count strong { font-size: 28px; color: var(--gold); }
        .count span { font-size: 9px; letter-spacing: 2px; margin-left: 4px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .card { background: #fff; border: 1px solid #e7e7e7; border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 6px; }
        .card.open { border-color: var(--gold); box-shadow: 0 8px 30px rgba(201,146,26,0.12); }
        .card.done { background: #faf8ef; }
        .card.locked { opacity: 0.5; }
        .num { width: 42px; height: 42px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 8px; }
        .done .num { background: var(--gold); color: var(--navy); }
        .title { font-size: 16px; font-weight: 700; color: var(--navy); }
        .sub { font-size: 12px; color: #888; margin-bottom: 12px; }
        .state { font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #39884a; }
        .lockedtxt { color: #999; }
        .btn { border: 0; background: var(--navy); color: #fff; padding: 12px 14px; border-radius: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.8px; cursor: pointer; }
        .btn:disabled { opacity: 0.6; }
        .btn.ghost { background: transparent; color: var(--mid); border: 1px solid #d8d8d8; }
        .empty { padding: 50px; text-align: center; color: #888; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal { background: #fff; border-radius: 14px; max-width: 440px; width: 100%; padding: 30px; text-align: center; }
        .modal h3 { font-size: 17px; color: var(--navy); line-height: 1.5; margin-bottom: 8px; }
        .small { font-size: 10px; color: #999; font-style: italic; margin-bottom: 22px; }
        .actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </DashboardLayout>
  );
}
9. Sermon Project and Library
pages/dashboard/sermon-project/index.js

js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { TOTAL_SERMONS } from '../../../lib/curriculumData';

const SECTIONS = [
  { number: 1, name: 'Faith' },
  { number: 2, name: 'The Word' },
  { number: 3, name: 'Prayer' },
  { number: 4, name: 'The Holy Spirit' },
  { number: 5, name: 'Leadership' },
  { number: 6, name: 'Ministry' },
];

export default function SermonProjectPage() {
  const [sermons, setSermons] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sermons')
      .then((r) => r.json())
      .then((d) => {
        setSermons(d.sermons || []);
        setCompletedIds(d.completedIds || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const done = completedIds.length;
  const remaining = Math.max(TOTAL_SERMONS - done, 0);

  return (
    <DashboardLayout title="Sermon Project">
      <p className="verse">FAITH COMES BY HEARING AND HEARING BY THE WORD.</p>

      <div className="hero-card">
        <div>
          <span>YOUR PROGRESS</span>
          <strong>{done} / {TOTAL_SERMONS} COMPLETED</strong>
        </div>
        <div className="lock">
          {remaining > 0 ? '🔒' : '🔓'}
          <small>{remaining > 0 ? `${remaining} MORE TO UNLOCK FINAL EXAM` : 'FINAL EXAM REQUIREMENT MET'}</small>
        </div>
      </div>

      <div className="categories">
        {SECTIONS.map((s) => {
          const list = sermons.filter((x) => Number(x.section) === s.number);
          const heard = list.filter((x) => completedIds.includes(x.number)).length;
          return (
            <div className="category" key={s.number}>
              <div className="icon">{s.number}</div>
              <h2>{s.name}</h2>
              <p>
                {loading ? 'Loading…' : list.length ? `${heard} of ${list.length} heard` : 'No sermons added yet'}
              </p>
              <Link href={`/dashboard/sermon-project/library?section=${s.number}`} legacyBehavior>
                <a className="open">OPEN LIBRARY</a>
              </Link>
            </div>
          );
        })}
      </div>

      <Link href="/dashboard/sermon-project/library" legacyBehavior>
        <a className="all">VIEW ALL SERMONS →</a>
      </Link>

      <style jsx>{`
        .verse { font-size: 11px; letter-spacing: 2px; color: var(--gold); font-weight: 700; margin-bottom: 18px; }
        .hero-card { padding: 30px; background: var(--navy); color: #fff; border-radius: 18px; display: flex; justify-content: space-between; align-items: center; gap: 30px; }
        .hero-card span { display: block; font-size: 11px; color: #aaa; letter-spacing: 2px; }
        .hero-card strong { display: block; margin-top: 10px; font-size: 26px; }
        .lock { text-align: center; font-size: 30px; }
        .lock small { display: block; font-size: 10px; color: #aaa; margin-top: 5px; }
        .categories { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
        .category { padding: 24px; background: #fff; border: 1px solid #e7e7e7; border-radius: 16px; }
        .icon { width: 40px; height: 40px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; justify-content: center; align-items: center; font-weight: 800; }
        h2 { color: var(--navy); margin: 16px 0 6px; font-size: 18px; }
        p { color: #777; font-size: 13px; margin-bottom: 16px; }
        .open { display: inline-block; background: var(--navy); color: #fff; padding: 11px 15px; border-radius: 7px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-decoration: none; }
        .all { display: inline-block; margin-top: 22px; color: var(--gold); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-decoration: none; }
        @media (max-width: 850px) {
          .categories { grid-template-columns: 1fr; }
          .hero-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </DashboardLayout>
  );
}
pages/dashboard/sermon-project/library.js

js
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const SECTIONS = [
  { number: 1, name: 'Faith' },
  { number: 2, name: 'The Word' },
  { number: 3, name: 'Prayer' },
  { number: 4, name: 'The Holy Spirit' },
  { number: 5, name: 'Leadership' },
  { number: 6, name: 'Ministry' },
];

export default function SermonLibrary() {
  const router = useRouter();
  const [sermons, setSermons] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [playingId, setPlayingId] = useState(null);

  const sectionFilter = router.query.section ? Number(router.query.section) : null;

  useEffect(() => {
    let mounted = true;
    fetch('/api/sermons')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        if (!mounted) return;
        setSermons(d.sermons || []);
        setCompletedIds(d.completedIds || []);
      })
      .catch(() => mounted && setError('Unable to load the sermon library right now.'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const markHeard = useCallback(async (sermon) => {
    if (completedIds.includes(sermon.number)) return;
    try {
      const res = await fetch('/api/user/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sermonId: sermon.number }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      setCompletedIds(d.user.completedSermonIds || []);
      toast.success('Sermon marked as heard');
    } catch {
      toast.error('Could not save — try again');
    }
  }, [completedIds]);

  const visibleSections = SECTIONS.filter((s) => !sectionFilter || s.number === sectionFilter);

  return (
    <DashboardLayout title="Sermon Library">
      <Link href="/dashboard/sermon-project" legacyBehavior>
        <a className="back">← BACK TO SERMON PROJECT</a>
      </Link>

      <div className="tabs">
        <Link href="/dashboard/sermon-project/library" legacyBehavior>
          <a className={`tab ${!sectionFilter ? 'on' : ''}`}>ALL</a>
        </Link>
        {SECTIONS.map((s) => (
          <Link key={s.number} href={`/dashboard/sermon-project/library?section=${s.number}`} legacyBehavior>
            <a className={`tab ${sectionFilter === s.number ? 'on' : ''}`}>{s.name.toUpperCase()}</a>
          </Link>
        ))}
      </div>

      {loading && <div className="box">Loading sermons…</div>}
      {error && <div className="box err">{error}</div>}

      {!loading && !error && sermons.length === 0 && (
        <div className="box">
          <strong>No sermons found yet.</strong>
          <p>
            Put your audio files in <code>public/audio</code> named like <code>faith-01.mp3</code>,{' '}
            <code>the-word-02.mp3</code>, <code>prayer-03.mp3</code>, <code>holy-spirit-01.mp3</code>,{' '}
            <code>leadership-01.mp3</code>, <code>ministry-01.mp3</code>, then open{' '}
            <code>/api/sermons?sync=1</code> once.
          </p>
        </div>
      )}

      {!loading && !error && sermons.length > 0 &&
        visibleSections.map((section) => {
          const list = sermons
            .filter((s) => Number(s.section) === section.number)
            .sort((a, b) => Number(a.order) - Number(b.order));
          if (!list.length) return null;
          return (
            <section key={section.number} className="sec">
              <div className="sec-head">
                <div className="sec-num">0{section.number}</div>
                <h2>{section.name}</h2>
                <span>{list.length} {list.length === 1 ? 'MESSAGE' : 'MESSAGES'}</span>
              </div>

              {list.map((sermon) => {
                const id = sermon._id;
                const heard = completedIds.includes(sermon.number);
                const playing = playingId === id;
                return (
                  <article key={id} className={`card ${playing ? 'active' : ''}`}>
                    <div className="row">
                      <div className="n">{String(sermon.order).padStart(2, '0')}</div>
                      <div className="info">
                        <h3>{sermon.title}</h3>
                        {sermon.speaker && <div className="meta">{sermon.speaker}</div>}
                        {sermon.scripture && <div className="scr">{sermon.scripture}</div>}
                        {heard && <div className="heard">HEARD</div>}
                      </div>
                      <div className="acts">
                        <button className={`play ${playing ? 'stop' : ''}`} onClick={() => setPlayingId(playing ? null : id)}>
                          {playing ? 'STOP' : 'PLAY'}
                        </button>
                        {!heard && (
                          <button className="mark" onClick={() => markHeard(sermon)}>MARK HEARD</button>
                        )}
                        <a className="dl" href={sermon.audioUrl} download>DOWNLOAD</a>
                      </div>
                    </div>
                    {playing && (
                      <audio
                        className="player"
                        src={sermon.audioUrl}
                        controls
                        autoPlay
                        onEnded={() => { markHeard(sermon); setPlayingId(null); }}
                      />
                    )}
                  </article>
                );
              })}
            </section>
          );
        })}

      <style jsx>{`
        .back { display: inline-block; color: #64748b; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 16px; }
        .back:hover { color: var(--gold); }
        .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
        .tab { padding: 8px 14px; border-radius: 20px; border: 1px solid #e0e0e0; color: var(--mid); font-size: 10px; font-weight: 700; letter-spacing: 1px; text-decoration: none; }
        .tab.on { background: var(--gold); border-color: var(--gold); color: var(--navy); }
        .box { text-align: center; padding: 50px 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #fff; color: #64748b; font-size: 14px; line-height: 1.7; }
        .box strong { color: var(--navy); font-size: 18px; }
        .box code { background: #f3f4f6; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
        .err { color: #b91c1c; }
        .sec { margin-bottom: 34px; }
        .sec-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .sec-num { width: 44px; height: 44px; border: 1px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; }
        .sec-head h2 { font-size: 21px; color: var(--navy); }
        .sec-head span { margin-left: auto; font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #64748b; }
        .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px; margin-bottom: 10px; transition: border-color .2s; }
        .card.active, .card:hover { border-color: var(--gold); }
        .row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .n { width: 42px; height: 42px; border-radius: 50%; background: var(--navy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; }
        .info { flex: 1; min-width: 180px; }
        h3 { font-size: 16px; color: var(--navy); }
        .meta { font-size: 12px; color: #64748b; margin-top: 3px; }
        .scr { font-size: 11px; color: var(--gold); font-style: italic; margin-top: 4px; }
        .heard { display: inline-block; margin-top: 6px; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; color: #39884a; }
        .acts { display: flex; gap: 8px; flex-wrap: wrap; }
        .play, .mark, .dl { height: 36px; padding: 0 14px; border-radius: 5px; font-size: 9px; font-weight: 800; letter-spacing: 0.8px; cursor: pointer; display: inline-flex; align-items: center; text-decoration: none; }
        .play { background: var(--gold); border: 1px solid var(--gold); color: #fff; }
        .play.stop { background: var(--navy); border-color: var(--navy); }
        .mark { background: transparent; border: 1px solid #39884a; color: #39884a; }
        .dl { border: 1px solid #dbe1e8; color: var(--navy); }
        .player { width: 100%; height: 42px; margin-top: 12px; }
      `}</style>
    </DashboardLayout>
  );
}
Your sermon files must be named faith-01.mp3, the-word-02.mp3, prayer-03.mp3, holy-spirit-01.mp3, leadership-01.mp3 or ministry-01.mp3. Without that, the library can’t tell which section each file belongs to. Visit /api/sermons?sync=1 once after adding files. If your files use a different naming scheme, tell me and I’ll adjust the parser.

10. Testimony Diary: pages/dashboard/testimony-diary.js
Every testimony saved here goes to the home page automatically.

js
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function TestimonyPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', text: '' });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonies')
      .then((r) => r.json())
      .then((d) => setList(d.testimonies || []))
      .catch(() => toast.error('Could not load your testimonies'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.text.trim()) return toast.error('Fill in both fields');
    setSaving(true);
    try {
      const res = await fetch('/api/testimonies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setList((l) => [data.testimony, ...l]);
      setForm({ title: '', text: '' });
      toast.success('Testimony saved — it will appear on the home page.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Testimony Diary">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Testimony Diary</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
      </div>

      <div className="prform" style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>
          Write a Testimony ✍️
        </div>
        <form onSubmit={handleAdd}>
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>TITLE</label>
          <input className="fi" type="text" required placeholder="Give your testimony a title…"
            style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
            value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR TESTIMONY</label>
          <textarea className="rta" required placeholder="Share what God has done in your life…"
            style={{ minHeight: 110, marginBottom: 12 }}
            value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} />
          <button type="submit" className="bs bs-g" disabled={saving}>
            {saving ? 'SAVING…' : 'SAVE TESTIMONY →'}
          </button>
        </form>
      </div>

      {loading && <div style={{ color: '#888', padding: 20 }}>Loading…</div>}
      {!loading && list.length === 0 && (
        <div style={{ color: '#888', padding: 20 }}>You haven't written a testimony yet.</div>
      )}

      {list.map((t) => (
        <div key={t._id} className="tsit">
          <div className="tsiq">"</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>
            {t.title}
          </div>
          <div className="tsi-tx">{t.text}</div>
          <div className="tsi-au">— {t.authorName}</div>
          <div className="tsi-dt">{format(new Date(t.createdAt), 'MMMM yyyy')}</div>
        </div>
      ))}
    </DashboardLayout>
  );
}
11. Home page testimonies
components/home/Testimonies.js: pulls every testimony, shuffles them on each visit, and fades through them with an auto-rotate and dots. It assumes framer-motion v7 or newer, which you already use in Navbar.

js
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Testimonies() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('/api/testimonies/public')
      .then((r) => r.json())
      .then((d) => mounted && setItems(shuffle(d.testimonies || [])))
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items, paused]);

  if (!items.length) return null;
  const t = items[index];
  const preview = items.slice(1, 4).map((_, k) => items[(index + 1 + k) % items.length]);

  return (
    <section className="tm" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="tm-inner">
        <div className="tm-eyebrow">TESTIMONIES</div>
        <h2 className="tm-title">What God Is <em>Doing</em></h2>

        <div className="tm-stage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t._id}
              className="tm-card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="tm-quote">“</div>
              <div className="tm-head">{t.title}</div>
              <p className="tm-text">{t.text}</p>
              <footer className="tm-author">— {t.authorName || 'A student'}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {preview.length > 0 && (
          <div className="tm-row">
            {preview.map((p, k) => (
              <motion.button
                key={`${p._id}-${index}`}
                className="tm-mini"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ delay: 0.15 * k, duration: 0.5 }}
                whileHover={{ opacity: 1, y: -4 }}
                onClick={() => setIndex(items.indexOf(p))}
              >
                <strong>{p.title}</strong>
                <span>{p.authorName || 'A student'}</span>
              </motion.button>
            ))}
          </div>
        )}

        {items.length > 1 && (
          <div className="tm-dots">
            {items.slice(0, 12).map((_, i) => (
              <button
                key={i}
                aria-label={`Testimony ${i + 1}`}
                className={i === index % 12 ? 'on' : ''}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .tm { background: #0a1628; padding: 90px 24px; }
        .tm-inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .tm-eyebrow { font-size: 11px; letter-spacing: 5px; color: rgba(201,146,26,0.75); margin-bottom: 14px; font-weight: 700; }
        .tm-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: #fff; margin-bottom: 38px; }
        .tm-title em { color: #c9921a; font-style: italic; }
        .tm-stage { min-height: 280px; display: flex; align-items: center; justify-content: center; }
        .tm-card { margin: 0; width: 100%; padding: 38px 34px; border-radius: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(201,146,26,0.25); backdrop-filter: blur(10px); }
        .tm-quote { font-family: 'Playfair Display', serif; font-size: 60px; line-height: 0.6; color: #c9921a; }
        .tm-head { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 2px; color: #c9921a; margin: 12px 0; text-transform: uppercase; }
        .tm-text { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.82); max-height: 220px; overflow-y: auto; }
        .tm-author { margin-top: 18px; font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
        .tm-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 26px; }
        .tm-mini { flex: 1; min-width: 170px; max-width: 240px; padding: 14px; text-align: left; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #fff; cursor: pointer; display: flex; flex-direction: column; gap: 4px; }
        .tm-mini strong { font-size: 12px; }
        .tm-mini span { font-size: 10px; color: rgba(255,255,255,0.45); letter-spacing: 1px; }
        .tm-dots { display: flex; gap: 8px; justify-content: center; margin-top: 26px; }
        .tm-dots button { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,0.2); cursor: pointer; padding: 0; }
        .tm-dots button.on { background: #c9921a; transform: scale(1.3); }
      `}</style>
    </section>
  );
}
pages/index.js: add the import and the component. It renders nothing while there are no testimonies.

js
import Testimonies from '../components/home/Testimonies';
...
          <Community />
          <Testimonies />
          <CTA />
12. Accomplishments (medals)
components/accomplishments/Medal.js

js
const TIERS = {
  bronze: ['#f0b27a', '#cd7f32', '#7a4a1d'],
  silver: ['#ffffff', '#c0c4cc', '#7b828e'],
  gold: ['#fff1a8', '#e6b422', '#9a6d0a'],
};

export default function Medal({ id, tier, earned, size = 72 }) {
  const gid = `medal-${id}`;
  const [c1, c2, c3] = TIERS[tier === 'crown' ? 'gold' : tier];

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg
        viewBox="0 0 64 80"
        width={size}
        height={size}
        style={{ filter: earned ? 'none' : 'grayscale(1)', opacity: earned ? 1 : 0.3 }}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="50%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>

        {tier === 'crown' ? (
          <g transform="translate(0,6)">
            <path d="M6 52 L2 18 L20 32 L32 8 L44 32 L62 18 L58 52 Z" fill={`url(#${gid})`} stroke={c3} strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="6" y="52" width="52" height="10" rx="2" fill={`url(#${gid})`} stroke={c3} strokeWidth="1.5" />
            <circle cx="32" cy="8" r="3.5" fill="#e11d48" stroke={c3} />
            <circle cx="2" cy="18" r="3" fill="#2563eb" stroke={c3} />
            <circle cx="62" cy="18" r="3" fill="#2563eb" stroke={c3} />
            <circle cx="20" cy="57" r="2" fill="#fff" opacity="0.8" />
            <circle cx="32" cy="57" r="2" fill="#fff" opacity="0.8" />
            <circle cx="44" cy="57" r="2" fill="#fff" opacity="0.8" />
          </g>
        ) : (
          <g>
            <polygon points="18,0 32,28 24,32 10,6" fill="#8b1e2d" />
            <polygon points="46,0 32,28 40,32 54,6" fill="#a8293b" />
            <circle cx="32" cy="50" r="24" fill={`url(#${gid})`} stroke={c3} strokeWidth="1.5" />
            <circle cx="32" cy="50" r="18" fill="none" stroke={c3} strokeWidth="1" opacity="0.7" />
            <polygon
              points="32,40 34.4,46.2 41,46.6 35.9,50.8 37.6,57 32,53.5 26.4,57 28.1,50.8 23,46.6 29.6,46.2"
              fill={c3}
              opacity="0.85"
            />
          </g>
        )}
      </svg>

      {!earned && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.34 }}>
          🔒
        </div>
      )}
    </div>
  );
}
pages/dashboard/accomplishment.js

js
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Medal from '../../components/accomplishments/Medal';
import { TOTAL_SERMONS, TOTAL_PRAYER_CHARGES } from '../../lib/curriculumData';

// Adjust these thresholds to taste
const WORD_SEEKER_MODULES = 3;   // finish CC, C2, C3
const FAITH_HEARER_SERMONS = 20; // sermons heard

export default function AccomplishmentPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    fetch('/api/user/progress').then((r) => r.json()).then((d) => setUser(d.user || null)).catch(() => {});
  }, []);

  const modules = user?.completedModules || [];
  const sermons = user?.sermonsCompleted || 0;
  const charges = user?.prayerChargesCompleted || 0;
  const finalDone = modules.includes('final');
  const leader = finalDone && sermons >= TOTAL_SERMONS && charges >= TOTAL_PRAYER_CHARGES;

  const MEDALS = [
    { id: 'enrolled', label: 'Enrolled', tier: 'bronze', earned: true },
    { id: 'first', label: 'First Lesson', tier: 'bronze', earned: modules.length >= 1 },
    { id: 'word', label: 'Word Seeker', tier: 'silver', earned: modules.length >= WORD_SEEKER_MODULES },
    { id: 'faith', label: 'Faith Hearer', tier: 'silver', earned: sermons >= FAITH_HEARER_SERMONS },
    { id: 'grad', label: 'Graduate', tier: 'gold', earned: finalDone },
    { id: 'leader', label: 'Leader', tier: 'crown', earned: leader },
  ];

  const MILESTONES = [
    { l: 'Account Created', done: true },
    { l: 'CC Orientation Complete', done: modules.includes('cc') },
    { l: 'All 61 Sermons Heard', val: `${sermons}/${TOTAL_SERMONS}`, done: sermons >= TOTAL_SERMONS },
    { l: 'All 6 Prayer Charges', val: `${charges}/${TOTAL_PRAYER_CHARGES}`, done: charges >= TOTAL_PRAYER_CHARGES },
    { l: 'Final Exam Passed', done: finalDone },
    { l: 'Certificate Issued', done: !!user?.certificateIssued },
  ];

  const earnedCount = MEDALS.filter((m) => m.earned).length;
  const today = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
  const certNum = useMemo(() => `COLIG-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`, []);

  return (
    <DashboardLayout title="Accomplishments">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Accomplishments</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT ACHIEVEMENTS</div>
      </div>

      <div className="g2" style={{ marginBottom: 20 }}>
        <div className="wc">
          <div className="wch">
            <div className="wct">Medals Earned</div>
            <span className="tag tgg">{earnedCount}/6 EARNED</span>
          </div>
          <div className="wcb">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, textAlign: 'center' }}>
              {MEDALS.map((m) => (
                <div key={m.id}>
                  <Medal id={m.id} tier={m.tier} earned={m.earned} />
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--navy)', marginTop: 6 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 10, color: m.earned ? 'var(--gb)' : '#bbb', marginTop: 2 }}>
                    {m.earned ? 'Earned' : '🔒 Locked'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wc">
          <div className="wch"><div className="wct">Completion Milestones</div></div>
          <div className="wcb">
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < MILESTONES.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div style={{ fontSize: 13, color: m.done ? 'var(--navy)' : '#bbb' }}>{m.l}</div>
                <span className={`tag ${m.done ? 'tgg' : 'tgl'}`}>{m.done ? 'DONE' : m.val || 'PENDING'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!showCert ? (
        <div className="cert-locked">
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 21, fontWeight: 700, color: 'var(--navy)', marginBottom: 7 }}>Certificate of Completion</div>
          <div style={{ fontSize: 13, color: '#9a9a9a', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 14px' }}>
            Complete all six course modules, listen to all 61 sermons, finish the six prayer charges, and pass the Final Exam to receive your official COLIG Leadership Foundation School certificate.
          </div>
          {!leader && (
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: '#bbb', marginBottom: 14 }}>
              🔒 LOCKED — COMPLETE ALL REQUIREMENTS TO UNLOCK
            </div>
          )}
          <button
            className="bs bs-g"
            onClick={() => {
              setShowCert(true);
              toast.success(leader ? 'Certificate ready!' : 'Certificate preview generated!');
            }}
          >
            {leader ? 'VIEW CERTIFICATE →' : 'PREVIEW CERTIFICATE →'}
          </button>
        </div>
      ) : (
        <div className="certprev">
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: 5, color: 'rgba(201,146,26,0.68)', marginBottom: 6 }}>COLIG LEADERSHIP FOUNDATION SCHOOL</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 13, color: 'rgba(255,255,255,0.48)', marginBottom: 18 }}>This is to certify that</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 34, fontWeight: 900, color: 'var(--gold)', marginBottom: 6 }}>{session?.user?.name || 'Your Name'}</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, letterSpacing: 3, color: 'rgba(255,255,255,0.48)', marginBottom: 20 }}>LEADERSHIP FOUNDATION PROGRAMME</div>
          <div style={{ width: 100, height: 2, background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', margin: '0 auto 20px' }} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 20px' }}>
            has successfully completed all six course modules, the Sermon Project comprising 61 messages, and the Final Assessment.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 18 }}>
            {['STUDENT SIGNATURE', 'SCHOOL DIRECTOR'].map((lbl) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ width: 100, height: 1, background: 'rgba(201,146,26,0.4)', margin: '8px auto 4px' }} />
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.28)' }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.24)' }}>
            Issued: {today} · Certificate No. {certNum}
          </div>
          <button
            onClick={() => window.print()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,146,26,0.12)', border: '1px solid rgba(201,146,26,0.3)', borderRadius: 8, padding: '10px 18px', marginTop: 18, cursor: 'pointer', fontFamily: "'Barlow Condensed'", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--gold)' }}
          >
            PRINT / SAVE AS PDF
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
The mapping I used is Enrolled and First Lesson in bronze, Word Seeker and Faith Hearer in silver, Graduate in gold, and Leader as the crown. The earning rules are my own guess: first lesson is any completed session, Word Seeker is 3 modules, Faith Hearer is 20 sermons, Graduate is the final exam, and Leader is everything done. Change the two constants at the top if you want different ones.

13. Grades: pages/dashboard/grades.js
All the note and tick icons are gone. Only the padlocks and the 🏁 flag remain.

js
import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function GradesPage() {
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/grades')
      .then((r) => r.json())
      .then((d) => {
        setRows(d.rows || []);
        setSummary(d.summary || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const s = summary || { lessonsDone: 0, totalLessons: 6, avgScore: 0, overallGrade: '—', finalExamLocked: true };

  return (
    <DashboardLayout title="Grades">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div className="pg-t">My Grades</div>
          <div className="pg-s">COLIG FOUNDATION · ACADEMIC RECORD</div>
        </div>
        <span className="tag tgg" style={{ fontSize: 11, padding: '8px 16px' }}>
          OVERALL: {s.overallGrade}{s.avgScore ? ` (${s.avgScore}%)` : ''}
        </span>
      </div>

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="sc">
          <div className="sc-l">SESSIONS DONE</div>
          <div className="sc-v" style={{ color: 'var(--gold)' }}>
            {s.lessonsDone}<span style={{ fontSize: 15, color: '#9a9a9a' }}>/{s.totalLessons}</span>
          </div>
          <div className="sc-s">Of total sessions</div>
        </div>
        <div className="sc">
          <div className="sc-l">AVG SCORE</div>
          <div className="sc-v" style={{ color: 'var(--gb)' }}>{s.avgScore ? `${s.avgScore}%` : '—'}</div>
          <div className="sc-s">Knowledge checks</div>
        </div>
        <div className="sc">
          <div className="sc-i">🏁</div>
          <div className="sc-l">FINAL EXAM</div>
          <div className="sc-v" style={{ color: s.finalExamLocked ? '#ccc' : 'var(--gb)', fontSize: 16, fontFamily: "'Barlow Condensed'", fontWeight: 800 }}>
            {s.finalExamLocked ? '🔒 LOCKED' : s.finalExamDone ? 'COMPLETE' : 'OPEN'}
          </div>
          <div className="sc-s">{s.finalExamLocked ? 'Complete all modules' : 'Ready'}</div>
        </div>
      </div>

      <div className="wc">
        <div className="wch"><div className="wct">Grade Breakdown by Module</div></div>
        <table className="gtbl">
          <thead>
            <tr><th>MODULE</th><th>KNOWLEDGE CHECK</th><th>REFLECTION</th><th>STATUS</th><th>GRADE</th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} style={{ padding: 20, color: '#999' }}>Loading…</td></tr>}
            {rows.map((row) => {
              const locked = row.status === 'LOCKED';
              return (
                <tr key={row.key}>
                  <td>
                    <strong>
                      {row.key === 'final' ? '🏁 ' : ''}{row.module}{locked ? ' 🔒' : ''}
                    </strong>
                  </td>
                  <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.knowledgeCheck}</td>
                  <td style={{ color: row.done ? 'var(--mid)' : '#ccc' }}>{row.reflection}</td>
                  <td><span className={`tag ${row.done ? 'tg' : 'tgl'}`}>{row.status}</span></td>
                  <td><span className={`gb2 ${row.done ? 'ga' : 'gp'}`}>{row.grade}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
14. Profile page
Your profile page already calls /api/user/progress. It reads d.user.name/phone/state and PATCHes them, and the endpoint above now supports both, so no change is needed.

Test order
Restart npm run dev after adding next.config.js.
Log in, then open /dashboard/curriculum. Complete or skip the reflection on CC and C2 should unlock.
Write a testimony, then open / and scroll to the testimonies section.
Put audio in public/audio, then open /api/sermons?sync=1 and visit the sermon library.
Do prayer charge 1. Charge 2 should open.
I left one thing out on purpose: the Final Exam only requires C6 to be complete, not the 61 sermons. Gating it on sermons is a one-line change in isUnlocked once you’re ready to enforce it. Also, /api/testimonies/public shows every testimony to anyone, as you asked. If students might write private things, I’d add a “show on home page” checkbox to the diary form.


Yes, do the final exam section. Checking when c6 is complete. If yes, the final section can be done. Also, the students testimony diaries, show have a button to show on home page, and remove on home page and it should refelct on the home page when added or removed liekwise. If student ha

pasted

Added to memory colig-school-app.md
Here are the four features. The final exam already unlocks only when C6 is complete, since isUnlocked checks the previous course. The new exam API also enforces it on the server.

1. Final exam
lib/progressUtil.js (new). It moves recalc out of the progress API so the exam route can share it.

js
import { COURSES, TOTAL_SERMONS, TOTAL_PRAYER_CHARGES } from './curriculumData';

export function recalc(p) {
  const m = (Math.min(p.completedModules.length, COURSES.length) / COURSES.length) * 40;
  const s = (Math.min(p.sermonsCompleted, TOTAL_SERMONS) / TOTAL_SERMONS) * 40;
  const pr = (Math.min(p.prayerChargesCompleted, TOTAL_PRAYER_CHARGES) / TOTAL_PRAYER_CHARGES) * 20;
  p.overallProgress = Math.round(m + s + pr);
}
pages/api/user/progress.js has three edits:

js
// 1. top: delete the local recalc() function and add
import { recalc } from '../../../lib/progressUtil';

// 2. inside PATCH, right after `if (moduleId) {` add this guard first
        if (moduleId === 'final') {
          return res.status(403).json({ error: 'Pass the final exam to complete this stage.' });
        }

// 3. GET branch: replace it with this (also records activity for the "away" email)
  if (req.method === 'GET') {
    const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user?.lastActiveAt || Date.now() - new Date(user.lastActiveAt).getTime() > 60 * 60 * 1000) {
      await User.updateOne({ _id: userId }, { $set: { lastActiveAt: new Date() } });
    }
    return res.status(200).json(payload(user, progress));
  }
models/Progress.js: add attempts inside grade():

js
  attempts: { type: Number, default: 0 },
lib/finalExamData.js (server only, with the answers). I used the three questions from your commented-out lesson file. Replace and add more with your real exam questions. With only 3, a student needs 3/3 to reach 70%.

js
export const PASSING_SCORE = 70;

// answer = index of the correct option (0 = first)
export const FINAL_EXAM = [
  {
    q: 'What is the primary aim of COLIG Leadership Foundation School?',
    options: [
      'To equip believers with sound doctrine, spiritual discipline, and servant leadership',
      'To train pastors for church planting only',
      'To provide secular leadership skills',
      'To replace church membership',
    ],
    answer: 0,
  },
  {
    q: 'According to Romans 10:17, faith comes by:',
    options: [
      'Fasting and prayer alone',
      'Hearing, and hearing by the Word of God',
      'Good works and service',
      'Church attendance alone',
    ],
    answer: 1,
  },
  {
    q: 'How many course modules does the Foundation School have?',
    options: ['4', '5', '6 — CC, C2, C3, C4, C5, C6', '8'],
    answer: 2,
  },
];
pages/api/final-exam.js

js
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import connectDB from '../../lib/mongodb';
import Progress from '../../models/Progress';
import { FINAL_EXAM, PASSING_SCORE } from '../../lib/finalExamData';
import { recalc } from '../../lib/progressUtil';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  await connectDB();

  const userId = session.user.id;
  let progress = await Progress.findOne({ userId });
  if (!progress) progress = await Progress.create({ userId });

  // The final exam only opens once C6 is complete
  if (!progress.completedModules.includes('c6')) {
    return res.status(403).json({ error: 'Complete C6 first to unlock the final exam.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      questions: FINAL_EXAM.map(({ q, options }, id) => ({ id, q, options })),
      passingScore: PASSING_SCORE,
      passed: progress.completedModules.includes('final'),
      bestScore: progress.grades?.final?.score ?? null,
    });
  }

  if (req.method === 'POST') {
    const { answers } = req.body || {};
    if (!Array.isArray(answers) || answers.length !== FINAL_EXAM.length) {
      return res.status(400).json({ error: 'Answer every question.' });
    }

    const total = FINAL_EXAM.length;
    const correct = FINAL_EXAM.filter((x, i) => answers[i] === x.answer).length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= PASSING_SCORE;

    progress.set('grades.final.attempts', (progress.grades?.final?.attempts || 0) + 1);
    if (score > (progress.grades?.final?.score ?? -1)) progress.set('grades.final.score', score);

    if (passed && !progress.completedModules.includes('final')) {
      progress.completedModules.push('final');
      progress.currentModule = 'final';
      progress.set('grades.final.submitted', true);
      progress.set('grades.final.knowledge', 'submitted');
      progress.set('grades.final.reflection', 'submitted');
      progress.certificateIssued = true;
      progress.certificateIssuedAt = new Date();
    }

    recalc(progress);
    await progress.save();
    return res.status(200).json({ score, correct, total, passed, passingScore: PASSING_SCORE });
  }

  return res.status(405).end();
}
components/curriculum/FinalExam.js

js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function FinalExam({ course, onPassed }) {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/final-exam')
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not load the exam');
        return d;
      })
      .then((d) => {
        setExam(d);
        setAnswers(new Array(d.questions.length).fill(null));
      })
      .catch((e) => setError(e.message));
  }, []);

  async function submit() {
    setBusy(true);
    try {
      const res = await fetch('/api/final-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Could not submit');
      setResult(d);
      if (d.passed) {
        toast.success('You passed the final exam!');
        onPassed && onPassed();
      } else {
        toast.error(`Score ${d.score}%. You need ${d.passingScore}% — try again.`);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  function retake() {
    setResult(null);
    setAnswers(new Array(exam.questions.length).fill(null));
  }

  if (error) return <div className="fe-msg">🔒 {error}</div>;
  if (!exam) return <div className="fe-msg">Loading exam…</div>;

  if (result?.passed || (exam.passed && !result)) {
    return (
      <div className="fe-msg">
        <h2>Final Exam Passed</h2>
        <p>
          {result ? `Your score: ${result.score}%` : exam.bestScore != null ? `Your best score: ${exam.bestScore}%` : ''}
        </p>
        <Link href="/dashboard/certificate" legacyBehavior>
          <a className="fe-btn">GET YOUR CERTIFICATE →</a>
        </Link>
        <style jsx>{styles}</style>
      </div>
    );
  }

  if (result && !result.passed) {
    return (
      <div className="fe-msg">
        <h2>Not yet</h2>
        <p>You scored {result.score}% ({result.correct}/{result.total}). The pass mark is {result.passingScore}%.</p>
        <button className="fe-btn" onClick={retake}>TRY AGAIN</button>
        <style jsx>{styles}</style>
      </div>
    );
  }

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div>
      <div className="fe-eyebrow">CAPSTONE</div>
      <h2 className="fe-title">{course?.title || 'Final Exam'}</h2>
      <p className="fe-sub">Pass mark: {exam.passingScore}%. Answer every question, then submit.</p>

      {exam.questions.map((q, qi) => (
        <div key={q.id} className="fe-q">
          <div className="fe-qt">{qi + 1}. {q.q}</div>
          {q.options.map((opt, oi) => (
            <label key={oi} className={`fe-opt ${answers[qi] === oi ? 'on' : ''}`}>
              <input
                type="radio"
                name={`q${qi}`}
                checked={answers[qi] === oi}
                onChange={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      ))}

      <button className="fe-btn" disabled={!allAnswered || busy} onClick={submit}>
        {busy ? 'SUBMITTING…' : 'SUBMIT FINAL EXAM'}
      </button>
      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
  .fe-msg { padding: 40px 20px; text-align: center; color: var(--mid); }
  .fe-msg h2 { color: var(--navy); margin-bottom: 8px; }
  .fe-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--gold); margin-bottom: 6px; }
  .fe-title { font-size: 20px; font-weight: 700; color: var(--navy); }
  .fe-sub { font-size: 13px; color: var(--mid); margin: 6px 0 22px; }
  .fe-q { background: #fff; border: 1px solid #ececec; border-radius: 10px; padding: 18px; margin-bottom: 14px; }
  .fe-qt { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
  .fe-opt { display: flex; gap: 10px; align-items: center; padding: 10px 12px; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 8px; cursor: pointer; font-size: 13px; color: var(--txt); }
  .fe-opt.on { border-color: var(--gold); background: #faf6ea; }
  .fe-btn { display: inline-block; margin-top: 10px; border: none; background: var(--gold); color: var(--navy); padding: 12px 22px; border-radius: 6px; font-size: 11px; font-weight: 800; letter-spacing: 1px; cursor: pointer; text-decoration: none; }
  .fe-btn:disabled { opacity: 0.5; cursor: not-allowed; }
`;
components/curriculum/LessonView.js: three small edits.

js
import FinalExam from './FinalExam';
// props:
export default function LessonView({ lessonKey, course: apiCourse, busy = false, onComplete, onExamPassed }) {
// after the existing `if (!course) return ...` line:
  if (lessonKey === 'final') return <FinalExam course={course} onPassed={onExamPassed} />;
pages/dashboard/curriculum/index.js: pass the new prop:

js
              <LessonView
                key={active.key}
                lessonKey={active.key}
                course={active}
                busy={busy}
                onComplete={handleComplete}
                onExamPassed={() => load('final')}
              />
2. Testimonies: show / remove on the home page
models/Testimony.js: replace the sharedWithCommunity field with:

js
    showOnHome: { type: Boolean, default: false },
pages/api/testimonies/index.js: change the POST create and add PATCH:

js
    const testimony = await Testimony.create({
      userId: session.user.id,
      authorName: session.user.name || 'Student',
      title: title.trim(),
      text: text.trim(),
      showOnHome: !!req.body.showOnHome,
    });
    return res.status(201).json({ testimony });
  }

  if (req.method === 'PATCH') {
    const { id, showOnHome } = req.body || {};
    const testimony = await Testimony.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: { showOnHome: !!showOnHome } },
      { new: true }
    );
    if (!testimony) return res.status(404).json({ error: 'Testimony not found' });
    return res.status(200).json({ testimony });
  }
pages/api/testimonies/public.js: change the match so only shown testimonies are returned:

js
      { $match: { approved: true, showOnHome: true } },
pages/dashboard/testimony-diary.js (full file)

js
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function TestimonyPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', text: '', showOnHome: false });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonies')
      .then((r) => r.json())
      .then((d) => setList(d.testimonies || []))
      .catch(() => toast.error('Could not load your testimonies'))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.text.trim()) return toast.error('Fill in both fields');
    setSaving(true);
    try {
      const res = await fetch('/api/testimonies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setList((l) => [data.testimony, ...l]);
      setForm({ title: '', text: '', showOnHome: false });
      toast.success(form.showOnHome ? 'Saved and shown on the home page.' : 'Testimony saved.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleHome(t) {
    const next = !t.showOnHome;
    setList((l) => l.map((x) => (x._id === t._id ? { ...x, showOnHome: next } : x))); // instant
    try {
      const res = await fetch('/api/testimonies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: t._id, showOnHome: next }),
      });
      if (!res.ok) throw new Error();
      toast.success(next ? 'Now showing on the home page.' : 'Removed from the home page.');
    } catch {
      setList((l) => l.map((x) => (x._id === t._id ? { ...x, showOnHome: !next } : x)));
      toast.error('Could not update — try again');
    }
  }

  return (
    <DashboardLayout title="Testimony Diary">
      <div style={{ marginBottom: 16 }}>
        <div className="pg-t">Testimony Diary</div>
        <div className="pg-s">COLIG FOUNDATION · STUDENT PORTAL</div>
      </div>

      <div className="prform" style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 13 }}>
          Write a Testimony ✍️
        </div>
        <form onSubmit={handleAdd}>
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>TITLE</label>
          <input className="fi" type="text" required placeholder="Give your testimony a title…"
            style={{ background: '#fafaf8', borderColor: '#e0e0e0', color: 'var(--txt)', marginBottom: 11 }}
            value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          <label className="sc-l" style={{ display: 'block', marginBottom: 6 }}>YOUR TESTIMONY</label>
          <textarea className="rta" required placeholder="Share what God has done in your life…"
            style={{ minHeight: 110, marginBottom: 12 }}
            value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--mid)', marginBottom: 14, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.showOnHome}
              onChange={(e) => setForm((p) => ({ ...p, showOnHome: e.target.checked }))} />
            Also show this on the school home page
          </label>
          <button type="submit" className="bs bs-g" disabled={saving}>
            {saving ? 'SAVING…' : 'SAVE TESTIMONY →'}
          </button>
        </form>
      </div>

      {loading && <div style={{ color: '#888', padding: 20 }}>Loading…</div>}
      {!loading && list.length === 0 && <div style={{ color: '#888', padding: 20 }}>You haven't written a testimony yet.</div>}

      {list.map((t) => (
        <div key={t._id} className="tsit">
          <div className="tsiq">"</div>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>
            {t.title}
          </div>
          <div className="tsi-tx">{t.text}</div>
          <div className="tsi-au">— {t.authorName}</div>
          <div className="tsi-dt">{format(new Date(t.createdAt), 'MMMM yyyy')}</div>
          <button
            className="bs bs-o"
            style={{ marginTop: 12, fontSize: 10, padding: '8px 14px' }}
            onClick={() => toggleHome(t)}
          >
            {t.showOnHome ? 'REMOVE FROM HOME PAGE' : 'SHOW ON HOME PAGE'}
          </button>
          {t.showOnHome && (
            <span style={{ marginLeft: 10, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'var(--gb)' }}>
              LIVE ON HOME PAGE
            </span>
          )}
        </div>
      ))}
    </DashboardLayout>
  );
}
components/home/Testimonies.js: so the home page picks up additions and removals without a manual refresh, replace the first useEffect with the code below. It re-checks every 30 seconds and when the tab regains focus, and keeps the current order while adding new ones at random. Also change const t = items[index]; to const t = items[index % items.length];.

js
  useEffect(() => {
    let mounted = true;

    const load = () =>
      fetch('/api/testimonies/public', { cache: 'no-store' })
        .then((r) => r.json())
        .then((d) => {
          if (!mounted) return;
          const fresh = d.testimonies || [];
          setItems((prev) => {
            if (!prev.length) return shuffle(fresh);
            const byId = new Map(fresh.map((f) => [f._id, f]));
            const kept = prev.filter((p) => byId.has(p._id)).map((p) => byId.get(p._id));
            const known = new Set(prev.map((p) => p._id));
            const added = shuffle(fresh.filter((f) => !known.has(f._id)));
            return [...kept, ...added];
          });
          setIndex((i) => i);
        })
        .catch(() => {});

    load();
    const timer = setInterval(load, 30000);
    window.addEventListener('focus', load);
    return () => {
      mounted = false;
      clearInterval(timer);
      window.removeEventListener('focus', load);
    };
  }, []);
3. “You’ve been away” email
models/User.js: add two fields (in the one copy you keep):

js
    lastActiveAt: { type: Date },
    lastReminderAt: { type: Date },
Activity is recorded when the student opens the dashboard (the progress GET above).

lib/Email.js: add this function:

js
export async function sendInactivityEmail(email, name, daysAway) {
  await transporter.sendMail({
    from: `"COLIG Foundation School" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We've missed you — continue your course at COLIG Foundation School",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a2a43;color:#fff;padding:40px;border-radius:12px;">
        <h1 style="font-size:26px;color:#c9921a;letter-spacing:4px;text-align:center;">COLIG FOUNDATION</h1>
        <h2 style="color:#fff;font-size:20px;">Hello, ${name}</h2>
        <p style="color:rgba(255,255,255,0.75);line-height:1.8;">
          You've been away from the Leadership Foundation School for ${daysAway} days.
          Your course is waiting for you — pick up where you stopped, keep your prayer
          charges going, and keep moving toward your certificate.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/curriculum"
             style="background:#c9921a;color:#0a2a43;padding:16px 40px;border-radius:6px;font-weight:800;letter-spacing:2px;text-decoration:none;font-size:14px;">
            COMPLETE YOUR COURSE NOW
          </a>
        </div>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;">
          "Be steadfast, immovable, always abounding in the work of the Lord." — 1 Corinthians 15:58
        </p>
      </div>
    `,
  });
}
pages/api/cron/inactivity.js: a protected daily job. It skips admins and students who already passed the final exam, and reminds each student at most once a week.

js
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import Progress from '../../../models/Progress';
import { sendInactivityEmail } from '../../../lib/Email';

const AWAY_DAYS = 2;
const REMIND_EVERY_DAYS = 7;
const DAY = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();
  const now = Date.now();
  const awayCutoff = new Date(now - AWAY_DAYS * DAY);
  const remindCutoff = new Date(now - REMIND_EVERY_DAYS * DAY);

  const finished = await Progress.find({ completedModules: 'final' }).distinct('userId');

  const users = await User.find({
    role: 'student',
    _id: { $nin: finished },
    $and: [
      { $or: [{ lastActiveAt: { $lt: awayCutoff } }, { lastActiveAt: null, createdAt: { $lt: awayCutoff } }] },
      { $or: [{ lastReminderAt: null }, { lastReminderAt: { $lt: remindCutoff } }] },
    ],
  })
    .select('name email lastActiveAt createdAt')
    .limit(200);

  let sent = 0;
  const failed = [];
  for (const u of users) {
    const last = new Date(u.lastActiveAt || u.createdAt).getTime();
    const daysAway = Math.max(AWAY_DAYS, Math.floor((now - last) / DAY));
    try {
      await sendInactivityEmail(u.email, u.name, daysAway);
      await User.updateOne({ _id: u._id }, { $set: { lastReminderAt: new Date() } });
      sent++;
    } catch (err) {
      console.error('Inactivity email failed for', u.email, err.message);
      failed.push(u.email);
    }
  }

  return res.status(200).json({ checked: users.length, sent, failed: failed.length });
}
.env: add CRON_SECRET=pick-a-long-random-string

Scheduling: something has to call this route daily. A running Next.js app doesn’t do it by itself. On Vercel, add vercel.json, which sends the CRON_SECRET automatically:

json
{ "crons": [{ "path": "/api/cron/inactivity", "schedule": "0 8 * * *" }] }
Elsewhere, use any cron service or server cron to run curl -H "Authorization: Bearer YOUR_SECRET" https://yoursite.com/api/cron/inactivity. To test now, run that against http://localhost:3000, after setting a test user’s lastActiveAt to 3 days ago in MongoDB.

4. Certificate
The certificate appears once the final exam is passed. The name comes from the student’s account and the date is the day the exam was passed, read from the database. I converted your component to JavaScript, since your project is pages-router JS, and kept your CSS and coordinates exactly. If public/images/colig-certificate.png exists, it uses that artwork with your overlay positions. If the image is missing, it falls back to a certificate built entirely in code (a double border, corner ornaments, a seal, and signature lines), so it works before you add the artwork.

pages/api/certificate.js

js
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import connectDB from '../../lib/mongodb';
import Progress from '../../models/Progress';
import User from '../../models/User';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  if (req.method !== 'GET') return res.status(405).end();

  await connectDB();
  const userId = session.user.id;
  const [progress, user] = await Promise.all([
    Progress.findOne({ userId }).lean(),
    User.findById(userId).select('name').lean(),
  ]);

  if (!progress?.completedModules?.includes('final')) {
    return res.status(200).json({ eligible: false });
  }

  const issued = progress.certificateIssuedAt ? new Date(progress.certificateIssuedAt) : new Date();
  return res.status(200).json({
    eligible: true,
    studentName: user?.name || session.user.name || 'Student',
    completionDate: issued.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    certificateNumber: `COLIG-${issued.getFullYear()}-${String(userId).slice(-6).toUpperCase()}`,
    finalScore: progress.grades?.final?.score ?? null,
  });
}
components/certificate/ColigCertificate.js

js
import { useEffect, useState } from 'react';

export default function ColigCertificate({
  studentName,
  completionDate,
  certificateNumber,
  artwork = '/images/colig-certificate.png',
}) {
  const [art, setArt] = useState('checking'); // 'checking' | 'yes' | 'no'

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setArt('yes');
    img.onerror = () => setArt('no');
    img.src = artwork;
  }, [artwork]);

  return (
    <main className="certificate-page">
      <section className="certificate" aria-label="COLIG Certificate of Completion">
        {art === 'yes' && (
          <>
            <img src={artwork} alt="" className="certificate-art" />
            <div className="student-name" title={studentName}>{studentName}</div>
            <div className="date-patch" aria-hidden="true" />
            <div className="completion-copy">
              for completing the COLIG Leadership Foundation School on
              <span>{completionDate}</span>
            </div>
          </>
        )}

        {art === 'no' && (
          <>
            <div className="cc-frame" />
            <div className="cc-frame-inner" />
            <i className="cc-corner tl" /><i className="cc-corner tr" />
            <i className="cc-corner bl" /><i className="cc-corner br" />

            <div className="cc-content">
              <div className="cc-brand">COLIG</div>
              <div className="cc-brand-sub">LEADERSHIP FOUNDATION SCHOOL</div>

              <svg className="cc-seal" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id="cc-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff1a8" />
                    <stop offset="50%" stopColor="#e6b422" />
                    <stop offset="100%" stopColor="#9a6d0a" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,2 58,12 70,6 74,19 87,18 86,31 98,36 91,47 99,58 88,64 91,77 78,78 74,91 62,86 50,98 38,86 26,91 22,78 9,77 12,64 1,58 9,47 2,36 14,31 13,18 26,19 30,6 42,12"
                  fill="url(#cc-gold)"
                />
                <circle cx="50" cy="50" r="31" fill="none" stroke="#7a5408" strokeWidth="1.5" />
                <polygon
                  points="50,30 55,43 69,44 58,53 62,67 50,59 38,67 42,53 31,44 45,43"
                  fill="#7a5408"
                />
              </svg>

              <h1 className="cc-title">CERTIFICATE OF COMPLETION</h1>
              <div className="cc-line">This is to certify that</div>
              <div className="cc-name" title={studentName}>{studentName}</div>
              <div className="cc-rule" />
              <div className="cc-line">
                has successfully completed the Leadership Foundation Programme,
                including all course modules and the Final Examination, on
              </div>
              <div className="cc-date">{completionDate}</div>

              <div className="cc-sign-row">
                <div className="cc-sign"><span /><small>SCHOOL DIRECTOR</small></div>
                <div className="cc-sign"><span /><small>REGISTRAR</small></div>
              </div>

              {certificateNumber && <div className="cc-number">Certificate No. {certificateNumber}</div>}
            </div>
          </>
        )}
      </section>

      <style jsx global>{`
        .certificate-page * { box-sizing: border-box; }
        .certificate-page { width: 100%; padding: 24px; background: #f1f1f1; }
        .certificate {
          position: relative; width: min(100%, 1536px); aspect-ratio: 3 / 2;
          margin: 0 auto; overflow: hidden; background: #f8f7f4; color: #080808;
          font-family: Arial, Helvetica, sans-serif;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
        .certificate-art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; z-index: 0; }

        .student-name {
          position: absolute; z-index: 2; left: 18.1%; top: 61.2%; width: 63.5%; min-height: 3.1%;
          display: flex; align-items: center; justify-content: center; padding: 0 1.5%;
          color: #080808; font-size: clamp(14px, 2vw, 30px); line-height: 1.15; font-weight: 600;
          text-align: center; overflow-wrap: anywhere;
        }
        .date-patch { position: absolute; z-index: 1; left: 36%; top: 65.8%; width: 28.5%; height: 5.3%; background: rgba(248, 247, 244, 0.98); }
        .completion-copy {
          position: absolute; z-index: 2; left: 20%; top: 65.8%; width: 60%; color: #080808;
          font-size: clamp(10px, 1.55vw, 23px); line-height: 1.45; font-weight: 500; text-align: center;
        }
        .completion-copy span { display: block; font-weight: 700; }

        /* ---- code-built design (used when no artwork image is present) ---- */
        .cc-frame { position: absolute; inset: 2.4%; border: clamp(4px, 0.6vw, 9px) solid #0a1628; }
        .cc-frame-inner { position: absolute; inset: 3.8%; border: 2px solid #c9921a; }
        .cc-corner { position: absolute; width: 2.2%; aspect-ratio: 1; background: #c9921a; transform: rotate(45deg); }
        .cc-corner.tl { left: 3.2%; top: 4.8%; } .cc-corner.tr { right: 3.2%; top: 4.8%; }
        .cc-corner.bl { left: 3.2%; bottom: 4.8%; } .cc-corner.br { right: 3.2%; bottom: 4.8%; }
        .cc-content {
          position: absolute; inset: 7% 10%; display: flex; flex-direction: column;
          align-items: center; justify-content: space-between; text-align: center;
        }
        .cc-brand { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(18px, 3vw, 46px); letter-spacing: 0.25em; color: #0a1628; }
        .cc-brand-sub { font-size: clamp(6px, 0.95vw, 14px); letter-spacing: 0.4em; color: #c9921a; font-weight: 700; margin-top: -0.4%; }
        .cc-seal { width: clamp(36px, 7%, 110px); height: auto; aspect-ratio: 1; }
        .cc-title { font-family: 'Playfair Display', serif; font-weight: 800; font-size: clamp(14px, 2.9vw, 44px); letter-spacing: 0.12em; color: #0a1628; margin: 0; }
        .cc-line { font-size: clamp(8px, 1.3vw, 19px); color: #333; line-height: 1.6; max-width: 80%; }
        .cc-name { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; font-size: clamp(18px, 4vw, 60px); color: #0a1628; line-height: 1.1; max-width: 90%; overflow-wrap: anywhere; }
        .cc-rule { width: 30%; height: 2px; background: linear-gradient(90deg, transparent, #c9921a, transparent); }
        .cc-date { font-size: clamp(10px, 1.7vw, 25px); font-weight: 700; color: #0a1628; }
        .cc-sign-row { display: flex; gap: 14%; width: 70%; justify-content: center; }
        .cc-sign { flex: 1; text-align: center; }
        .cc-sign span { display: block; height: 1px; background: #0a1628; margin-bottom: 6px; }
        .cc-sign small { font-size: clamp(6px, 0.85vw, 12px); letter-spacing: 0.25em; color: #555; font-weight: 700; }
        .cc-number { font-size: clamp(6px, 0.8vw, 11px); letter-spacing: 0.2em; color: #888; }

        @media (max-width: 700px) {
          .certificate-page { padding: 8px; }
          .student-name { font-size: clamp(8px, 2vw, 14px); }
          .completion-copy { font-size: clamp(6px, 1.45vw, 10px); }
        }

        @media print {
          @page { size: landscape; margin: 0; }
          .no-print { display: none !important; }
          .certificate-page { padding: 0; background: white; }
          .certificate {
            width: 100vw; height: 66.6667vw; max-width: none; margin: 0; box-shadow: none;
            print-color-adjust: exact; -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}
pages/dashboard/certificate.js

js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ColigCertificate from '../../components/certificate/ColigCertificate';

export default function CertificatePage() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/auth/login');
    if (status !== 'authenticated') return;
    fetch('/api/certificate')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ eligible: false }))
      .finally(() => setLoading(false));
  }, [status, router]);

  return (
    <>
      <Head><title>Certificate | COLIG Leadership Foundation School</title></Head>

      <div className="bar no-print">
        <Link href="/dashboard/accomplishment" legacyBehavior><a>← BACK TO DASHBOARD</a></Link>
        {data?.eligible && <button onClick={() => window.print()}>PRINT / SAVE AS PDF</button>}
      </div>

      {loading && <div className="msg no-print">Loading…</div>}

      {!loading && data && !data.eligible && (
        <div className="msg no-print">
          🔒 Your certificate unlocks when you pass the Final Exam.
          <br />
          <Link href="/dashboard/curriculum" legacyBehavior><a className="go">GO TO CURRICULUM →</a></Link>
        </div>
      )}

      {data?.eligible && (
        <ColigCertificate
          studentName={data.studentName}
          completionDate={data.completionDate}
          certificateNumber={data.certificateNumber}
        />
      )}

      <style jsx>{`
        .bar { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; background: #0a1628; }
        .bar a { color: #fff; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
        .bar button { background: #c9921a; color: #0a1628; border: none; padding: 10px 18px; border-radius: 6px; font-size: 11px; font-weight: 800; letter-spacing: 1px; cursor: pointer; }
        .msg { padding: 80px 20px; text-align: center; color: #555; line-height: 2; }
        .go { color: #c9921a; font-weight: 800; font-size: 12px; letter-spacing: 1px; text-decoration: none; }
      `}</style>
    </>
  );
}
pages/dashboard/accomplishment.js: replace the certificate section so it links to the real certificate. Replace the whole {!showCert ? ( … ) : ( … )} block with:

js
      <div className="cert-locked">
        <div style={{ fontFamily: "'Playfair Display'", fontSize: 21, fontWeight: 700, color: 'var(--navy)', marginBottom: 7 }}>
          Certificate of Completion
        </div>
        <div style={{ fontSize: 13, color: '#9a9a9a', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 14px' }}>
          Pass the Final Exam to receive your official COLIG Leadership Foundation School certificate, personalised with your name.
        </div>
        {finalDone ? (
          <Link href="/dashboard/certificate" legacyBehavior>
            <a className="bs bs-g" style={{ display: 'inline-block', textDecoration: 'none' }}>GET YOUR CERTIFICATE →</a>
          </Link>
        ) : (
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 10, letterSpacing: 3, color: '#bbb' }}>
            🔒 LOCKED — PASS THE FINAL EXAM TO UNLOCK
          </div>
        )}
      </div>
Then add import Link from 'next/link';, and delete the showCert state, today, certNum, the useMemo import, and the toast import if nothing else uses it.

Setup and testing notes
Artwork: put your certificate PNG at public/images/colig-certificate.png. Without it, the code-built design shows. To see the code design anyway, leave the file out.
Printing: the Print button gives a landscape certificate. In the browser print dialog, choose “Save as PDF” and turn on background graphics if the design looks washed out.
To test the whole flow quickly: in MongoDB, set a test user’s completedModules to ["cc","c2","c3","c4","c5","c6"] in the progresses collection. Then open /dashboard/curriculum, take the Final Exam, and click the certificate link.
Old testimonies created before this change have no showOnHome, so they won’t appear on the home page until the student clicks Show.

Claude works directly with your codebase



Claude is AI and can make mistakes. Please double-check responses.
Claude finished the response
Retry
=====
THESE ABOVE HAVE NEWLY EDDITTED FILES TO PROJECT. SO THIS IS MY NEW FILES AND FOLDERS EDITTED INTO THE ORIGINAL ONE. SAME STRUCTURE. 

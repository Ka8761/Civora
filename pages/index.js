
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
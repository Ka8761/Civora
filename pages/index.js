
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroMain from '../components/home/HeroMain';
import About from '../components/home/About';
import Curriculum from '../components/home/Curriculum';
import Journey from '../components/home/Journey';
import Community from '../components/home/Community';
import CTA from '../components/home/CTA';
// import HowItWorks from '../components/home/HowItWorks';
import Testimonies from '../components/home/Testimonies';
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
        <Testimonies/>
        <CTA />
        {/* <HowItWorks /> */}
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

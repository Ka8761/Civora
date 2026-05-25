
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroMain from '../components/home/HeroMain';
import About from '../components/home/About';
import HowItWorks from '../components/home/HowItWorks';
import ProfitModel from '../components/home/ProfitModel';
import Trust from '../components/home/Trust';
import Tiers from '../components/home/Tiers';
import NewsSection from '../components/home/NewsSection';
import InvestorForm from '../components/home/InvestorForm';
import SupportButton from '../components/ui/SupportButton';

export default function Home() {
  return (
    <>
      <Head>
        <title>CIVORA FARMS — Real Land. Real Growth. | Kaduna Agricultural Investment</title>
        <meta name="description" content="Invest in verified Kaduna farmland from ₦50,000. Legal, insured, and transparent agricultural investment with 20–28% projected returns per season." />
      </Head>
      <Navbar />
      <main>
        <HeroMain />
        <About />
        <HowItWorks />
        <ProfitModel />
        <Trust />
        <Tiers />
        <NewsSection />
        <InvestorForm />
      </main>
      <Footer />
      <SupportButton />
    </>
  );
}


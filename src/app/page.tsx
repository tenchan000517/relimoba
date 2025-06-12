// Update app/page.tsx to include the new PointsGuideSection

import Hero from '@/components/Hero';
import Feature from '@/components/Feature';
import TokenReward from '@/components/TokenReward';
import PricingPlans from '@/components/PricingPlans';
import FAQ from '@/components/FAQ';
import AboutSection from '@/components/AboutSection';
import ProjectSection from '@/components/ProjectSection';
import MyPageSection from '@/components/MyPageSection';
import Web3MoneySection from '@/components/Web3MoneySection';
import PointsGuideSection from '@/components/PointsGuideSection'; // Import the new component

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div id="content" className="scroll-mt-20"></div>
      <Feature />
      <div id="token_return" className="scroll-mt-20"></div>
      <TokenReward />
      <div id="aboutcn" className="scroll-mt-20"></div>
      <AboutSection />
      <div id="web3money" className="scroll-mt-20"></div>
      <Web3MoneySection />
      <div id="bonus" className="scroll-mt-20"></div>
      <PricingPlans />
      <div id="faq" className="scroll-mt-20"></div>
      <FAQ />
      <div id="message" className="scroll-mt-20"></div>
      <ProjectSection />
      <div id="points-guide" className="scroll-mt-20"></div>
      <PointsGuideSection /> {/* Add the new component */}
      <div id="mypage" className="scroll-mt-20"></div>
      <MyPageSection />
    </main>
  );
}
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TransformationSection from '@/components/TransformationSection';
import CompanyComparison from '@/components/CompanyComparison';
import DashboardHub from '@/components/DashboardHub';
import RealTimeData from '@/components/RealTimeData';
import InsightsSection from '@/components/InsightsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navbar />
      <HeroSection />
      <TransformationSection />
      <CompanyComparison />
      <DashboardHub />
      <RealTimeData />
      <InsightsSection />
      <Footer />
    </div>
  );
}

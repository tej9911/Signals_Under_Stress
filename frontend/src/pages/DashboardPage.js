import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Maximize2, Minimize2, BarChart3 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketShareDashboard from '@/components/dashboards/MarketShareDashboard';
import PricingDashboard from '@/components/dashboards/PricingDashboard';
import SubscriberDashboard from '@/components/dashboards/SubscriberDashboard';
import TechnologyDashboard from '@/components/dashboards/TechnologyDashboard';
import InsightsDashboard from '@/components/dashboards/InsightsDashboard';

const TABS = [
  { id: 'market-share', label: 'Market Share', Component: MarketShareDashboard },
  { id: 'pricing', label: 'Pricing', Component: PricingDashboard },
  { id: 'subscribers', label: 'Subscribers', Component: SubscriberDashboard },
  { id: 'technology', label: 'Technology', Component: TechnologyDashboard },
  { id: 'insights', label: 'Insights', Component: InsightsDashboard },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || 'market-share');
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (tab && tab !== activeTab) setActiveTab(tab);
  }, [tab, activeTab]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    navigate(`/dashboard/${value}`, { replace: true });
  };

  const ActiveDashboard = TABS.find(t => t.id === activeTab)?.Component || MarketShareDashboard;

  return (
    <div className={`min-h-screen bg-[#0B0F14] ${fullscreen ? 'fixed inset-0 z-[100] overflow-auto' : ''}`} data-testid="dashboard-page">
      <div className="border-b border-zinc-800 bg-[#0B0F14]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={() => navigate('/')} data-testid="dashboard-back-btn">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <div className="hidden md:block h-6 w-px bg-zinc-800" />
            <div className="hidden md:flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <h1 className="font-heading text-lg font-semibold text-white">Analytics Dashboard</h1>
            </div>
          </div>
          <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={() => setFullscreen(!fullscreen)} data-testid="dashboard-fullscreen-btn">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-3 overflow-x-auto">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="bg-zinc-900 border border-zinc-800">
              {TABS.map(t => (
                <TabsTrigger key={t.id} value={t.id} className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-400" data-testid={`tab-${t.id}`}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ActiveDashboard />
      </div>
    </div>
  );
}

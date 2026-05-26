import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, BarChart3 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Evolution', id: 'evolution' },
  { label: 'Companies', id: 'companies' },
  { label: 'Dashboards', id: 'dashboards' },
  { label: 'Live Data', id: 'realtime' },
  { label: 'Insights', id: 'insights' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-[#0B0F14]/80 border-b border-[#1F2937] shadow-lg' : 'bg-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')} data-testid="nav-brand">
            <BarChart3 className="h-6 w-6 text-blue-500" />
            <span className="font-heading text-lg font-bold text-white">TelecomIQ</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-[#111827]"
                data-testid={`nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-[#111827]" onClick={() => scrollTo('dashboards')} data-testid="nav-explore-data">
              Explore Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg" onClick={() => navigate('/dashboard')} data-testid="nav-open-dashboard">
              Open Dashboard
            </Button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} data-testid="nav-mobile-toggle">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0B0F14]/95 backdrop-blur-xl border-t border-[#1F2937] px-6 py-4" data-testid="nav-mobile-menu">
          {NAV_LINKS.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="block w-full text-left px-3 py-3 text-sm text-zinc-400 hover:text-white" data-testid={`nav-mobile-${link.id}`}>
              {link.label}
            </button>
          ))}
          <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => { navigate('/dashboard'); setMobileOpen(false); }} data-testid="nav-mobile-dashboard">
            Open Dashboard
          </Button>
        </div>
      )}
    </nav>
  );
}

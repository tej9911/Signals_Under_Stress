import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, IndianRupee, TrendingUp, Wifi } from 'lucide-react';
import { SUBSCRIBER_GROWTH, OVERVIEW_STATS, HERO_BG } from '@/data/telecomData';
import { useNavigate } from 'react-router-dom';

const chartData = SUBSCRIBER_GROWTH.map(d => ({ year: d.year, Jio: d.jio, Airtel: d.airtel, Total: d.total }));
const statIcons = [Users, IndianRupee, TrendingUp, Wifi];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-zinc-400 font-mono">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>{entry.name}: {entry.value}M</p>
      ))}
    </div>
  );
};

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen bg-[#0B0F14] overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-transparent to-[#09090B]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 lg:pt-36 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400 mb-6" data-testid="hero-label">
              Indian Telecom Analytics Platform
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95]">
              The Jio<br /><span className="text-blue-500">Effect</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed">
              How one company disrupted an entire industry, transformed 1.4 billion people's
              access to the internet, and reshaped the digital landscape of India forever.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 rounded-xl text-sm" onClick={() => navigate('/dashboard')} data-testid="hero-explore-data-btn">
                Explore The Data <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12 px-6 rounded-xl text-sm" onClick={() => document.getElementById('evolution')?.scrollIntoView({ behavior: 'smooth' })} data-testid="hero-view-analysis-btn">
                View Analysis
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-12">
              {OVERVIEW_STATS.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors" data-testid={`hero-stat-${i}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-zinc-600" />
                      <p className="text-xs text-zinc-500 truncate">{stat.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-white font-heading">{stat.value}</p>
                    <p className="text-xs mt-1 font-mono text-emerald-400">
                      {stat.change} <span className="text-zinc-600">{stat.period}</span>
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6" data-testid="hero-chart">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-heading text-lg font-semibold">Subscriber Growth</h3>
                <p className="text-sm text-zinc-500">In millions, 2005-2024</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">LIVE</span>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="jioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="Total" stroke="#6366F1" fill="url(#totalGrad)" strokeWidth={1} strokeDasharray="4 4" />
                <Area type="monotone" dataKey="Jio" stroke="#2563EB" fill="url(#jioGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="Airtel" stroke="#EF4444" fill="transparent" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4 text-xs text-zinc-500">
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-blue-500 rounded inline-block" /> Jio</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-red-500 rounded inline-block" /> Airtel</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-indigo-400 rounded inline-block opacity-60" /> Total</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

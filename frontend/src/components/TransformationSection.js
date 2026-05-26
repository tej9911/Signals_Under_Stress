import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { BEFORE_AFTER, DATA_PRICING, TIMELINE_EVENTS } from '@/data/telecomData';
import { Zap, Signal, Phone, Radio, Users, Smartphone, TrendingDown, GitMerge, BarChart2, Wifi, Globe, Shield } from 'lucide-react';

const iconMap = {
  signal: Signal, phone: Phone, radio: Radio, users: Users, shield: Shield,
  smartphone: Smartphone, zap: Zap, 'trending-down': TrendingDown,
  'git-merge': GitMerge, 'bar-chart': BarChart2, wifi: Wifi, globe: Globe,
};

const PriceTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 shadow-lg backdrop-blur-xl">
      <p className="text-xs text-zinc-500 font-mono">{label}</p>
      <p className="text-sm font-semibold text-[#E5E7EB]">Rs {payload[0].value}/GB</p>
    </div>
  );
};

export default function TransformationSection() {
  const { before, after } = BEFORE_AFTER;

  return (
    <section id="evolution" className="bg-[#0B0F14] py-24 lg:py-32" data-testid="evolution-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-[#2563EB] mb-3">Industry Evolution</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#E5E7EB] tracking-tight">The Great Disruption</h2>
          <p className="text-base md:text-lg text-[#9CA3AF] mt-4 max-w-2xl">India's telecom sector underwent the most dramatic transformation in global telecom history.</p>
        </motion.div>

        {/* Before/After Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 shadow-sm" data-testid="before-card">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">{before.title}</Badge>
            <h3 className="font-heading text-xl font-semibold text-[#E5E7EB]">{before.subtitle}</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {before.stats.map(s => (
                <div key={s.label} className="border border-zinc-800/50 rounded-xl p-3 bg-zinc-800/20">
                  <p className="text-xs text-zinc-500">{s.label}</p>
                  <p className="text-lg font-bold text-[#E5E7EB] font-heading mt-1">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 shadow-sm" data-testid="after-card">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">{after.title}</Badge>
            <h3 className="font-heading text-xl font-semibold text-[#E5E7EB]">{after.subtitle}</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {after.stats.map(s => (
                <div key={s.label} className="border border-zinc-800/50 rounded-xl p-3 bg-zinc-800/20">
                  <p className="text-xs text-zinc-500">{s.label}</p>
                  <p className="text-lg font-bold text-[#E5E7EB] font-heading mt-1">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[#E5E7EB] mb-12 text-center">Timeline of Transformation</h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400 via-blue-500 to-blue-600 md:-translate-x-px" />
            {TIMELINE_EVENTS.map((event, i) => {
              const Icon = iconMap[event.icon] || Signal;
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={event.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`relative flex items-start mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} pl-12 md:pl-0`} data-testid={`timeline-event-${event.year}`}>
                  <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 ${
                    event.highlight ? 'bg-blue-500 border-blue-400 ring-4 ring-blue-500/20' : event.era === 'before' ? 'bg-amber-400 border-amber-300' : 'bg-blue-500 border-blue-400'
                  } -translate-x-1.5 mt-2 z-10`} />
                  <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`bg-zinc-900/50 rounded-xl p-5 border ${event.highlight ? 'border-blue-500/50 ring-1 ring-blue-500/20 shadow-md' : 'border-zinc-800'}`}>
                      <div className={`flex items-center gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        <Icon className={`h-4 w-4 ${event.era === 'before' ? 'text-amber-500' : 'text-blue-500'}`} />
                        <span className="font-mono text-xs text-zinc-400">{event.year}</span>
                      </div>
                      <h4 className="font-heading font-semibold text-[#E5E7EB] mt-2">{event.title}</h4>
                      <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pricing Chart */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-24 bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800 shadow-sm" data-testid="pricing-chart">
          <h3 className="font-heading text-2xl font-semibold text-[#E5E7EB]">Data Price per GB (Rs)</h3>
          <p className="text-sm text-zinc-500 mt-1">The steepest price decline in global telecom history</p>
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={DATA_PRICING}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="year" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<PriceTooltip />} />
                <Bar dataKey="price" radius={[6, 6, 0, 0]} fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

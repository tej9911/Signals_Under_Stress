import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { COMPANIES, MARKET_SHARE_CURRENT } from '@/data/telecomData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, IndianRupee, TrendingUp } from 'lucide-react';

const ShareTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 shadow-2xl backdrop-blur-xl">
      <p className="text-xs text-zinc-500 font-mono mb-1">{payload[0].name}</p>
      <p className="text-sm font-bold text-white uppercase tracking-tight">{payload[0].value}% Market Share</p>
    </div>
  );
};

export default function CompanyComparison() {
  return (
    <section id="companies" className="bg-[#0B0F14] py-24 lg:py-32" data-testid="companies-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-[#2563EB] mb-3">Company Analysis</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#E5E7EB] tracking-tight">The Players</h2>
          <p className="text-base md:text-lg text-[#9CA3AF] mt-4 max-w-2xl">From 12+ operators to a 3-player market. Here's who survived the disruption.</p>
        </motion.div>

        {/* Market Share Visualization */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-zinc-800 relative overflow-hidden" data-testid="market-share-pie">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Market Dominance 2024</h3>
              <p className="text-zinc-400 leading-relaxed">
                The industry has consolidated into a massive 3+1 structure. Reliance Jio leads the market, closely followed by Bharti Airtel, while Vi and BSNL struggle to retain share.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                {MARKET_SHARE_CURRENT.slice(0, 4).map(item => (
                  <div key={item.name} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">{item.name}</span>
                    </div>
                    <span className="text-2xl font-bold text-white tabular-nums">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[320px] h-[320px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MARKET_SHARE_CURRENT}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    innerRadius={90}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {MARKET_SHARE_CURRENT.map((entry, i) => (
                      <Cell key={i} fill={entry.color} fillOpacity={0.9} />
                    ))}
                  </Pie>
                  <Tooltip content={<ShareTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-zinc-500 text-xs font-mono uppercase tracking-tighter">Total Core</span>
                <span className="text-white text-3xl font-bold">1.17B+</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {COMPANIES.map((company, i) => {
            const isJio = company.id === 'jio';
            const isAirtel = company.id === 'airtel';
            return (
              <motion.div key={company.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`group relative bg-zinc-900/40 backdrop-blur-md rounded-3xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 overflow-hidden ${isJio ? 'lg:col-span-2' : ''}`}
                data-testid={`company-card-${company.id}`}>
                
                {/* Brand Color Accent Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ backgroundColor: company.color }} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/5" style={{ backgroundColor: company.color }}>
                        <span className="text-white text-xl font-bold drop-shadow-md">{company.shortName.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-heading text-2xl font-bold text-white">{company.name}</h4>
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
                          Est. {company.launchYear} • {company.network}
                        </p>
                      </div>
                    </div>
                    <Badge className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                      company.growthYoY >= 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {company.growthYoY >= 0 ? '↑' : '↓'} {Math.abs(company.growthYoY)}% YoY
                    </Badge>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-xl">
                    {company.description}
                  </p>

                  <div className={`grid grid-cols-2 ${isJio ? 'lg:grid-cols-4' : ''} gap-4`}>
                    {[
                      { label: 'Subscribers', value: `${company.subscribers}M`, icon: Users },
                      { label: 'Market Share', value: `${company.marketShare}%`, icon: 'dot' },
                      { label: 'Revenue (Cr)', value: `₹${(company.quarterlyRevenue / 1000).toFixed(1)}k`, icon: IndianRupee },
                      { label: 'ARPU (Monthly)', value: `₹${company.arpu}`, icon: TrendingUp },
                    ].slice(0, isJio ? 4 : 4).map((stat, idx) => (
                      <div key={idx} className="bg-zinc-800/20 rounded-2xl p-4 border border-zinc-800/50 group/stat hover:bg-zinc-800/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          {typeof stat.icon === 'string' ? (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: company.color }} />
                          ) : (
                            <stat.icon className="h-3 w-3 text-zinc-500" />
                          )}
                          <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-tighter">{stat.label}</span>
                        </div>
                        <p className="text-xl font-bold text-white font-heading tracking-tight">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Brand Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: company.color, opacity: 0.3 }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

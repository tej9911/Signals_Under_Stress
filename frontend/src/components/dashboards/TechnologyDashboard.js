import { AreaChart, Area, BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TECH_ADOPTION, NETWORK_SPEED, SPEED_BY_TECH } from '@/data/telecomData';

const TECH_COLORS = { "2G": "#6B7280", "3G": "#F59E0B", "4G": "#2563EB", "5G": "#10B981" };

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-zinc-400 font-mono mb-1">{label}</p>
      {payload.map((e, i) => <p key={i} className="text-xs font-medium" style={{ color: e.color }}>{e.name}: {e.value}</p>)}
    </div>
  );
};

const kpis = [
  { label: '5G Coverage', value: '700+', sub: 'Cities covered', color: 'text-emerald-400' },
  { label: 'Avg 5G Speed', value: '88 Mbps', sub: 'Download speed', color: 'text-cyan-400' },
  { label: '4G Coverage', value: '98%', sub: 'Of population', color: 'text-blue-400' },
  { label: 'Total Towers', value: '750K+', sub: 'Across India', color: 'text-amber-400' },
];

const coverageData = [
  { operator: "Jio", towers: 425, color: "#2563EB" },
  { operator: "Airtel", towers: 380, color: "#EF4444" },
  { operator: "Vi", towers: 185, color: "#8B5CF6" },
  { operator: "BSNL", towers: 145, color: "#F59E0B" },
];

export default function TechnologyDashboard() {
  return (
    <div className="space-y-8" data-testid="technology-dashboard">
      <div>
        <h2 className="font-heading text-3xl font-bold text-white">Technology Evolution</h2>
        <p className="text-zinc-400 mt-2">India's journey from 2G to 5G -- one of the fastest network transitions globally</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5" data-testid={`kpi-${k.label.toLowerCase().replace(/\s/g, '-')}`}>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{k.label}</p>
            <p className={`text-2xl lg:text-3xl font-bold font-heading ${k.color}`}>{k.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Network Technology Adoption</h3>
          <p className="text-sm text-zinc-500 mb-4">Percentage of subscribers on each network generation</p>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={TECH_ADOPTION}>
              {Object.entries(TECH_COLORS).map(([key, color]) => (
                <defs key={key}>
                  <linearGradient id={`tech-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              ))}
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<Tip />} />
              {Object.entries(TECH_COLORS).map(([key, color]) => (
                <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={color} fill={`url(#tech-${key})`} strokeWidth={1.5} name={key} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Download Speed Trend</h3>
          <p className="text-sm text-zinc-500 mb-4">Average mobile download speed (Mbps)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={NETWORK_SPEED}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit=" Mbps" />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="download" name="Download" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4, fill: '#06B6D4' }} />
              <Line type="monotone" dataKey="upload" name="Upload" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4, fill: '#8B5CF6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Speed by Technology</h3>
          <p className="text-sm text-zinc-500 mb-4">Average download speed comparison (Mbps)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={SPEED_BY_TECH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="tech" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit=" Mbps" />
              <Tooltip content={<Tip />} />
              <Bar dataKey="download" name="Download" radius={[6, 6, 0, 0]}>
                {SPEED_BY_TECH.map((e, i) => <Cell key={i} fill={TECH_COLORS[e.tech]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <h3 className="font-heading text-lg font-semibold text-white mb-4">Network Tower Distribution</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {coverageData.map(op => (
            <div key={op.operator} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#27272A" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={op.color} strokeWidth="3" strokeDasharray={`${(op.towers / 450) * 100} ${100 - (op.towers / 450) * 100}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white font-heading">{op.towers}K</span>
              </div>
              <p className="text-sm font-medium text-zinc-300">{op.operator}</p>
              <p className="text-xs text-zinc-500">Towers (thousands)</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: '2G to 5G in 12 Years', text: 'India transitioned from 92% 2G in 2010 to 35% 5G coverage in 2024 -- one of the fastest network evolutions globally.' },
          { title: '5G Speed Revolution', text: '5G is 40x faster than 4G average. Download speeds jumped from 18 Mbps to 88 Mbps with 5G deployment.' },
          { title: 'Rural Coverage Push', text: 'BSNL\'s 4G rollout and Jio\'s rural expansion aim to bring high-speed internet to 100% of India\'s villages by 2026.' },
        ].map(ins => (
          <div key={ins.title} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5" data-testid={`insight-tech-${ins.title.toLowerCase().replace(/\s/g, '-')}`}>
            <h4 className="font-heading text-sm font-semibold text-cyan-400 mb-2">{ins.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

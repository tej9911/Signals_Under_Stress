import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MARKET_SHARE_CURRENT, MARKET_SHARE_HISTORICAL, COMPANIES, CHART_COLORS } from '@/data/telecomData';

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
  { label: 'Market Leader', value: 'Jio', sub: '40.1% share', color: 'text-blue-400' },
  { label: 'Highest Revenue', value: 'Airtel', sub: 'Rs 41.5K Cr/Q', color: 'text-red-400' },
  { label: 'Total Market', value: '1.19B', sub: 'Subscribers', color: 'text-emerald-400' },
  { label: 'Active Operators', value: '4', sub: 'Down from 12+', color: 'text-amber-400' },
];

const subData = COMPANIES.map(c => ({ name: c.shortName, value: c.subscribers, fill: CHART_COLORS[c.shortName] || '#6B7280' }));
const revData = COMPANIES.map(c => ({ name: c.shortName, value: c.quarterlyRevenue, fill: CHART_COLORS[c.shortName] || '#6B7280' }));

export default function MarketShareDashboard() {
  return (
    <div className="space-y-8" data-testid="market-share-dashboard">
      <div>
        <h2 className="font-heading text-3xl font-bold text-white">Market Share Analysis</h2>
        <p className="text-zinc-400 mt-2">Comprehensive breakdown of India's telecom market competition</p>
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
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Market Share Distribution</h3>
          <p className="text-sm text-zinc-500 mb-4">Current share by operator (2024)</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={MARKET_SHARE_CURRENT} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={65} strokeWidth={2} stroke="#18181B">
                {MARKET_SHARE_CURRENT.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<Tip />} />
              <Legend formatter={(v) => <span className="text-xs text-zinc-400">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Market Share Trends</h3>
          <p className="text-sm text-zinc-500 mb-4">How market dominance shifted (2010-2024)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={MARKET_SHARE_HISTORICAL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<Tip />} />
              {Object.keys(CHART_COLORS).map(key => (
                <Line key={key} type="monotone" dataKey={key} stroke={CHART_COLORS[key]} strokeWidth={2} dot={{ r: 3, fill: CHART_COLORS[key] }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Subscriber Base</h3>
          <p className="text-sm text-zinc-500 mb-4">Current subscribers in millions</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="name" stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip content={<Tip />} />
              <Bar dataKey="value" name="Subscribers" radius={[6, 6, 0, 0]}>
                {subData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Quarterly Revenue</h3>
          <p className="text-sm text-zinc-500 mb-4">Revenue in crores (Rs Cr)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="name" stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#3f3f46" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="value" name="Revenue (Cr)" radius={[6, 6, 0, 0]}>
                {revData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Jio Dominance', text: 'Captured 40% market share in just 8 years since launch -- the fastest growth in global telecom history.' },
          { title: 'Market Consolidation', text: 'From 12+ operators in 2015 to just 4. Disruption forced exits, mergers, and bankruptcy across the industry.' },
          { title: 'Revenue Leader', text: 'Airtel leads revenue at Rs 41.5K Cr/Q despite fewer subscribers, thanks to premium positioning and highest ARPU of Rs 233.' },
        ].map(ins => (
          <div key={ins.title} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5" data-testid={`insight-${ins.title.toLowerCase().replace(/\s/g, '-')}`}>
            <h4 className="font-heading text-sm font-semibold text-blue-400 mb-2">{ins.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

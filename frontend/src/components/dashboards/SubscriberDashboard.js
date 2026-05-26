import { AreaChart, Area, LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SUBSCRIBER_STACKED, SUBSCRIBER_GROWTH, COMPANIES, CHART_COLORS } from '@/data/telecomData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-zinc-400 font-mono mb-1">{label}</p>
      {payload.map((e, i) => <p key={i} className="text-xs font-medium" style={{ color: e.color }}>{e.name}: {e.value}M</p>)}
    </div>
  );
};

const kpis = [
  { label: 'Total Subscribers', value: '1.19B', sub: 'As of 2024', color: 'text-blue-400' },
  { label: '#1 Jio', value: '479M', sub: '40.1% share', color: 'text-indigo-400' },
  { label: '#2 Airtel', value: '397M', sub: '33.2% share', color: 'text-red-400' },
  { label: 'Annual Growth', value: '+2.5%', sub: 'Year over year', color: 'text-emerald-400' },
];

const currentSubs = COMPANIES.map(c => ({ name: c.shortName, value: c.subscribers, fill: CHART_COLORS[c.shortName] || '#6B7280' }));

export default function SubscriberDashboard() {
  return (
    <div className="space-y-8" data-testid="subscriber-dashboard">
      <div>
        <h2 className="font-heading text-3xl font-bold text-white">Subscriber Growth Analysis</h2>
        <p className="text-zinc-400 mt-2">How India became the world's second-largest telecom market by subscriber count</p>
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
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Subscriber Breakdown by Operator</h3>
          <p className="text-sm text-zinc-500 mb-4">Stacked view showing market composition (millions)</p>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={SUBSCRIBER_STACKED}>
              <defs>
                {Object.entries(CHART_COLORS).map(([key, color]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip content={<Tip />} />
              {Object.entries(CHART_COLORS).map(([key, color]) => (
                <Area key={key} type="monotone" dataKey={key} stackId="1" stroke={color} fill={`url(#grad-${key})`} strokeWidth={1.5} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Company Growth Comparison</h3>
          <p className="text-sm text-zinc-500 mb-4">Jio vs Airtel subscriber trajectory</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={SUBSCRIBER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="jio" name="Jio" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="airtel" name="Airtel" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#6366F1" strokeWidth={1} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Current Subscriber Ranking</h3>
          <p className="text-sm text-zinc-500 mb-4">Subscribers in millions (2024)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={currentSubs} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
              <YAxis type="category" dataKey="name" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} width={50} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="value" name="Subscribers" radius={[0, 6, 6, 0]} barSize={28}>
                {currentSubs.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Fastest to 400M', text: 'Jio reached 400M subscribers faster than any telecom company in history, leveraging free data and affordable 4G phones.' },
          { title: 'Near Saturation', text: 'India has 1.19B mobile subscribers for 1.4B population. Growth is now driven by rural areas and second SIM upgrades.' },
          { title: 'Vi Declining', text: 'Vodafone Idea has been losing ~7% subscribers YoY due to debt burden, limited investment, and aggressive competition.' },
        ].map(ins => (
          <div key={ins.title} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5" data-testid={`insight-subs-${ins.title.toLowerCase().replace(/\s/g, '-')}`}>
            <h4 className="font-heading text-sm font-semibold text-amber-400 mb-2">{ins.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

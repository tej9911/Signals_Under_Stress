import { LineChart, Line, BarChart, Bar, Cell, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_DATA, ARPU_DATA, DATA_CONSUMPTION, CHART_COLORS, COMPANIES } from '@/data/telecomData';

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
  { label: 'Industry Revenue', value: 'Rs 84K Cr', sub: 'Quarterly total', color: 'text-blue-400' },
  { label: 'Avg ARPU', value: 'Rs 183', sub: 'Per user/month', color: 'text-emerald-400' },
  { label: 'Digital Users', value: '850M+', sub: 'Internet subscribers', color: 'text-amber-400' },
  { label: 'Revenue Growth', value: '+14%', sub: 'Year over year', color: 'text-cyan-400' },
];

const revDistribution = COMPANIES.map(c => ({ name: c.shortName, value: c.quarterlyRevenue, color: CHART_COLORS[c.shortName] }));

export default function InsightsDashboard() {
  return (
    <div className="space-y-8" data-testid="insights-dashboard">
      <div>
        <h2 className="font-heading text-3xl font-bold text-white">Telecom Insights Dashboard</h2>
        <p className="text-zinc-400 mt-2">Key performance indicators and trends shaping India's telecom future</p>
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
          <h3 className="font-heading text-lg font-semibold text-white mb-1">ARPU Trend by Operator</h3>
          <p className="text-sm text-zinc-500 mb-4">Average Revenue Per User (Rs/month)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ARPU_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit=" Rs" />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="Jio" stroke={CHART_COLORS.Jio} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Airtel" stroke={CHART_COLORS.Airtel} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Vi" stroke={CHART_COLORS.Vi} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Industry" stroke="#71717A" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Revenue Distribution</h3>
          <p className="text-sm text-zinc-500 mb-4">Quarterly revenue share by operator</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={revDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={65} strokeWidth={2} stroke="#18181B">
                {revDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Revenue Growth Trend</h3>
          <p className="text-sm text-zinc-500 mb-4">Quarterly revenue by operator (Rs Cr)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="Jio" stackId="a" fill={CHART_COLORS.Jio} />
              <Bar dataKey="Airtel" stackId="a" fill={CHART_COLORS.Airtel} />
              <Bar dataKey="Vi" stackId="a" fill={CHART_COLORS.Vi} />
              <Bar dataKey="BSNL" stackId="a" fill={CHART_COLORS.BSNL} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Data Consumption Trend</h3>
          <p className="text-sm text-zinc-500 mb-4">Average monthly data usage (GB per user)</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={DATA_CONSUMPTION}>
              <defs>
                <linearGradient id="insightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit=" GB" />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="usage" name="Usage (GB)" stroke="#EF4444" fill="url(#insightGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Revenue Recovery', text: 'After Jio disruption crashed ARPU to Rs 78 in 2017, industry has recovered to Rs 183 through strategic tariff hikes.', accent: 'text-emerald-400' },
          { title: 'Data-Led Growth', text: 'Revenue mix shifted from 70% voice to 65% data. Data services now drive industry profitability and subscriber retention.', accent: 'text-blue-400' },
          { title: 'ARPU Gap Widening', text: 'Airtel\'s ARPU (Rs 233) is now 40% higher than Vi\'s (Rs 166), reflecting successful premium positioning strategy.', accent: 'text-red-400' },
          { title: 'Jio Revenue Surge', text: 'Jio\'s quarterly revenue grew from Rs 0 in 2015 to Rs 26,875 Cr in 2024 -- the fastest revenue ramp in Indian telecom.', accent: 'text-indigo-400' },
          { title: 'Vi Under Pressure', text: 'Vi\'s revenue stagnated at ~Rs 10,750 Cr while competitors grew 15-20% annually. Debt restructuring is critical for survival.', accent: 'text-purple-400' },
          { title: 'Industry Healthier', text: 'Total industry quarterly revenue of Rs 84K Cr is 40% higher than pre-Jio levels, with better margins and digital services.', accent: 'text-amber-400' },
        ].map(ins => (
          <div key={ins.title} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5" data-testid={`insight-final-${ins.title.toLowerCase().replace(/\s/g, '-')}`}>
            <h4 className={`font-heading text-sm font-semibold ${ins.accent} mb-2`}>{ins.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

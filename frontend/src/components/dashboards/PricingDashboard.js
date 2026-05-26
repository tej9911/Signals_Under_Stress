import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DATA_PRICING, DATA_CONSUMPTION } from '@/data/telecomData';

const combinedData = DATA_PRICING.map(p => {
  const c = DATA_CONSUMPTION.find(d => d.year === p.year);
  return { year: p.year, price: p.price, usage: c?.usage || 0 };
});

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
  { label: 'Current Price', value: 'Rs 10/GB', sub: 'As of 2024', color: 'text-blue-400' },
  { label: 'Price Drop', value: '-96%', sub: 'Since 2015', color: 'text-emerald-400' },
  { label: 'Monthly Usage', value: '19.5 GB', sub: 'Avg per user', color: 'text-amber-400' },
  { label: 'Usage Growth', value: '98x', sub: 'Since 2014', color: 'text-cyan-400' },
];

export default function PricingDashboard() {
  return (
    <div className="space-y-8" data-testid="pricing-dashboard">
      <div>
        <h2 className="font-heading text-3xl font-bold text-white">Pricing Revolution</h2>
        <p className="text-zinc-400 mt-2">How Jio's entry caused the steepest price decline in global telecom history</p>
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
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Data Price per GB (Rs)</h3>
          <p className="text-sm text-zinc-500 mb-4">Dramatic collapse after Jio's 2016 entry</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DATA_PRICING}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="price" name="Price (Rs/GB)" radius={[6, 6, 0, 0]} fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Monthly Data Consumption</h3>
          <p className="text-sm text-zinc-500 mb-4">Average GB per user per month</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={DATA_CONSUMPTION}>
              <defs>
                <linearGradient id="consGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} unit=" GB" />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="usage" name="Usage (GB/mo)" stroke="#10B981" fill="url(#consGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-semibold text-white mb-1">Price Drop vs Consumption Growth</h3>
          <p className="text-sm text-zinc-500 mb-4">Inverse correlation: as prices fell, data usage skyrocketed</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="price" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} orientation="left" label={{ value: 'Rs/GB', fill: '#71717a', fontSize: 10, position: 'insideTopLeft' }} />
              <YAxis yAxisId="usage" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} orientation="right" label={{ value: 'GB/mo', fill: '#71717a', fontSize: 10, position: 'insideTopRight' }} />
              <Tooltip content={<Tip />} />
              <Line yAxisId="price" type="monotone" dataKey="price" stroke="#EF4444" strokeWidth={2} name="Price (Rs/GB)" dot={{ r: 3 }} />
              <Line yAxisId="usage" type="monotone" dataKey="usage" stroke="#10B981" strokeWidth={2} name="Usage (GB/mo)" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <h4 className="font-heading text-amber-400 font-semibold mb-3">Before 2016</h4>
          <div className="grid grid-cols-2 gap-3">
            {[{ l: 'Data Price', v: 'Rs 250/GB' }, { l: 'Avg Usage', v: '200 MB/mo' }, { l: 'Cost for 1GB', v: 'Rs 269' }, { l: 'Internet Access', v: 'Luxury' }].map(s => (
              <div key={s.l} className="bg-amber-500/5 rounded-lg p-3">
                <p className="text-xs text-amber-300/60">{s.l}</p>
                <p className="text-sm font-semibold text-amber-200 mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="font-heading text-blue-400 font-semibold mb-3">After 2016</h4>
          <div className="grid grid-cols-2 gap-3">
            {[{ l: 'Data Price', v: 'Rs 10/GB' }, { l: 'Avg Usage', v: '19.5 GB/mo' }, { l: 'Cost for 1GB', v: 'Rs 10.12' }, { l: 'Internet Access', v: 'Basic Utility' }].map(s => (
              <div key={s.l} className="bg-blue-500/5 rounded-lg p-3">
                <p className="text-xs text-blue-300/60">{s.l}</p>
                <p className="text-sm font-semibold text-blue-200 mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Historic Disruption', text: 'Jio offered FREE 4G data at launch in Sep 2016, forcing every operator to slash prices or go bankrupt.' },
          { title: 'Cheapest Data Globally', text: 'India has the cheapest mobile data in the world at Rs 10/GB, compared to global average of $5.09/GB.' },
          { title: 'Consumption Leader', text: 'India is now the world\'s largest mobile data consumer with 19.5 GB average monthly usage per subscriber.' },
        ].map(ins => (
          <div key={ins.title} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5" data-testid={`insight-pricing-${ins.title.toLowerCase().replace(/\s/g, '-')}`}>
            <h4 className="font-heading text-sm font-semibold text-emerald-400 mb-2">{ins.title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

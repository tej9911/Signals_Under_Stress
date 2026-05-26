import { motion } from 'framer-motion';
import { DASHBOARD_ITEMS } from '@/data/telecomData';
import { useNavigate } from 'react-router-dom';
import { PieChart as PieIcon, TrendingDown, Users, Wifi, Activity, ArrowRight } from 'lucide-react';

const iconMap = {
  'pie-chart': PieIcon,
  'trending-down': TrendingDown,
  users: Users,
  wifi: Wifi,
  activity: Activity,
};

export default function DashboardHub() {
  const navigate = useNavigate();

  return (
    <section id="dashboards" className="bg-[#0B0F14] py-24 lg:py-32" data-testid="dashboards-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-400 mb-3">Analytics Hub</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">Interactive Dashboards</h2>
          <p className="text-base md:text-lg text-zinc-400 mt-4 max-w-2xl">
            Dive deep into the data. Explore interactive visualizations and uncover insights about India's telecom transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {DASHBOARD_ITEMS.map((item, i) => {
            const Icon = iconMap[item.icon] || Activity;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-7 hover:border-zinc-700 transition-colors cursor-pointer ${i === 0 ? 'lg:col-span-2' : ''}`}
                onClick={() => navigate(`/dashboard/${item.id}`)} data-testid={`dashboard-card-${item.id}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${item.color}15` }}>
                  <Icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-1.5 mt-5 text-sm text-zinc-500 group-hover:text-blue-400 transition-colors">
                  Open Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { INSIGHTS } from '@/data/telecomData';

const categoryColors = {
  Pricing: 'bg-blue-100 text-blue-700 border-blue-200',
  Consumption: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Industry: 'bg-amber-100 text-amber-700 border-amber-200',
  Access: 'bg-purple-100 text-purple-700 border-purple-200',
  Revenue: 'bg-red-100 text-red-700 border-red-200',
  Technology: 'bg-cyan-100 text-cyan-700 border-cyan-200',
};

export default function InsightsSection() {
  return (
    <section id="insights" className="bg-[#0B0F14] py-24 lg:py-32" data-testid="insights-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-blue-600 mb-3">Key Findings</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#E5E7EB] tracking-tight">Data Insights</h2>
          <p className="text-base md:text-lg text-[#9CA3AF] mt-4 max-w-2xl">The numbers that tell the story of India's telecom revolution.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {INSIGHTS.map((insight, i) => (
            <motion.div key={insight.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-[#111827] rounded-2xl p-7 border border-zinc-200 hover:border-blue-200 hover:shadow-lg transition-all"
              data-testid={`insight-card-${i}`}>
              <Badge className={categoryColors[insight.category] || 'bg-zinc-100 text-zinc-700'}>{insight.category}</Badge>
              <p className="font-heading text-3xl font-bold text-[#E5E7EB] mt-4 font-mono">{insight.metric}</p>
              <h3 className="font-heading text-lg font-semibold text-[#E5E7EB] mt-2">{insight.title}</h3>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

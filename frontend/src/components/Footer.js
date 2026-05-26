import { Separator } from '@/components/ui/separator';
import { BarChart3 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F14] border-t border-zinc-800 py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              <span className="font-heading text-lg font-bold text-white">TelecomIQ</span>
            </div>
            <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
              A comprehensive analytics platform analyzing the transformation of India's telecom sector
              before and after 2016. Built as an engineering project showcasing data visualization and analysis.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-4">Technology</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>React + Tailwind CSS</li>
              <li>FastAPI + MongoDB</li>
              <li>Recharts + Framer Motion</li>
              <li>Shadcn/UI Components</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-4">Data Sources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>TRAI Reports</li>
              <li>Company Annual Reports</li>
              <li>COAI Data</li>
              <li>Industry Research</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">{new Date().getFullYear()} TelecomIQ -- Indian Telecom Transformation Analysis</p>
          <p className="text-xs text-zinc-600">Engineering Project -- Data Analytics & Visualization</p>
        </div>
      </div>
    </footer>
  );
}

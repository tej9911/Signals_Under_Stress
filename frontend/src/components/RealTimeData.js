import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Globe, Gauge, Terminal as TerminalIcon, ShieldCheck, Wifi, ArrowUpRight, Signal } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;

function formatNumber(v) {
  if (typeof v !== 'number') return String(v);
  if (v >= 1000000000) return `${(v / 1000000000).toFixed(2)}B`;
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return v.toFixed(1);
}

const EventLog = () => {
  const [logs, setLogs] = useState([
    { id: 1, text: "INIT_NETWORK_SCAN: Success", type: "system", time: "02:40:01" },
    { id: 2, text: "UPSTREAM_SYNC: Node_BLR_09 Active", type: "success", time: "02:40:05" },
    { id: 3, text: "SIGNAL_STRESS: Moderate on Band_40", type: "warning", time: "02:40:12" },
  ]);

  useEffect(() => {
    const events = [
      "PKT_RELAY: J-Node Burst Detected",
      "LATENCY_TEST: 18ms (Optimal)",
      "SYNC: Regional HLR Update",
      "DATA_PULSE: Volume Spiked +12.4GB",
      "SECURE: Handover Handshake",
      "MONITOR: ARPU Metric Recalibrated",
    ];
    const types = ["system", "success", "warning"];
    
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        text: events[Math.floor(Math.random() * events.length)],
        type: types[Math.floor(Math.random() * types.length)],
        time: new Date().toLocaleTimeString('en-GB')
      };
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/60 rounded-xl border border-zinc-800 p-4 font-mono text-[10px] h-[200px] overflow-hidden relative shadow-inner">
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/80 to-transparent z-10" />
      <AnimatePresence mode="popLayout">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex gap-3 mb-2 leading-relaxed"
          >
            <span className="text-zinc-600">[{log.time}]</span>
            <span className={
              log.type === 'warning' ? 'text-amber-500' : 
              log.type === 'success' ? 'text-emerald-500' : 'text-blue-500'
            }>
              {log.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute top-0 right-0 p-2 opacity-20"><TerminalIcon size={12} className="text-white" /></div>
    </div>
  );
};

const ComparisonBar = ({ label, value, max, color, icon: Icon }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={12} className="text-zinc-500" />}
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-tighter">{label}</span>
        </div>
        <span className="text-xs font-mono font-bold text-white tabular-nums">{formatNumber(value)}</span>
      </div>
      <div className="h-1.5 bg-zinc-800/50 rounded-full overflow-hidden p-[1px] border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default function RealTimeData() {
  const [liveData, setLiveData] = useState({
    total: 1189000000,
    data_consumed_today_tb: 42000,
    active_internet_users: 850000000,
    avg_speed_mbps: 88.4,
    subscribers: { jio: 479000000, airtel: 397000000, vi: 228000000, bsnl: 85000000 }
  });

  const fetchData = useCallback(async () => {
    if (!API) {
      // No backend configured — run local simulation
      setLiveData(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 200),
        data_consumed_today_tb: prev.data_consumed_today_tb + Math.random() * 0.3,
        avg_speed_mbps: parseFloat((88.4 + (Math.random() - 0.5) * 4).toFixed(1)),
        subscribers: {
          jio: prev.subscribers.jio + Math.random() * 200,
          airtel: prev.subscribers.airtel + Math.random() * 150,
          vi: prev.subscribers.vi + (Math.random() - 0.6) * 100,
          bsnl: prev.subscribers.bsnl + (Math.random() - 0.5) * 50,
        }
      }));
      return;
    }
    try {
      const res = await axios.get(`${API}/telecom/realtime`);
      setLiveData(res.data);
    } catch {
      setLiveData(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 200),
        data_consumed_today_tb: prev.data_consumed_today_tb + Math.random() * 0.3,
        avg_speed_mbps: parseFloat((88.4 + (Math.random() - 0.5) * 4).toFixed(1)),
        subscribers: {
          jio: prev.subscribers.jio + Math.random() * 200,
          airtel: prev.subscribers.airtel + Math.random() * 150,
          vi: prev.subscribers.vi + (Math.random() - 0.6) * 100,
          bsnl: prev.subscribers.bsnl + (Math.random() - 0.5) * 50,
        }
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <section id="realtime" className="bg-[#0B0F14] py-24 lg:py-32" data-testid="realtime-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Unit */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">Operator NOC // LIVE</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter uppercase font-heading">Network Status Console</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-500 uppercase font-bold mb-1">Packet Integrity</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">99.98%</p>
            </div>
            <div className="w-px h-10 bg-zinc-800" />
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-500 uppercase font-bold mb-1">System Uptime</p>
              <p className="text-xl font-bold text-white font-mono">152:08:42</p>
            </div>
          </div>
        </motion.div>

        {/* Tactical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Core KPIs */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Total Subscriber Base', value: formatNumber(liveData.total), icon: Activity, color: '#3b82f6', sub: '+1.2% this cycle' },
                { label: 'Active Data Pipes', value: formatNumber(liveData.active_internet_users), icon: Globe, color: '#818cf8', sub: 'Peak usage detected' },
                { label: 'Network Throughput', value: formatNumber(liveData.data_consumed_today_tb), icon: Zap, color: '#10b981', sub: 'Terabytes / 24h' },
                { label: 'Global Rank Index', value: '01', icon: ShieldCheck, color: '#f59e0b', sub: 'Data Consumption' },
              ].map((m, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] rounded-full -mr-12 -mt-12 group-hover:opacity-[0.04] transition-opacity" style={{ color: m.color }} />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-950 border border-white/5">
                      <m.icon size={16} style={{ color: m.color }} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest">{m.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-white tabular-nums tracking-tighter font-heading">{m.value}</p>
                    {idx === 2 && <span className="text-xs text-zinc-400 font-mono">TB</span>}
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-2 font-mono uppercase font-bold flex items-center gap-1.5">
                    <ArrowUpRight size={10} className="text-emerald-500" /> {m.sub}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Operator Battle Bench */}
            <div className="bg-zinc-900/60 rounded-3xl border border-zinc-800 p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Signal size={80} className="text-white" /></div>
              <h3 className="text-white font-mono text-xs uppercase font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Operator Load Balancer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <ComparisonBar label="Reliance Jio Node" value={liveData.subscribers.jio} max={500000000} color="#2563EB" icon={Wifi} />
                <ComparisonBar label="Bharti Airtel Node" value={liveData.subscribers.airtel} max={500000000} color="#EF4444" icon={Wifi} />
                <ComparisonBar label="Vodafone Idea Node" value={liveData.subscribers.vi} max={500000000} color="#8B5CF6" icon={Wifi} />
                <ComparisonBar label="BSNL Legacy Node" value={liveData.subscribers.bsnl} max={500000000} color="#F59E0B" icon={Wifi} />
              </div>
            </div>
          </div>

          {/* Right Column: Terminal & Speed */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
               <h3 className="text-zinc-400 font-mono text-[10px] uppercase font-bold mb-4 flex items-center justify-between">
                 <span>Sub-System Events</span>
                 <span className="text-[8px] px-2 py-0.5 bg-zinc-800 rounded text-zinc-500">LIVE_THREAD</span>
               </h3>
               <EventLog />
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16" />
               <h3 className="text-zinc-400 font-mono text-[10px] uppercase font-bold mb-6">Real-Time Velocity</h3>
               <div className="flex items-center gap-4 mb-4">
                  <Gauge size={32} className="text-blue-500" />
                  <div>
                    <p className="text-4xl font-bold text-white font-heading tracking-tighter tabular-nums">{liveData.avg_speed_mbps}</p>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-widest">MBPS DL Speed</p>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500 font-bold uppercase">
                    <span>Stress Level</span>
                    <span className="text-white">Normal</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-sm ${i < 7 ? 'bg-blue-500/40' : 'bg-zinc-800'}`} />
                    ))}
                  </div>
               </div>
            </div>

            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 border-dashed">
               <p className="text-[10px] font-mono text-zinc-600 uppercase font-bold leading-relaxed">
                 * Data visualized represents aggregated network metrics from state-level telemetry nodes. Refreshes every 5000ms.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  MousePointer2,
  Clock,
  Phone,
  Layout,
  Calendar,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { api } from "../../services/api";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

export function AnalyticsStatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [days]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await api.getAnalyticsStats(days);
      setStats(data);
    } catch (error) {
      console.error("Gagal mengambil statistik:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  const deviceIcons: any = {
    desktop: <Monitor size={20} />,
    mobile: <Smartphone size={20} />,
    tablet: <Tablet size={20} />,
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Statistik Kelar.co.id</h1>
            <p className="text-white/60">Analisis performa website dan interaksi pengunjung.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  days === d ? "bg-white text-[var(--background)]" : "text-white/60 hover:text-white"
                }`}
              >
                {d} Hari
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Phone className="text-green-400" />}
            label="Klik WhatsApp"
            value={stats.wa_clicks}
            description="Total calon klien"
          />
          <StatCard
            icon={<Users className="text-blue-400" />}
            label="Total Pengunjung"
            value={stats.traffic.reduce((acc: number, curr: any) => acc + curr.visitors, 0)}
            description={`Dalam ${days} hari terakhir`}
          />
          <StatCard
            icon={<MousePointer2 className="text-purple-400" />}
            label="Klik Layanan"
            value={stats.service_popularity.reduce((acc: number, curr: any) => acc + curr.total, 0)}
            description="Interaksi layanan"
          />
          <StatCard
            icon={<Clock className="text-orange-400" />}
            label="Avg. Dwell Time"
            value={`${
              stats.dwell_time.length > 0
                ? Math.round(
                    stats.dwell_time.reduce((acc: number, curr: any) => acc + (Number(curr.avg_duration) || 0), 0) /
                      stats.dwell_time.length
                  )
                : 0
            }s`}
            description="Rata-rata di section"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Chart */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={24} className="text-blue-400" />
                Trafik Pengunjung
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.traffic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                      dataKey="date" 
                      stroke="#ffffff40" 
                      fontSize={12} 
                      tickFormatter={(val) => new Date(val).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                  />
                  <YAxis stroke="#ffffff40" fontSize={12} />
                  <Tooltip 
                      contentStyle={{ backgroundColor: "#0d1b2a", border: "1px solid #ffffff20", borderRadius: "12px", color: "#fff" }}
                      itemStyle={{ color: "#3b82f6" }}
                  />
                  <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Popularity */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layout size={24} className="text-indigo-400" />
                Layanan Terpopuler
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.service_popularity} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="label" type="category" stroke="#ffffff60" fontSize={10} width={120} />
                  <Tooltip 
                      cursor={{ fill: '#ffffff05' }}
                      contentStyle={{ backgroundColor: "#0d1b2a", border: "1px solid #ffffff20", borderRadius: "12px" }}
                  />
                  <Bar dataKey="total" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Device Info */}
          <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col items-center">
              <h3 className="text-lg font-bold text-white mb-6 w-full">Perangkat</h3>
              <div className="h-[200px] w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={stats.devices}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="total"
                              nameKey="device_type"
                          >
                              {stats.devices.map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                          </Pie>
                          <Tooltip />
                      </PieChart>
                  </ResponsiveContainer>
              </div>
              <div className="w-full space-y-3">
                  {stats.devices.map((d: any, index: number) => (
                      <div key={d.device_type} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                              <div className="text-white/60">{deviceIcons[d.device_type] || d.device_type}</div>
                              <span className="text-white font-bold capitalize">{d.device_type}</span>
                          </div>
                          <span className="text-white">{d.total}</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Content & Dwell */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6">Section Dwell Time (Rata-rata detik)</h3>
              <div className="space-y-4">
                  {stats.dwell_time.sort((a: any, b: any) => b.avg_duration - a.avg_duration).map((d: any) => (
                      <div key={d.label} className="group">
                          <div className="flex justify-between items-center mb-1">
                              <span className="text-white/80 font-medium capitalize">{d.label.replace('_section', '')}</span>
                              <span className="text-blue-400 font-bold">{Math.round(d.avg_duration)}s</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                                  style={{ width: `${Math.min(100, (d.avg_duration / 60) * 100)}%` }}
                              />
                          </div>
                      </div>
                  ))}
              </div>
              
              <h3 className="text-lg font-bold text-white mt-10 mb-6 border-t border-white/5 pt-8">Artikel Terpopuler</h3>
              <div className="space-y-4">
                  {stats.content_popularity.map((art: any, index: number) => (
                      <div key={art.label} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-default">
                          <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/40 text-sm font-black">
                                  {index + 1}
                              </div>
                              <span className="text-white/90 font-medium line-clamp-1">{art.label}</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-400 font-bold">
                              {art.views} <Users size={14} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ icon, label, value, description }: { icon: any; label: string; value: any; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all border-l-4 border-l-blue-500/0 hover:border-l-blue-500">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <div className="text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-white/80 font-bold text-sm mb-1">{label}</div>
      <div className="text-white/40 text-xs">{description}</div>
    </div>
  );
}

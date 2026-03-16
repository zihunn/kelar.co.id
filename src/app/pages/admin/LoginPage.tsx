import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, Loader2 } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Memulai proses login untuk:", email);
      const response = await api.login(email, password);
      console.log("Login berhasil, respons:", response);

      toast.success("Selamat datang kembali!");

      console.log("Mengarahkan ke dashboard...");
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Login gagal:", err);
      const message = err.message || "Email atau password salah";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
      </div>

      <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl p-10 w-full max-w-md relative z-10 transition-all">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img
              src="https://bion-dev.zlabs.my.id/images/kelar-white.png"
              alt="Kelar.co.id"
              className="h-24 md:h-28 drop-shadow-2xl"
            />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Panel Admin</h1>
          <p className="text-white/80 mt-2 font-medium">Masuk untuk mengelola Kelar.co.id</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-2xl text-sm backdrop-blur-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-white/80 ml-2 text-sm font-bold uppercase tracking-widest">
              Email
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                placeholder="admin@kelar.co.id"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 ml-2 text-sm font-bold uppercase tracking-widest">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                placeholder="••••••••"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-white text-[var(--background)] rounded-2xl font-black text-xl shadow-2xl hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-10"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Memproses...</span>
              </>
            ) : (
              "Masuk Sekarang"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-blue-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-md w-full overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-colors" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 relative z-10">
          <p className="text-white font-medium mb-6 text-lg">{message}</p>
          {itemName && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <p className="text-blue-400 font-black text-xl tracking-tight">{itemName}</p>
            </div>
          )}
          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
            Aksi ini tidak dapat dibatalkan!
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-4 p-8 border-t border-white/10 relative z-10">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all font-black"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all font-black shadow-xl shadow-red-600/20"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
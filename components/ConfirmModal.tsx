interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  text: string;
}

export default function ConfirmModal({
  open,
  onConfirm,
  onClose,
  text,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white  rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
        <p className="text-center text-lg font-semibold text-gray-800 ">
          {text}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition cursor-pointer"
          >
            Sim
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition cursor-pointer"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

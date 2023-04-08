export default function Spinner() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-70">
      <div className="w-20 h-20 border-4 border-dashed border-gray-100 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

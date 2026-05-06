export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-emerald-100 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs text-emerald-600 font-medium uppercase tracking-widest">
          ©{currentYear} EcoFluxo — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
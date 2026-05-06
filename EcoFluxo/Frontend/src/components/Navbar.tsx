import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-emerald-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/ecofluxo.png" alt="Logo" className="h-20 w-auto" />
        </Link>
        
        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8 text-base font-semibold text-emerald-800">
          {user ? (
            <>
              <Link to="/mapa" className="hover:text-emerald-500 transition">Mapa</Link>
              
              {user.perfil === "GESTOR" && (
                <Link to="/gestao" className="hover:text-emerald-500 transition">Gerenciar</Link>
              )}

              <div className="flex items-center gap-6 ml-4 pl-4 border-l border-emerald-100">
                <span className="text-sm font-bold text-emerald-600/70 cursor-default">
                  Olá, {user.nome.split(' ')[0]}
                </span>
                <button 
                  onClick={onLogout} 
                  className="hover:text-emerald-500 transition text-emerald-800"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="hover:text-emerald-500 transition">
              Entrar
            </Link>
          )}
        </div>

        {/* Botão Mobile (Hambúrguer) */}
        <button 
          className="md:hidden p-2 text-emerald-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Retrátil */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 p-4 space-y-4 shadow-inner">
          {user ? (
            <>
              <Link to="/mapa" onClick={() => setIsOpen(false)} className="block font-semibold text-emerald-800 hover:text-emerald-500">Mapa</Link>
              {user.perfil === "GESTOR" && (
                <Link to="/gestao" onClick={() => setIsOpen(false)} className="block font-semibold text-emerald-800 hover:text-emerald-500">Gerenciar</Link>
              )}
              <div className="pt-2 border-t border-emerald-50">
                <p className="text-xs font-bold text-emerald-400 mb-2">Conectado como {user.nome}</p>
                <button 
                  onClick={() => { onLogout(); setIsOpen(false); }} 
                  className="block w-full text-left font-semibold text-emerald-800 hover:text-emerald-500"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)} 
              className="block font-semibold text-emerald-800 hover:text-emerald-500"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
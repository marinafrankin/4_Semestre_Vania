import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Importação de Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

// Importação de Páginas
import Login from './pages/Login';
import Mapa from './pages/Mapa'; 

// --- PÁGINA HOME ---
const Home = () => (
  <div className="text-center py-20 px-4">
    <h1 className="text-5xl font-black text-emerald-900 tracking-tighter">
      Bem-vindo ao <span className="text-emerald-500 italic">EcoFluxo</span>
    </h1>
    <p className="text-emerald-600 mt-6 text-xl max-w-2xl mx-auto font-medium">
      Monitoramento inteligente de resíduos em tempo real para cidades sustentáveis.
    </p>
    <div className="mt-10">
      <div className="inline-block p-1 bg-emerald-100 rounded-full px-6 py-2 text-emerald-800 font-bold text-sm">
        🌱 Transformando a gestão urbana
      </div>
    </div>
  </div>
);

// --- LÓGICA DE NAVEGAÇÃO E ROTAS ---
function AppContent() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Função para deslogar
  const handleLogout = () => {
    setUser(null);
    navigate("/"); // Redireciona para a Home ao sair
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 font-sans antialiased">
      {/* Navbar fixa no topo */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Conteúdo Principal com espaçamento para a Navbar fixa */}
      <main className="flex-grow pt-32 pb-20 px-4"> 
        <Routes>
          {/* ROTA PÚBLICA: HOME */}
          <Route path="/" element={<Home />} />

          {/* ROTA DE LOGIN: Redireciona conforme o perfil após o sucesso */}
          <Route path="/login" element={
            user ? (
              <Navigate to={user.perfil === "GESTOR" ? "/gestao" : "/mapa"} /> 
            ) : (
              <Login onLoginSuccess={(u: any) => setUser(u)} />
            )
          } />
          
          {/* ROTA RESTRITA: GESTÃO (Apenas para perfil GESTOR) */}
          <Route path="/gestao" element={
            user?.perfil === "GESTOR" ? (
              <div className="max-w-7xl mx-auto space-y-12">
                {/* 1. Visão Analítica (Gráfico e Cards) */}
                <Dashboard />
                
                {/* 2. Visão Geográfica (Mapa) */}
                <div className="space-y-6">
                  <div className="px-6" id="secao-mapa">
                    <h2 className="text-xl font-black text-emerald-900 uppercase tracking-widest italic">
                      📍 Localização Geográfica
                    </h2>
                    <p className="text-emerald-600 text-sm font-bold">Acompanhe a situação dos pontos de coleta no mapa</p>
                  </div>
                  <Mapa />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } />

          {/* ROTA PROTEGIDA: MAPA (Qualquer usuário logado vê) */}
          <Route path="/mapa" element={
            user ? <Mapa /> : <Navigate to="/login" /> 
          } />

          {/* ROTA DE FALLBACK: Redireciona caminhos inexistentes para a Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Rodapé fixo na base */}
      <Footer /> 
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (Root) ---
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
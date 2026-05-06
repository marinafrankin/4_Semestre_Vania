import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../utils/api';
import {formatarTipoLixeira} from '../utils/formatarTipoLixeira';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configuração dos Ícones Coloridos
const IconeVerde = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

const IconeAmarelo = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

const IconeVermelho = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41]
});

export default function Mapa() {
  const [ecopontos, setEcopontos] = useState<any[]>([]);
  const [centro, setCentro] = useState<[number, number] | null>(null);

  useEffect(() => {
    const buscarEcopontos = async (definirCentroInicial = false) => {
      try {
        // Chamada para a rota que você criou com o join (include)
        const response = await api.get('/ecopontosComLixeiras');
        const dados = response.data;
        setEcopontos(dados);

        if (definirCentroInicial && dados && dados.length > 0) {
          // Centraliza no primeiro ecoponto 
          setCentro([Number(dados[0].Latitude), Number(dados[0].Longitude)]);
        } else if (definirCentroInicial) {
          setCentro([-22.3145, -49.0587]); // Padrão Bauru
        }
      } catch (error) {
        console.error("Erro ao carregar os ecopontos:", error);
        if (definirCentroInicial) setCentro([-22.3145, -49.0587]);
      }
    };

    buscarEcopontos(true);
    const intervalo = setInterval(() => buscarEcopontos(false), 5000);
    return () => clearInterval(intervalo);
  }, []);

  // Função para definir a cor do marcador baseado na lixeira mais cheia
  const obterIconeCritico = (lixeiras: any[]) => {
    if (!lixeiras || lixeiras.length === 0) return IconeVerde;
    
    const nivelMaximo = Math.max(...lixeiras.map(l => l.nivel_cheio));
    
    if (nivelMaximo > 80) return IconeVermelho;
    if (nivelMaximo > 40) return IconeAmarelo;
    return IconeVerde;
  };

  if (!centro) {
    return (
      <div className="flex flex-col items-center justify-center h-[550px] text-emerald-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
        <p className="font-bold">Sincronizando Ecopontos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-2xl font-black text-emerald-900 tracking-tight">Mapa de Coleta</h1>
          <p className="text-sm text-gray-500 font-medium">Status em tempo real por ecoponto</p>
        </div>
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold shadow-sm">
          {ecopontos.length} Ponto(s) Monitorado(s)
        </span>
      </div>

      <div className="h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative z-0">
        <MapContainer 
          center={centro} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ecopontos.map((ecoponto) => (
            <Marker 
              key={ecoponto.id} 
              position={[Number(ecoponto.Latitude), Number(ecoponto.Longitude)]}
              icon={obterIconeCritico(ecoponto.lixeiras)}
            >
              <Tooltip direction="top" offset={[0, -32]} opacity={1}>
                    <span className="font-bold text-emerald-900">
                      EcoPonto {ecoponto.nome}
                    </span>
              </Tooltip>
              <Popup minWidth={200}>
                <div className="font-sans p-1">
                  <header className="border-b border-gray-100 pb-2 mb-3">
                    <h3 className="font-black text-emerald-900 uppercase text-sm leading-tight">
                      EcoPonto {ecoponto.nome}
                    </h3>
                    {ecoponto.descricao && (
                      <p className="text-[10px] text-gray-400 mt-1">{ecoponto.descricao}</p>
                    )}
                  </header>

                  <div className="space-y-4">
                    {ecoponto.lixeiras && ecoponto.lixeiras.length > 0 ? (
                      ecoponto.lixeiras.map((lixeira: any) => (
                        <div key={lixeira.id} className="space-y-1">
                          <div className="flex justify-between items-end">
                            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                              {formatarTipoLixeira(lixeira.tipo)}
                              
                            </span>
                            <span className={`text-xs font-black ${lixeira.nivel_cheio > 80 ? 'text-red-600' : 'text-emerald-700'}`}>
                              {lixeira.nivel_cheio}%
                            </span>
                          </div>
                          
                          {/* Barra de progresso */}
                          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200">
                            <div 
                              className={`h-full transition-all duration-700 ease-out ${
                                lixeira.nivel_cheio > 80 ? 'bg-red-500' : 
                                lixeira.nivel_cheio > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${lixeira.nivel_cheio}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-gray-400 font-medium">
                            Capacidade: {lixeira.volume_max}L
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-gray-400 italic">Nenhuma lixeira vinculada.</p>
                    )}
                  </div>

                  <footer className="mt-4 pt-2 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[9px] text-gray-300">ID: #{ecoponto.id}</span>
                    <button className="text-[10px] font-bold text-emerald-600 hover:underline">Ver detalhes</button>
                  </footer>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
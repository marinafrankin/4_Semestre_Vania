import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../utils/api";


export default function Dashboard(){
  const [lixeiras, setLixeiras] = useState<any[]>([]);

  const carregarDados = async()=>{
    try{
      const response = await api.get("/ecopontosComLixeiras");
      const ecopontos = response.data;

      const todasAsLixeiras = ecopontos.flatMap((
        ponto:any)=>ponto.lixeiras);
      setLixeiras(todasAsLixeiras);
    }catch (error){
      console.log("Erro ao carregar as lixeiras:", error)
    } 
  }

  useEffect(()=>{
    carregarDados();
    const intervalo = setInterval (carregarDados, 10000);
    return ()=> clearInterval(intervalo);
  }, []);

  const lixeirasVazias = lixeiras.filter(l=>l.nivel_cheio <= 40). length;
  const lixeirasMedia = lixeiras.filter(l=>l.nivel_cheio > 40 && l.nivel_cheio <= 80). length;
  const lixeirasCriticas = lixeiras.filter(l=>l.nivel_cheio > 80). length;

  const series = [lixeirasVazias, lixeirasMedia, lixeirasCriticas];

  const options:any={
    type:"donet",
    events:{
      //função que detecta o click no gráfico
      dataPointSelection:()=>{
        const secaoMapa = document.getElementById("secao-mapa");
        if(secaoMapa){
          secaoMapa.scrollIntoView({behavior:"smooth"});
        }
      }
    },
    
  labels:['Vazias/Baixas', 'Medias', 'Criticas'],
  colors:['#10b981', '#f59e0b', '#ef4444'],
  legends:{
    position:'bottom',
    fontFamily:'Inter, sans-serif',
    fontWeight: 700,
  },
  plotOptions:{
    pie:{
      size:'70%',
      labels:{
        show:true,
        total:{
          show:true,
          label:'TOTAL',
          fontSize:'14px',
          fontWeight:'bold',
          color:'#064e3b',
          formatter:()=>lixeiras.length
        }
      }
    }
  },
  dataLabels:{enable:false},
  states:{
    hover:{
      filter:{type:'darken', value:0.85}
    },
    active:{
      allowMultipleDataPointsSelection:false,
      filter:{
        type:'none'
      }
    }
  },
  Tooltip:{
    y:{formatter:(val:number)=>`${val}lixeiras`}
  }
};

  const mediaOcupacao = lixeiras.length > 0?(lixeiras.reduce((
    acc,curr )=> acc + curr.nivel_cheio,0)/lixeiras.length).toFixed(0):0;
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.tituloPrincipal}>Painel de Gestão</h1>
        <p className={styles.subtitulo}>Monitoramento analítico de resíduos</p>
      </div>

      <div className={styles.gridCards}>
        <div className={`${styles.cardBase} ${styles.cardTotal}`}>
          <span className={styles.labelCard}>Total de Pontos</span>
          <h2 className={`${styles.valorCard} text-emerald-900`}>{lixeiras.length}</h2>
        </div>

        <div className={`${styles.cardBase} ${styles.cardCritico}`}>
          <span className={styles.labelCard}>Alertas Críticos</span>
          <h2 className={`${styles.valorCard} text-red-600`}>{lixeirasCriticas}</h2>
        </div>

        <div className={`${styles.cardBase} ${styles.cardMedia}`}>
          <span className={styles.labelCard}>Média de Ocupação</span>
          <h2 className={`${styles.valorCard} text-amber-600`}>{mediaOcupacao}%</h2>
        </div>
      </div>

      <div className={styles.containerGrafico}>
        <h3 className={styles.tituloGrafico}>Distribuição de Carga</h3>
        {/* Cursor pointer para indicar que é clicável */}
        <div className="w-full flex justify-center cursor-pointer">
          <Chart 
            options={options} 
            series={series} 
            type="donut" 
            width={450} 
          />
        </div>
        <p className="text-xs text-gray-400 mt-4 italic">
          * Clique no gráfico para localizar no mapa
        </p>
      </div>
    </div>
  );
}
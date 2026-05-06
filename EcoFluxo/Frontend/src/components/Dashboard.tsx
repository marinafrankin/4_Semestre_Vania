
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
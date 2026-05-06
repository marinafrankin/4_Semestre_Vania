export const formatarTipoLixeira = (tipo: string) => {
  const nomes: Record<string, string> = {
    Plastico: "Plástico",
    Vidro: "Vidro",
    Papel: "Papel",
    Metal: "Metal",
    Organico: "Orgânico"
  };
  return nomes[tipo] || tipo;
};



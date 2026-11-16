// Configurações do Scuba Ciência Cidadã.
// Este é o único arquivo que precisa ser editado no dia a dia.

window.CORAL_CONFIG = {
  // Cole aqui a URL do App da Web do Google Apps Script (termina em /exec).
  // Enquanto estiver vazia, os registros ficam guardados no aparelho e não são enviados.
  SCRIPT_URL: "",

  // Locais de monitoramento.
  LOCAIS: [
    "Recife da Pedra Grande (Parcel das Paredes)",
    "Recife de Areia (Alcobaça)"
  ],

  // Espécies do banner. Para cada uma:
  //   grupo: título da seção no app
  //   nome: nome popular
  //   cientifico: nome científico
  //   foto: (opcional) arquivo dentro da pasta especies/, por exemplo "especies/coral-cerebro.jpg"
  // ATENÇÃO: lista de exemplo. Substituir pelas espécies do banner.
  ESPECIES: [
    { grupo: "Corais", nome: "Coral-cérebro", cientifico: "Mussismilia braziliensis", foto: "" },
    { grupo: "Corais", nome: "Coral-vela", cientifico: "Mussismilia harttii", foto: "" },
    { grupo: "Corais", nome: "Coral-de-fogo", cientifico: "Millepora alcicornis", foto: "" },
    { grupo: "Corais", nome: "Coral-estrela", cientifico: "Siderastrea stellata", foto: "" },
    { grupo: "Peixes", nome: "Peixe-frade", cientifico: "Pomacanthus paru", foto: "" },
    { grupo: "Peixes", nome: "Sargentinho", cientifico: "Abudefduf saxatilis", foto: "" },
    { grupo: "Peixes", nome: "Budião", cientifico: "Sparisoma spp.", foto: "" },
    { grupo: "Peixes", nome: "Peixe-leão (invasor)", cientifico: "Pterois volitans", foto: "" },
    { grupo: "Tartarugas", nome: "Tartaruga-verde", cientifico: "Chelonia mydas", foto: "" },
    { grupo: "Tartarugas", nome: "Tartaruga-de-pente", cientifico: "Eretmochelys imbricata", foto: "" }
  ]
};

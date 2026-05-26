export type ReferenceHome = {
  id: string;
  label: string;
  shortLabel: string;
  address: string;
  lat: number;
  lng: number;
  color: string;
};

export type Facility = {
  id: string;
  name: string;
  address: string;
  phone: string;
  priceSingle?: string;
  priceCouple?: string;
  lat: number;
  lng: number;
};

export const REFERENCE_HOMES: ReferenceHome[] = [
  {
    id: "gislaine",
    label: "Casa da Gislaine",
    shortLabel: "Gislaine",
    address: "Rua Coronel Romão Rodrigues Branco, 389",
    lat: -25.411648,
    lng: -49.238215,
    color: "#c47d6a",
  },
  {
    id: "crislaine",
    label: "Casa da Crislaine",
    shortLabel: "Crislaine",
    address: "Av. Prefeito Maurício Fruet, 1270",
    lat: -25.4408149,
    lng: -49.2277941,
    color: "#2a6b5e",
  },
  {
    id: "tulio",
    label: "Casa do Túlio",
    shortLabel: "Túlio",
    address: "Rua Ângelo Milani Scremin, 128",
    lat: -25.3614419,
    lng: -49.1923503,
    color: "#b8863a",
  },
];

export const FACILITIES: Facility[] = [
  {
    id: "versania",
    name: "Versania",
    address: "Rua Eduardo Sprada, 2195 — Campo Comprido, Curitiba",
    phone: "4132858558",
    priceSingle: "R$ 9.900",
    priceCouple: "R$ 9.900",
    lat: -25.4438581,
    lng: -49.3431565,
  },
  {
    id: "aw-vale",
    name: "AW Vale do Cuidado",
    address: "Rua Rio Paraná, 699 — Weissópolis, Pinhais",
    phone: "41985058656",
    lat: -25.4613114,
    lng: -49.1887934,
  },
  {
    id: "medina-tha",
    name: "Medina e Thá",
    address: "R. Rodolpho Senff, 436 — Jardim das Américas, Curitiba",
    phone: "41992841716",
    lat: -25.4984136,
    lng: -49.2895871,
  },
  {
    id: "morada-la-vie",
    name: "Morada La Vie",
    address: "Av. Desembargador Hugo Simas, 1435 — Bom Retiro, Curitiba",
    phone: "4130131318",
    lat: -25.4066222,
    lng: -49.2829394,
  },
  {
    id: "nova-vida",
    name: "Nova Vida — Casa de Repouso",
    address: "Rua Teffe, 810 — Bom Retiro, Curitiba",
    phone: "41998384116",
    lat: -25.413917,
    lng: -49.2818197,
  },
  {
    id: "elissa",
    name: "Elissa Village",
    address: "Rodovia do Caqui, 1525 — Campina Grande do Sul",
    phone: "41987927965",
    lat: -25.3524541,
    lng: -49.0830789,
  },
  {
    id: "vovo-marlene",
    name: "Vovó Marlene",
    address: "R. Isaac Victor Pereira, 513 — Atuba, Curitiba",
    phone: "41997043426",
    priceSingle: "R$ 6.000",
    priceCouple: "R$ 6.000",
    lat: -25.4001715,
    lng: -49.1859866,
  },
  {
    id: "manha-de-luz",
    name: "Manhã de Luz",
    address: "Rua Presidente Rodrigo Otávio, 522 — Alto da XV, Curitiba",
    phone: "41987821003",
    priceSingle: "R$ 6.200",
    priceCouple: "R$ 5.200",
    lat: -25.4268372,
    lng: -49.2445761,
  },
  {
    id: "villa-dei-fiori",
    name: "Villa Dei Fiori",
    address: "Rodovia João Leopoldo Jacomel, 198 — Piraquara",
    phone: "4136730073",
    lat: -25.444029,
    lng: -49.144041,
  },
  {
    id: "lar-maria",
    name: "Lar de Maria",
    address: "Av. Pres. Getúlio Vargas, 2.601 — Água Verde, Curitiba",
    phone: "4141160116",
    lat: -25.4499772,
    lng: -49.2840675,
  },
  {
    id: "paradyse",
    name: "Estância Paradyse",
    address: "R. Pastor Adolfo Weidmann, 3317 — Guarituba, Piraquara",
    phone: "41995831023",
    priceSingle: "R$ 9.000",
    priceCouple: "R$ 8.000",
    lat: -25.4610839,
    lng: -49.1554002,
  },
  {
    id: "arte-cuidar",
    name: "Arte e Cuidar",
    address: "R. Major Theolindo Ferreira Ribas, 2.801 — Hauer, Curitiba",
    phone: "41999361528",
    priceSingle: "R$ 12.500 a R$ 15.500",
    priceCouple: "R$ 9.250 a R$ 10.550",
    lat: -25.5004167,
    lng: -49.2490336,
  },
  {
    id: "garden-ville",
    name: "Garden Ville",
    address: "R. Jorge Cury Brahim, 524 — Pilarzinho, Curitiba",
    phone: "4133877877",
    lat: -25.3931688,
    lng: -49.2875014,
  },
  {
    id: "recanto-hortensias",
    name: "Recanto das Hortênsias",
    address: "Estrada do Cerne, 21.774 — Campo Magro",
    phone: "4136772849",
    lat: -25.3724013,
    lng: -49.4401744,
  },
  {
    id: "kenko",
    name: "Kenko Residência",
    address: "R. Pedro Siemens, 85 — Xaxim, Curitiba",
    phone: "4131493637",
    lat: -25.5113278,
    lng: -49.2617492,
  },
  {
    id: "gaia",
    name: "Gaia Residência",
    address: "R. do Amapá, 101 — Vista Alegre, Curitiba",
    phone: "41998240327",
    lat: -25.4113817,
    lng: -49.28545,
  },
  {
    id: "vinde",
    name: "Casa Vinde a Mim",
    address: "Rua João Dalegrave, 242 — Bacacheri, Curitiba",
    phone: "41999161559",
    lat: -25.4167339,
    lng: -49.225144,
  },
];

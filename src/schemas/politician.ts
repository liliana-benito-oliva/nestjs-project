import * as Z from "myzod";

export const politicianSchema = Z.object({
  nombre: Z.string(),
  partido: Z.string(),
  partido_para_filtro: Z.string(),
  genero: Z.string(),
  cargo: Z.string(),
  cargo_para_filtro: Z.string(),
  institucion: Z.string(),
  ccaa: Z.string(),
  sueldobase_sueld: Z.number(),
  complementos_sueldo: Z.number(),
  pagasextra_sueldo: Z.number(),
  otrasdietaseindemnizaciones_sueldo: Z.number(),
  trienios_sueldo: Z.number(),
  retribucionmensual: Z.number(),
  retribucionanual: Z.number(),
  observaciones: Z.string(),
});

export type Politician = Z.Infer<typeof politicianSchema>;

const paginationSchema = Z.object({
  next: Z.number(),
  pageSize: Z.number(),
})

export const politicianFromES = Z.object({
  NOMBRE: Z.string(),
  PARTIDO: Z.string(),
  PARTIDO_PARA_FILTRO: Z.string(),
  GENERO: Z.string(),
  CARGO: Z.string(),
  CARGO_PARA_FILTRO: Z.string(),
  INSTITUCION: Z.string(),
  CCAA: Z.string(),
  SUELDOBASE_SUELDO: Z.number(),
  COMPLEMENTOS_SUELDO: Z.number(),
  PAGAEXTRA_SUELDO: Z.number(),
  OTRASDIETASEINDEMNIZACIONES_SUELDO: Z.number(),
  TRIENIOS_SUELDO: Z.number(),
  RETRIBUCIONMENSUAL: Z.number(),
  RETRIBUCIONANUAL: Z.number(),
  OBSERVACIONES: Z.string(),
});

export type PoliticianFromES = Z.Infer<typeof politicianFromES>;

const politiciansAndPaginationSchema = Z.object({
  politicians: Z.array(politicianFromES)
}).and(paginationSchema);

export type PoliticiansAndPagination = Z.Infer<typeof politiciansAndPaginationSchema>

export const politicianTemplate = {
  index_patterns: ["politicians*"],
  mappings: {
    properties: {
      NOMBRE: {
        type: "text",
      },
      PARTIDO: {
        type: "text",
      },
      PARTIDO_PARA_FILTRO: {
        type: "keyword",
      },
      GENERO: {
        type: "keyword",
      },
      CARGO: {
        type: "text",
      },
      CARGO_PARA_FILTRO: {
        type: "keyword",
      },
      INSTITUCION: {
        type: "text",
      },
      CCAA: {
        type: "text",
      },
      SUELDOBASE_SUELDO: {
        type: "float",
      },
      COMPLEMENTOS_SUELDO: {
        type: "float",
      },
      PAGAEXTRA_SUELDO: {
        type: "float",
      },
      OTRASDIETASEINDEMNIZACIONES_SUELDO: {
        type: "float",
      },
      TRIENIOS_SUELDO: {
        type: 'float'
      },
      RETRIBUCIONMENSUAL: {
        type: 'float'
      },
      RETRIBUCIONANUAL: {
        type: 'float'
      },
      OBSERVACIONES: {
        type: 'text'
      }
    },
  },
};

export interface PoliticianSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: Politician;
    }>;
  };
}

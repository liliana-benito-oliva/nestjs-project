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
    observaciones: Z.string()
});

export type Politician = Z.Infer<typeof politicianSchema>
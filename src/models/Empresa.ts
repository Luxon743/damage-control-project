export type TipoEmpresa = 'contratista' | 'contratante'

export interface Empresa {
    id: number
    nombre: string
    tipo: TipoEmpresa
}
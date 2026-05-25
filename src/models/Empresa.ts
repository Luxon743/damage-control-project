export type TipoEmpresa = 'contratante' | 'contratista';

export interface Empresa {
  id: string;
  nombre: string;
  tipoEmpresa: TipoEmpresa;
  cuit: string;
}
import type { Empresa } from '../models/Empresa';

export const empresas: Empresa[] = [
  {
    id: 'emp-1',
    nombre: 'YPF',
    tipoEmpresa: 'contratante',
    cuit: '30-54668912-3'
  },
  {
    id: 'emp-2',
    nombre: 'Tecpetrol',
    tipoEmpresa: 'contratante',
    cuit: '30-68712345-9'
  },
  {
    id: 'emp-3',
    nombre: 'Siderca',
    tipoEmpresa: 'contratante',
    cuit: '30-71123456-2'
  },
  {
    id: 'emp-4',
    nombre: 'Soldaduras Patagónicas SRL',
    tipoEmpresa: 'contratista',
    cuit: '30-70543210-7'
  },
  {
    id: 'emp-5',
    nombre: 'Servicios Eléctricos del Sur',
    tipoEmpresa: 'contratista',
    cuit: '30-68901234-1'
  },
  {
    id: 'emp-6',
    nombre: 'Montajes Industriales Neuquén',
    tipoEmpresa: 'contratista',
    cuit: '30-70123456-8'
  }
];
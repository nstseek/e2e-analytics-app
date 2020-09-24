import { autoMapper } from '../utils/automapper';
import Base from './base';
import Empresa from './empresa';

export default class Fornecedor extends Base {
  nome: string = null;
  email: string = null;
  rg?: string = null;
  data_nasc?: Date = null;
  cpf?: string = null;
  cnpj?: string = null;
  empresas: Empresa[] = null;
  constructor(
    obj?: any,
    empresas?: Empresa[],
    upperFornecedor = false,
    upperEmpresa = false,
    purge = false
  ) {
    super();
    if (obj) {
      autoMapper(obj, this, upperFornecedor, purge);
    }
    if (empresas) {
      this.empresas = empresas.map(
        (empresa) => new Empresa(empresa, null, upperEmpresa)
      );
    }
  }
}

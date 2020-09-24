import { autoMapper } from '../utils/automapper';
import Base from './base';
import Fornecedor from './fornecedor';
import UF from './uf';

export default class Empresa extends Base {
  nome: string = null;
  cnpj: string = null;
  uf: UF = null;
  uf_id: number = null;
  fornecedores: Fornecedor[] = null;
  constructor(
    obj?: any,
    fornecedores?: Fornecedor[],
    upperEmpresa = false,
    upperFornecedor = false,
    purge = false
  ) {
    super();
    if (obj) {
      autoMapper(obj, this, upperEmpresa, purge);
      this.uf = new UF(obj);
    }
    if (fornecedores) {
      this.fornecedores = fornecedores.map(
        (fornecedor) => new Fornecedor(fornecedor, null, upperFornecedor, purge)
      );
    }
  }
}

import { autoMapper } from '../utils/automapper';
import Base from './base';
import Fornecedor from './fornecedor';
import UF from './uf';

export default class Empresa extends Base {
  nome: string = undefined;
  cnpj: string = undefined;
  uf: UF = undefined;
  uf_id: string = undefined;
  fornecedores: Fornecedor[] = undefined;
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
    }
    if (fornecedores) {
      this.fornecedores = fornecedores.map(
        (fornecedor) => new Fornecedor(fornecedor, null, upperFornecedor, purge)
      );
    }
  }
}

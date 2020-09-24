import { autoMapper } from '../utils/automapper';
import Base from './base';
import Fornecedor from './fornecedor';
import UF from './uf';

export default class Empresa extends Base {
  nome: string = null;
  cnpj: string = null;
  uf: UF = null;
  uf_id: string = null;
  fornecedores: Fornecedor[] = null;
  constructor(obj?: any, fornecedores?: Fornecedor[]) {
    super();
    if (obj) {
      autoMapper(obj, this);
    }
    if (fornecedores) {
      this.fornecedores = fornecedores.map(
        (fornecedor) => new Fornecedor(fornecedor)
      );
    }
  }
}

import { autoMapper } from '../utils/automapper';
import Base from './base';

export default class UF extends Base {
  nome: string = null;
  sigla: string = null;
  constructor(obj?: any) {
    super();
    if (obj) {
      autoMapper(obj, this);
    }
  }
}

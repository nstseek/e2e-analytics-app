import { Action, Reducer } from 'redux';
import { Empresa } from '../../components/Empresas/Empresas';
import { Fornecedor } from '../../components/Fornecedores/Fornecedores';
import { UF } from '../../components/UFs/UFs';
import DataActionTypes from './data.action-types';

export interface DataState {
  empresas: Empresa[];
  fornecedores: Fornecedor[];
  ufs: UF[];
}

const initialState: DataState = {
  empresas: [],
  fornecedores: [],
  ufs: []
};

export const reducer: Reducer<
  DataState,
  Action<DataActionTypes> & { payload: Partial<DataState> }
> = (
  state = { ...initialState },
  action: { payload: Partial<DataState>; type: DataActionTypes }
): DataState => {
  switch (action.type) {
    case DataActionTypes.UPDATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;

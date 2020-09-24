
import Inputmask from 'inputmask';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../configureStore';
import { Fornecedor } from '../Fornecedores/Fornecedores';
import { UF } from '../UFs/UFs';
import './Empresas.scss';
import { DataState, updateData } from '../../stores/data';
import { SystemState, updateSystem } from '../../stores/system';
import { Dispatch } from 'redux';
import TableViewer from '../TableViewer/TableViewer';

export interface Empresa {
  id?: number;
  nome: string;
  cnpj: string;
  uf?: UF;
  uf_id: string;
  fornecedores?: Fornecedor[];
}

interface Props {
  empresas: Empresa[];
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

const Empresas: React.FC<Props> = (props) => {
  return (
    <div>
      <TableViewer
        buttonTitle='Criar uma nova empresa'
        data={props.empresas.map((empresa) => [
          empresa.nome,
          Inputmask.format(empresa.cnpj, { mask: '99.999.999/9999-99' }),
          empresa.uf.sigla
        ])}
        ids={props.empresas.map((empresa) => empresa.id)}
        headers={['Nome', 'CNPJ', 'UF']}
        onDel={() => 'a'}
        onView={() => 'a'}
      />
    </div>
  );
};

const mapStateToProps = ({ data }: AppState) => ({
  empresas: data.empresas
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSystem: (state: Partial<SystemState>) => dispatch(updateSystem(state)),
  updateData: (state: Partial<DataState>) => dispatch(updateData(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);
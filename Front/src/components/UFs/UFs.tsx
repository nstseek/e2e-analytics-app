import { connect } from 'react-redux';
import React from 'react';
import { Dispatch } from 'redux';
import { AppState } from '../../configureStore';
import { DataState, updateData } from '../../stores/data';
import { SystemState, updateSystem } from '../../stores/system';
import './UFs.scss';
import TableViewer from '../TableViewer/TableViewer';

export interface UF {
  id: number;
  nome: string;
  sigla: string;
}

interface Props {
  ufs: UF[];
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

const UFs: React.FC<Props> = (props) => {
  return (
    <div>
      <TableViewer
        buttonTitle='Criar um novo UF'
        data={props.ufs.map((uf) => [uf.nome, uf.sigla])}
        ids={props.ufs.map((uf) => uf.id)}
        headers={['Nome', 'Sigla']}
        onDel={() => 'a'}
        onView={() => 'a'}
      />
    </div>
  );
};

const mapStateToProps = ({ data }: AppState) => ({
  ufs: data.ufs
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSystem: (state: Partial<SystemState>) => dispatch(updateSystem(state)),
  updateData: (state: Partial<DataState>) => dispatch(updateData(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(UFs);

import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { AppState } from '../../configureStore';
import { DataState, updateData } from '../../stores/data';
import { SystemState, updateSystem } from '../../stores/system';
import './UFs.scss';
import TableViewer from '../TableViewer/TableViewer';
import Axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import environment from '../../environment';
import UF from '../modals/UF/UF';

export interface UF {
  id?: number;
  nome: string;
  sigla: string;
}

export const clearUF: UF = {
  nome: '',
  sigla: ''
};

interface Props {
  ufs: UF[];
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

const UFs: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState<UF>(null);
  const [modal, setModal] = useState(false);

  const refreshData = async () => {
    try {
      props.updateSystem({
        loading: true
      });
      const response = await Axios.get<UF[]>(`${environment.baseUrl}/uf`);
      props.updateData({
        ufs: response.data
      });
    } catch (error) {
      props.updateSystem({
        dialog: {
          content: error,
          open: true,
          title: 'Erro'
        }
      });
    }
    props.updateSystem({
      loading: false
    });
  };
  return (
    <div>
      <UF
        onCancel={() => setModal(false)}
        edit={edit}
        open={modal}
        onSave={async (body) => {
          props.updateSystem({
            loading: true
          });

          try {
            const response: AxiosResponse<null> = edit
              ? await Axios.put(`${environment.baseUrl}/uf`, body, {
                  params: { id: body.id }
                })
              : await Axios.post(`${environment.baseUrl}/uf`, body);
            props.updateSystem({
              dialog: {
                content: 'Alterações salvas',
                open: true,
                title: 'Salvo'
              }
            });
          } catch (error) {
            props.updateSystem({
              dialog: {
                content: String(error),
                open: true,
                title: 'Erro'
              }
            });
          }

          props.updateSystem({
            dialog: {
              content: 'Alterações salvas',
              open: true,
              title: 'Salvo'
            }
          });

          setModal(false);
          setEdit(null);
          refreshData();
        }}
      />
      <TableViewer
        onCreate={() => {
          setEdit(null);
          setModal(true);
        }}
        buttonTitle='Criar um novo UF'
        data={props.ufs.map((uf) => [uf.nome, uf.sigla])}
        headers={['Nome', 'Sigla']}
        onDel={async (index) => {
          props.updateSystem({
            loading: true
          });
          try {
            await Axios.delete(`${environment.baseUrl}/uf`, {
              params: { id: props.ufs[index].id }
            });
          } catch (error) {
            props.updateSystem({
              dialog: {
                content: String(error),
                open: true,
                title: 'Erro'
              }
            });
          }

          refreshData();
        }}
        onView={(index) => {
          setEdit(props.ufs[index]);
          setModal(true);
        }}
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

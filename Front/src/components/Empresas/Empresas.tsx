import Inputmask from 'inputmask';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../configureStore';
import { Fornecedor } from '../Fornecedores/Fornecedores';
import { UF } from '../UFs/UFs';
import './Empresas.scss';
import { DataState, updateData } from '../../stores/data';
import { SystemState, updateSystem } from '../../stores/system';
import { Dispatch } from 'redux';
import TableViewer from '../TableViewer/TableViewer';
import Axios, { AxiosResponse } from 'axios';
import environment from '../../environment';
import Empresa from '../modals/Empresa/Empresa';
import _ from 'lodash';

export interface Empresa {
  id?: number;
  nome: string;
  cnpj: string;
  uf?: UF;
  uf_id: number;
  fornecedores?: Fornecedor[];
}

export const clearEmpresa: Empresa = {
  cnpj: '',
  fornecedores: [],
  nome: '',
  uf_id: 0
};

interface Props {
  empresas: Empresa[];
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

const Empresas: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState<Empresa>(null);
  const [modal, setModal] = useState(false);

  const refreshData = async () => {
    try {
      props.updateSystem({
        loading: true
      });
      const empresasResponse = await Axios.get<Empresa[]>(
        `${environment.baseUrl}/empresa`,
        { params: { fornecedores: 'true' } }
      );
      props.updateData({
        empresas: empresasResponse.data
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
      <Empresa
        onCancel={() => setModal(false)}
        edit={edit}
        open={modal}
        onSave={async (originalBody) => {
          props.updateSystem({
            loading: true
          });
          const body = _.cloneDeep(originalBody);
          body.cnpj = body.cnpj.replace(/\D/g, '');
          delete body.uf;
          if (body) {
            body.fornecedores = body.fornecedores.map((fornecedor) => {
              const fornec = { ...fornecedor };
              delete fornec.empresas;
              if (!fornec.id) {
                delete fornec.id;
              }
              if (fornec.cnpj) {
                fornec.cnpj = fornec.cnpj.replace(/\D/g, '');
              } else {
                delete fornec.cnpj;
              }
              if (fornec.rg) {
                fornec.rg = fornec.rg.replace(/\D/g, '');
              } else {
                delete fornec.rg;
              }
              if (fornec.cpf) {
                fornec.cpf = fornec.cpf.replace(/\D/g, '');
              } else {
                delete fornec.cpf;
              }
              if (fornec.data_nasc) {
                fornec.data_nasc = new Date(fornec.data_nasc).toISOString();
                fornec.data_nasc = fornec.data_nasc.slice(
                  0,
                  fornec.data_nasc.indexOf('T')
                );
              } else {
                delete fornec.data_nasc;
              }
              return fornec;
            });
          } else {
            delete body.fornecedores;
          }

          try {
            const response: AxiosResponse<null> = edit
              ? await Axios.put(`${environment.baseUrl}/empresa`, body, {
                  params: { id: body.id }
                })
              : await Axios.post(`${environment.baseUrl}/empresa`, body);
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
        buttonTitle='Criar uma nova empresa'
        data={props.empresas.map((empresa) => [
          empresa.nome,
          Inputmask.format(empresa.cnpj, { mask: '99.999.999/9999-99' }),
          empresa.uf.sigla
        ])}
        headers={['Nome', 'CNPJ', 'UF']}
        onDel={async (index) => {
          props.updateSystem({
            loading: true
          });
          await Axios.delete(`${environment.baseUrl}/empresa`, {
            params: { id: props.empresas[index].id }
          });
          refreshData();
        }}
        onView={(index) => {
          setEdit(props.empresas[index]);
          setModal(true);
        }}
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

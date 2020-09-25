import {
  TableContainer,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TextField,
  IconButton
} from '@material-ui/core';
import Axios, { AxiosResponse } from 'axios';
import Inputmask from 'inputmask';
import React, { useRef, useState } from 'react';
import environment from '../../environment';
import { Empresa } from '../Empresas/Empresas';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import './Fornecedores.scss';
import { DataState, updateData } from '../../stores/data';
import { SystemState, updateSystem } from '../../stores/system';
import { connect } from 'react-redux';
import { AppState } from '../../configureStore';
import { Dispatch } from 'redux';
import Fornecedor from '../modals/Fornecedor/Fornecedor';
import _ from 'lodash';
import { arrConv } from '../../utils/tools';

export interface Fornecedor {
  id?: number;
  nome: string;
  email: string;
  rg?: string;
  data_nasc?: string;
  cpf?: string;
  cnpj?: string;
  empresas: Empresa[];
}

export const clearFornecedor: Fornecedor = {
  email: '',
  empresas: [],
  nome: '',
  cnpj: '',
  cpf: '',
  data_nasc: null,
  id: 0,
  rg: ''
};

interface Props {
  fornecedores: Fornecedor[];
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

const Fornecedores: React.FC<Props> = (props) => {
  const nome = useRef<{ value: string }>();
  const cnpj = useRef<{ value: string }>();
  const [edit, setEdit] = useState<Fornecedor>(null);
  const [modal, setModal] = useState(false);

  const refreshData = async () => {
    try {
      props.updateSystem({
        loading: true
      });
      const params: { empresas: 'true'; nome?: string; cnpj?: string } = {
        empresas: 'true',
        nome: nome.current?.value || '',
        cnpj: cnpj.current?.value || ''
      };
      if (!params.nome) delete params.nome;
      if (!params.cnpj) delete params.cnpj;
      const fornecedoresResponse = await Axios.get<Fornecedor[]>(
        `${environment.baseUrl}/fornecedor`,
        { params }
      );
      props.updateData({
        fornecedores: fornecedoresResponse.data
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
      <Fornecedor
        onCancel={() => setModal(false)}
        edit={edit}
        open={modal}
        onSave={async (originalBody) => {
          props.updateSystem({
            loading: true
          });
          const body = _.cloneDeep(originalBody);
          if (body.cnpj) {
            body.cnpj = body.cnpj.replace(/\D/g, '');
          } else {
            delete body.cnpj;
          }
          if (body.rg) {
            body.rg = body.rg.replace(/\D/g, '');
          } else {
            delete body.rg;
          }
          if (body.cpf) {
            body.cpf = body.cpf.replace(/\D/g, '');
          } else {
            delete body.cpf;
          }
          if (body.data_nasc) {
            body.data_nasc = new Date(body.data_nasc).toISOString();
            body.data_nasc = body.data_nasc.slice(
              0,
              body.data_nasc.indexOf('T')
            );
          } else {
            delete body.data_nasc;
          }
          if (body.empresas) {
            body.empresas = body.empresas.map((empresa) => {
              const emp = { ...empresa };
              delete emp.fornecedores;
              if (!emp.id) {
                delete emp.id;
              }
              emp.cnpj = emp.cnpj.replace(/\D/g, '');
              return emp;
            });
          } else {
            delete body.empresas;
          }

          try {
            const response: AxiosResponse<null> = edit
              ? await Axios.put(`${environment.baseUrl}/fornecedor`, body, {
                  params: { id: body.id }
                })
              : await Axios.post(`${environment.baseUrl}/fornecedor`, body);
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
      <TableContainer>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => {
            setEdit(null);
            setModal(true);
          }}>
          Criar uma nova empresa
        </Button>
        <Table>
          <TableHead>
            <TableCell>Nome Fantasia</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>CNPJ</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>RG</TableCell>
            <TableCell>Data de nascimento</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  onChange={(event) => {
                    if (!nome.current) nome.current = event.target;
                    refreshData();
                  }}
                  label='Pesquisar por nome'
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <TextField
                  onChange={(event) => {
                    if (!cnpj.current) cnpj.current = event.target;
                    refreshData();
                  }}
                  label='Pesquisar por CNPJ'
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            {arrConv(props.fornecedores).map((fornecedor, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{fornecedor.nome}</TableCell>
                  <TableCell>{fornecedor.email}</TableCell>
                  <TableCell>
                    {fornecedor.cnpj
                      ? Inputmask.format(fornecedor.cnpj, {
                          mask: '99.999.999/9999-99'
                        })
                      : ''}
                  </TableCell>
                  <TableCell>
                    {fornecedor.cpf
                      ? Inputmask.format(fornecedor.cpf, {
                          mask: '999.999.999-99'
                        })
                      : ''}
                  </TableCell>
                  <TableCell>
                    {fornecedor.rg
                      ? Inputmask.format(fornecedor.rg, {
                          mask: '99.999.999-9'
                        })
                      : ''}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={async () => {
                        props.updateSystem({
                          loading: true
                        });
                        await Axios.delete(
                          `${environment.baseUrl}/fornecedor`,
                          { params: { id: fornecedor.id } }
                        );
                        refreshData();
                      }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        console.log(fornecedor);
                        setEdit(fornecedor);
                        setModal(true);
                      }}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = ({ data }: AppState) => ({
  fornecedores: data.fornecedores
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSystem: (state: Partial<SystemState>) => dispatch(updateSystem(state)),
  updateData: (state: Partial<DataState>) => dispatch(updateData(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Fornecedores);

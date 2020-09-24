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
import Axios from 'axios';
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

export interface Fornecedor {
  id?: string;
  nome: string;
  email: string;
  rg?: string;
  data_nasc?: Date;
  cpf?: string;
  cnpj?: string;
  empresas: Empresa[];
}

interface Props {
  fornecedores: Fornecedor[];
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

function arrConv<T>(obj: Array<T> | T): Array<T> {
  return Array.isArray(obj) ? obj : [obj];
}

const Fornecedores: React.FC<Props> = (props) => {
  const nome = useRef<{ value: string }>();
  const cnpj = useRef<{ value: string }>();
  const [edit, setEdit] = useState<Fornecedor>(null);
  const [modal, setModal] = useState(false);

  const refreshData = async () => {
    try {
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
  };
  return (
    <div>
      <Fornecedor
        onCancel={() => setModal(false)}
        edit={edit}
        open={modal}
        onSave={async (body) => {
          await Axios.post(`${environment.baseUrl}/fornecedor`, body);
          setModal(false);
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

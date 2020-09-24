import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  IconButton,
  Select,
  MenuItem,
  DialogActions,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Empresa as EmpresaDTO } from '../../Empresas/Empresas';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { AppState } from '../../../configureStore';
import { UF } from '../../UFs/UFs';
import './Empresa.scss';
import { Fornecedor as FornecedorDTO } from '../../Fornecedores/Fornecedores';

interface Props {
  onSave(data: EmpresaDTO): void;
  onCancel(): void;
  open: boolean;
  edit: EmpresaDTO;
  ufs: UF[];
}

const Empresa: React.FC<Props> = (props) => {
  const [nome, setNome] = useState(props.edit ? props.edit.nome : '');
  const [cnpj, setCNPJ] = useState(props.edit ? props.edit.cnpj : '');
  const [uf, setUF] = useState(props.edit?.uf_id ? props.edit?.uf_id : '');
  const [fornecedores, setFornecedores] = useState<FornecedorDTO[]>(
    props.edit && props.edit.fornecedores ? props.edit.fornecedores : []
  );

  return (
    <div className='Fornecedor'>
      <Dialog
        open={props.open}
        onClose={() => {
          props.onCancel();
        }}>
        <DialogTitle>Empresa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label='Nome'
              value={nome}
              onChange={(event) => {
                setNome(event.target.value);
              }}
            />
            <br />
            <TextField
              value={cnpj}
              label='CNPJ'
              onChange={(event) => {
                setCNPJ(event.target.value);
              }}
            />
            <br />
            <Select
              value={uf}
              onChange={(event) => {
                console.log(event);
                // setUF(event.value);
              }}>
              {props.ufs.map((uf, index) => (
                <MenuItem value={uf.id} key={index}>
                  {uf.sigla}
                </MenuItem>
              ))}
            </Select>
            <br />
            <IconButton
              onClick={() => {
                const arr = fornecedores ? [...fornecedores] : [];
                arr?.push({
                  email: '',
                  empresas: [],
                  nome: '',
                  cnpj: '',
                  cpf: '',
                  data_nasc: new Date(),
                  id: undefined,
                  rg: ''
                });
                setFornecedores(arr);
              }}>
              <AddIcon />
            </IconButton>
            {fornecedores?.map((empresa, index) => {
              return (
                <div key={index}>
                  <IconButton
                    color='secondary'
                    onClick={() => {
                      const arr = fornecedores ? [...fornecedores] : [];
                      arr?.splice(index, 1);
                      setFornecedores(arr);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                  <h6>Empresa {index + 1}</h6>

                  <TextField
                    value={fornecedores[index].nome}
                    label='Nome'
                    onChange={(event) => {
                      const arr = fornecedores ? [...fornecedores] : [];
                      arr[index].nome = event.target.value;
                      setFornecedores(arr);
                    }}
                  />
                  <br />
                  <TextField
                    value={fornecedores[index].cnpj}
                    label='CNPJ'
                    onChange={(event) => {
                      const arr = fornecedores ? [...fornecedores] : [];
                      arr[index].cnpj = event.target.value;
                      setFornecedores(arr);
                    }}
                  />
                  <br />
                </div>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFornecedores([]);
              props.onCancel();
            }}
            color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              props.onSave({
                cnpj,
                nome,
                uf_id: uf,
                fornecedores
              });
            }}
            color='primary'
            autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ data }: AppState) => ({
  ufs: data.ufs
});

export default connect(mapStateToProps)(Empresa);

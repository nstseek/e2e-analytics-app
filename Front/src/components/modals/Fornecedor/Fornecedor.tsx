import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Select
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './Fornecedor.scss';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppState } from '../../../configureStore';
import { UF } from '../../UFs/UFs';
import { connect } from 'react-redux';
import { Empresa } from '../../Empresas/Empresas';
import { Fornecedor as FornecedorDTO } from '../../Fornecedores/Fornecedores';

interface Props {
  onSave(data: {
    nome: string;
    email: string;
    rg: string;
    data_nasc: string;
    cpf: string;
    cnpj: string;
    empresas: Empresa[];
  }): void;
  onCancel(): void;
  open: boolean;
  edit: FornecedorDTO;
  ufs: UF[];
}

const Fornecedor: React.FC<Props> = (props) => {
  const nome = useRef<HTMLElement & { value: string }>();
  const email = useRef<HTMLElement & { value: string }>();
  const rg = useRef<HTMLElement & { value: string }>();
  const data_nasc = useRef<HTMLElement & { value: string }>();
  const cpf = useRef<HTMLElement & { value: string }>();
  const cnpj = useRef<HTMLElement & { value: string }>();
  const [empresas, setEmpresas] = useState<
    {
      nome: { value: string };
      cnpj: { value: string };
      uf_id: { value: string };
    }[]
  >();

  useEffect(() => {
    if (props.edit) {
      const arr = empresas ? [...empresas] : [];
      for (const _empresa of props.edit.empresas) {
        arr?.push({
          cnpj: null,
          nome: null,
          uf_id: null
        });
      }
      setEmpresas(arr);
    } else {
      setEmpresas([]);
    }
  }, [props.edit]);

  return (
    <div className='Fornecedor'>
      <Dialog
        open={props.open}
        onClose={() => {
          setEmpresas([]);
          props.onCancel();
        }}>
        <DialogTitle>Fornecedor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label='Nome'
              value={props.edit ? props.edit.nome : undefined}
              onChange={(event) => {
                if (!nome.current) nome.current = event.target;
              }}
            />
            <br />
            <TextField
              value={props.edit ? props.edit.email : undefined}
              label='Email'
              onChange={(event) => {
                if (!email.current) email.current = event.target;
              }}
            />
            <br />
            <TextField
              value={props.edit ? props.edit.rg : undefined}
              label='RG'
              onChange={(event) => {
                if (!rg.current) rg.current = event.target;
              }}
            />
            <br />
            <TextField
              value={
                props.edit && props.edit.data_nasc
                  ? new Date(props.edit.data_nasc)
                      .toISOString()
                      .slice(
                        0,
                        new Date(props.edit.data_nasc)
                          .toISOString()
                          .indexOf('T')
                      )
                  : undefined
              }
              type='date'
              onChange={(event) => {
                if (!data_nasc.current) data_nasc.current = event.target;
              }}
            />
            <br />
            <TextField
              value={props.edit ? props.edit.cpf : undefined}
              label='CPF'
              onChange={(event) => {
                if (!cpf.current) cpf.current = event.target;
              }}
            />
            <br />
            <TextField
              value={props.edit ? props.edit.cnpj : undefined}
              label='CNPJ'
              onChange={(event) => {
                if (!cnpj.current) cnpj.current = event.target;
              }}
            />
            <br />
            <IconButton
              onClick={() => {
                const arr = empresas ? [...empresas] : [];
                arr?.push({
                  cnpj: null,
                  nome: null,
                  uf_id: null
                });
                setEmpresas(arr);
              }}>
              <AddIcon />
            </IconButton>
            {empresas?.map((empresa, index) => {
              return (
                <div key={index}>
                  <IconButton
                    color='secondary'
                    onClick={() => {
                      const arr = empresas ? [...empresas] : [];
                      arr?.splice(index, 1);
                      setEmpresas(arr);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                  <h6>Empresa {index + 1}</h6>
                  <Select
                    value={
                      props.edit && props.edit.empresas.length > index
                        ? empresa.uf_id
                        : undefined
                    }
                    onChange={(event: any) => {
                      if (!empresa.uf_id) empresa.uf_id = event.target;
                    }}>
                    {props.ufs.map((uf, index) => (
                      <MenuItem value={uf.id} key={index}>{uf.sigla}</MenuItem>
                    ))}
                  </Select>
                  <TextField
                    value={
                      props.edit && props.edit.empresas.length > index
                        ? empresa.nome
                        : undefined
                    }
                    label='Nome'
                    onChange={(event) => {
                      if (!empresa.nome) empresa.nome = event.target;
                    }}
                  />
                  <br />
                  <TextField
                    value={
                      props.edit && props.edit.empresas.length > index
                        ? empresa.cnpj
                        : undefined
                    }
                    label='CNPJ'
                    onChange={(event) => {
                      if (!empresa.cnpj) empresa.cnpj = event.target;
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
              setEmpresas([]);
              props.onCancel();
            }}
            color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              props.onSave({
                cnpj: cnpj.current?.value || '',
                cpf: cpf.current?.value || '',
                data_nasc: data_nasc.current?.value || '',
                email: email.current?.value || '',
                nome: nome.current?.value || '',
                rg: rg.current?.value || '',
                empresas: empresas?.map((empresa) => ({
                  cnpj: empresa.cnpj?.value,
                  nome: empresa.nome?.value,
                  uf_id: empresa.uf_id?.value
                }))
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

export default connect(mapStateToProps)(Fornecedor);

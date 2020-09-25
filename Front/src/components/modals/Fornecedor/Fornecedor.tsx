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
  Button,
  FormControl,
  InputLabel,
  Typography,
  CardContent,
  Card
} from '@material-ui/core';
import { connect } from 'react-redux';
import { clearEmpresa, Empresa as EmpresaDTO } from '../../Empresas/Empresas';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useRef, useState } from 'react';
import { AppState } from '../../../configureStore';
import { UF } from '../../UFs/UFs';
import './Fornecedor.scss';
import {
  clearFornecedor,
  Fornecedor as FornecedorDTO
} from '../../Fornecedores/Fornecedores';
import { Input } from '@material-ui/core';
import { Identifier } from 'typescript';
import Inputmask from 'inputmask';
import { cnpjConfig, cpfConfig, rgConfig } from '../../../utils/masks';
import _ from 'lodash';

interface Props {
  onSave(data: FornecedorDTO): void;
  onCancel(): void;
  open: boolean;
  edit: FornecedorDTO;
  ufs: UF[];
  data?: FornecedorDTO;
}

const Fornecedor: React.FC<Props> = (props) => {
  const [formGroup, setFormGroup] = useState<FornecedorDTO>(
    _.cloneDeep(clearFornecedor)
  );

  useEffect(() => {
    if (props.edit) {
      props.edit.cnpj = props.edit.cnpj
        ? Inputmask.format(props.edit.cnpj, cnpjConfig)
        : props.edit.cnpj;
      props.edit.cpf = props.edit.cpf
        ? Inputmask.format(props.edit.cpf, cpfConfig)
        : props.edit.cpf;
      props.edit.rg = props.edit.rg
        ? Inputmask.format(props.edit.rg, rgConfig)
        : props.edit.rg;
      props.edit.data_nasc = props.edit.data_nasc
        ? new Date(props.edit.data_nasc).toISOString().slice(0, 10)
        : props.edit.data_nasc;
      if (props.edit.empresas) {
        props.edit.empresas = props.edit.empresas.map((empresa) => {
          empresa.cnpj = empresa.cnpj
            ? Inputmask.format(empresa.cnpj, cnpjConfig)
            : empresa.cnpj;
          return empresa;
        });
      } else {
        props.edit.empresas = [];
      }
      setFormGroup(props.edit);
    } else {
      setFormGroup(_.cloneDeep(clearFornecedor));
    }
  }, [props.edit]);

  return (
    <div className='Empresa'>
      <Dialog
        open={props.open}
        onClose={() => {
          props.onCancel();
        }}>
        <DialogTitle>Empresa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className='input-row'>
              <TextField
                type='text'
                label='Nome'
                value={formGroup.nome}
                onChange={(event) => {
                  setFormGroup({
                    ...formGroup,
                    nome: event.target.value
                  });
                }}
              />
              <TextField
                type='text'
                label='Email'
                value={formGroup.email}
                onChange={(event) => {
                  setFormGroup({
                    ...formGroup,
                    email: event.target.value
                  });
                }}
              />
            </div>
            <div className='input-row'>
              <TextField
                type='text'
                label='CNPJ'
                disabled={
                  !!formGroup.cpf || !!formGroup.data_nasc || !!formGroup.rg
                }
                error={
                  formGroup.cnpj?.replace(/\D/g, '').length > 0 &&
                  formGroup.cnpj?.replace(/\D/g, '').length !== 14
                }
                helperText={
                  formGroup.cnpj?.replace(/\D/g, '').length > 0 &&
                  formGroup.cnpj?.replace(/\D/g, '').length !== 14
                    ? 'Um CNPJ deve conter 14 dígitos'
                    : ''
                }
                value={formGroup.cnpj}
                onChange={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, '');
                  if (event.target.value.length <= 14) {
                    setFormGroup({
                      ...formGroup,
                      cnpj: Inputmask.format(event.target.value, cnpjConfig)
                    });
                  }
                }}
              />
              <TextField
                type='text'
                label='CPF'
                disabled={!!formGroup.cnpj}
                error={
                  formGroup.cpf?.replace(/\D/g, '').length > 0 &&
                  formGroup.cpf?.replace(/\D/g, '').length !== 11
                }
                helperText={
                  formGroup.cpf?.replace(/\D/g, '').length > 0 &&
                  formGroup.cpf?.replace(/\D/g, '').length !== 11
                    ? 'Um CPF deve conter 11 dígitos'
                    : ''
                }
                value={formGroup.cpf}
                onChange={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, '');
                  if (event.target.value.length <= 11) {
                    setFormGroup({
                      ...formGroup,
                      cpf: Inputmask.format(event.target.value, cpfConfig)
                    });
                  }
                }}
              />
            </div>
            <div className='input-row'>
              <TextField
                type='date'
                helperText='Data de nascimento'
                disabled={!!formGroup.cnpj}
                value={formGroup.data_nasc}
                onChange={(event) => {
                  setFormGroup({
                    ...formGroup,
                    data_nasc: event.target.value
                  });
                }}
              />
              <TextField
                type='text'
                label='RG'
                disabled={!!formGroup.cnpj}
                value={formGroup.rg}
                error={
                  formGroup.rg?.replace(/\D/g, '').length > 0 &&
                  (formGroup.rg?.replace(/\D/g, '').length < 7 ||
                    formGroup.rg?.replace(/\D/g, '').length > 10)
                }
                helperText={
                  formGroup.rg?.replace(/\D/g, '').length > 0 &&
                  (formGroup.rg?.replace(/\D/g, '').length < 7 ||
                    formGroup.rg?.replace(/\D/g, '').length > 10)
                    ? 'Um RG deve conter entre 7 e 10 dígitos'
                    : ''
                }
                onChange={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, '');
                  if (event.target.value.length <= 10) {
                    setFormGroup({
                      ...formGroup,
                      rg: Inputmask.format(event.target.value, rgConfig)
                    });
                  }
                }}
              />
            </div>
            <div className='input-row'>
              <Typography variant='body1'>Adicionar empresa</Typography>
              <IconButton
                color='primary'
                onClick={() => {
                  const fg = { ...formGroup };
                  formGroup.empresas.push(_.cloneDeep(clearEmpresa));
                  setFormGroup(fg);
                }}>
                <AddIcon />
              </IconButton>
            </div>
            {formGroup.empresas.map((empresa, index) => (
              <Card key={index} style={{ margin: '13px' }}>
                <CardContent>
                  <IconButton
                    onClick={() => {
                      const fg = { ...formGroup };
                      formGroup.empresas.splice(index, 1);
                      setFormGroup(fg);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                  <div className='input-row'>
                    <TextField
                      type='text'
                      label='Nome'
                      value={empresa.nome}
                      onChange={(event) => {
                        const fg = { ...formGroup };
                        fg.empresas[index].nome = event.target.value;
                        setFormGroup(fg);
                      }}
                    />
                    <TextField
                      type='text'
                      label='CNPJ'
                      error={
                        empresa.cnpj.replace(/\D/g, '').length > 0 &&
                        empresa.cnpj.replace(/\D/g, '').length !== 14
                      }
                      helperText={
                        empresa.cnpj.replace(/\D/g, '').length > 0 &&
                        empresa.cnpj.replace(/\D/g, '').length !== 14
                          ? 'Um CNPJ deve conter 14 dígitos'
                          : ''
                      }
                      value={empresa.cnpj}
                      onChange={(event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ''
                        );
                        if (event.target.value.length <= 14) {
                          const fg = { ...formGroup };
                          fg.empresas[index].cnpj = Inputmask.format(
                            event.target.value,
                            cnpjConfig
                          );
                          setFormGroup(fg);
                        }
                      }}
                    />
                  </div>
                  <div className='input-row'>
                    <TextField
                      select
                      label='UF'
                      value={empresa.uf_id}
                      onChange={(event) => {
                        const fg = { ...formGroup };
                        fg.empresas[index].uf_id = Number(event.target.value);
                        setFormGroup(fg);
                      }}>
                      {props.ufs.map((uf) => (
                        <MenuItem key={uf.id} value={uf.id}>
                          {uf.sigla}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </CardContent>
              </Card>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              props.onSave(formGroup);
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

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  IconButton,
  MenuItem,
  DialogActions,
  Button,
  Typography,
  CardContent,
  Card
} from '@material-ui/core';
import { connect } from 'react-redux';
import { clearEmpresa, Empresa as EmpresaDTO } from '../../Empresas/Empresas';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { AppState } from '../../../configureStore';
import { UF } from '../../UFs/UFs';
import './Empresa.scss';
import { clearFornecedor } from '../../Fornecedores/Fornecedores';
import Inputmask from 'inputmask';
import { cnpjConfig, cpfConfig, rgConfig } from '../../../utils/masks';
import { arrConv } from '../../../utils/tools';
import _ from 'lodash';

interface Props {
  onSave(data: EmpresaDTO): void;
  onCancel(): void;
  open: boolean;
  edit: EmpresaDTO;
  ufs: UF[];
}

const Empresa: React.FC<Props> = (props) => {
  const [formGroup, setFormGroup] = useState<EmpresaDTO>(
    _.cloneDeep(clearEmpresa)
  );

  useEffect(() => {
    if (props.edit) {
      props.edit.cnpj = Inputmask.format(props.edit.cnpj, cnpjConfig);
      if (props.edit.fornecedores) {
        props.edit.fornecedores = props.edit.fornecedores.map((fornecedor) => {
          fornecedor.cnpj = fornecedor.cnpj
            ? Inputmask.format(fornecedor.cnpj, cnpjConfig)
            : fornecedor.cnpj;
          fornecedor.cpf = fornecedor.cpf
            ? Inputmask.format(fornecedor.cpf, cpfConfig)
            : fornecedor.cpf;
          fornecedor.rg = fornecedor.rg
            ? Inputmask.format(fornecedor.rg, rgConfig)
            : fornecedor.rg;
          fornecedor.data_nasc = fornecedor.data_nasc
            ? new Date(fornecedor.data_nasc).toISOString().slice(0, 10)
            : fornecedor.data_nasc;
          return fornecedor;
        });
      } else {
        props.edit.fornecedores = [];
      }
      setFormGroup(props.edit);
    } else {
      setFormGroup(_.cloneDeep(clearEmpresa));
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
                label='CNPJ'
                error={
                  formGroup.cnpj.replace(/\D/g, '').length > 0 &&
                  formGroup.cnpj.replace(/\D/g, '').length !== 14
                }
                helperText={
                  formGroup.cnpj.replace(/\D/g, '').length > 0 &&
                  formGroup.cnpj.replace(/\D/g, '').length !== 14
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
            </div>
            <div className='input-row'>
              <TextField
                select
                label='UF'
                value={formGroup.uf_id}
                onChange={(event) =>
                  setFormGroup({
                    ...formGroup,
                    uf_id: Number(event.target.value)
                  })
                }>
                {props.ufs.map((uf) => (
                  <MenuItem key={uf.id} value={uf.id}>
                    {uf.sigla}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className='input-row'>
              <Typography variant='body1'>Adicionar fornecedor</Typography>
              <IconButton
                color='primary'
                onClick={() => {
                  const fg = { ...formGroup };
                  formGroup.fornecedores.push(_.cloneDeep(clearFornecedor));
                  setFormGroup(fg);
                }}>
                <AddIcon />
              </IconButton>
            </div>
            {arrConv(formGroup.fornecedores).map((fornecedor, index) => (
              <Card key={index} style={{ margin: '13px' }}>
                <CardContent>
                  <IconButton
                    onClick={() => {
                      const fg = { ...formGroup };
                      formGroup.fornecedores.splice(index, 1);
                      setFormGroup(fg);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                  <div className='input-row'>
                    <TextField
                      type='text'
                      label='Nome'
                      value={fornecedor.nome}
                      onChange={(event) => {
                        const fg = { ...formGroup };
                        fg.fornecedores[index].nome = event.target.value;
                        setFormGroup(fg);
                      }}
                    />
                    <TextField
                      type='text'
                      label='Email'
                      value={fornecedor.email}
                      onChange={(event) => {
                        const fg = { ...formGroup };
                        fg.fornecedores[index].email = event.target.value;
                        setFormGroup(fg);
                      }}
                    />
                  </div>
                  <div className='input-row'>
                    <TextField
                      type='text'
                      label='CNPJ'
                      disabled={
                        !!fornecedor.cpf ||
                        !!fornecedor.data_nasc ||
                        !!fornecedor.rg
                      }
                      error={
                        fornecedor.cnpj?.replace(/\D/g, '').length > 0 &&
                        fornecedor.cnpj?.replace(/\D/g, '').length !== 14
                      }
                      helperText={
                        fornecedor.cnpj?.replace(/\D/g, '').length > 0 &&
                        fornecedor.cnpj?.replace(/\D/g, '').length !== 14
                          ? 'Um CNPJ deve conter 14 dígitos'
                          : ''
                      }
                      value={fornecedor.cnpj}
                      onChange={(event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ''
                        );
                        if (event.target.value.length <= 14) {
                          const fg = { ...formGroup };
                          fg.fornecedores[index].cnpj = Inputmask.format(
                            event.target.value,
                            cnpjConfig
                          );
                          setFormGroup(fg);
                        }
                      }}
                    />
                    <TextField
                      type='text'
                      label='CPF'
                      disabled={!!fornecedor.cnpj}
                      error={
                        fornecedor.cpf?.replace(/\D/g, '').length > 0 &&
                        fornecedor.cpf?.replace(/\D/g, '').length !== 11
                      }
                      helperText={
                        fornecedor.cpf?.replace(/\D/g, '').length > 0 &&
                        fornecedor.cpf?.replace(/\D/g, '').length !== 11
                          ? 'Um CPF deve conter 11 dígitos'
                          : ''
                      }
                      value={fornecedor.cpf}
                      onChange={(event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ''
                        );
                        if (event.target.value.length <= 11) {
                          const fg = { ...formGroup };
                          fg.fornecedores[index].cpf = Inputmask.format(
                            event.target.value,
                            cpfConfig
                          );
                          setFormGroup(fg);
                        }
                      }}
                    />
                  </div>
                  <div className='input-row'>
                    <TextField
                      type='date'
                      helperText='Data de nascimento'
                      disabled={!!fornecedor.cnpj}
                      value={fornecedor.data_nasc}
                      onChange={(event) => {
                        const fg = { ...formGroup };
                        fg.fornecedores[index].data_nasc = event.target.value;
                        setFormGroup(fg);
                      }}
                    />
                    <TextField
                      type='text'
                      label='RG'
                      disabled={!!fornecedor.cnpj}
                      value={fornecedor.rg}
                      error={
                        fornecedor.rg?.replace(/\D/g, '').length > 0 &&
                        (fornecedor.rg?.replace(/\D/g, '').length < 7 ||
                          fornecedor.rg?.replace(/\D/g, '').length > 10)
                      }
                      helperText={
                        fornecedor.rg?.replace(/\D/g, '').length > 0 &&
                        (fornecedor.rg?.replace(/\D/g, '').length < 7 ||
                          fornecedor.rg?.replace(/\D/g, '').length > 10)
                          ? 'Um RG deve conter entre 7 e 10 dígitos'
                          : ''
                      }
                      onChange={(event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ''
                        );
                        if (event.target.value.length <= 10) {
                          const fg = { ...formGroup };
                          fg.fornecedores[index].rg = Inputmask.format(
                            event.target.value,
                            rgConfig
                          );
                          setFormGroup(fg);
                        }
                      }}
                    />
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

export default connect(mapStateToProps)(Empresa);

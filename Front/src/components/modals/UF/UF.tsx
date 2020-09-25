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
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AppState } from '../../../configureStore';
import { clearUF, UF as UFDTO } from '../../UFs/UFs';
import './UF.scss';
import _ from 'lodash';

interface Props {
  onSave(data: UFDTO): void;
  onCancel(): void;
  open: boolean;
  edit: UFDTO;
}

const UF: React.FC<Props> = (props) => {
  const [formGroup, setFormGroup] = useState<UFDTO>(_.cloneDeep(clearUF));

  useEffect(() => {
    if (props.edit) {
      setFormGroup(props.edit);
    } else {
      setFormGroup(_.cloneDeep(clearUF));
    }
  }, [props.edit]);

  return (
    <div className='Empresa'>
      <Dialog
        open={props.open}
        onClose={() => {
          props.onCancel();
        }}>
        <DialogTitle>UF</DialogTitle>
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
                label='Sigla'
                value={formGroup.sigla}
                onChange={(event) => {
                  setFormGroup({
                    ...formGroup,
                    sigla: event.target.value
                  });
                }}
              />
            </div>
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

export default connect(mapStateToProps)(UF);

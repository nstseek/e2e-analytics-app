import React, { useEffect } from 'react';
import './App.scss';
import Tabs from './components/Tabs/Tabs';
import Axios from 'axios';
import environment from './environment';
import { Empresa } from './components/Empresas/Empresas';
import { Fornecedor } from './components/Fornecedores/Fornecedores';
import { UF } from './components/UFs/UFs';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { AppState } from './configureStore';
import { SystemState, updateSystem } from './stores/system';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DataState, updateData } from './stores/data';

interface Props {
  system: SystemState;
  updateSystem(state: Partial<SystemState>): void;
  updateData(state: Partial<DataState>): void;
}

const App: React.FC<Props> = (props) => {
  const refreshData = async () => {
    props.updateSystem({
      loading: true
    });
    try {
      const empresasResponse = await Axios.get<Empresa[]>(
        `${environment.baseUrl}/empresa`,
        { params: { fornecedores: 'true' } }
      );
      props.updateData({
        empresas: empresasResponse.data
      });
      const ufResponse = await Axios.get<UF[]>(`${environment.baseUrl}/uf`);
      props.updateData({
        ufs: ufResponse.data
      });
      const fornecedorResponse = await Axios.get<Fornecedor[]>(
        `${environment.baseUrl}/fornecedor`,
        { params: { empresas: 'true' } }
      );
      props.updateData({
        fornecedores: fornecedorResponse.data
      });
      props.updateSystem({
        loading: false
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

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div id='App'>
      <Backdrop open={props.system.loading} id='backdrop'>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Dialog
        open={props.system.dialog.open}
        onClose={() => {
          props.updateSystem({
            dialog: {
              open: false,
              content: '',
              title: ''
            }
          });
        }}>
        <DialogTitle>{props.system.dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.system.dialog.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              props.updateSystem({
                dialog: {
                  open: false,
                  content: '',
                  title: ''
                }
              })
            }
            color='primary'
            autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <header>
        <span>E2E analytics app</span>
      </header>
      <Tabs refreshData={refreshData} />
    </div>
  );
};

const mapStateToProps = ({ system }: AppState) => ({
  system
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSystem: (state: Partial<SystemState>) => dispatch(updateSystem(state)),
  updateData: (state: Partial<DataState>) => dispatch(updateData(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

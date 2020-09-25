import { AppBar, Card, CardContent, Tab } from '@material-ui/core';
import MaterialTabs from '@material-ui/core/Tabs';
import React from 'react';
import { useState } from 'react';
import Empresas from '../Empresas/Empresas';
import Fornecedores from '../Fornecedores/Fornecedores';
import './Tabs.scss';
import TabContainer from '../TabContainer';
import UFs from '../UFs/UFs';

export enum TabState {
  UF = 0,
  Empresa,
  Fornecedor
}

interface Props {
  refreshData(): void;
}

const Tabs: React.FC<Props> = (props) => {
  const [tabState, setTabState] = useState(TabState.Empresa);

  return (
    <div>
      <AppBar position='static'>
        <MaterialTabs
          value={tabState}
          onChange={(_event, state) => {
            props.refreshData();
            setTabState(state);
          }}>
          <Tab label='UF' />
          <Tab label='Empresa' />
          <Tab label='Fornecedor' />
        </MaterialTabs>
      </AppBar>
      <TabContainer actualValue={tabState} tabValue={TabState.Empresa}>
        <Card>
          <CardContent>
            <Empresas />
          </CardContent>
        </Card>
      </TabContainer>
      <TabContainer actualValue={tabState} tabValue={TabState.Fornecedor}>
        <Card>
          <CardContent>
            <Fornecedores />
          </CardContent>
        </Card>
      </TabContainer>
      <TabContainer actualValue={tabState} tabValue={TabState.UF}>
        <Card>
          <CardContent>
            <UFs />
          </CardContent>
        </Card>
      </TabContainer>
    </div>
  );
};

export default Tabs;

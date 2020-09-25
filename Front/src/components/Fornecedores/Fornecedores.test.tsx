import React from 'react';
import { shallow } from 'enzyme';
import Fornecedores from './Fornecedores';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';

describe('<Fornecedores />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <Fornecedores />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

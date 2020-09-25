import React from 'react';
import { shallow } from 'enzyme';
import Empresas from './Empresas';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';

describe('<Empresas />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <Empresas />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

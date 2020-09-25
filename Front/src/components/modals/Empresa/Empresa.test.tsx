import React from 'react';
import { shallow } from 'enzyme';
import Empresa from './Empresa';
import configureStore from '../../../configureStore';
import { Provider } from 'react-redux';

describe('<Empresa />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <Empresa />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

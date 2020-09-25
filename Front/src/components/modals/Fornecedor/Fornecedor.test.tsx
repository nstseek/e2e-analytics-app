import React from 'react';
import { shallow } from 'enzyme';
import Fornecedor from './Fornecedor';
import configureStore from '../../../configureStore';
import { Provider } from 'react-redux';

describe('<Fornecedor />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <Fornecedor />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

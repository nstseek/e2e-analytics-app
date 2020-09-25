import React from 'react';
import { shallow } from 'enzyme';
import UF from './UF';
import configureStore from '../../../configureStore';
import { Provider } from 'react-redux';

describe('<UF />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <UF />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

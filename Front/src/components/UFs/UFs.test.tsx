import React from 'react';
import { shallow } from 'enzyme';
import UFs from './UFs';
import configureStore from '../../configureStore';
import { Provider } from 'react-redux';

describe('<UFs />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <UFs />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Empresas from './Empresas';

describe('<Empresas />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Empresas />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

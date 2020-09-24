import React from 'react';
import { shallow } from 'enzyme';
import Fornecedores from './Fornecedores';

describe('<Fornecedores />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Fornecedores />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

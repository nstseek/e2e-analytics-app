import React from 'react';
import { shallow } from 'enzyme';
import Empresa from './Empresa';

describe('<Empresa />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Empresa />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

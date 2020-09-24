import React from 'react';
import { shallow } from 'enzyme';
import UF from './UF';

describe('<UF />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<UF />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

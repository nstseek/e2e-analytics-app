import React from 'react';
import { shallow } from 'enzyme';
import UFs from './UFs';

describe('<UFs />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<UFs />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Fornecedor from './Fornecedor';

describe('<Fornecedor />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Fornecedor />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

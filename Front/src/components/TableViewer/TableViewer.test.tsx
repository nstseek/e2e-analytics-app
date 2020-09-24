import React from 'react';
import { shallow } from 'enzyme';
import TableViewer from './TableViewer';

describe('<TableViewer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TableViewer />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

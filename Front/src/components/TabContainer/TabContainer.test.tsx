import React from 'react';
import { shallow } from 'enzyme';
import TabContainer from './TabContainer';
import { TabState } from '../Tabs';

describe('<TabContainer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <TabContainer
        tabValue={TabState.Empresa}
        actualValue={TabState.Empresa}
      />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

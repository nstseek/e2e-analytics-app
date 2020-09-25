import React from 'react';
import { shallow } from 'enzyme';
import TableViewer from './TableViewer';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore';

describe('<TableViewer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <TableViewer />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

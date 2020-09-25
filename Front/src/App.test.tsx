import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

describe('<TabContainer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={configureStore()}>
        <App />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});

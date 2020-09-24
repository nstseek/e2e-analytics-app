import SystemActionTypes from './system.action-types';
import { Action, Reducer } from 'redux';

export interface Dialog {
  title: string;
  content: string;
  open: boolean;
}

export interface SystemState {
  loading: boolean;
  dialog: Dialog;
}

const initialState: SystemState = {
  loading: false,
  dialog: {
    open: false,
    content: '',
    title: ''
  }
};

export const reducer: Reducer<
  SystemState,
  Action<SystemActionTypes> & { payload: Partial<SystemState> }
> = (
  state = { ...initialState },
  action: { type: SystemActionTypes; payload: Partial<SystemState> }
): SystemState => {
  switch (action.type) {
    case SystemActionTypes.UPDATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;

import DataActionTypes from './data.action-types';
import { DataState } from './data.store';

export const updateData = (
  state: Partial<DataState>
): { type: DataActionTypes.UPDATE; payload: Partial<DataState> } => ({
  type: DataActionTypes.UPDATE,
  payload: state
});

export default updateData;

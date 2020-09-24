import SystemActionTypes from './system.action-types';
import { SystemState } from './system.store';

export const updateSystem = (
  state: Partial<SystemState>
): { type: SystemActionTypes.UPDATE; payload: Partial<SystemState> } => ({
  type: SystemActionTypes.UPDATE,
  payload: state
});

export default updateSystem;

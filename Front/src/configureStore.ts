import { createStore, combineReducers, CombinedState } from 'redux';
import { DataState, reducer as DataStore } from './stores/data';
import { SystemState, reducer as SystemStore } from './stores/system';

export type AppState = CombinedState<{
  data: DataState;
  system: SystemState;
}>;
export default function configureStore() {
  const rootReducer = combineReducers<AppState>({
    data: DataStore,
    system: SystemStore
  });
  const store = createStore(rootReducer);
  return store;
}

export const store = configureStore();

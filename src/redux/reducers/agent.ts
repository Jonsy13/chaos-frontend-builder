/* eslint-disable import/prefer-default-export */
import {
  AgentConfiguredAction,
  AgentConfiguredActions,
  AgentData,
} from '../../models/redux/agent';
import createReducer from './createReducer';

const initialState: AgentData = {
  agentConfigured: false,
};

export const configureAgent = createReducer<AgentData>(initialState, {
  [AgentConfiguredActions.CONFIGURE_AGENT](
    state: AgentData,
    action: AgentConfiguredAction
  ) {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export default configureAgent;

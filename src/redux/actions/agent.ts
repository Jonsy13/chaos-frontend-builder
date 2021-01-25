import {
  AgentConfiguredAction,
  AgentConfiguredActions,
  AgentData,
} from '../../models/redux/agent';

export const configureAgent = (data: AgentData): AgentConfiguredAction => {
  return {
    type: AgentConfiguredActions.CONFIGURE_AGENT,
    payload: data,
  };
};

export default configureAgent;

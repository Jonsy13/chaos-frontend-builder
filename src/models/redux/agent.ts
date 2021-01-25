export interface AgentData {
  agentConfigured: boolean;
}

export enum AgentConfiguredActions {
  CONFIGURE_AGENT = 'CONFIGURE_AGENT',
}

interface AgentConfiguredActionType<T, P> {
  type: T;
  payload: P;
}

export type AgentConfiguredAction = AgentConfiguredActionType<
  typeof AgentConfiguredActions.CONFIGURE_AGENT,
  AgentData
>;

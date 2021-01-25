export interface Member {
  user_uid: string;
  role: string;
  invitation: string;
  joined_at: string;
}

export interface Project {
  members: Member[];
  name: string;
  id: string;
}

export interface MyHubDetail {
  id: string;
  HubName: string;
  RepoBranch: string;
  RepoURL: string;
}

export interface Projects {
  getProjects: Project[];
}

export interface ProjectDetail {
  getProject: Project;
}

export interface ProjectDetailVars {
  projectID: string;
}

export interface SSHKey {
  privateKey: string;
  publicKey: string;
}

export interface SSHKeys {
  generaterSSHKey: SSHKey;
}

export interface MyHubInput {
  id?: string;
  HubName: string;
  RepoURL: string;
  RepoBranch: string;
  IsPrivate: Boolean;
  AuthType: MyHubType;
  Token?: string;
  UserName?: string;
  Password?: string;
  SSHPrivateKey?: string;
  SSHPublicKey?: string;
}

export interface MyHubData {
  id: string;
  RepoURL: string;
  RepoBranch: string;
  ProjectID: string;
  HubName: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateMyHub {
  MyHubDetails: MyHubInput;
  projectID: string;
}

export enum MyHubType {
  basic = 'basic',
  token = 'token',
  ssh = 'ssh',
}

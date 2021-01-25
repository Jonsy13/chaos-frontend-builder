export interface JWTData {
  username: string;
  email: string;
  name: string;
  uid: string;
}

export interface CurrentUserData {
  _id: string;
  uid: string;
  username: string;
  email: string;
  name: string;
  logged_in: boolean;
  created_at: string;
  updated_at: string;
  removed_at: string;
  state: string;
  Kind: string;
}

export interface UserInvite {
  uid: string;
  name: string;
  username: string;
  email: string;
}

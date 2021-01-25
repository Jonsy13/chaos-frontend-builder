export interface MemberInvitation {
  member: {
    project_id: string;
    user_uid: string;
  };
}

export interface MemberInviteNew {
  member: {
    project_id: string;
    user_uid: string;
    role: string;
  };
}

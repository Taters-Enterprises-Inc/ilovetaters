export interface LoginAuditParam {
  identity: string;
  password: string;
}

export interface UpdateAuditSettingsQuestionParam {
  id: number;
  status: number;
  type: "point" | "status";
}

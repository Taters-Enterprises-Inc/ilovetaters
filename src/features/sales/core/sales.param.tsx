export interface SubmitFormParam {
  formState: {
    [sectionName: string]: { [name: string]: { value: string | Date | null } };
  };
  saveStatus: boolean;
}

export interface CheckParam {
  formState: {
    [sectionName: string]: { [name: string]: { value: string | Date | null } };
  };
  grade: string;
  id: string | null;
  type: string | null;
}

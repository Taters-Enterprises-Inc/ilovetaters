export interface SubmitFormParam {
  formState: {
    [sectionName: string]: { [name: string]: { value: string | Date | null } };
  };
  saveStatus: boolean;
}

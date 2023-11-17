export interface SubmitFormParam {
  [sectionName: string]: { [name: string]: { value: string | Date | null } };
}

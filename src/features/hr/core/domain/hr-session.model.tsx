export interface HrSessionModel {
  hr: {
    identity: string;
    email: string;
    user_id: string;
    old_last_login: string;
    last_check: string;
    is_admin: boolean;
    is_manager: boolean;
    is_employee: boolean;
    is_hr: boolean;
    user_job_details: {
      id: number;
      hiring_date: string;
      tenure: string;
      company: string;
      department: string;
      position: string;
      employee_number: string;
      employee_status: string;
      department_id: string;
    } | null;
    user_personal_details: {
      id: number;
      first_name: string;
      middle_name: string;
      last_name: string;
      gender: string;
      date_of_birth: string;
      education: string;
      marital_status: string;
      sss_no: string;
      tin_no: string;
      philhealth_no: string;
      pagibig_no: string;
    } | null;
    user_contact_details: {
      id: number;
      contact_number: string;
      email: string;
      address: string;
      city: string;
    } | null;
    user_emergency_details: {
      id: number;
      emergency_contact_person: string;
      contact_info: string;
      emergency_contact_relationship: string;
      any_health_problem: string;
      blood_type: string;
    } | null;
    user_salary_details: {
      id: number;
      initial_salary: number;
      current_salary: number;
      bank_account_no: string;
    } | null;
    user_termination_details: {
      id: number;
      active: number;
      termination_date: string;
      termination_reason: string;
    } | null;
    user_other_details: {
      id: number;
      detail: string;
    } | null;
    user_direct_report: {
      id: number;
      first_name: string;
      last_name: string;
      position: string;
    } | null;
  };
}

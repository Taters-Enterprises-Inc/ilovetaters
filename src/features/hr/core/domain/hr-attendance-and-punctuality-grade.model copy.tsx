export interface HrAttendanceAndPunctualityGradeModel {
  attendance_and_punctuality: Array<{
    name: string;
    absences: string;
    tardiness: string;
  }>;
}

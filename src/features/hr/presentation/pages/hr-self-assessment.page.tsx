import { Helmet } from "react-helmet";
import {
  AssessmentOverallPerformance,
  AssessmentPerformanceCriteria,
  AssessmentRatingScale,
  SelfAndManagementAssessmentPersonalInfoSection,
  AssessmentInfo,
  AssessmentKraKpiGrade,
  AssessmentCoreCompetencyGrade,
  AssessmentFunctionalCompetencyAndPunctualityGrade,
  AssessmentComments,
  AssessmentAttendanceAndPunctuality,
} from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import {
  LogoutHrState,
  logoutHr,
  resetLogoutHr,
  selectLogoutHr,
} from "../slices/logout-hr.slice";
import { getHrSession } from "../slices/get-hr-session.slice";
import {
  getHrKraKpiGrade,
  selectGetHrKraKpiGrade,
} from "../slices/get-hr-kra-kpi-grade.slice";
import {
  getHrCoreCompetencyGrade,
  selectGetHrCoreCompetencyGrade,
} from "../slices/get-hr-core-competency-grade.slice";
import { getHrRatingScale } from "../slices/get-hr-rating-scale.slice";
import { getHrPerformanceCriteria } from "../slices/get-hr-performance-criteria.slice";
import {
  getHrFunctionalCompetencyAndPunctualityGrade,
  selectGetHrFunctionalCompetencyAndPunctualityGrade,
} from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";
import { getHrAttendanceAndPunctualityGrade } from "../slices/get-hr-attendance-and-punctuality-grade.slice";
import { selectGetHrComments } from "../slices/get-hr-comments.slice";

export function HrSelfAssessment() {
  const dispatch = useAppDispatch();
  const logoutHrState = useAppSelector(selectLogoutHr);
  const getHrKraKpiGradeState = useAppSelector(selectGetHrKraKpiGrade);
  const getHrCoreCompetencyGradeState = useAppSelector(
    selectGetHrCoreCompetencyGrade
  );
  const getHrFunctionalCompetencyAndPunctualityGradeState = useAppSelector(
    selectGetHrFunctionalCompetencyAndPunctualityGrade
  );
  const getHrCommentsState = useAppSelector(selectGetHrComments);

  useEffect(() => {
    dispatch(getHrPerformanceCriteria());
    dispatch(getHrRatingScale());
    dispatch(getHrKraKpiGrade());
    dispatch(getHrCoreCompetencyGrade());
    dispatch(getHrFunctionalCompetencyAndPunctualityGrade());
    dispatch(getHrAttendanceAndPunctualityGrade());
  }, [dispatch]);

  useEffect(() => {
    if (logoutHrState.status === LogoutHrState.success) {
      dispatch(getHrSession());
      dispatch(resetLogoutHr());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutHrState]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const submitData = {
      kra_kpi_grade: getHrKraKpiGradeState.data?.kra_kpi_grade,
      core_competency_grade:
        getHrCoreCompetencyGradeState.data?.core_competency_grade,
      functional_competency_and_punctuality_grade:
        getHrFunctionalCompetencyAndPunctualityGradeState.data
          ?.functional_competency_and_punctuality_grade,
      attendance_and_punctuality:
        getHrFunctionalCompetencyAndPunctualityGradeState.data
          ?.attendance_and_punctuality_grade,
      comments: getHrCommentsState.data?.comments,
    };

    console.log("SUBMIT DATA");
    console.log(submitData);
  };

  return (
    <>
      <Helmet>
        <title>Taters | Self Assessment</title>
      </Helmet>

      <main className="min-h-screen bg-[#FFDCDC75] p-4 pb-[200px]">
        <button
          onClick={() => {
            dispatch(logoutHr());
          }}
        >
          Logout
        </button>
        <form
          className="flex flex-col items-center space-y-3"
          onSubmit={handleSubmit}
        >
          <AssessmentInfo title="Employee Self Assessment Form" />
          <SelfAndManagementAssessmentPersonalInfoSection />
          <AssessmentPerformanceCriteria />
          <AssessmentOverallPerformance />
          <AssessmentRatingScale />
          <AssessmentKraKpiGrade />
          <AssessmentCoreCompetencyGrade />
          <AssessmentFunctionalCompetencyAndPunctualityGrade />
          <AssessmentAttendanceAndPunctuality />
          <AssessmentComments />
          <button
            type="submit"
            className={`text-white border border-secondary order-1 lg:order-2 lg:ml-2 text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px]  rounded-lg shadow-lg`}
          >
            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
              Submit
            </span>
          </button>
        </form>
      </main>
    </>
  );
}

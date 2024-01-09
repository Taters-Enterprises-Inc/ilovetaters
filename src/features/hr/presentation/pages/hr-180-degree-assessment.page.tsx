import { Helmet } from "react-helmet";
import {
  AssessmentOverallPerformance,
  AssessmentPerformanceCriteria,
  AssessmentRatingScale,
  AssessmentInfo,
  AssessmentKraKpiGrade,
  AssessmentCoreCompetencyGrade,
  AssessmentFunctionalCompetencyAndPunctualityGrade,
  AssessmentComments,
  AssessmentAttendanceAndPunctuality,
} from "../components";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useEffect } from "react";
import {
  LogoutHrState,
  logoutHr,
  resetLogoutHr,
  selectLogoutHr,
} from "../slices/logout-hr.slice";
import {
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";
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
import {
  getHrComments,
  selectGetHrComments,
} from "../slices/get-hr-comments.slice";
import {
  SubmitAssessmentState,
  resetSubmitAssessment,
  selectSubmitAssessment,
  submitAssessment,
} from "../slices/submit-assessment";
import { useNavigate } from "react-router-dom";
import { getHrActionItems } from "../slices/get-hr-action-items.slice";
import {
  getHrAppraisalResponse,
  selectGetHrAppraisalResponse,
} from "../slices/get-hr-appraisal-response.slice";
import { Hr180DegreeAssessmentPersonalInfoSection } from "../components/180-degree-assessment-personal-info-section";

export function Hr180DegreeAssessment() {
  const dispatch = useAppDispatch();
  const logoutHrState = useAppSelector(selectLogoutHr);
  const navigate = useNavigate();

  const getHrKraKpiGradeState = useAppSelector(selectGetHrKraKpiGrade);
  const getHrCoreCompetencyGradeState = useAppSelector(
    selectGetHrCoreCompetencyGrade
  );
  const getHrFunctionalCompetencyAndPunctualityGradeState = useAppSelector(
    selectGetHrFunctionalCompetencyAndPunctualityGrade
  );
  const getHrCommentsState = useAppSelector(selectGetHrComments);

  const getHrSessionState = useAppSelector(selectGetHrSession);
  const submitAssessmentState = useAppSelector(selectSubmitAssessment);
  const getHrAppraisalResponseState = useAppSelector(
    selectGetHrAppraisalResponse
  );

  useEffect(() => {
    let directReportId =
      getHrSessionState.data?.hr.user_direct_report?.id.toString();

    if (directReportId) {
      dispatch(getHrPerformanceCriteria());
      dispatch(getHrRatingScale());
      dispatch(getHrKraKpiGrade({ user_id: directReportId, type: "180" }));
      dispatch(
        getHrCoreCompetencyGrade({ user_id: directReportId, type: "180" })
      );
      dispatch(
        getHrFunctionalCompetencyAndPunctualityGrade({
          user_id: directReportId,
          type: "180",
        })
      );
      dispatch(getHrAttendanceAndPunctualityGrade());
      dispatch(getHrComments({ user_id: directReportId, type: "180" }));
      dispatch(
        getHrAppraisalResponse({ user_id: directReportId, type: "180" })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (submitAssessmentState.status === SubmitAssessmentState.success) {
      dispatch(getHrActionItems());
      dispatch(resetSubmitAssessment());
      navigate("/hr/dashboard");
    }
  }, [submitAssessmentState]);

  useEffect(() => {
    if (logoutHrState.status === LogoutHrState.success) {
      dispatch(getHrSession());
      dispatch(resetLogoutHr());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutHrState]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let directReportId =
      getHrSessionState.data?.hr.user_direct_report?.id.toString();

    const kra_kpi_grade = getHrKraKpiGradeState.data?.kra_kpi_grade;
    const core_competency_grade =
      getHrCoreCompetencyGradeState.data?.core_competency_grade;
    const functional_competency_and_punctuality_grade =
      getHrFunctionalCompetencyAndPunctualityGradeState.data
        ?.functional_competency_and_punctuality_grade;
    const attendance_and_punctuality =
      getHrFunctionalCompetencyAndPunctualityGradeState.data
        ?.attendance_and_punctuality_grade;
    const comments = getHrCommentsState.data?.comments;

    if (
      directReportId &&
      kra_kpi_grade &&
      core_competency_grade &&
      functional_competency_and_punctuality_grade &&
      attendance_and_punctuality
    ) {
      dispatch(
        submitAssessment({
          evaluatee_id: directReportId,
          is_180_degree_assessment: true,
          kra_kpi_grade: kra_kpi_grade,
          core_competency_grade: core_competency_grade,
          functional_competency_and_punctuality_grade:
            functional_competency_and_punctuality_grade,
          attendance_and_punctuality: attendance_and_punctuality,
          comments: comments,
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Taters | 180 Degree Assessment</title>
      </Helmet>

      <main className="min-h-screen text-[#242424] flex flex-col  border-b-[#F2F2F2]">
        <div className="border-b h-[50px] px-[24px] flex items-center flex justify-between flex-initial">
          <img
            onClick={() => {
              navigate("/hr/dashboard");
            }}
            src="https://www.ilovetaters.com/api/assets/images/shared/logo/taters-logo.png"
            alt="Taters Logo"
            className="w-[80px] cursor-pointer"
          />
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <img
                alt=""
                className="rounded-[50%] w-[25px] h-[25px] bg-[#F2F2F2] border border-gray "
                src="https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png"
                loading="lazy"
                role="presentation"
              />
              <span className="text-[11px] text-[#6B6B6B] font-[400] hover:text-black cursor-pointer ">
                {getHrSessionState.data?.hr.user_personal_details?.first_name}
              </span>
            </div>

            <span
              onClick={() => {
                dispatch(logoutHr());
              }}
              className="text-[11px] font-[400] hover:text-black cursor-pointer bg-red-700 px-4 pt-[1px] pb-[2px] rounded-full text-white"
            >
              Logout
            </span>
          </div>
        </div>

        <form
          className="flex flex-col items-center space-y-3 py-8"
          onSubmit={handleSubmit}
        >
          <AssessmentInfo title="180 Degree Assessment Form" />
          <Hr180DegreeAssessmentPersonalInfoSection />
          <AssessmentPerformanceCriteria />
          <AssessmentOverallPerformance />
          <AssessmentRatingScale />
          <AssessmentKraKpiGrade />
          <AssessmentCoreCompetencyGrade />
          <AssessmentFunctionalCompetencyAndPunctualityGrade />
          <AssessmentAttendanceAndPunctuality />
          <AssessmentComments />
          {getHrAppraisalResponseState.data?.appraisal_response ? null : (
            <button
              type="submit"
              className={`text-white border border-secondary order-1 lg:order-2 lg:ml-2 text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px]  rounded-lg shadow-lg`}
            >
              <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                Submit
              </span>
            </button>
          )}
        </form>
      </main>
    </>
  );
}

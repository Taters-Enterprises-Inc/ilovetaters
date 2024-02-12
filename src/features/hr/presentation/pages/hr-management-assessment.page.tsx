import { Helmet } from "react-helmet";
import {
  AssessmentOverallPerformance,
  AssessmentPerformanceCriteria,
  AssessmentRatingScale,
  ManagementAssessmentPersonalInfoSection,
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
import { useNavigate } from "react-router-dom";
import {
  LogoutHrState,
  logoutHr,
  resetLogoutHr,
  selectLogoutHr,
} from "../slices/logout-hr.slice";
import {
  getHrCoreCompetencyGrade,
  selectGetHrCoreCompetencyGrade,
} from "../slices/get-hr-core-competency-grade.slice";
import {
  getHrFunctionalCompetencyAndPunctualityGrade,
  selectGetHrFunctionalCompetencyAndPunctualityGrade,
} from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";
import {
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";
import {
  getHrComments,
  selectGetHrComments,
} from "../slices/get-hr-comments.slice";
import {
  getHrKraKpiGrade,
  selectGetHrKraKpiGrade,
} from "../slices/get-hr-kra-kpi-grade.slice";
import {
  SubmitAssessmentState,
  resetSubmitAssessment,
  selectSubmitAssessment,
  submitAssessment,
} from "../slices/submit-assessment";
import {
  getHrAppraisalResponse,
  selectGetHrAppraisalResponse,
} from "../slices/get-hr-appraisal-response.slice";
import { useEffect } from "react";
import { getHrPerformanceCriteria } from "../slices/get-hr-performance-criteria.slice";
import { getHrRatingScale } from "../slices/get-hr-rating-scale.slice";
import { getHrActionItems } from "../slices/get-hr-action-items.slice";
import { getHrAttendanceAndPunctualityGrade } from "../slices/get-hr-attendance-and-punctuality-grade.slice";
import {
  getHrAppraisalDirectReportStaff,
  selectGetHrAppraisalDirectReportStaff,
} from "../slices/get-hr-appraisal-direct-report-staff.slice";

export function HrManagementAssessment() {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const logoutHrState = useAppSelector(selectLogoutHr);
  const navigate = useNavigate();

  const staffId = query.get("staff_id");
  const staffActionItemId = query.get("staff_action_item_id");

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
    dispatch(getHrPerformanceCriteria());
    dispatch(getHrRatingScale());
    dispatch(getHrAttendanceAndPunctualityGrade());

    if (staffId) {
      dispatch(getHrKraKpiGrade({ user_id: staffId, type: "management" }));
      dispatch(getHrAppraisalDirectReportStaff(staffId));
      dispatch(
        getHrCoreCompetencyGrade({ user_id: staffId, type: "management" })
      );
      dispatch(
        getHrFunctionalCompetencyAndPunctualityGrade({
          user_id: staffId,
          type: "management",
        })
      );
      dispatch(getHrComments({ user_id: staffId, type: "management" }));
      dispatch(
        getHrAppraisalResponse({ user_id: staffId, type: "management" })
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
      staffId &&
      staffActionItemId &&
      kra_kpi_grade &&
      core_competency_grade &&
      functional_competency_and_punctuality_grade &&
      attendance_and_punctuality
    ) {
      dispatch(
        submitAssessment({
          staff_id: staffId,
          staff_action_item_id: staffActionItemId,
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
        <title>Taters | Management Assessment</title>
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
                {getHrSessionState.data?.hr.user_details.first_name}
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
          {getHrAppraisalResponseState.data?.appraisal_response ? (
            <div
              className="cursor-pointer uppercase text-blue-600 "
              onClick={() => {
                if (staffId)
                  navigate(
                    `/hr/staff-assessment-answer?staff_id=${staffId}&staff_action_item_id=${staffActionItemId}`
                  );
              }}
            >
              Check Employee assessment answers {">>>"}
            </div>
          ) : null}

          <AssessmentInfo title="Management Assessment Form" />

          <ManagementAssessmentPersonalInfoSection />

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

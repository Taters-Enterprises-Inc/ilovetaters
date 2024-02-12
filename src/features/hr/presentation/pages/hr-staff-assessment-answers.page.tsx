import { Helmet } from "react-helmet";
import {
  AssessmentOverallPerformance,
  AssessmentPerformanceCriteria,
  AssessmentRatingScale,
  SelfAssessmentPersonalInfoSection,
  AssessmentInfo,
  AssessmentKraKpiGrade,
  AssessmentCoreCompetencyGrade,
  AssessmentFunctionalCompetencyAndPunctualityGrade,
  AssessmentComments,
  AssessmentAttendanceAndPunctuality,
  StaffAssessmentAnswersPersonalInfoSection,
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
import { getHrFunctionalCompetencyAndPunctualityGrade } from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";
import { getHrAttendanceAndPunctualityGrade } from "../slices/get-hr-attendance-and-punctuality-grade.slice";
import { getHrComments } from "../slices/get-hr-comments.slice";
import {
  SubmitAssessmentState,
  resetSubmitAssessment,
  selectSubmitAssessment,
} from "../slices/submit-assessment";
import { useNavigate } from "react-router-dom";
import { getHrActionItems } from "../slices/get-hr-action-items.slice";
import { getHrAppraisalResponse } from "../slices/get-hr-appraisal-response.slice";
import { getHrAppraisalDirectReportStaff } from "../slices/get-hr-appraisal-direct-report-staff.slice";

export function HrStaffAssessmentAnswers() {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const staffId = query.get("staff_id");
  const staffActionItemId = query.get("staff_action_item_id");

  const logoutHrState = useAppSelector(selectLogoutHr);

  const getHrSessionState = useAppSelector(selectGetHrSession);

  useEffect(() => {
    if (staffId) {
      dispatch(getHrPerformanceCriteria());
      dispatch(getHrRatingScale());
      dispatch(getHrKraKpiGrade({ user_id: staffId, type: "self" }));
      dispatch(getHrCoreCompetencyGrade({ user_id: staffId, type: "self" }));
      dispatch(
        getHrFunctionalCompetencyAndPunctualityGrade({
          user_id: staffId,
          type: "self",
        })
      );
      dispatch(getHrAttendanceAndPunctualityGrade());
      dispatch(getHrComments({ user_id: staffId, type: "self" }));
      dispatch(getHrAppraisalResponse({ user_id: staffId, type: "self" }));
      dispatch(getHrAppraisalDirectReportStaff(staffId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (logoutHrState.status === LogoutHrState.success) {
      dispatch(getHrSession());
      dispatch(resetLogoutHr());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutHrState]);

  return (
    <>
      <Helmet>
        <title>Taters | Staff Assessment Answer</title>
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

        <div className="flex flex-col items-center space-y-3 py-8">
          <div
            className="cursor-pointer uppercase  text-blue-600 "
            onClick={() => {
              if (staffId)
                navigate(
                  `/hr/management-assessment?staff_id=${staffId}&staff_action_item_id=${staffActionItemId}`
                );
            }}
          >
            {"<<<"} Check Management assessment
          </div>
          <AssessmentInfo title="Staff Assessment Answer" />
          <StaffAssessmentAnswersPersonalInfoSection />
          <AssessmentPerformanceCriteria />
          <AssessmentOverallPerformance />
          <AssessmentRatingScale />
          <AssessmentKraKpiGrade />
          <AssessmentCoreCompetencyGrade />
          <AssessmentFunctionalCompetencyAndPunctualityGrade />
          <AssessmentAttendanceAndPunctuality />
          <AssessmentComments />
        </div>
      </main>
    </>
  );
}

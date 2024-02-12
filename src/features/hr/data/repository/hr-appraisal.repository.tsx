import axios from "axios";
import { HrAppraisalDirectReportStaffModel } from "features/hr/core/domain/hr-appraisal-direct-report-staff";
import { HrAppraisalResponseModel } from "features/hr/core/domain/hr-appraisal-response.model";
import { HrAttendanceAndPunctualityGradeModel } from "features/hr/core/domain/hr-attendance-and-punctuality-grade.model";
import { HrCommentsModel } from "features/hr/core/domain/hr-comments.model";
import { HrCoreCompetencyGradeModel } from "features/hr/core/domain/hr-core-competency-grade.model";
import { HrFunctionalCompetencyAndPunctualityGradeModel } from "features/hr/core/domain/hr-functional-competency-and-punctuality-grade.model";
import { HrKraKpiGradeModel } from "features/hr/core/domain/hr-kra-kpi-grade.model";
import { HrKrasModel } from "features/hr/core/domain/hr-kras.model";
import { HrPerformanceCriteriaModel } from "features/hr/core/domain/hr-performance-criteria.model";
import { HrRatingScaleModel } from "features/hr/core/domain/hr-rating-scale.model";
import {
  SubmitAssessmentParam,
  SubmitKraParam,
  UpdateKraParam,
} from "features/hr/core/hr.params";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export interface GetHrPerformanceCriteriaResponse {
  data: {
    message: string;
    data: HrPerformanceCriteriaModel;
  };
}

export interface GetHrRatingScaleResponse {
  data: {
    message: string;
    data: HrRatingScaleModel;
  };
}

export interface GetHrKraKpiGradeResponse {
  data: {
    message: string;
    data: HrKraKpiGradeModel;
  };
}

export interface GetHrCoreCompetencyGradeResponse {
  data: {
    message: string;
    data: HrCoreCompetencyGradeModel;
  };
}

export interface GetHrFunctionalCompetencyAndPunctualityGradeResponse {
  data: {
    message: string;
    data: HrFunctionalCompetencyAndPunctualityGradeModel;
  };
}
export interface GetHrAttendanceAndPunctualityGradeResponse {
  data: {
    message: string;
    data: HrAttendanceAndPunctualityGradeModel;
  };
}
export interface SubmitAssessmentResponse {
  data: {
    message: string;
  };
}

export interface SubmitKraResponse {
  data: {
    message: string;
  };
}
export interface GetHrKrasResponse {
  data: {
    message: string;
    data: HrKrasModel;
  };
}

export interface UpdateKraResponse {
  data: {
    message: string;
  };
}

export interface GetHrCommentsResponse {
  data: {
    message: string;
    data: HrCommentsModel;
  };
}

export interface GetHrAppraisalResponseResponse {
  data: {
    message: string;
    data: HrAppraisalResponseModel;
  };
}

export interface GetHrAppraisalDirectReportStaffResponse {
  data: {
    message: string;
    data: HrAppraisalDirectReportStaffModel;
  };
}

export function GetHrAppraisalDirectReportStaffRepository(
  staff_id: string
): Promise<GetHrAppraisalDirectReportStaffResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/direct-report-staff/staff/${staff_id}`,
    {
      withCredentials: true,
    }
  );
}

export function GetHrAppraisalResponseRepository(
  userId: string,
  type: "management" | "self"
): Promise<GetHrAppraisalResponseResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/response/${type}/${userId}`,
    {
      withCredentials: true,
    }
  );
}
export function GetHrCommentsRepository(
  user_id: string,
  type: "management" | "self"
): Promise<GetHrCommentsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/comments/${type}/${user_id}`,
    {
      withCredentials: true,
    }
  );
}

export function UpdateKraRepository(
  param: UpdateKraParam
): Promise<UpdateKraResponse> {
  return axios.put(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/kra-or-kpi`,
    param,
    {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetHrKrasRepository(): Promise<GetHrKrasResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/appraisal/kra-or-kpi`, {
    withCredentials: true,
  });
}

export function SubmitKraRepository(
  param: SubmitKraParam
): Promise<SubmitKraResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/kra-or-kpi`,
    param,
    {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function SubmitAssessmentRepository(
  param: SubmitAssessmentParam
): Promise<SubmitAssessmentResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/hr/appraisal/submit`, param, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetHrAttendanceAndPunctualityGradeRepository(): Promise<GetHrAttendanceAndPunctualityGradeResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/attendance-and-punctuality`,
    {
      withCredentials: true,
    }
  );
}
export function GetHrFunctionalCompetencyAndPunctualityGradeRepository(
  user_id: string,
  type: "management" | "self"
): Promise<GetHrFunctionalCompetencyAndPunctualityGradeResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/functional-competency-and-punctuality-grade/${type}/${user_id}`,
    {
      withCredentials: true,
    }
  );
}

export function GetHrCoreCompetencyGradeRepository(
  user_id: string,
  type: "management" | "self"
): Promise<GetHrCoreCompetencyGradeResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/core-competency-grade/${type}/${user_id}`,
    {
      withCredentials: true,
    }
  );
}

export function GetHrKraKpiGradeRepository(
  user_id: string,
  type: "management" | "self"
): Promise<GetHrKraKpiGradeResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/kra-kpi-grade/${type}/${user_id}`,
    {
      withCredentials: true,
    }
  );
}

export function GetHrRatingScaleRepository(): Promise<GetHrRatingScaleResponse> {
  return axios.get(`${REACT_APP_DOMAIN_URL}api/hr/appraisal/rating-scale`, {
    withCredentials: true,
  });
}

export function GetHrPerformanceCriteriaRepository(): Promise<GetHrPerformanceCriteriaResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/hr/appraisal/performance-criteria`,
    {
      withCredentials: true,
    }
  );
}

import { Helmet } from "react-helmet";
import {
  AssessmentOverallPerformance,
  AssessmentPerformanceCriteria,
  AssessmentRatingScale,
  SelfAndManagementAssessmentPersonalInfoSection,
  AssessmentInfo,
  AssessmentKraKpiGrade,
  AssessmentCoreCompetencyGrade,
  AssessmentFunctionalComeptencyAndPunctualityGrade,
  AssessmentComments,
  ManagementAssessmentSelfComformance,
} from "../components";

export function HrManagementAssessment() {
  return (
    <>
      <Helmet>
        <title>Taters | Management Assessment</title>
      </Helmet>

      <main className="min-h-screen bg-[#FFDCDC75] flex flex-col items-center p-4 pb-[200px] space-y-3">
        <AssessmentInfo title="Management Assessment Form" />

        <SelfAndManagementAssessmentPersonalInfoSection />

        <AssessmentPerformanceCriteria />

        <AssessmentOverallPerformance />

        <AssessmentRatingScale />

        <AssessmentKraKpiGrade />

        <AssessmentCoreCompetencyGrade />

        <AssessmentFunctionalComeptencyAndPunctualityGrade />

        <AssessmentComments />

        <ManagementAssessmentSelfComformance />
      </main>
    </>
  );
}

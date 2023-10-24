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
  SelfAssessmentComformance,
} from "../components";

export function HrSelfAssessment() {
  return (
    <>
      <Helmet>
        <title>Taters | Self Assessment</title>
      </Helmet>

      <main className="min-h-screen bg-[#FFDCDC75] flex flex-col items-center p-4 pb-[200px] space-y-3">
        <AssessmentInfo title="Employee Self Assessment Form" />

        <SelfAndManagementAssessmentPersonalInfoSection />

        <AssessmentPerformanceCriteria />

        <AssessmentOverallPerformance />

        <AssessmentRatingScale />

        <AssessmentKraKpiGrade />

        <AssessmentCoreCompetencyGrade />

        <AssessmentFunctionalComeptencyAndPunctualityGrade />

        <AssessmentComments />

        <SelfAssessmentComformance />
      </main>
    </>
  );
}

import { AssessmentAccordionSection } from "./assessment-accordion-section";

export function AssessmentOverallPerformance() {
  return (
    <AssessmentAccordionSection
      title="SUMMARY OF OVERALL PERFORMANCE"
      className="flex flex-col"
    >
      <div className="flex-initial">
        <h1 className="text-[11px] font-semibold text-center">
          Computation: Actual Rating X Weight = Total Score
        </h1>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold text-center">
            Areas Measured
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">
            Actual Rating
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">Weight</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">Total Score</h1>
        </div>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold ml-2">
            Section I - KRA / KPI
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 bg-yellow-100">
          <h1 className="text-[11px] font-semibold text-center ">4.3</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">40%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">1.73</h1>
        </div>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold ml-2">
            Section II - Core Competency
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 bg-yellow-100">
          <h1 className="text-[11px] font-semibold text-center">4.9</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">30%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">1.48</h1>
        </div>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold ml-2">
            Section III - Functional Competency and Punctuality
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 bg-yellow-100">
          <h1 className="text-[11px] font-semibold text-center">4.9</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">30%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">1.47</h1>
        </div>
      </div>
      <div className="flex-initial h-[25px] flex items-center border-t-4 border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold mr-2 text-end">
            PMS OVERALL RATING
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">100%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">4.68</h1>
        </div>
      </div>
    </AssessmentAccordionSection>
  );
}

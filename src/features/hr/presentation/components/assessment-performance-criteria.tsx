import { AssessmentAccordionSection } from "./assessment-accordion-section";
import { useAppSelector } from "features/config/hooks";
import { selectGetHrPerformanceCriteria } from "../slices/get-hr-performance-criteria.slice";

export function AssessmentPerformanceCriteria() {
  const getHrPerformanceCriteriaState = useAppSelector(
    selectGetHrPerformanceCriteria
  );

  return (
    <AssessmentAccordionSection
      title="Grade : Equaivalent Performance Criteria Will be determined from
        Overall Rating"
      className="flex"
    >
      <div className="flex-auto flex flex-col w-[100px]">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            Total Score{" "}
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300 p-1">
          <h1 className="text-[11px] italic  font-semibold text-center">
            Performance <br /> Criteria
          </h1>
        </div>
      </div>
      {getHrPerformanceCriteriaState.data?.performance_criteria.map((value) => (
        <div className="flex-auto flex flex-col border-l border-gray-300 ">
          <div className="flex-initial">
            <h1 className="text-[11px] font-semibold text-center py-1 ">
              4.90 - 5.00
            </h1>
          </div>
          <div className="flex-initial flex justify-center items-center border-t border-gray-300 p-1 h-[45px]">
            <h1
              className="text-[13px] italic font-semibold text-center leading-[16px]"
              dangerouslySetInnerHTML={{
                __html: value.name,
              }}
            />
          </div>
          <div className="flex-1 flex justify-center items-center border-t border-gray-300">
            <h1 className="text-[16px] font-semibold text-center uppercase">
              False
            </h1>
          </div>
        </div>
      ))}
    </AssessmentAccordionSection>
  );
}

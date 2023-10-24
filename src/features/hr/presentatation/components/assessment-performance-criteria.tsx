import { AssessmentAccordionSection } from "./assessment-accordion-section";

export function AssessmentPerformanceCriteria() {
  return (
    <AssessmentAccordionSection
      title="Grade : Equaivalent Performance Criteria Will be determined from
        Overall Rating"
      className="flex"
    >
      <div className="flex-auto flex flex-col ">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            Total Score
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300 p-1">
          <h1 className="text-[11px] italic  font-semibold text-center">
            Performance <br /> Criteria
          </h1>
        </div>
      </div>
      <div className="flex-auto flex flex-col border-l border-gray-300 ">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            4.90 - 5.00
          </h1>
        </div>
        <div className="flex-initial flex justify-center items-center border-t border-gray-300 p-1 h-[45px]">
          <h1 className="text-[13px] italic font-semibold text-center leading-[16px]">
            Exceptional <br /> Performance
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300">
          <h1 className="text-[16px] font-semibold text-center uppercase">
            False
          </h1>
        </div>
      </div>
      <div className="flex-auto flex flex-col border-l border-gray-300 ">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            4.90 - 5.00
          </h1>
        </div>
        <div className="flex-initial flex justify-center items-center border-t border-gray-300 p-1 h-[45px]">
          <h1 className="text-[13px] italic  font-semibold text-center leading-[16px]">
            Above Expectations
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300 bg-green-500">
          <h1 className="text-[16px] font-semibold text-center uppercase text-green-200">
            True
          </h1>
        </div>
      </div>
      <div className="flex-auto flex flex-col border-l border-gray-300 ">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            4.90 - 5.00
          </h1>
        </div>
        <div className="flex-initial flex justify-center items-center border-t border-gray-300 p-1 h-[45px]">
          <h1 className="text-[13px] italic  font-semibold text-center leading-[16px]">
            Reliable <br /> Performance
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300">
          <h1 className="text-[16px] font-semibold text-center uppercase">
            False
          </h1>
        </div>
      </div>
      <div className="flex-auto flex flex-col border-l border-gray-300 ">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            4.90 - 5.00
          </h1>
        </div>
        <div className="flex-initial h-[45px] flex justify-center items-center border-t border-gray-300 p-1">
          <h1 className="text-[13px] italic  font-semibold text-center leading-[16px]">
            Improvement <br /> Needed
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300">
          <h1 className="text-[16px] font-semibold text-center uppercase">
            False
          </h1>
        </div>
      </div>
      <div className="flex-auto flex flex-col border-l border-gray-300 ">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            4.90 - 5.00
          </h1>
        </div>
        <div className="flex-initial h-[45px] flex justify-center items-center border-t border-gray-300 p-1">
          <h1 className="text-[13px] font-semibold text-center leading-[16px]">
            Unsatisfactory
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300">
          <h1 className="text-[16px] font-semibold text-center uppercase">
            False
          </h1>
        </div>
      </div>
    </AssessmentAccordionSection>
  );
}

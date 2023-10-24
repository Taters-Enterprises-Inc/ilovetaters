import { AssessmentAccordionSection } from "./assessment-accordion-section";

export function AssessmentRatingScale() {
  return (
    <AssessmentAccordionSection
      title="Rating Scale:"
      className="flex flex-col leading-[14px]"
    >
      <div className="flex-initial flex">
        <div className="flex-initial w-[80px] flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">5</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">Exceptional</h1>
        </div>
        <div className="flex-1 border-l border-gray-300 p-2">
          <h1 className="text-[11px] font-semibold ">
            A role model, mentor or leader that embodies values & exhibits
            outstanding behaviors, skills, and expertise.
          </h1>
        </div>
      </div>

      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-initial w-[80px] flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">4</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">
            Highly Effective
          </h1>
        </div>
        <div className="flex-1 border-l border-gray-300 p-2">
          <h1 className="text-[11px] font-semibold ">
            Generally demonstartes competencies at levels exceeding expectations
            for their position.
          </h1>
        </div>
      </div>

      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-initial w-[80px] flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">3</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">Effective</h1>
        </div>
        <div className="flex-1 border-l border-gray-300 p-2">
          <h1 className="text-[11px] font-semibold ">
            Achieves performance and desmostrates competencies at a level
            consistent with their position.
          </h1>
        </div>
      </div>

      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-initial w-[80px] flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">2</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">
            Needs Improvement
          </h1>
        </div>
        <div className="flex-1 border-l border-gray-300 p-2">
          <h1 className="text-[11px] font-semibold ">
            Sometimes meets expectations or goals
          </h1>
        </div>
      </div>

      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-initial w-[80px] flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">1</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 flex items-center justify-center">
          <h1 className="text-[13px] font-semibold text-center">
            Needs Coaching
          </h1>
        </div>
        <div className="flex-1 border-l border-gray-300 p-2">
          <h1 className="text-[11px] font-semibold ">
            Regularly demonstrates behaviors incosistent with competencies and
            values.
          </h1>
        </div>
      </div>
    </AssessmentAccordionSection>
  );
}

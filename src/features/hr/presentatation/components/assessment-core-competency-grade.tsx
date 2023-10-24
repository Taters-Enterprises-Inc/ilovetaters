import { AssessmentRatingSection } from "./assessment-rating-section";

import data from "../../data/json/core_competency_grade.json";

export function AssessmentCoreCompetencyGrade() {
  return (
    <AssessmentRatingSection title="Core Competency Grade : ">
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className="flex border-b border-gray-300">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold">Core Competencies</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">Rating</h1>
          </div>
          <div className="flex-1 border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Critical Incidents / Comments
            </h1>
          </div>
        </div>

        {data.data.map((o) => (
          <div className="flex border-b border-gray-30">
            <div className="flex-initial w-[290px] p-2">
              <h1 className="text-[13px] font-semibold">{o.title}</h1>
              <h1 className="text-[10px] font-semibold">{o.description}</h1>
            </div>
            <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
              <h1 className="text-[11px] font-semibold text-blue-400"></h1>
            </div>
            <div className="flex-1 border-l border-gray-300 px-2 flex items-center justify-center"></div>
          </div>
        ))}
      </div>
    </AssessmentRatingSection>
  );
}

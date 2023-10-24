import { AssessmentRatingSection } from "./assessment-rating-section";

import data from "../../data/json/functional_competency_and_punctuality_grade.json";

export function AssessmentFunctionalComeptencyAndPunctualityGrade() {
  return (
    <AssessmentRatingSection title="Functional Competency and Punctuality Grade: ">
      <div className="flex">
        <div
          className={
            "flex bg-white border-t border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex flex-initial w-[290px] flex justify-end items-center px-2">
            <div className="flex-1  flex justify-end items-end">
              <h1 className="text-[10px] font-semibold">
                Functional Competencies Average
              </h1>
            </div>
            <div className="flex-initial w-[87px] flex justify-end items-end">
              <h1 className="text-[12px] font-semibold text-blue-400">90%</h1>
            </div>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">4.5</h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-t border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex flex-initial w-[290px] flex justify-end items-center px-2">
            <div className="flex-1  flex justify-end items-end">
              <h1 className="text-[10px] font-semibold">Punctuality</h1>
            </div>
            <div className="flex-initial w-[87px] flex justify-end items-end">
              <h1 className="text-[12px] font-semibold text-blue-400">10%</h1>
            </div>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">0.4</h1>
          </div>
        </div>
      </div>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className="flex border-b border-gray-300">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold">
              Functional Competencies
            </h1>
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
              <h1 className="text-[10px] font-semibold">
                <b>1. {o.title}</b> - {o.description}
              </h1>
            </div>
            <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
              <h1 className="text-[11px] font-semibold text-blue-400"></h1>
            </div>
            <div className="flex-1 border-l border-gray-300 px-2 flex items-center justify-center"></div>
          </div>
        ))}
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[13px] font-semibold">Sub Total Functional</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">5.0</h1>
          </div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

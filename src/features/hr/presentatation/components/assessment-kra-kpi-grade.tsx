import { AssessmentRatingSection } from "./assessment-rating-section";

export function AssessmentKraKpiGrade() {
  return (
    <AssessmentRatingSection title="KRA/KPI Grade : ">
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className="flex border-b border-gray-300">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold">
              Key Result Areas / Key Performance Indicators
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">Weight</h1>
          </div>
          <div className="flex-initial w-[230px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Result Achieved / Not Achieved
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">Rating</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">Score</h1>
          </div>
        </div>

        <div className="flex border-b border-gray-300 h-[200px] h-[80px]">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold text-blue-400">33%</h1>
          </div>
          <div className="flex-initial w-[230px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
        </div>

        <div className="flex border-b border-gray-300 h-[200px] h-[80px]">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold text-blue-400">33%</h1>
          </div>
          <div className="flex-initial w-[230px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
        </div>

        <div className="flex border-b border-gray-300 h-[200px] h-[80px]">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold text-blue-400">33%</h1>
          </div>
          <div className="flex-initial w-[230px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center"></div>
        </div>
      </div>

      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[13px] font-semibold text-blue-400">Total</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold text-blue-400">100%</h1>
          </div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

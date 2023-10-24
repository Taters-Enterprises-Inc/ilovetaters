import { AssessmentRatingSection } from "./assessment-rating-section";

export function AssessmentComments() {
  return (
    <AssessmentRatingSection>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className=" border-b border-gray-300">
          <div className="flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold uppercase">Comments</h1>
          </div>
        </div>

        <div className=" border-b border-gray-300 px-2">
          <h1 className=" text-[11px] font-semibold uppercase">
            A. Self Assessment on the Overall Performance and Development
          </h1>
        </div>

        <div className="flex border-b border-gray-30">
          <div className="flex-1 p-2 flex justify-center items-center">
            <h1 className="text-[10px] font-semibold uppercase ">
              Key Strengths
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300">
            <h1 className="text-[10px] font-semibold uppercase">
              Areas for Development
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300">
            <h1 className="text-[10px] font-semibold uppercase">
              Major Development Plans for next year
            </h1>
          </div>
        </div>

        <div className="flex border-b border-gray-30 h-[50px]">
          <div className="flex-1 p-2 flex justify-center items-center"></div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>

        <div className=" border-b border-gray-300 px-2">
          <h1 className=" text-[11px] font-semibold uppercase">
            B. Comments on your Overall Performance and Development Plan
          </h1>
        </div>
        <div className="flex border-b border-gray-30 h-[80px]"></div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[11px]">Absences (Unauthorized)</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[11px]">4.0</h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[11px]">Tardiness</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[11px]">4.0</h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[13px] font-semibold">
              Sub Total Punctuality Average :
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">4.0</h1>
          </div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

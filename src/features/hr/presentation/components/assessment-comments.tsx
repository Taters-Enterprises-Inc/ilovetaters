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
              Key Strengths <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300">
            <h1 className="text-[10px] font-semibold uppercase">
              Areas for Development <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-initial w-[250px] p-2 flex justify-center items-center border-l border-gray-300">
            <h1 className="text-[10px] font-semibold uppercase">
              Major Development Plans for next year{" "}
              <span className="text-red-500">*</span>
            </h1>
          </div>
        </div>

        <div className="flex border-b border-gray-30 min-h-[50px]">
          <div className="flex-1">
            <textarea
              required
              className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
            />
          </div>
          <div className="flex-1 border-l border-gray-300">
            <textarea
              required
              className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
            />
          </div>
          <div className="flex-initial w-[250px] border-l border-gray-300">
            <textarea
              required
              className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
            />
          </div>
        </div>

        <div className=" border-b border-gray-300 px-2">
          <h1 className="text-[11px] font-semibold uppercase">
            B. Comments on your Overall Performance and Development Plan{" "}
            <span className="text-red-500">*</span>
          </h1>
        </div>
        <div className="flex border-b border-gray-300  min-h-[80px]">
          <textarea
            required
            className="w-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
          />
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

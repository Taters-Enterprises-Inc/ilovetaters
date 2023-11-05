import { AssessmentRatingSection } from "./assessment-rating-section";

export function SelfAssessmentComformance() {
  return (
    <AssessmentRatingSection>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className=" border-b border-gray-300">
          <div className="flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold uppercase">
              Conformance
            </h1>
          </div>
        </div>

        <div className=" border-b border-gray-300 px-2 flex justify-center items-center">
          <h1 className=" text-[11px] font-semibold ">
            I understand and have answered truthfuly with the Specific
            Objectives and Development Plans
          </h1>
        </div>

        <div className="flex border-b border-gray-30 h-[50px]">
          <div className="flex-1 p-2 flex justify-end items-center">
            <h1 className="text-[10px] font-semibold uppercase ">
              Employee's Signature Over Printed Name:
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>

        <div className="flex border-b border-gray-30 h-[30px]">
          <div className="flex-1 p-2 flex justify-end items-center">
            <h1 className="text-[10px] font-semibold uppercase ">
              Date signed:
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>

        <div className="flex border-b border-gray-30 h-[50px]">
          <div className="flex-1 p-2 flex justify-end items-center">
            <h1 className="text-[10px] font-semibold uppercase ">
              Received by HR Representative and Date:
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

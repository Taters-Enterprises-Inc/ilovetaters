import { AssessmentRatingSection } from "./assessment-rating-section";

export function ManagementAssessmentSelfComformance() {
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

        <div className="flex border-b border-gray-300 px-2 flex">
          <div className="flex-initial w-[40px] h-[30px]"></div>
          <div className="flex-1 px-2 border-l border-gray-300 flex justify-start items-center">
            <h1 className=" text-[11px] font-semibold ">
              I understand and have answered truthfuly with the Specific
              Objectives and Development Plans
            </h1>
          </div>
        </div>

        <div className="flex border-b border-gray-300 px-2 flex">
          <div className="flex-initial w-[40px] h-[30px]"></div>
          <div className="flex-1 px-2 border-l border-gray-300 flex justify-start items-center">
            <h1 className=" text-[11px] font-semibold ">
              I agree with my immediate superior's evaluation of my performance
              and it was clrearly discussed with me.
            </h1>
          </div>
        </div>

        <div className="flex border-b border-gray-30 h-[50px]">
          <div className="flex-1 p-2 flex justify-end items-center">
            <h1 className="text-[10px] font-semibold">
              Employee's Signature Over Printed Name and Date:
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>

        <div className="flex border-b border-gray-30 h-[30px]">
          <div className="flex-1 p-2 flex justify-end items-center">
            <h1 className="text-[10px] font-semibold ">
              Immediate Superior's Signature Over Printed Name and Date:
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>

        <div className="flex border-b border-gray-30 h-[50px]">
          <div className="flex flex-col flex-1  p-2 ">
            <div className="flex-1">
              <h1 className="text-[10px] font-semibold italic">
                Submitted to:
              </h1>
            </div>
            <div className="flex-1 flex justify-end items-end">
              <h1 className="text-[10px] font-semibold ">
                HR Representative Printed Name and Date:
              </h1>
            </div>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300"></div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

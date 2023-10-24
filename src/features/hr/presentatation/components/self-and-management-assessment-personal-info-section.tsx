import { AssessmentSection } from "./assessment-section";

export function SelfAndManagementAssessmentPersonalInfoSection() {
  return (
    <AssessmentSection className="flex h-[150px]">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-initial w-[113px] flex flex-col">
              <div className="flex-1 flex justify-end items-center">
                <h1 className="text-[10px] mr-2 uppercase font-semibold">
                  Name <span className="text-red-500">*</span> :
                </h1>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <h1 className="text-[10px] mr-2 uppercase font-semibold">
                  Position <span className="text-red-500">*</span> :
                </h1>
              </div>
            </div>

            <div className="flex-1 border-l border-gray-200 flex flex-col">
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                />
              </div>

              <div className="flex-1 border-t border-gray-200 flex">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                  />
                </div>
                <div className="flex flex-initial w-[149px] border-l border-gray-200 flex items-center">
                  <h1 className="text-[10px] ml-2 font-semibold ">
                    Emp. No. <span className="text-red-500">*</span> :
                  </h1>
                  <input
                    type="text"
                    className="w-full flex-1 block text-[10px] h-full m-0 pl-2 text-green-600"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 border-t border-gray-300">
            <div className=" flex flex-col flex-1">
              <div className="flex-1 flex justify-center items-center">
                <h1 className="text-[11px]  uppercase text-center font-semibold">
                  Purpose of Appraisal
                </h1>
              </div>
              <div className="flex-1 border-t border-gray-200 flex">
                <div className="flex-1 flex items-center">
                  <h1 className="text-[10px] ml-2 font-semibold">
                    For Regularization <span className="text-red-500">*</span>
                  </h1>
                </div>
                <div className="flex-1 border-l border-gray-200">
                  <input
                    type="text"
                    className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                  />
                </div>
              </div>
            </div>
            <div className="flex-initial w-[250px] border-l border-gray-300 flex flex-col">
              <div className="flex-1 flex">
                <div className="flex-initial w-[100px]">
                  <h1 className="text-[10px] mr-1 text-end uppercase font-semibold">
                    Date Hired <span className="text-red-500">*</span> :
                  </h1>
                </div>
                <div className="flex-1 border-l border-gray-200">
                  <input
                    type="text"
                    className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                  />
                </div>
              </div>
              <div className="flex flex-1 border-t border-gray-200">
                <div className="flex-initial w-[100px]">
                  <h1 className="text-[10px] mr-1 text-end uppercase font-semibold">
                    DEPARTMENT <span className="text-red-500">*</span> :
                  </h1>
                </div>
                <div className="flex-1 border-l border-gray-200">
                  <input
                    type="text"
                    className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-initial h-[60px] border-t border-gray-300">
          <div className="flex-1 flex flex-col">
            <h1 className="text-[10px] ml-2 font-semibold">Other</h1>
            <textarea className="w-full block text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600" />
          </div>
          <div className="flex flex-col flex-initial w-[250px] border-l border-gray-300">
            <h1 className="text-[10px] ml-2 font-semibold">
              SECTION (if any) :
            </h1>
            <textarea className="w-full block text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-initial border-l border-gray-300 w-[220px]">
        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-[12px] text-center font-semibold">
              Overall Self <br /> Assessment <br /> Rating
            </h1>
          </div>
          <div className="flex-1  border-l border-gray-300 bg-yellow-100 flex items-center justify-center">
            <h1 className="text-[28pt]  uppercase font-bold">4.68</h1>
          </div>
        </div>

        <div className="flex-initial h-[60px] border-t border-gray-300 flex flex-col items-center">
          <h1 className="text-[11px]  uppercase font-semibold">
            Performance Period
          </h1>
          <h1 className="text-[14px] uppercase font-bold  mt-1">
            Mid Year or Year End
          </h1>
        </div>
      </div>
    </AssessmentSection>
  );
}

import { useAppSelector } from "features/config/hooks";
import { ADMIN_INFLUENCER_STATUS } from "features/shared/constants";
import { selectGetInfluencer } from "../slices/get-influencer.slice";
import { InfluencerContractViewer } from "./influencer-contract-viewer";

export function ProfileInfluencerContractVerified() {
  const getInfluencerState = useAppSelector(selectGetInfluencer);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl ">
          Influencer Registration
        </h1>

        {getInfluencerState.data?.status ? (
          <span
            className="px-4 py-1 text-base rounded-lg"
            style={{
              color: "white",
              backgroundColor:
                ADMIN_INFLUENCER_STATUS[getInfluencerState.data.status].color,
            }}
          >
            {ADMIN_INFLUENCER_STATUS[getInfluencerState.data.status].name}
          </span>
        ) : (
          <span
            className="px-4 py-1 text-base rounded-lg"
            style={{
              color: "white",
              backgroundColor: "#a21013",
            }}
          >
            No Application
          </span>
        )}
      </div>

      <div className=" order-2 lg:order-1 lg:mt-0 mt-4">
        <div
          className="hidden px-4 py-3 mb-4 text-green-900 bg-green-100 border-t-4 border-green-500 rounded-b shadow-md lg:block"
          role="alert"
        >
          <div className="relative flex">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4 text-green-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="m-0 font-bold">Signed contract verified</p>
              <p className="text-xs">
                We successfully verify your contract, kindly wait, we're
                completing your registration.
              </p>
            </div>
          </div>
        </div>
        <InfluencerContractViewer />
      </div>
    </div>
  );
}

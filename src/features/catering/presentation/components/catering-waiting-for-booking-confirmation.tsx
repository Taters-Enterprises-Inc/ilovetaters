import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FiDownload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { CateringContractViewer } from "./catering-contract-viewer";

export function CateringWaitingForBookingConfirmation() {
  const { hash } = useParams();

  return (
    <div className="container space-y-4">
      <div
        className="px-4 py-3 mb-4 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="w-6 h-6 mr-4 text-teal-500 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="m-0 font-bold">Thank you for booking with Taters!</p>
            <p className="text-xs">
              Kindly expect a call from one of our friendly Taters
              representatives within 48 hours to assist you in finalizing your
              booking.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-start">
        <a
          href={`${REACT_APP_DOMAIN_URL}api/download/contract/${hash}`}
          className="flex items-center justify-center px-4 py-2 space-x-2 text-lg text-white border border-white rounded-md bg-button"
        >
          <FiDownload className="text-2xl" />{" "}
          <span className="text-base font-bold">Download Order Summary</span>
        </a>
      </div>

      <CateringContractViewer />
    </div>
  );
}

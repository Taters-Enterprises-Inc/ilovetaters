import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useLocation, useParams } from "react-router-dom";
import { CateringContractViewer } from "../components";

export function CateringContract() {
  const location = useLocation();
  const { hash } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <>
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/catering",
        }}
        title="Contract"
        pageTitles={[
          { name: "Products", url: "/catering/products" },
          { name: "Contract" },
        ]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="flex lg:container">
            <div className="flex-1">
              <div className="bg-white h-[0.25rem] relative">
                <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-white lg:pl-0">
                <BiUserCircle className="hidden text-2xl sm:block" />{" "}
                <span>Your Details</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white h-[0.25rem] relative">
                <div className="absolute rounded-[50%] font-bold bg-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                <FaFileContract className="hidden text-2xl sm:block" />{" "}
                <span>Contract</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  3
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-white">
                <AiOutlineCreditCard className="hidden text-2xl sm:block" />{" "}
                <span>Payment</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  4
                </div>
              </div>
              <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-white lg:pr-0">
                <AiOutlineCheckCircle className="hidden text-2xl sm:block" />{" "}
                <span className="text-center">Checkout Complete</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
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
                  <p className="m-0 font-bold">
                    Thank you for booking with Taters!
                  </p>
                  <p className="m-0 text-sm">
                    Kindly expect a call from one of our friendly Taters
                    representatives within 48 hours to assist you in finalizing
                    your booking.
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
                <span className="text-base font-bold">
                  Download Order Summary
                </span>
              </a>
            </div>

            <CateringContractViewer />
          </div>
        </div>
      </section>
    </>
  );
}

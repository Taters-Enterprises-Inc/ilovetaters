import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export function CateringContract() {
  const location = useLocation();

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
        <div className="container py-16">
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-4"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold m-0">
                  Thank you for booking with Taters!
                </p>
                <p className="text-sm m-0">
                  Kindly expect a call from one of our friendly Taters
                  representatives within 48 hours to assist you in finalizing
                  your booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

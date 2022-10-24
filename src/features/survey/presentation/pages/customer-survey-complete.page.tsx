import { useAppDispatch } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import * as React from "react";
import { RatingCustomer } from "../components/customer-survey.rating";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { BranchesList } from "../components/branches.dropdown";
import { RatingRadioButton } from "../components/radio-button";
import { Routes, Route, useNavigate } from "react-router-dom";

export function CustomerSurveyComplete() {
  const navigate = useNavigate();
  const navigateToCustomerSurveyHome = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <section
          style={{
            backgroundImage: `url('${REACT_APP_DOMAIN_URL}api/assets/images/home/hero/mobile/taters_entertainment_snacks.jpg')`,
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          className="relative items-end justify-center sm:hidden "
        >
          <img
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/home/hero/mobile/taters_entertainment_snacks.jpg"
            }
            alt="The best pop corn in town"
            style={{ visibility: "hidden" }}
          ></img>
        </section>

        <img
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/home/hero/desktop/taters_entertainment_snacks_black.jpg"
          }
          className="hidden w-full sm:block"
          alt="The best pop corn in town"
        ></img>

        <section className=" bg-paper">
          <div className="sm:hidden">
            <h1 className='text-black text-4xl font-["Bebas_Neue"] text-center pt-6 pb-2 px-4 bg-paper '>
              CUSTOMER SATISFACTION SURVEY
            </h1>
            <p className="px-2 text-md text-center  bg-paper text-black">
              Form Submitted
            </p>

            <div className="space-y-4 lg:flex-w-full text-md lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[15px] pt-6 lg:px-4">
              <section className="px-6 text-black text-center">
                <p className="pb-2 text-md text-center  bg-paper text-black">
                  <strong>
                    We appreciate your feedback and looking forward to serve you
                    again soon.
                  </strong>
                </p>
                <p className="px-2 text-md text-center  bg-paper text-black">
                  We are also encouraging you to visit our website for more
                  information about our deals and information
                </p>
              </section>
            </div>

            <div className="flex items-center justify-center py-4 bg-paper">
              <button
                onClick={navigateToCustomerSurveyHome}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[200px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  VISIT SITE
                </span>
              </button>
            </div>
          </div>

          <div className="hidden sm:block pl-10">
            <h1 className='text-tertiary text-5xl font-["Bebas_Neue"] text-center pt-6 pb-4 bg-paper text-black '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-2 text-lg text-center  bg-paper text-black">
              Form Submitted
            </p>

            <div className="py-6 pt-10 space-y-4 lg:flex-w-full lg:max-w bg-paper lg:px-4">
              <section className="px-2 text-lg text-center  bg-paper text-black">
                <p>
                  <strong>
                    We appreciate your feedback and looking forward to serve you
                    again soon.
                  </strong>
                </p>
                <p className="px-2 text-lg text-center  bg-paper text-black">
                  We are also encouraging you to visit our website for more
                  information about our deals and information
                </p>
              </section>
            </div>

            <div className="flex items-center justify-center py-4">
              <button
                onClick={navigateToCustomerSurveyHome}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  VISIT SITE
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper"></div>
          </div>
        </section>
      </main>
    </>
  );
}

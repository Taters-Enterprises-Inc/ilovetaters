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

export function CustomerSurveyPageFour() {
  const navigate = useNavigate();
  const navigateToCustomerSurveyP5 = () => {
    navigate("/survey/page-five");
  };
  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-primary">
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

            <p className="px-4 text-md text-center text-black bg-paper">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>
            <div className="space-y-4 lg:flex-w-full text-md lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[15px] pt-6 lg:px-4">
              <section className="px-4 text-black">
                <p className="pb-4 pl-4">
                  <strong>Please Rate your satisfaction with:</strong>
                </p>
                <p className="pl-4">Portion of size you recieved.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <RatingRadioButton />
                </div>
                <p className="pl-4">The overall value of the price you paid.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <RatingRadioButton />
                </div>
              </section>
            </div>

            <div className="flex items-center justify-center pb-1 bg-paper">
              <button
                onClick={navigateToCustomerSurveyP5}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[200px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  CONTINUE
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper">
              <p className="">14% Complete</p>
            </div>
          </div>

          <div className="hidden sm:block pl-10">
            <h1 className='text-tertiary text-5xl font-["Bebas_Neue"] text-center pt-6 pb-4 bg-paper text-black '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-2 text-lg text-center  bg-paper text-black">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>

            <div className="py-6 pt-10 space-y-4 lg:flex-w-full lg:max-w bg-paper lg:px-4">
              <section className="px-20 text-lg text-black">
                <p className="pb-4 pl-4">
                  <strong>Please Rate your satisfaction with:</strong>
                </p>
                <p className="pl-4">Portion of size you recieved.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <RatingRadioButton />
                </div>
                <p className="pl-4">The overall value of the price you paid.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <RatingRadioButton />
                </div>
              </section>
            </div>

            <div className="flex items-center justify-center pb-1">
              <button
                onClick={navigateToCustomerSurveyP5}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  CONTINUE
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper">
              <p className="">14% Complete</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

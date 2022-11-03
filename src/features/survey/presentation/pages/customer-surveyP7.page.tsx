import { useAppDispatch } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as React from "react";
import { RatingCustomer } from "../components/customer-survey.rating";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { CommentTextInput } from "../components/comment-form";
import { Routes, Route, useNavigate } from "react-router-dom";

import { RecieptDateTime } from "../components/Date-and-time.picker";
import Stack from "@mui/material/Stack";

export function CustomerSurveyPageSeven() {
  const navigate = useNavigate();
  const navigateToCustomerSurveyP8 = () => {
    navigate("/survey/page-eight");
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
            <h1 className='text-black text-4xl font-["Bebas_Neue"] text-center pt-6 pb-1 px-4'>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-4 text-sm text-center text-black">
              Please tell us in three or more sentences about your experience
              with Taters.
            </p>
            <div className="space-y-4 lg:flex-w-full  lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[15px] py-6 lg:px-4">
              <section className="px-4 text-black">
                <form autoComplete="off">
                  <Stack spacing={3}>
                    <CommentTextInput label="" />
                  </Stack>
                </form>
              </section>
              <section>
                <div className="flex items-center justify-center pt-4 pb-1 bg-paper">
                  <button
                    onClick={navigateToCustomerSurveyP8}
                    type="submit"
                    className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[200px] rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      CONTINUE
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-center pb-6 bg-paper text-sm">
                  <p className="">49% Complete</p>
                </div>
              </section>
            </div>
          </div>

          <div className="hidden sm:block px-10">
            <h1 className=' text-black text-5xl font-["Bebas_Neue"] text-center pt-6 pb-4 '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-2 text-lg text-center text-black">
              Please tell us in three or more sentences about your experience
              with Taters.
            </p>

            <div className="py-6 space-y-4 lg:flex-w-full lg:max-w bg-paper lg:px-4">
              <section className="px-4 text-lg text-paper">
                <form autoComplete="off">
                  <Stack spacing={3}>
                    <CommentTextInput label="" />
                  </Stack>
                </form>
              </section>
              <section>
                <div className="flex items-center justify-center pt-4">
                  <button
                    onClick={navigateToCustomerSurveyP8}
                    type="submit"
                    className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      CONTINUE
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-center pb-6 bg-paper text-md">
                  <p className="">49% Complete</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

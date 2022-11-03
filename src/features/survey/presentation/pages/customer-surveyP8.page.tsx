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

export function CustomerSurveyPageEight() {
  const navigate = useNavigate();
  const navigateToCustomerSurveyP9 = () => {
    navigate("/survey/page-nine");
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
            <div className="space-y-4 lg:flex-w-full  lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[15px] py-6 lg:px-4">
              <p className="px-4 text-sm text-left text-black">
                If you were to choose the next store destination of Taters,
                where would you want it located?
              </p>
              <section className="px-4 text-black">
                <form autoComplete="off">
                  <Stack spacing={3}>
                    <CommentTextInput label="" />
                  </Stack>
                </form>
              </section>
              <p className="px-4 text-sm text-left text-black">
                If you were to add a new permanent entree on the menu, what
                would you want to see?
              </p>
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
                    onClick={navigateToCustomerSurveyP9}
                    type="submit"
                    className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[200px] rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      CONTINUE
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-center pb-6 bg-paper text-sm">
                  <p className="">51% Complete</p>
                </div>
              </section>
            </div>
          </div>

          <div className="hidden sm:block px-10">
            <h1 className=' text-black text-5xl font-["Bebas_Neue"] text-center pt-6 pb-4 '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <div className="py-6 space-y-4 lg:flex-w-full lg:max-w bg-paper lg:px-4">
              <p className="px-4 text-md text-left text-black">
                If you were to choose the next store destination of Taters,
                where would you want it located?
              </p>
              <section className="px-4 text-black">
                <form autoComplete="off">
                  <Stack spacing={3}>
                    <CommentTextInput label="" />
                  </Stack>
                </form>
              </section>
              <p className="px-4 text-md text-left text-black">
                If you were to add a new permanent entree on the menu, what
                would you want to see?
              </p>
              <section className="px-4 text-black">
                <form autoComplete="off">
                  <Stack spacing={3}>
                    <CommentTextInput label="" />
                  </Stack>
                </form>
              </section>
              <section>
                <div className="flex items-center justify-center pt-4">
                  <button
                    onClick={navigateToCustomerSurveyP9}
                    type="submit"
                    className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      CONTINUE
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-center pb-4 bg-paper text-md">
                  <p className="">51% Complete</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

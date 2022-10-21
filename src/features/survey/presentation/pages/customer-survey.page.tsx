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

export function CustomerSurvey() {
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

        <section className="lg:container">
          <div className="sm:hidden">
            <h1 className='text-tertiary text-4xl font-["Bebas_Neue"] text-center pt-6 pb-2 px-4 '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-4 text-sm text-center text-paper">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>
            <div className="space-y-4 lg:flex-w-full  lg:max-w bg-primary lg:shadow-secondary lg:shadow-md lg:rounded-[15px] mt-10 py-6 lg:px-4">
              <section className="px-4 text-paper">
                <p>
                  1. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p>
                  2. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p>
                  3. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p>
                  4. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p>
                  5. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p>
                  6. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
              </section>
            </div>
            <div className="flex items-center justify-center py-4">
              <button
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-[200px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  SUBMIT
                </span>
              </button>
            </div>
          </div>

          <div className="hidden sm:block">
            <h1 className='text-tertiary text-5xl font-["Bebas_Neue"] text-center pt-6 pb-4 '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-2 text-lg text-center text-paper">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>

            <div className="py-6 mt-10 space-y-4 lg:flex-w-full lg:max-w bg-primary lg:px-4">
              <section className="px-4 text-lg text-paper">
                <p className="pl-4">
                  1. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p className="pl-4">
                  2. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p className="pl-4">
                  3. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p className="pl-4">
                  4. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p className="pl-4">
                  5. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
                <p className="pl-4">
                  6. Le Lorem Ipsum est simplement du faux texte employé dans la
                  composition et la mise en page avant impression.
                </p>
                <div className="flex justify-center py-4">
                  <RatingCustomer />
                </div>
              </section>
            </div>
            <div className="flex items-center justify-center py-4">
              <button
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  SUBMIT
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

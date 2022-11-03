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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function CustomerSurveyPageTen() {
  const navigate = useNavigate();
  const navigateToCustomerSurveyP11 = () => {
    navigate("/survey/complete");
  };

  function GenderRadioButton() {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Male"
            control={<Radio size="small" />}
            label="Male"
          />
          <FormControlLabel
            value="Female"
            control={<Radio size="small" />}
            label="Female"
          />
          <FormControlLabel
            value="Non-Binary"
            control={<Radio size="small" />}
            label="Non-Binary / Third Gender"
          />
          <FormControlLabel
            value="Self-describe"
            control={<Radio size="small" />}
            label="Prefer to self-describe"
          />
          <FormControlLabel
            value="No Answer"
            control={<Radio size="small" />}
            label="Prefer not to answer"
          />
        </RadioGroup>
      </FormControl>
    );
  }
  function AgeRadioButton() {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="-18"
            control={<Radio size="small" />}
            label="Under 18"
          />
          <FormControlLabel
            value="18-24"
            control={<Radio size="small" />}
            label="18 to 24 "
          />
          <FormControlLabel
            value="25-35"
            control={<Radio size="small" />}
            label="25 to 34"
          />
          <FormControlLabel
            value="35-44"
            control={<Radio size="small" />}
            label="35 to 44"
          />
          <FormControlLabel
            value="45-49"
            control={<Radio size="small" />}
            label="45 to 49"
          />
          <FormControlLabel
            value="50-64"
            control={<Radio size="small" />}
            label="50 to 64"
          />
          <FormControlLabel
            value="65+"
            control={<Radio size="small" />}
            label="65 or above."
          />
        </RadioGroup>
      </FormControl>
    );
  }
  function NationalityRadioButton() {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="-Asian"
            control={<Radio size="small" />}
            label="Asian"
          />
          <FormControlLabel
            value="Pacific Islander"
            control={<Radio size="small" />}
            label="Native Hawaiian or other Native Islander "
          />
          <FormControlLabel
            value="White"
            control={<Radio size="small" />}
            label="White or Caucassian"
          />
          <FormControlLabel
            value="American"
            control={<Radio size="small" />}
            label="American Indian or Alaska Native"
          />
          <FormControlLabel
            value="Hispanic"
            control={<Radio size="small" />}
            label="Hispanic or Latino"
          />
          <FormControlLabel
            value="Black"
            control={<Radio size="small" />}
            label="Black or African American"
          />
          <FormControlLabel
            value="Other"
            control={<Radio size="small" />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    );
  }
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
                  <strong>
                    These final questions are for qualification Purposes only
                  </strong>
                </p>
                <p className="pl-4">Please select your Gender.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <GenderRadioButton />
                </div>
                <p className="pl-4">Please select your age.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <AgeRadioButton />
                </div>
                <p className="pl-4">
                  Please select which of the following best describes your
                  background.
                </p>
                <div className="flex pl-4 pt-2 pb-4">
                  <NationalityRadioButton />
                </div>
              </section>
            </div>

            <div className="flex items-center justify-center pb-1 bg-paper">
              <button
                onClick={navigateToCustomerSurveyP11}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[200px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  CONTINUE
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper">
              <p className="">96% Complete</p>
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
                  <strong>
                    Based on this visit, what is the likelihood that you will
                  </strong>
                </p>
                <p className="pl-4">Please select your Gender.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <GenderRadioButton />
                </div>
                <p className="pl-4">Please select your age.</p>
                <div className="flex pl-4 pt-2 pb-4">
                  <AgeRadioButton />
                </div>
                <p className="pl-4">
                  Please select which of the following best describes your
                  background.
                </p>
                <div className="flex pl-4 pt-2 pb-4">
                  <NationalityRadioButton />
                </div>
              </section>
            </div>

            <div className="flex items-center justify-center pb-1">
              <button
                onClick={navigateToCustomerSurveyP11}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  CONTINUE
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper">
              <p className="">96% Complete</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  FooterNav,
  HeaderNav,
  MaterialInput,
} from "features/shared/presentation/components";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Helmet } from "react-helmet";

import { RatingCustomer } from "../components/customer-survey.rating";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { BranchesList } from "../components/branches.dropdown";
import { RatingRadioButton } from "../components/radio-button";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  selectGetSurvey,
  getSurvey,
} from "features/survey/presentation/slices/get-survey.slice";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export interface DynamicObject {
  [key: string]: string;
}

export function CustomerSurvey() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<DynamicObject>({});

  const getSurveyState = useAppSelector(selectGetSurvey);
  useEffect(() => {
    dispatch(getSurvey());
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(formState);
    e.preventDefault();
  };

  const handleFormState = (object: DynamicObject) => {
    setFormState({
      ...formState,
      ...object,
    });
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
          <form onSubmit={handleFormSubmit} className="sm:hidden">
            <h1 className='text-black text-4xl font-["Bebas_Neue"] text-center pt-6 pb-2 px-4 bg-paper '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-4 text-center text-black text-md bg-paper">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>
            <div className="space-y-4 lg:flex-w-full text-md lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[15px] pt-6 lg:px-4">
              {getSurveyState.data?.map((survey) => {
                return (
                  <div className="px-6 lg:flex-w-full text-md lg:max-w bg-paper lg:shadow-secondary lg:shadow-md lg:rounded-[15px] pt-6">
                    <strong>{survey.description}</strong>
                    <div className="flex">
                      {survey.answers.length > 0 ? (
                        <FormControl>
                          <RadioGroup
                            value={formState[survey.id.toString()] ?? ""}
                            name={survey.id.toString()}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              const temp: any = {};
                              temp[survey.id.toString()] = (
                                event.target as HTMLInputElement
                              ).value;
                              handleFormState(temp);
                            }}
                          >
                            {survey.answers.map((answer) => (
                              <div>
                                <FormControlLabel
                                  value={answer.text}
                                  control={<Radio required size="small" />}
                                  label={answer.text}
                                />
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      ) : null}
                      {survey.is_comment ? (
                        <MaterialInput
                          colorTheme="black"
                          value={formState[survey.id.toString()]}
                          onChange={(e) => {
                            const temp: any = {};
                            temp[survey.id.toString()] = e.target.value;
                            handleFormState(temp);
                          }}
                          name={survey.id.toString()}
                          multiline
                          rows={4}
                          fullWidth
                          required
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center pt-8 pb-1 bg-paper">
              <button
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[200px] rounded-lg shadow-lg`}
              >
                <span className=" text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  SUBMIT
                </span>
              </button>
            </div>
            {/* <div className="flex items-center justify-center pb-6 text-sm bg-paper">
              <p className="">1% Complete</p>
            </div> */}
          </form>

          <div className="hidden pl-10 sm:block">
            <h1 className='text-tertiary text-5xl font-["Bebas_Neue"] text-center pt-6 pb-4 bg-paper text-black '>
              CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="px-2 text-lg text-center text-black bg-paper">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>

            <div className="py-6 pt-10 space-y-4 lg:flex-w-full lg:max-w bg-paper lg:px-4">
              <section className="px-20 text-lg text-black">
                {getSurveyState.data?.map((survey) => {
                  return (
                    <div className="pb-6">
                      <strong>{survey.description}</strong>
                      <div className="flex">
                        {survey.answers.length > 0 ? (
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue=""
                              name="radio-buttons-group"
                            >
                              {survey.answers.map((answer) => (
                                <div>
                                  <FormControlLabel
                                    value={answer.text}
                                    control={<Radio size="small" />}
                                    label={answer.text}
                                  />
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : null}
                        {survey.is_comment ? (
                          <MaterialInput
                            colorTheme="black"
                            value=""
                            onChange={() => {}}
                            name=""
                            multiline
                            rows={4}
                            fullWidth
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>

            <div className="flex items-center justify-center pb-1">
              <button
                // onClick={navigateToCustomerSurveyP2}
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  CONTINUE
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper">
              <p className="">1% Complete</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

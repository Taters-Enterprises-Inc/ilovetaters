import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { MaterialInput } from "features/shared/presentation/components";
import { useEffect, useState, FormEvent } from "react";
import { Helmet } from "react-helmet";

import {
  selectGetSurvey,
  getSurvey,
} from "features/survey/presentation/slices/get-survey.slice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { insertCustomerSurveyResponse } from "../slices/insert-customer-survey-response.slice";
import { CustomerSurveyQuestionResponseAnswer } from "features/survey/core/survey.interface";

export function CustomerSurvey() {
  const dispatch = useAppDispatch();

  const [formState, setFormState] =
    useState<CustomerSurveyQuestionResponseAnswer>({});

  const getSurveyState = useAppSelector(selectGetSurvey);

  useEffect(() => {
    dispatch(getSurvey());
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(insertCustomerSurveyResponse({ answers: formState }));
  };

  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <section className="container py-4 mx-auto">
          <form onSubmit={handleFormSubmit}>
            <h1 className='text-secondary text-6xl font-["Bebas_Neue"]'>
              Taters CUSTOMER SATISFACTION SURVEY
            </h1>

            <p className="text-base text-secondary ">
              Thank you for choosing Taters! It would be great if you would
              participate in our short survey so that we can improve our
              service.
            </p>

            <div className="py-6 space-y-4 lg:flex-w-full lg:max-w ">
              <section className="text-lg text-secondary ">
                {getSurveyState.data?.map((survey, i) => {
                  return (
                    <div className="pb-6" key={i}>
                      <strong>{survey.description}</strong>
                      <div className="flex">
                        {survey.answers.length > 0 ? (
                          <FormControl>
                            <RadioGroup
                              value={
                                formState[survey.id.toString()]
                                  ?.surveyQuestionOfferedAnswerId ?? ""
                              }
                              name={survey.id.toString()}
                              onChange={(e) => {
                                const surveyQuestionOfferedAnswerId =
                                  e.target.value;
                                setFormState({
                                  ...formState,
                                  [e.target.name]: {
                                    surveyQuestionOfferedAnswerId,
                                    surveyQuestionId: survey.id,
                                  },
                                });
                              }}
                            >
                              {survey.answers.map((answer) => (
                                <FormControlLabel
                                  value={
                                    answer.survey_question_offered_answer_id
                                  }
                                  control={
                                    <Radio
                                      required
                                      size="small"
                                      color="secondary"
                                    />
                                  }
                                  label={answer.text}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : null}
                        {survey.is_comment ? (
                          <MaterialInput
                            colorTheme="black"
                            value={
                              formState[survey.id.toString()]?.otherText ?? ""
                            }
                            onChange={(e) => {
                              const otherText = e.target.value;
                              setFormState({
                                ...formState,
                                [e.target.name]: {
                                  otherText,
                                  surveyQuestionId: survey.id,
                                },
                              });
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
              </section>
            </div>

            <div className="flex items-center justify-center pb-1">
              <button
                type="submit"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  Submit
                </span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

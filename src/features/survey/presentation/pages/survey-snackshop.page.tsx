import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  FooterNav,
  HeaderNav,
  MaterialInput,
} from "features/shared/presentation/components";
import { useEffect, useState, FormEvent } from "react";
import { Helmet } from "react-helmet";

import {
  selectGetSurvey,
  getSurvey,
  GetSurveyState,
} from "features/survey/presentation/slices/get-survey.slice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  insertCustomerSurveyResponse,
  InsertCustomerSurveyResponseState,
  resetInsertCustomerSurveyResponse,
  selectInsertCustomerSurveyResponse,
} from "../slices/insert-customer-survey-response.slice";
import { CustomerSurveyQuestionResponseAnswer } from "features/survey/core/survey.interface";
import { useNavigate, useParams } from "react-router-dom";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { SurveyRating } from "../components";
import { getNotifications } from "features/shared/presentation/slices/get-notifications.slice";

export function SurveySnackshop() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hash } = useParams();

  const [formState, setFormState] =
    useState<CustomerSurveyQuestionResponseAnswer>({});

  const [surveySection, setSurveySection] = useState(0);

  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);

  const getSurveyState = useAppSelector(selectGetSurvey);
  const insertCustomerSurveyResponseState = useAppSelector(
    selectInsertCustomerSurveyResponse
  );
  const getSessionState = useAppSelector(selectGetSession);
  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.userData === null
    ) {
      setOpenLoginChooserModal(true);
    }
  }, [getSessionState]);

  useEffect(() => {
    dispatch(getSurvey());
  }, [dispatch]);

  useEffect(() => {
    if (
      insertCustomerSurveyResponseState.status ===
      InsertCustomerSurveyResponseState.success
    ) {
      dispatch(getNotifications());
      navigate(
        `/feedback/complete/${insertCustomerSurveyResponseState.data?.hash}`
      );
      dispatch(resetInsertCustomerSurveyResponse());
    }
  }, [dispatch, insertCustomerSurveyResponseState, navigate, hash]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const increasedSurveySection = surveySection + 1;

    if (
      getSurveyState.status === GetSurveyState.success &&
      getSurveyState.data &&
      getSurveyState.data.length > 0
    ) {
      if (increasedSurveySection < getSurveyState.data.length) {
        setSurveySection(increasedSurveySection);
      } else {
        dispatch(
          insertCustomerSurveyResponse({
            service: "snackshop",
            answers: formState,
            orderHash: hash,
          })
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <HeaderNav
          activeUrl="HOME"
          logoProps={{
            src:
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shared/logo/taters-logo.png",
            alt: "Taters Logo",
            className: "w-[150px] lg:w-[120px]",
          }}
        />
        {getSurveyState.data && getSurveyState.data.length > 0 ? (
          <section className="container py-4 pb-24 mx-auto">
            <form onSubmit={handleFormSubmit}>
              <h1 className='text-secondary text-6xl font-["Bebas_Neue"]'>
                Taters CUSTOMER SATISFACTION SURVEY
              </h1>

              <p className="text-base text-secondary ">
                Welcome and thank you for your continued patronage. In our
                desire to serve you better, please assist us by answering this
                survey. We value your time and effort in completing this
                endeavor.
              </p>

              {getSurveyState.data[surveySection].surveys.map((survey) => (
                <div className="pb-4">
                  <span className="text-xl font-bold text-secondary">
                    {survey.description}
                  </span>
                  <div className="flex flex-col">
                    {survey.answers.length > 0 ? (
                      <FormControl>
                        <RadioGroup
                          value={
                            formState[survey.id.toString()]
                              ?.surveyQuestionAnswerId ?? ""
                          }
                          name={survey.id.toString()}
                          onChange={(e) => {
                            if (getSurveyState.data) {
                              const surveyQuestionAnswerId = e.target.value;
                              const surveyQuestionId = survey.id;

                              setFormState({
                                ...formState,
                                [e.target.name]: {
                                  surveyQuestionAnswerId,
                                  surveyQuestionId,
                                },
                              });
                            }
                          }}
                        >
                          {survey.answers.map((answer) => (
                            <FormControlLabel
                              value={answer.id}
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
                          {survey.others ? (
                            <FormControlLabel
                              value="others"
                              control={
                                <Radio
                                  required
                                  size="small"
                                  color="secondary"
                                />
                              }
                              label={
                                <MaterialInput
                                  variant="standard"
                                  colorTheme="black"
                                  label="Others"
                                  onFocus={() => {
                                    const surveyQuestionId = survey.id;
                                    setFormState({
                                      ...formState,
                                      [survey.id.toString()]: {
                                        surveyQuestionAnswerId: "others",
                                        surveyQuestionId,
                                      },
                                    });
                                  }}
                                  required={
                                    formState[survey.id.toString()]
                                      ?.surveyQuestionAnswerId === "others"
                                  }
                                  value={
                                    formState[survey.id.toString()]?.others ??
                                    ""
                                  }
                                  onChange={(e) => {
                                    const others = e.target.value;
                                    const surveyQuestionId = survey.id;
                                    setFormState({
                                      ...formState,
                                      [e.target.name]: {
                                        surveyQuestionAnswerId: "others",
                                        others,
                                        surveyQuestionId,
                                      },
                                    });
                                  }}
                                  fullWidth
                                  name={survey.id.toString()}
                                  className="!mb-4"
                                />
                              }
                            />
                          ) : null}
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <>
                        {survey.is_text_area ? (
                          <MaterialInput
                            colorTheme="black"
                            type={survey.is_email ? "email" : "text"}
                            value={formState[survey.id.toString()]?.text ?? ""}
                            onChange={(e) => {
                              const text = e.target.value;
                              const surveyQuestionId = survey.id;
                              setFormState({
                                ...formState,
                                [e.target.name]: {
                                  text,
                                  surveyQuestionId,
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
                        {survey.is_text_field ? (
                          <MaterialInput
                            colorTheme="black"
                            type={survey.is_email ? "email" : "text"}
                            value={formState[survey.id.toString()]?.text ?? ""}
                            onChange={(e) => {
                              const text = e.target.value;
                              const surveyQuestionId = survey.id;
                              setFormState({
                                ...formState,
                                [e.target.name]: {
                                  text,
                                  surveyQuestionId,
                                },
                              });
                            }}
                            name={survey.id.toString()}
                            fullWidth
                            required
                          />
                        ) : null}
                      </>
                    )}
                    {survey.ratings.length > 0 ? (
                      <div className="flex flex-col w-full space-x-0 space-y-8 md:space-x-16 md:space-y-0 md:flex-row">
                        {survey.ratings.map((rating, i) => (
                          <SurveyRating
                            key={i}
                            surveyName={
                              survey.id.toString() + "_" + rating.id.toString()
                            }
                            rate={
                              formState[
                                survey.id.toString() +
                                  "_" +
                                  rating.id.toString()
                              ]?.rate ?? ""
                            }
                            onRateSelect={(rate) => {
                              const surveyQuestionId = survey.id;

                              setFormState({
                                ...formState,
                                [survey.id.toString() +
                                "_" +
                                rating.id.toString()]: {
                                  surveyQuestionId,
                                  surveyQuestionRatingId: rating.id.toString(),
                                  rate,
                                },
                              });
                            }}
                            rating={rating}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              <div className="flex flex-col items-center justify-end pb-1 space-y-2 lg:space-y-0 lg:flex-row">
                <button
                  type="submit"
                  className={`text-white border border-secondary order-1 lg:order-2 lg:ml-2 text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px]  rounded-lg shadow-lg`}
                >
                  <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                    {getSurveyState.data.length - 1 === surveySection
                      ? "Submit"
                      : "Continue"}
                  </span>
                </button>

                {surveySection > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSurveySection(surveySection - 1);
                    }}
                    className={`text-white border order-2 lg:order-1 border-secondary text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px] rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Go Back
                    </span>
                  </button>
                ) : null}
              </div>
            </form>
          </section>
        ) : null}

        <FooterNav activeUrl="HOME" />
      </main>

      <LoginChooserModal
        required
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </>
  );
}

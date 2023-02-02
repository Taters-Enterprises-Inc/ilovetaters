import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  MaterialDateInput,
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
import { useNavigate } from "react-router-dom";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import {
  getAllStores,
  GetAllStoresState,
  selectGetAllStores,
} from "features/shared/presentation/slices/get-all-stores.slice";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";

export function Survey() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const service = query.get("service");
  const hash = query.get("hash");

  const [formState, setFormState] =
    useState<CustomerSurveyQuestionResponseAnswer>({});

  const [surveyNumber, setSurveyNumber] = useState(service && hash ? 0 : -1);

  const [orderedDate, setOrderedDate] = useState("");
  const [orderedNo, setOrderedNo] = useState("");
  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: number;
        name: string;
        menu_name: string;
      }
    | undefined
  >();

  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);

  const getSurveyState = useAppSelector(selectGetSurvey);
  const insertCustomerSurveyResponseState = useAppSelector(
    selectInsertCustomerSurveyResponse
  );
  const getAllStoresState = useAppSelector(selectGetAllStores);
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
    dispatch(getAllStores());
  }, [dispatch]);

  useEffect(() => {
    if (
      insertCustomerSurveyResponseState.status ===
      InsertCustomerSurveyResponseState.success
    ) {
      dispatch(resetInsertCustomerSurveyResponse());
      navigate(`complete?service=${service}&hash=${hash}`);
    }
  }, [dispatch, insertCustomerSurveyResponseState, navigate, service, hash]);

  useEffect(() => {
    if (
      getAllStoresState.status === GetAllStoresState.success &&
      getAllStoresState.data &&
      getAllStoresState.data.length > 0
    ) {
      setSelectedStore(getAllStoresState.data[0]);
    }
  }, [getAllStoresState]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const increasedSurveyNumber = surveyNumber + 1;

    if (
      getSurveyState.status === GetSurveyState.success &&
      getSurveyState.data &&
      getSurveyState.data.length > 0
    ) {
      if (increasedSurveyNumber < getSurveyState.data.length) {
        setSurveyNumber(increasedSurveyNumber);
      } else {
        dispatch(
          insertCustomerSurveyResponse({
            service,
            answers: formState,
            orderedDate,
            orderedNo,
            storeId: selectedStore?.store_id,
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
        {getSurveyState.data && getSurveyState.data.length > 0 ? (
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

              {surveyNumber === -1 && service === null && hash === null ? (
                <div className="py-4 space-y-4">
                  {getAllStoresState.status === GetAllStoresState.success &&
                  getAllStoresState.data ? (
                    <MaterialInputAutoComplete
                      label="Select store"
                      colorTheme="black"
                      size="small"
                      required
                      options={getAllStoresState.data}
                      value={selectedStore ?? ""}
                      getOptionLabel={(option) =>
                        option.name + " (" + option.menu_name + ") "
                      }
                      onChange={(event, value) => {
                        if (value) {
                          setSelectedStore(value);
                        }
                      }}
                    />
                  ) : null}

                  <MaterialDateInput
                    colorTheme="black"
                    label="Order Date"
                    openTo="year"
                    size="small"
                    required
                    views={["year", "month", "day"]}
                    value={orderedDate}
                    onChange={(newValue: any) => {
                      setOrderedDate(newValue);
                    }}
                  />
                  <MaterialInput
                    colorTheme="black"
                    label="Order Number"
                    value={orderedNo}
                    required
                    onChange={(event) => {
                      setOrderedNo(event.target.value);
                    }}
                    size="small"
                    fullWidth
                    name="orderNumber"
                  />
                </div>
              ) : null}

              {surveyNumber >= 0 ? (
                <>
                  <h1 className="text-lg font-bold text-end text-secondary">
                    {surveyNumber + 1}/{getSurveyState.data.length}
                  </h1>

                  <div className="pb-4 text-lg text-secondary">
                    <strong>
                      {getSurveyState.data[surveyNumber].description}
                    </strong>
                    <div className="flex">
                      {getSurveyState.data[surveyNumber].answers.length > 0 ? (
                        <FormControl>
                          <RadioGroup
                            value={
                              formState[
                                getSurveyState.data[surveyNumber].id.toString()
                              ]?.surveyQuestionOfferedAnswerId ?? ""
                            }
                            name={getSurveyState.data[
                              surveyNumber
                            ].id.toString()}
                            onChange={(e) => {
                              if (getSurveyState.data) {
                                const surveyQuestionOfferedAnswerId =
                                  e.target.value;
                                const surveyQuestionId =
                                  getSurveyState.data[surveyNumber].id;

                                setFormState({
                                  ...formState,
                                  [e.target.name]: {
                                    surveyQuestionOfferedAnswerId,
                                    surveyQuestionId,
                                  },
                                });
                              }
                            }}
                          >
                            {getSurveyState.data[surveyNumber].answers.map(
                              (answer) => (
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
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                      ) : null}
                      {getSurveyState.data[surveyNumber].is_comment ? (
                        <MaterialInput
                          colorTheme="black"
                          value={
                            formState[
                              getSurveyState.data[surveyNumber].id.toString()
                            ]?.otherText ?? ""
                          }
                          onChange={(e) => {
                            if (getSurveyState.data) {
                              const otherText = e.target.value;
                              const surveyQuestionId =
                                getSurveyState.data[surveyNumber].id;
                              setFormState({
                                ...formState,
                                [e.target.name]: {
                                  otherText,
                                  surveyQuestionId,
                                },
                              });
                            }
                          }}
                          name={getSurveyState.data[surveyNumber].id.toString()}
                          multiline
                          rows={4}
                          fullWidth
                          required
                        />
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}

              <div className="flex flex-col items-center justify-end pb-1 space-y-2 lg:space-y-0 lg:flex-row">
                <button
                  type="submit"
                  className={`text-white border border-secondary order-1 lg:order-2 lg:ml-2 text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px]  rounded-lg shadow-lg`}
                >
                  <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                    {getSurveyState.data.length - 1 === surveyNumber
                      ? "Submit"
                      : "Continue"}
                  </span>
                </button>

                {surveyNumber === 0 && hash === null && service === null ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSurveyNumber(surveyNumber - 1);
                    }}
                    className={`text-white border order-2 lg:order-1 border-secondary text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px] rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Go Back
                    </span>
                  </button>
                ) : null}

                {surveyNumber > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSurveyNumber(surveyNumber - 1);
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
      </main>

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </>
  );
}

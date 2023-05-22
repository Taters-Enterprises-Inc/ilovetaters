import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  IconContainerProps,
  Rating,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { getStores, selectGetStores } from "../slices/get-stores.slice";
import {
  FormEvent,
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import {
  GetAuditEvaluationFormQuestionState,
  getAuditEvaluationFormQuestion,
  selectGetAuditEvaluationFormQuestion,
} from "../slices/get-audit-evaluation-form_questions.slice";
import { createQueryParams } from "features/config/helpers";
import { AuditEvaluationAnswer } from "features/audit/core/domain/audit-evaluation-answer.model";
import { auditCurrentSection } from "../slices/audit-section.slice";
import { AUDIT_CUSTOM_ICON } from "features/shared/constants";
import { useNavigate } from "react-router-dom";
import {
  InsertAuditResponseState,
  insertAuditResponse,
  resetInsertAuditResponse,
  selectInsertAuditResponse,
} from "../slices/insert-audit-response.slice";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AuditResultModel } from "features/audit/core/domain/audit-result.model";

export function AuditFormContent() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const getStoreState = useAppSelector(selectGetStores);
  const getCriteria = useAppSelector(selectGetAuditEvaluationFormQuestion);

  const [formState, setFormState] = useState<AuditEvaluationAnswer>({});
  const [result, setResult] = useState<AuditResultModel>({});
  const [attention, setAttention] = useState("");

  const [selectedDate, setSelectedDate] = useState<string>("YYYY-MM");

  const [maxLength, setmaxLength] = useState(10);

  const [criteriaSection, setCriteriaSection] = useState(0);

  const insertAuditResponseState = useAppSelector(selectInsertAuditResponse);

  const [selectedType, setselectedType] = useState<
    | {
        id: number;
        type_name: string;
      }
    | undefined
  >();
  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: number;
        name: string;
      }
    | undefined
  >();

  useEffect(() => {
    dispatch(getStores());
    dispatch(getAuditEvaluationFormQuestion(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(auditCurrentSection(criteriaSection));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [dispatch, criteriaSection]);

  useEffect(() => {
    if (insertAuditResponseState.status === InsertAuditResponseState.success) {
      dispatch(resetInsertAuditResponse());
      navigate(`review/${insertAuditResponseState.data?.hash}`);
    }
  }, [dispatch, insertAuditResponseState, navigate]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = createQueryParams({ type: selectedType?.type_name });
    const increasedSurveySection = criteriaSection + 1;

    if (getCriteria.data && getCriteria.data[9].criteria.length === 0) {
      setmaxLength(9);
    }

    if (
      getCriteria.status === GetAuditEvaluationFormQuestionState.success &&
      getCriteria.data &&
      getCriteria.data.length > 0
    ) {
      if (getCriteria.data[criteriaSection].criteria.length === 0) {
        dispatch(getAuditEvaluationFormQuestion(query));
      }

      if (increasedSurveySection < maxLength) {
        setCriteriaSection(increasedSurveySection);
      } else {
        dispatch(
          insertAuditResponse({
            selectedStoreId: selectedStore?.store_id,
            selectedTypeId: selectedType?.id,
            attention,
            period: selectedDate,
            answers: formState,
          })
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-10 lg:px-10">
        <div>
          <span className="flex justify-center text-4xl font-['Bebas_Neue'] text-center">
            INTERNAL QUALITY AUDIT FORM
          </span>
        </div>
        {getCriteria.data ? (
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col space-y-2 mb-20">
              <div className="px-5">
                {criteriaSection === 0 ? (
                  <>
                    <h1
                      id="section_1"
                      className="capitalize font-semibold text-xl"
                    >
                      {getCriteria.data[criteriaSection].section}
                    </h1>
                    <span className="text-md">
                      Setup store and attention Information
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex flex-col space-y-5">
                {getCriteria.data[criteriaSection].criteria.length === 0 ? (
                  <>
                    <div className="space-y-3 px-5">
                      <div className="flex flex-col space-y-2">
                        <span>Attention: </span>
                        <TextField
                          required
                          id="Store"
                          size="small"
                          variant="outlined"
                          onChange={(event) => {
                            setAttention(event.target.value);
                          }}
                          value={attention}
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span>Store: </span>

                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          size="small"
                          options={
                            getStoreState.data
                              ? getStoreState.data.stores.map((row) => row.name)
                              : []
                          }
                          onChange={(event, value: any) => {
                            if (value && getStoreState.data) {
                              const selectedStoreObj =
                                getStoreState.data.stores.find(
                                  (store) => store.name === value
                                );
                              setSelectedStore(selectedStoreObj);
                            } else {
                              setSelectedStore(undefined);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              value={selectedStore ?? ""}
                              {...params}
                              label="Select store to evaluate"
                            />
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span>Store Type: </span>

                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          size="small"
                          options={
                            getStoreState.data
                              ? getStoreState.data.store_type.map(
                                  (row) => row.type_name
                                )
                              : []
                          }
                          onChange={(event, value: any) => {
                            if (value && getStoreState.data) {
                              const selectedStoreObj =
                                getStoreState.data.store_type.find(
                                  (store) => store.type_name === value
                                );
                              setselectedType(selectedStoreObj);
                            } else {
                              setselectedType(undefined);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              value={selectedType ?? ""}
                              required
                              {...params}
                              label="Taters Store Type"
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <span>For the month of: </span>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label={'"month" and "year"'}
                            views={["month", "year"]}
                            onChange={(date) => {
                              const formattedDate = date
                                ? dayjs(date).format("YYYY-MM")
                                : "";
                              setSelectedDate(formattedDate);
                            }}
                            value={selectedDate}
                            renderInput={(params) => (
                              <TextField required {...params} label="Period" />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : null}
                {getCriteria.data[criteriaSection].criteria.length !== 0 ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      {getCriteria.data[criteriaSection].criteria.map(
                        (row, index) => {
                          const StyledRating = styled(Rating)(({ theme }) => ({
                            "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
                              color: theme.palette.action.disabled,
                            },
                          }));

                          const IconContainer = (props: IconContainerProps) => {
                            const { value, ...other } = props;
                            return (
                              <span {...other}>
                                {AUDIT_CUSTOM_ICON[value].icon}
                              </span>
                            );
                          };

                          return (
                            <>
                              <div className="flex justify-center" key={index}>
                                <Card className="w-11/12" variant="outlined">
                                  <CardContent className="space-y-2">
                                    <Typography
                                      sx={{ fontSize: 14 }}
                                      color="black"
                                      gutterBottom
                                    >
                                      {row.questions}
                                    </Typography>
                                    <div className="flex space-x-10 text-xs">
                                      <span>Urgency Level: {row.level}</span>
                                      <span>
                                        Equivalent Point: {row.equivalent_point}
                                      </span>
                                    </div>

                                    <Divider flexItem />

                                    <div className="flex space-x-5 justify-start">
                                      <div className="flex space-x-5">
                                        <div className="flex flex-col space-y-1">
                                          <span>Rating: </span>
                                          <StyledRating
                                            name={row.id.toString()}
                                            defaultValue={0}
                                            max={3}
                                            value={Number(
                                              formState?.[row.id]
                                                ?.form_rating_id ?? 0
                                            )}
                                            onChange={(
                                              e,
                                              value: number | null
                                            ) => {
                                              const rating = value || 0;
                                              const form_rating_id = rating;
                                              const question_id = row.id;
                                              const eq_point =
                                                row.equivalent_point;
                                              const level = row.level;
                                              setFormState({
                                                ...formState,
                                                [row.id]: {
                                                  form_rating_id:
                                                    form_rating_id,
                                                  question_id: question_id,
                                                  remarks:
                                                    formState[row.id]
                                                      ?.remarks ?? null,
                                                  equivalent_point: eq_point,
                                                  level: level,
                                                },
                                              });
                                            }}
                                            IconContainerComponent={
                                              IconContainer
                                            }
                                            getLabelText={(value: number) =>
                                              AUDIT_CUSTOM_ICON[value].label
                                            }
                                            highlightSelectedOnly
                                          />
                                        </div>
                                        <span>
                                          {formState?.[row.id]
                                            ?.form_rating_id ?? 0}
                                        </span>
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                        />
                                        <div className="flex flex-col space-y-2">
                                          <span>Remarks: </span>

                                          <TextField
                                            name={row.id.toString()}
                                            size="small"
                                            value={
                                              formState?.[row.id]?.remarks ?? ""
                                            }
                                            variant="outlined"
                                            onChange={(e) => {
                                              const remarks = e.target.value;
                                              setFormState((prevState) => ({
                                                ...prevState,
                                                [row.id]: {
                                                  ...prevState[row.id],
                                                  ...(prevState[row.id] || {}),
                                                  remarks,
                                                },
                                              }));
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </>
                ) : null}

                <div className="flex space-x-3 px-5">
                  {criteriaSection !== 0 ? (
                    <Button
                      className="basis-1/2"
                      type="submit"
                      variant="contained"
                      onClick={() => setCriteriaSection(criteriaSection - 1)}
                      startIcon={
                        <MdOutlineNavigateBefore className="text-white text-4xl" />
                      }
                    >
                      Back
                    </Button>
                  ) : null}

                  <Button
                    className={`${
                      criteriaSection === 0 ? `basis-full` : `basis-1/2`
                    }`}
                    type="submit"
                    variant="contained"
                    startIcon={
                      <MdNavigateNext className="text-white text-4xl" />
                    }
                  >
                    {getCriteria.data.length - 1 === criteriaSection ||
                    maxLength - 1 === criteriaSection
                      ? "Submit"
                      : "Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}

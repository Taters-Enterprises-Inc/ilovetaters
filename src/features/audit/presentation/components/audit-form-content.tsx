import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  IconContainerProps,
  InputAdornment,
  Rating,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { getStores, selectGetStores } from "../slices/get-stores.slice";
import { FormEvent, useEffect, useState } from "react";
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
import { AiFillEyeInvisible, AiOutlineCalendar } from "react-icons/ai";
import { max } from "date-fns";

interface ClickedRowsState {
  [key: number]: boolean;
}

export function AuditFormContent() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const getStoreState = useAppSelector(selectGetStores);
  const getCriteria = useAppSelector(selectGetAuditEvaluationFormQuestion);

  const [formState, setFormState] = useState<AuditEvaluationAnswer>({});
  const [result, setResult] = useState<AuditResultModel>({});
  const [attention, setAttention] = useState("");

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-01")
  );

  const [auditDate, setAuditDate] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [maxLength, setmaxLength] = useState(10);

  const [isDisabled, setDisabled] = useState(false);

  const [actionDispatched, setActionDispatched] = useState(false);

  const [criteriaSection, setCriteriaSection] = useState(0);

  const insertAuditResponseState = useAppSelector(selectInsertAuditResponse);

  const [clickedRows, setClickedRows] = useState<ClickedRowsState>({});

  const [selectedStore, setSelectedStore] = useState<
    | {
        id: string;
        store_type_id: string;
        store_code: string;
        store_name: string;
        type_name: string;
      }
    | undefined
  >();

  useEffect(() => {
    dispatch(getStores());
    dispatch(getAuditEvaluationFormQuestion(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      auditCurrentSection({ section: criteriaSection, maxLength: maxLength })
    );
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [dispatch, criteriaSection, maxLength]);

  useEffect(() => {
    if (insertAuditResponseState.status === InsertAuditResponseState.success) {
      dispatch(resetInsertAuditResponse());
      navigate(`review/${insertAuditResponseState.data?.hash}`);
    }
  }, [dispatch, insertAuditResponseState, navigate]);

  useEffect(() => {
    if (
      getCriteria.data &&
      getCriteria.data.question_data[9].criteria.length === 0
    ) {
      setmaxLength(9);
    }
  }, [getCriteria.data]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = createQueryParams({ type: selectedStore?.type_name });
    const increasedSurveySection = criteriaSection + 1;

    if (
      getCriteria.status === GetAuditEvaluationFormQuestionState.success &&
      getCriteria.data &&
      getCriteria.data.question_data.length > 0
    ) {
      if (
        getCriteria.data.question_data[criteriaSection].criteria.length === 0
      ) {
        dispatch(getAuditEvaluationFormQuestion(query));
      }
      computeResult(criteriaSection);

      if (increasedSurveySection < maxLength) {
        setCriteriaSection(increasedSurveySection);
      } else {
        setActionDispatched(true);
      }
    }
  };

  useEffect(() => {
    if (actionDispatched) {
      dispatch(
        insertAuditResponse({
          selectedStoreId: selectedStore?.id,
          selectedTypeId: selectedStore?.store_type_id,
          attention,
          period: selectedDate,
          date: auditDate,
          answers: formState,
          result: result,
        })
      );
    }
  }, [result, dispatch, actionDispatched]);

  const computeResult = (currentSection: number) => {
    let rating = 0;
    let eq_rating = 0;
    let grade = 0;
    let final = 0;

    if (getCriteria.data) {
      if (
        getCriteria.data.question_data[currentSection].criteria.length !== 0
      ) {
        if (currentSection === 4 && getCriteria.data) {
          getCriteria.data.question_data[3].criteria.map((row) => {
            rating += formState[row.id]?.form_rating_id ?? 0;
            eq_rating += clickedRows[row.id] ? 0 : row.equivalent_point;
          });
        }

        getCriteria.data.question_data[currentSection].criteria.map((row) => {
          rating += formState[row.id]?.form_rating_id ?? 0;
          eq_rating += clickedRows[row.id] ? 0 : row.equivalent_point;
        });

        if (currentSection === 3) {
          return;
        }
        let category_id = currentSection;

        if (category_id > 3) {
          category_id = category_id - 1;
        }

        grade = rating / eq_rating;
        final = grade * getCriteria.data.default_weight[category_id - 1].weight;

        setResult({
          ...result,
          [category_id - 1]: {
            category:
              getCriteria.data.default_weight[category_id - 1].category_id,
            grade: Number(grade.toFixed(2)),
            weight: getCriteria.data.default_weight[category_id - 1].weight,
            final: Number(final.toFixed(3)),
          },
        });
      }
    }
  };

  useEffect(() => {
    console.log(selectedDate);
    console.log(formState);
    console.log(clickedRows);
  }, [formState]);

  return (
    <>
      <div className="flex flex-col space-y-10">
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
                      {getCriteria.data.question_data[criteriaSection].section}
                    </h1>
                    <span className="text-md">
                      Setup store and attention Information
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex flex-col space-y-5">
                {getCriteria.data.question_data[criteriaSection].criteria
                  .length === 0 ? (
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
                              ? getStoreState.data.stores.map(
                                  (row) => row.store_name
                                )
                              : []
                          }
                          onChange={(event, value: any) => {
                            if (value && getStoreState.data) {
                              const selectedStoreObj =
                                getStoreState.data.stores.find(
                                  (store) => store.store_name === value
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

                        <TextField
                          disabled
                          id="StoreType"
                          size="small"
                          variant="outlined"
                          placeholder="This will change after selecting store"
                          value={selectedStore?.type_name || ""}
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <span>Date of audit: </span>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="audit date"
                            views={["month", "day", "year"]}
                            onError={() => setDisabled(true)}
                            onAccept={(value) => {
                              if (dayjs(value)) {
                                setDisabled(false);
                              }
                            }}
                            onChange={(date) => {
                              if (date) {
                                const formattedDate = dayjs(date).format(
                                  "YYYY-MM-DD 00:00:00"
                                );

                                setAuditDate(formattedDate);
                              }
                            }}
                            value={dayjs(auditDate)}
                            renderInput={(params) => (
                              <TextField required {...params} size="small" />
                            )}
                          />
                        </LocalizationProvider>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <span>For the month of: </span>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Month and Year"
                            views={["month", "year"]}
                            onError={() => setDisabled(true)}
                            onAccept={(value) => {
                              if (dayjs(value)) {
                                setDisabled(false);
                              }
                            }}
                            onChange={(date) => {
                              if (date) {
                                const formattedDate =
                                  dayjs(date).format("YYYY-MM-01");

                                setSelectedDate(formattedDate);
                              }
                            }}
                            value={dayjs(selectedDate)}
                            renderInput={(params) => (
                              <TextField required {...params} size="small" />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : null}
                {getCriteria.data.question_data[criteriaSection].criteria
                  .length !== 0 ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      {getCriteria.data.question_data[
                        criteriaSection
                      ].criteria.map((row, index) => {
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
                          <div key={index} className="flex justify-center">
                            <Card
                              className="w-11/12"
                              variant="outlined"
                              style={{ width: "80%" }}
                            >
                              <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="black"
                                    gutterBottom
                                  >
                                    <span className="whitespace-pre-wrap break-words">
                                      {row.questions}
                                    </span>
                                  </Typography>
                                  <Button
                                    onClick={() => {
                                      setClickedRows((prevClickedRows) => ({
                                        ...prevClickedRows,
                                        [row.id]: !prevClickedRows[row.id],
                                      }));

                                      setFormState((prevFormState) => ({
                                        ...prevFormState,
                                        [row.id]: {
                                          form_rating_id: 0,
                                          question_id: row.id,
                                          level: row.level,
                                          equivalent_point: clickedRows[row.id]
                                            ? row.equivalent_point
                                            : 0,
                                          remarks:
                                            formState[row.id]?.remarks ?? "",
                                        },
                                      }));
                                    }}
                                  >
                                    <AiFillEyeInvisible
                                      className={`text-xl self-center ${
                                        clickedRows[row.id]
                                          ? "text-red-500"
                                          : "text-black"
                                      }`}
                                    />
                                  </Button>
                                </div>
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
                                        disabled={
                                          clickedRows[row.id] ? true : false
                                        }
                                        name={row.id.toString()}
                                        defaultValue={0}
                                        max={3}
                                        value={Number(
                                          formState?.[row.id]?.form_rating_id ??
                                            0
                                        )}
                                        onChange={(e, value: number | null) => {
                                          const rating = value || 0;
                                          const form_rating_id = rating;
                                          const question_id = row.id;
                                          const eq_point = row.equivalent_point;
                                          const level = row.level;
                                          setFormState({
                                            ...formState,
                                            [row.id]: {
                                              form_rating_id: form_rating_id,
                                              question_id: question_id,
                                              remarks:
                                                formState[row.id]?.remarks ??
                                                null,
                                              equivalent_point:
                                                formState[row.id]
                                                  ?.equivalent_point ??
                                                eq_point,
                                              level: level,
                                            },
                                          });
                                        }}
                                        IconContainerComponent={IconContainer}
                                        getLabelText={(value: number) =>
                                          AUDIT_CUSTOM_ICON[value].label
                                        }
                                        highlightSelectedOnly
                                      />
                                    </div>
                                    <span>
                                      {formState?.[row.id]?.form_rating_id ?? 0}
                                    </span>
                                    <Divider orientation="vertical" flexItem />
                                    <div className="flex flex-col w-full space-y-2">
                                      <span>Remarks: </span>

                                      <TextField
                                        name={row.id.toString()}
                                        size="small"
                                        value={
                                          formState?.[row.id]?.remarks ?? ""
                                        }
                                        multiline={true}
                                        variant="outlined"
                                        onChange={(e) => {
                                          const form_rating_id = 0;
                                          const question_id = row.id;
                                          const eq_point = row.equivalent_point;
                                          const level = row.level;
                                          const remarks = e.target.value;
                                          setFormState({
                                            ...formState,
                                            [row.id]: {
                                              form_rating_id:
                                                formState[row.id]
                                                  ?.form_rating_id ??
                                                form_rating_id,
                                              question_id: question_id,
                                              remarks: remarks,
                                              equivalent_point:
                                                formState[row.id]
                                                  ?.equivalent_point ??
                                                eq_point,
                                              level: level,
                                            },
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="flex space-x-3 px-5">
                {criteriaSection !== 0 ? (
                  <Button
                    className="basis-1/2"
                    variant="contained"
                    onClick={() => {
                      if (criteriaSection > 0) {
                        setCriteriaSection(criteriaSection - 1);
                      }
                    }}
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
                  disabled={isDisabled}
                  onClick={() => handleFormSubmit}
                  variant="contained"
                  startIcon={<MdNavigateNext className="text-white text-4xl" />}
                >
                  {getCriteria.data.question_data.length - 1 ===
                    criteriaSection || maxLength - 1 === criteriaSection
                    ? "Submit"
                    : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}

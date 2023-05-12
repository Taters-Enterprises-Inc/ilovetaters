import {
  Autocomplete,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  IconContainerProps,
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
import {
  MdNavigateNext,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { GetAuditStoreModel } from "features/audit/core/domain/get-store-model.model";
import {
  GetAuditEvaluationFormQuestionState,
  getAuditEvaluationFormQuestion,
  selectGetAuditEvaluationFormQuestion,
} from "../slices/get-audit-evaluation-form_questions.slice";
import { createQueryParams } from "features/config/helpers";
import { AuditEvaluationAnswer } from "features/audit/core/domain/audit-evaluation-answer.model";
import { IoIosArrowBack } from "react-icons/io";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { RiNurseFill } from "react-icons/ri";
import { auditCurrentSection } from "../slices/audit-section.slice";

export function AuditFormContent() {
  const dispatch = useAppDispatch();
  const query = useQuery();

  const getStoreState = useAppSelector(selectGetStores);
  const getCriteria = useAppSelector(selectGetAuditEvaluationFormQuestion);

  const [formState, setFormState] = useState<AuditEvaluationAnswer>({});

  const [attention, setAttention] = useState("");

  const [criteriaSection, setCriteriaSection] = useState(0);

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
  }, [dispatch, criteriaSection]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = createQueryParams({ type: selectedType?.type_name });
    const increasedSurveySection = criteriaSection + 1;

    if (
      getCriteria.status === GetAuditEvaluationFormQuestionState.success &&
      getCriteria.data &&
      getCriteria.data.length > 0
    ) {
      if (increasedSurveySection < getCriteria.data.length) {
        setCriteriaSection(increasedSurveySection);
      } else {
        console.log(formState);
        console.log(selectedStore?.store_id);
        console.log(selectedType);
        console.log(attention);
      }

      if (getCriteria.data[criteriaSection].criteria.length === 0) {
        dispatch(getAuditEvaluationFormQuestion(query));
      }
    }
  };
  // console.log(formState);

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
                    <div className="px-5">
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

                          const customIcons: {
                            [index: string]: {
                              icon: React.ReactElement;
                              label: string;
                            };
                          } = {
                            1: {
                              icon: (
                                <GrStatusCriticalSmall className="text-4xl pt-2.5" />
                              ),
                              label: "Less Critical",
                            },
                            2: {
                              icon: (
                                <GrStatusCriticalSmall className="text-4xl pt-2.5" />
                              ),
                              label: "Critical",
                            },
                            3: {
                              icon: (
                                <GrStatusCriticalSmall className="text-4xl pt-2.5" />
                              ),
                              label: "Most Critital",
                            },
                          };

                          const IconContainer = (props: IconContainerProps) => {
                            const { value, ...other } = props;
                            return (
                              <span {...other}>{customIcons[value].icon}</span>
                            );
                          };

                          const handleRatingChange =
                            (id: number) =>
                            (
                              event: React.ChangeEvent<{}>,
                              value: number | null
                            ) => {
                              const ratingValue = value || 0;

                              setFormState((prevFormState) => ({
                                ...prevFormState,
                                [id]: { id, ratingValue },
                              }));
                            };

                          return (
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

                                            setFormState({
                                              ...formState,
                                              [row.id]: {
                                                form_rating_id,
                                                question_id,
                                              },
                                            });
                                          }}
                                          IconContainerComponent={IconContainer}
                                          getLabelText={(value: number) =>
                                            customIcons[value].label
                                          }
                                          highlightSelectedOnly
                                        />
                                      </div>
                                      <span>
                                        {formState?.[row.id]?.form_rating_id ??
                                          null}
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
                                          variant="outlined"
                                          onChange={(e) => {
                                            const remarks = e.target.value;
                                            setFormState((prevState) => ({
                                              ...prevState,
                                              [row.id]: {
                                                ...prevState[row.id],
                                                ...prevState[row.id],
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
                    {getCriteria.data.length - 1 === criteriaSection
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

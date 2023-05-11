import {
  Autocomplete,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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

export function AuditFormContent() {
  const dispatch = useAppDispatch();
  const query = useQuery();

  const getStoreState = useAppSelector(selectGetStores);
  const getCriteria = useAppSelector(selectGetAuditEvaluationFormQuestion);

  const [formState, setFormState] = useState<AuditEvaluationAnswer>({});
  const [value, setValue] = useState<number | null>(2);

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

  console.log(criteriaSection);

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
        console.log(selectedStore);
        console.log(selectedType);
        console.log(attention);
      }

      if (getCriteria.data[criteriaSection].criteria.length === 0) {
        dispatch(getAuditEvaluationFormQuestion(query));
      }
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-10 lg:px-10">
        <div>
          <h1 className="flex justify-center text-4xl font-['Bebas_Neue'] text-center py-6">
            INTERNAL QUALITY AUDIT FORM
          </h1>
        </div>
        {getCriteria.data ? (
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col space-y-10 px-10 mb-20">
              <div>
                <h1 id="section_1" className="capitalize font-semibold text-xl">
                  {getCriteria.data[criteriaSection].section}
                </h1>
                {criteriaSection === 0 ? (
                  <span className="text-md">
                    Setup store and attention Information
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col space-y-5">
                {getCriteria.data[criteriaSection].criteria.length === 0 ? (
                  <>
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
                  </>
                ) : null}

                {getCriteria.data[criteriaSection].criteria.length !== 0 ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      {getCriteria.data[criteriaSection].criteria.map((row) => {
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
                              <GrStatusCriticalSmall className="text-5xl pt-2.5" />
                            ),
                            label: "Less Critical",
                          },
                          2: {
                            icon: (
                              <GrStatusCriticalSmall className="text-5xl pt-2.5" />
                            ),
                            label: "Critical",
                          },
                          3: {
                            icon: (
                              <GrStatusCriticalSmall className="text-5xl pt-2.5" />
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

                        return (
                          <div>
                            <Card className="w-full" variant="outlined">
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                >
                                  <span className="">{row.questions}</span>
                                </Typography>
                                <div className="flex justify-center">
                                  <StyledRating
                                    name="highlight-selected-only"
                                    defaultValue={0}
                                    max={3}
                                    IconContainerComponent={IconContainer}
                                    getLabelText={(value: number) =>
                                      customIcons[value].label
                                    }
                                    highlightSelectedOnly
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                <div className="flex space-x-3">
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

import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Box,
  MobileStepper,
  Paper,
  Typography,
} from "@mui/material";
import { PiCheckSquareOffsetBold } from "react-icons/pi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  MaterialDateInput,
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { useEffect, useRef, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  GetSalesActiveFieldsState,
  getSalesActiveFields,
  selectGetSalesActiveFields,
} from "../slices/get-active-fields.slice";
import { CheckParam, SubmitFormParam } from "features/sales/core/sales.param";
import {
  TabPanel,
  fieldToHide,
  getFormState,
  hidePanel,
  initialFormState,
} from "./sales-utils";
import { useNavigate } from "react-router-dom";
import {
  GetSalesFormDataState,
  getSalesFormData,
  resetGetSalesFormData,
  selectGetSalesFormData,
} from "../slices/get-sales-form-content.slice";
import { createQueryParams } from "features/config/helpers";
import { FormFieldData } from ".";
import { salesSubmitVerdict } from "../slices/sales-submit-verdict.slice";
import { theme } from "features/shared/constants";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function SalesTaskContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);
  const getSalesFormDataState = useAppSelector(selectGetSalesFormData);

  const [edit, setEdit] = useState(true);
  const [cashierFormState, setCashierFormState] =
    useState<SubmitFormParam["formState"]>();
  const [tcFormState, setTcFormState] =
    useState<SubmitFormParam["formState"]>();
  const [managerFormState, setManagerFormState] =
    useState<SubmitFormParam["formState"]>();

  const [tabValue, setTabValue] = useState(0);

  const grade = useRef("0");
  const query = useQuery();

  const formId = query.get("id");
  const userType = query.get("type");

  useEffect(() => {
    const queryParams = createQueryParams({ id: formId, type: userType });

    dispatch(resetGetSalesFormData());
    dispatch(getSalesFormData(queryParams));
  }, [dispatch, formId, userType]);

  useEffect(() => {
    const queryParams = createQueryParams({ id: formId, type: userType });

    if (
      (getSalesActiveFieldsState.status !== GetSalesActiveFieldsState.success &&
        !getSalesActiveFieldsState.data) ||
      (getSalesFormDataState.status !== GetSalesFormDataState.success &&
        !getSalesFormDataState.data)
    ) {
      dispatch(getSalesActiveFields());
      dispatch(getSalesFormData(queryParams));
    } else if (getSalesActiveFieldsState.data) {
      setCashierFormState(
        initialFormState(
          getSalesActiveFieldsState.data,
          getSalesFormDataState.data?.cashier_data
        )
      );
      setTcFormState(
        initialFormState(
          getSalesActiveFieldsState.data,
          getSalesFormDataState.data?.cashier_data
        )
      );
      setManagerFormState(
        initialFormState(
          getSalesActiveFieldsState.data,
          getSalesFormDataState.data?.tc_data
        )
      );
    }
  }, [getSalesActiveFieldsState.data, getSalesFormDataState.data]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const checkParam: CheckParam = {
      formState: getFormState(
        userType,
        cashierFormState,
        tcFormState,
        managerFormState
      ),
      grade: grade.current,
      id: formId,
      type: userType,
    };

    if (
      cashierFormState !== undefined ||
      tcFormState !== undefined ||
      managerFormState !== undefined
    ) {
      dispatch(salesSubmitVerdict(checkParam));
      navigate(
        userType === "cashier" ? "/admin/sales/form-list" : "/admin/sales/task"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${
          userType === "cashier" && "px-20"
        } "w-full hidden lg:flex lg:justify-center space-x-3 mt-5"`}
      >
        <div className="sticky left-0 top-8 border border-gray-200 bg-white shadow-sm rounded-md p-1 h-fit py-2">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={(event, value) => setTabValue(value)}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {getSalesActiveFieldsState.data?.field_data.map((field_data) => (
              <Tab label={<span>{field_data.section}</span>} />
            ))}
          </Tabs>
        </div>
        <div
          className={`${
            userType === "cashier" && "flex-1"
          } "border border-gray-200 bg-white shadow-sm rounded-md w-fit p-3 overflow-x-auto"`}
        >
          <span className="text-3xl font-semibold">
            {getSalesActiveFieldsState.data?.field_data[tabValue].section}
          </span>
          <div className="flex w-full">
            <div className={`${userType === "cashier" ? "w-full" : ""}`}>
              <TabPanel index={tabValue} value={tabValue}>
                <FormFieldData
                  formLabel="cashier"
                  disabled={userType !== "cashier"}
                  disableFeedback
                  salesActiveFieldState={getSalesActiveFieldsState.data}
                  activeStep={tabValue}
                  formState={cashierFormState || {}}
                  setFormState={(
                    data: SubmitFormParam["formState"] | undefined
                  ) => setCashierFormState(data || {})}
                />
              </TabPanel>
            </div>
            <div className={`${hidePanel(userType).tc ? "hidden" : ""}`}>
              <TabPanel index={tabValue} value={tabValue}>
                <FormFieldData
                  formLabel="tc"
                  disabled={userType !== "tc"}
                  disableFieldLabel
                  disabledSubSection
                  disableFieldName={fieldToHide}
                  disableFeedback
                  salesActiveFieldState={getSalesActiveFieldsState.data}
                  activeStep={tabValue}
                  formState={tcFormState || {}}
                  setFormState={(
                    data: SubmitFormParam["formState"] | undefined
                  ) => setTcFormState(data || {})}
                />
              </TabPanel>
            </div>
            <div className={`${hidePanel(userType).manager ? "hidden" : ""}`}>
              <TabPanel index={tabValue} value={tabValue}>
                <FormFieldData
                  formLabel="manager"
                  disableFieldLabel
                  disabledSubSection
                  disableFeedback
                  disableFieldName={fieldToHide}
                  salesActiveFieldState={getSalesActiveFieldsState.data}
                  activeStep={tabValue}
                  formState={managerFormState || {}}
                  setFormState={(
                    data: SubmitFormParam["formState"] | undefined
                  ) => setManagerFormState(data || {})}
                />
              </TabPanel>
            </div>
          </div>

          <div className="flex flex-row justify-center p-5 space-x-5">
            {userType === "cashier" ? (
              <Button
                type="submit"
                onClick={() => (grade.current = "0")}
                variant="contained"
              >
                submit
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  onClick={() => (grade.current = "2")}
                  variant="contained"
                >
                  Disapprove
                </Button>
                <Button
                  type="submit"
                  onClick={() => (grade.current = "1")}
                  variant="contained"
                >
                  Approve
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full lg:hidden border border-gray-200 bg-white shadow-sm rounded-md p-3 mt-5">
        <span className="text-xl font-semibold">
          {getSalesActiveFieldsState.data?.field_data[tabValue].section}
        </span>

        <div className="flex space-x-3 overflow-y-auto">
          <div
            className={` ${
              userType === "cashier" ? "w-full" : "shrink-0 w-2/3 md:w-1/2"
            }`}
          >
            <FormFieldData
              formLabel="cashier"
              disabled={userType !== "cashier"}
              salesActiveFieldState={getSalesActiveFieldsState.data}
              activeStep={tabValue}
              disableFeedback
              formState={cashierFormState || {}}
              setFormState={(data: SubmitFormParam["formState"] | undefined) =>
                setCashierFormState(data || {})
              }
            />
          </div>
          <div
            className={`shrink-0 w-2/3 md:w-1/2 ${
              hidePanel(userType).tc ? "hidden" : ""
            }`}
          >
            <FormFieldData
              formLabel="tc"
              disabled={userType !== "tc"}
              disableFieldLabel
              disabledSubSection
              disableFeedback
              disableFieldName={fieldToHide}
              salesActiveFieldState={getSalesActiveFieldsState.data}
              activeStep={tabValue}
              formState={tcFormState || {}}
              setFormState={(data: SubmitFormParam["formState"] | undefined) =>
                setTcFormState(data || {})
              }
            />
          </div>
          <div
            className={`shrink-0 w-2/3 md:w-1/2 ${
              hidePanel(userType).manager ? "hidden" : ""
            }`}
          >
            <FormFieldData
              formLabel="manager"
              disableFieldLabel
              disabledSubSection
              disableFeedback
              disableFieldName={fieldToHide}
              salesActiveFieldState={getSalesActiveFieldsState.data}
              activeStep={tabValue}
              formState={managerFormState || {}}
              setFormState={(data: SubmitFormParam["formState"] | undefined) =>
                setManagerFormState(data || {})
              }
            />
          </div>
        </div>

        <div className="flex flex-row justify-center p-5 space-x-5">
          {userType === "cashier" ? (
            <Button
              type="submit"
              onClick={() => (grade.current = "0")}
              variant="contained"
            >
              submit
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                onClick={() => (grade.current = "2")}
                variant="contained"
              >
                Disapprove
              </Button>
              <Button
                type="submit"
                onClick={() => (grade.current = "1")}
                variant="contained"
              >
                Approve
              </Button>
            </>
          )}
        </div>

        <MobileStepper
          variant="text"
          steps={6}
          position="static"
          activeStep={tabValue}
          nextButton={
            <Button
              size="small"
              onClick={() => setTabValue((prevValue) => prevValue + 1)}
              disabled={tabValue === 6 - 1}
            >
              Next
              {theme.direction === "rtl" ? <GrFormPrevious /> : <GrFormNext />}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => setTabValue((prevValue) => prevValue - 1)}
              disabled={tabValue === 0}
            >
              {theme.direction === "rtl" ? <GrFormNext /> : <GrFormPrevious />}
              Back
            </Button>
          }
        />
      </div>
    </form>
  );
}

import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import { initialFormState } from "./sales-utils";
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

export default function SalesTaskContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);
  const getSalesFormDataState = useAppSelector(selectGetSalesFormData);

  const [edit, setEdit] = useState(true);
  const [formState, setFormState] = useState<SubmitFormParam["formState"]>();
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
      setFormState(
        initialFormState(
          getSalesActiveFieldsState.data,
          getSalesFormDataState.data
        )
      );
    }
  }, [getSalesActiveFieldsState.data, getSalesFormDataState.data]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const checkParam: CheckParam = {
      formState: formState ?? {},
      grade: grade.current,
      id: formId,
      type: userType,
    };

    if (formState !== undefined) {
      dispatch(salesSubmitVerdict(checkParam));
      navigate(
        userType === "cashier" ? "/admin/sales/form-list" : "/admin/sales/task"
      );
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-b-lg font-['Roboto'] flex-1 p-4">
      <div className="flex flex-row-reverse px-5">
        <Button onClick={() => setEdit(false)} variant="outlined">
          <PiCheckSquareOffsetBold size={20} />
        </Button>
      </div>
      <form className="p-5" onSubmit={handleSubmit}>
        {getSalesActiveFieldsState.data?.field_data.map((field_Data, index) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="hover:bg-neutral-300 hover:text-neutral-950"
              sx={{
                backgroundColor: "#f0f1f2",
                borderRadius: 1,
              }}
            >
              <span className="font-semibold">{field_Data.section}</span>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingY: 3, paddingX: { md: 15 } }}>
              <FormFieldData
                disabled={edit}
                salesActiveFieldState={getSalesActiveFieldsState.data}
                activeStep={index}
                formState={formState || {}}
                setFormState={(
                  data: SubmitFormParam["formState"] | undefined
                ) => setFormState(data || {})}
              />
            </AccordionDetails>
          </Accordion>
        ))}
        <div className="flex flex-row justify-center p-5 space-x-5">
          {userType === "cashier" ? (
            <Button
              type="submit"
              onClick={() => (grade.current = "0")}
              variant="contained"
              className="w-1/6"
            >
              submit
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                onClick={() => (grade.current = "2")}
                variant="contained"
                className="w-1/6"
              >
                Disapprove
              </Button>
              <Button
                type="submit"
                onClick={() => (grade.current = "1")}
                variant="contained"
                className="w-1/6"
              >
                Approve
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

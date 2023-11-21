import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
} from "@mui/material";
import { PiCheckSquareOffsetBold } from "react-icons/pi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sample } from "lodash";
import {
  MaterialDateInput,
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { ChangeEvent, useEffect, useState } from "react";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  GetSalesActiveFieldsState,
  getSalesActiveFields,
  selectGetSalesActiveFields,
} from "../slices/get-active-fields.slice";
import { CheckParam, SubmitFormParam } from "features/sales/core/sales.param";
import { initialFormState, setDynamicOption } from "./sales-utils";
import { salesSubmitVerdict } from "../slices/sales-submit-verdict.slice";
import { Navigate, useNavigate } from "react-router-dom";

const sampleData = {
  data: [
    {
      fieldValues: [
        { value: "2023-11-17" },
        { value: "Taters Waltermart Makati" },
        { value: "test@email.com" },
        { value: "AM" },
        { value: "Test Name" },
        { value: "1855" },
        { value: "1855" },
        { value: "2023-11-17" },
        { value: "1855" },
        { value: "200" },
      ],
    },
  ],
};

export default function SalesTaskContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getSalesActiveFieldsState = useAppSelector(selectGetSalesActiveFields);

  const [edit, setEdit] = useState(true);
  const [formState, setFormState] = useState<SubmitFormParam["formState"]>();

  const formId = "1";

  useEffect(() => {
    if (
      getSalesActiveFieldsState.status !== GetSalesActiveFieldsState.success &&
      !getSalesActiveFieldsState.data
    ) {
      dispatch(getSalesActiveFields());
    } else if (getSalesActiveFieldsState.data) {
      setFormState(
        initialFormState(getSalesActiveFieldsState.data, sampleData)
      );
    }
  }, [getSalesActiveFieldsState.data]);

  const handleOnChange = (
    sectionName: string,
    fieldName: string,
    val: string | Date | null
  ) => {
    setFormState((prevData) => ({
      ...prevData,
      [sectionName]: {
        ...(prevData && prevData[sectionName]),
        [fieldName]: { value: val },
      },
    }));
  };

  const incorrectForm = () => {
    let result = false;

    getSalesActiveFieldsState.data?.field_data.some(
      (field_data, sectionIndex) => {
        return field_data.field.some((fields) => {
          return fields.field_data.some((field, fieldIndex) => {
            if (
              formState?.[field_data.section]?.[field.name]?.value !==
              sampleData?.data[sectionIndex]?.fieldValues[fieldIndex]?.value
            ) {
              result = true;

              return true;
            } else {
              result = false;
            }
          });
        });
      }
    );

    return result;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const tcCheckParam: CheckParam = {
      formState: formState ?? {},
      grade: incorrectForm() ? "2" : "1",
      id: formId,
    };

    if (formState !== undefined) {
      dispatch(salesSubmitVerdict(tcCheckParam));
      navigate("/admin/sales/task");
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
        {getSalesActiveFieldsState.data?.field_data.map((field_Data) => (
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
            <AccordionDetails sx={{ paddingY: 3, paddingX: 10 }}>
              {field_Data.field.map((field) => (
                <>
                  {field.field_data.length !== 0 ? (
                    <span className="px-10 pt-5 font-semibold">
                      {field.sub_section}
                    </span>
                  ) : null}

                  {field.field_data.map((fieldData) => (
                    <div className="px-20 p-2">
                      <span>{fieldData.field_name}</span>

                      {fieldData.is_dropdown || fieldData.is_date_field ? (
                        <>
                          {fieldData.is_dropdown ? (
                            <MaterialInputAutoComplete
                              size="small"
                              colorTheme={"black"}
                              placeholder={fieldData.field_name}
                              required={fieldData.is_required}
                              options={
                                setDynamicOption(
                                  getSalesActiveFieldsState.data,
                                  fieldData.name
                                ) ?? []
                              }
                              isOptionEqualToValue={(option, value) =>
                                option === value
                              }
                              value={(
                                formState?.[field_Data.section]?.[
                                  fieldData.name
                                ]?.value ?? ""
                              ).toString()}
                              disabled={edit}
                              onChange={(event, selectedValue) =>
                                handleOnChange(
                                  fieldData.section_name,
                                  fieldData.name,
                                  selectedValue
                                )
                              }
                            />
                          ) : null}

                          {fieldData.is_date_field ? (
                            <MaterialDateInput
                              disableFuture
                              required={fieldData.is_required}
                              colorTheme={"black"}
                              size="small"
                              disabled={edit}
                              value={(
                                formState?.[field_Data.section]?.[
                                  fieldData.name
                                ]?.value ?? ""
                              ).toString()}
                              placeholder={fieldData.field_name}
                              onChange={(selectedDate: Date | null) =>
                                handleOnChange(
                                  fieldData.section_name,
                                  fieldData.name,
                                  selectedDate
                                )
                              }
                            />
                          ) : null}
                        </>
                      ) : (
                        <MaterialInput
                          required={fieldData.is_required}
                          colorTheme={"black"}
                          name={fieldData.name}
                          size="small"
                          disabled={edit}
                          fullWidth
                          value={(
                            formState?.[field_Data.section]?.[fieldData.name]
                              ?.value ?? ""
                          ).toString()}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            handleOnChange(
                              field_Data.section,
                              event.target.name,
                              event.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
        <div className="flex flex-row justify-center p-5 space-x-5">
          <Button type="submit" variant="contained" className="w-1/6">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

import {
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { department, urgency } from "./ticketing-utils";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { TICKETING_BUTTON_STYLE } from "features/shared/constants";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import {
  selectTicketingSubmitTicket,
  ticketingSubmitTicket,
  ticketingSubmitTicketState,
} from "../slices/ticketing-submit.slice";
import { ticketingTicketParam } from "features/ticketing/core/ticketing.params";

interface formData {
  ticketTitle: string;
  department: { id: number | undefined; name: string } | null;
  urgency: { id: number | undefined; name: string } | null;
  ticketDetails: string;
}

export function SubmitTicketContents() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitTicketState = useAppSelector(selectTicketingSubmitTicket);
  // const getAllTicketState = useAppSelector(selectGetStockOrderAllStores);
  const [formState, setFormState] = useState<formData>({
    ticketTitle: "",
    department: null,
    urgency: null,
    ticketDetails: "",
  });

  const handleOnChange = (value: string, property: string) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [property]: value,
    }));
  };

  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const submitTicketParam: ticketingTicketParam = {
      ticketTitle: formState.ticketTitle,
      departmentId: formState.department?.id,
      // urgency: formState.urgency,
      ticketDetails: formState.ticketDetails,
    };

    console.log(submitTicketParam);

    dispatch(ticketingSubmitTicket(submitTicketParam));
  };

  useEffect(() => {
    if (ticketingSubmitTicketState.success === submitTicketState.status) {
      navigate("/admin/ticketing/submit-ticket");
    }
  }, [submitTicketState.status, ticketingSubmitTicketState.success]);

  return (
    <div className="flex flex-col space-y-5">
      <div>
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Submit a Ticket
        </span>
      </div>
      <form onSubmit={handleOnSubmit} className="w-full px-10 space-y-5">
        <MaterialInput
          fullWidth
          required
          name={"ticketTitle"}
          label="Ticket Title"
          colorTheme={"black"}
          placeholder="Ticket Title"
          value={formState.ticketTitle}
          onChange={(event) =>
            handleOnChange(event.target.value, event.target.name)
          }
        />

        <MaterialInputAutoComplete
          colorTheme={"black"}
          options={department ?? []}
          label="Department (Optional)"
          getOptionLabel={(option) => option.name ?? ""}
          placeholder="Select Department"
          value={formState.department}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, selectedValue) => {
            if (selectedValue) {
              handleOnChange(selectedValue, "department");
            }
          }}
        />

        {/* 👇 URGENCY AUTOCOMPLETE FIELD 👇 */}
        {/* <MaterialInputAutoComplete
          required
          colorTheme={"black"}
          options={urgency ?? []}
          label="Urgency"
          getOptionLabel={(option) => option.name ?? ""}
          placeholder="Select Urgency"
          value={formState.urgency}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, selectedValue) => {
            if (selectedValue) {
              handleOnChange(selectedValue, "urgency");
            }
          }}
        /> */}

        <MaterialInput
          multiline
          rows={4}
          fullWidth
          required
          name={"ticketDetails"}
          label="Tell us more about your issue"
          colorTheme={"black"}
          placeholder="Tell us more about your issue"
          value={formState.ticketDetails}
          onChange={(event) =>
            handleOnChange(event.target.value, event.target.name)
          }
        />

        <Button type="submit" sx={TICKETING_BUTTON_STYLE} fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
}

import {
  MaterialInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { department } from "./ticketing-utils";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { TICKETING_BUTTON_STYLE } from "features/shared/constants";

interface formData {
  ticketTitle: string;
  department: { id: number | undefined; name: string } | null;
  ticketDetails: string;
}

export function SubmitTicketContents() {
  const [formState, setFormState] = useState<formData>({
    ticketTitle: "",
    department: null,
    ticketDetails: "",
  });

  const handleOnChange = (value: string, property: string) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [property]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div>
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Submit a Ticket
        </span>
      </div>
      <form action="" className="w-full px-10 space-y-5">
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
          placeholder="Choose Department"
          value={formState.department}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, selectedValue) => {
            if (selectedValue) {
              handleOnChange(selectedValue, "department");
            }
          }}
        />

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

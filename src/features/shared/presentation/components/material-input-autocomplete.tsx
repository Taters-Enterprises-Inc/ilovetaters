import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { ChangeEvent } from "react";
import { MaterialInput } from "./material-input";

interface MaterialInputAutoCompleteProps {
  colorTheme: "black" | "white";
  options: readonly any[];
  defaultValue: any;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<any> | undefined
      ) => void)
    | undefined;
  getOptionLabel?: ((option: any) => string) | undefined;
  label: string;
}

export function MaterialInputAutoComplete(
  props: MaterialInputAutoCompleteProps
) {
  return (
    <Autocomplete
      disablePortal
      options={props.options}
      sx={{ width: 328 }}
      size="small"
      defaultValue={props.defaultValue}
      getOptionLabel={props.getOptionLabel}
      onChange={props.onChange}
      renderInput={(params) => (
        <MaterialInput
          {...params}
          colorTheme={props.colorTheme}
          onChange={() => {}}
          value=""
          name=""
          label={props.label}
        />
      )}
    />
  );
}

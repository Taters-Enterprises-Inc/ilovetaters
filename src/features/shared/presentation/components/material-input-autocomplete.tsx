import { SxProps, Theme } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { ChangeEvent } from "react";
import { MaterialInput } from "./material-input";

interface MaterialInputAutoCompleteProps {
  colorTheme: "black" | "white";
  options: readonly any[];
  defaultValue?: any;
  multiple?: any;
  value?: any;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<any> | undefined
      ) => void)
    | undefined;
  getOptionLabel?: ((option: any) => string) | undefined;
  filterSelectedOptions?: boolean;
  label: string;
  sx?: SxProps<Theme> | undefined;
  size?: "small" | "medium" | undefined;
}

export function MaterialInputAutoComplete(
  props: MaterialInputAutoCompleteProps
) {
  return (
    <Autocomplete
      disablePortal
      multiple={props.multiple}
      options={props.options}
      sx={props.sx}
      size={props.size}
      value={props.value}
      defaultValue={props.defaultValue}
      getOptionLabel={props.getOptionLabel}
      onChange={props.onChange}
      filterSelectedOptions={props.filterSelectedOptions}
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
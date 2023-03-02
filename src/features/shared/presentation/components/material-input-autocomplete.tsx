import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { SxProps, Theme } from "@mui/material/styles";
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
  fullWidth?: boolean;
  required?: boolean;
  isOptionEqualToValue: (option: any, value: any) => boolean;
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
      fullWidth={props.fullWidth}
      defaultValue={props.defaultValue}
      getOptionLabel={props.getOptionLabel}
      onChange={props.onChange}
      filterSelectedOptions={props.filterSelectedOptions}
      isOptionEqualToValue={props.isOptionEqualToValue}
      renderInput={(params) => (
        <MaterialInput
          {...params}
          colorTheme={props.colorTheme}
          onChange={() => {}}
          required={props.required}
          name=""
          label={props.label}
        />
      )}
    />
  );
}

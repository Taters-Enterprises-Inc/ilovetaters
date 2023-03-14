import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface MaterialSwitchProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MaterialSwitch(props: MaterialSwitchProps) {
  return (
    <FormControlLabel
      control={<Switch checked={props.checked} onChange={props.onChange} />}
      label={props.label}
    />
  );
}

import { TextField } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { MaterialInput } from "features/shared/presentation/components";

interface InvoiceFilterProps {
  onSearch: (search: string) => void;
  search: string;
}

export function InvoiceFilter(props: InvoiceFilterProps) {
  return (
    <GridToolbarContainer sx={{ padding: 1 }}>
      <MaterialInput
        colorTheme="black"
        size="small"
        name="search"
        autoFocus
        autoComplete="off"
        defaultValue={props.search}
        onChange={(e) => {
          props.onSearch(e.target.value);
        }}
      />
    </GridToolbarContainer>
  );
}

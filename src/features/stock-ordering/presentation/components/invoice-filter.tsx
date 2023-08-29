import { TextField } from "@mui/material";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { MaterialInput } from "features/shared/presentation/components";

interface InvoiceFilterProps {
  onSearch: (search: string) => void;
  search: string;
}

export function InvoiceFilter(props: InvoiceFilterProps) {
  const handleOnSearch = (event: { target: { value: any } }) => {
    let value = event.target.value;

    props.onSearch(value);
  };

  return (
    <GridToolbarContainer sx={{ padding: 1 }}>
      <MaterialInput
        colorTheme="black"
        label="Search"
        size="small"
        name="search"
        defaultValue={props.search}
        onChange={(e) => {
          props.onSearch(e.target.value);
        }}
      />
    </GridToolbarContainer>
  );
}

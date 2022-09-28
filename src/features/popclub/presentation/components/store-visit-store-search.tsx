import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  resetStoreSearch,
  searchStores,
  selectGetStoresAvailablePopClubStoreVisit,
} from "../slices/get-stores-available-popclub-store-visit.slice";

const WhiteTextFiled = styled((props: OutlinedTextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& input": {
    color: "white !important",
    "-webkit-text-fill-color": "white !important",
  },
  "& label": {
    color: "white !important",
  },
  "& fieldset": {
    borderColor: "white !important",
  },
  "&:hover fieldset": {
    borderColor: "white !important",
  },
  "&.Mui-focused fieldset": {
    borderColor: "white !important",
  },
}));
interface StoreVisitStoreSearchProps {
  label: string;
}
export function StoreVisitStoreSearch(props: StoreVisitStoreSearchProps) {
  const getStoresAvailablePopClubStoreVisitState = useAppSelector(
    selectGetStoresAvailablePopClubStoreVisit
  );

  const dispatch = useAppDispatch();

  const handleOnChange = (event: any) => {
    const search = event.target.value;
    if (!search) {
      dispatch(resetStoreSearch());

      return;
    }

    if (getStoresAvailablePopClubStoreVisitState.data) {
      const regions = getStoresAvailablePopClubStoreVisitState.data;
      const merged_stores = [];

      for (let i = 0; i < regions.length; i++) {
        const stores = regions[i].stores;
        for (let x = 0; x < stores.length; x++) {
          merged_stores.push(stores[x]);
        }
      }
      const search_stores = merged_stores.filter((store, index) => {
        return store.store_name.toLowerCase().includes(search.toLowerCase());
      });

      dispatch(searchStores({ stores: search_stores }));
    }
  };

  return (
    <WhiteTextFiled
      variant="outlined"
      onChange={handleOnChange}
      fullWidth
      label={props.label}
    />
  );
}

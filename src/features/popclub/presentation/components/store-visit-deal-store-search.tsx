import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  searchStoreVisitDealStores,
  resetStoreVisitDealStoresSearch,
  selectGetStoreVisitDealAvailableStore,
} from "../slices/get-store-visit-deal-available-stores.slice";
import { useEffect } from "react";

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
export function StoreVisitDealStoreSearch(props: StoreVisitStoreSearchProps) {
  const dispatch = useAppDispatch();

  const getStoreVisitDealAvailableStoreState = useAppSelector(
    selectGetStoreVisitDealAvailableStore
  );

  useEffect(() => {
    dispatch(resetStoreVisitDealStoresSearch());
  }, [dispatch]);

  const handleOnChange = (event: any) => {
    const search = event.target.value;
    if (!search) {
      dispatch(resetStoreVisitDealStoresSearch());

      return;
    }

    if (getStoreVisitDealAvailableStoreState.data) {
      const regions = getStoreVisitDealAvailableStoreState.data;
      const merged_stores = [];

      for (let i = 0; i < regions.length; i++) {
        const stores = regions[i].stores;
        for (let x = 0; x < stores.length; x++) {
          merged_stores.push(stores[x]);
        }
      }
      const search_stores = merged_stores.filter((store, index) => {
        return (
          store.store_name.toLowerCase().includes(search.toLowerCase()) ||
          store.store_address.toLowerCase().includes(search.toLowerCase())
        );
      });

      dispatch(searchStoreVisitDealStores({ stores: search_stores }));
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

import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  resetStoreVisitStoresSearch,
  searchStoreVisitStores,
  selectGetStoreVisitAvailableStore,
} from "../slices/get-store-visit-available-stores.slice";
import { useEffect, useState } from "react";
import { MaterialInput } from "features/shared/presentation/components";

interface StoreVisitStoreSearchProps {
  label: string;
}
export function StoreVisitStoreSearch(props: StoreVisitStoreSearchProps) {
  const dispatch = useAppDispatch();

  const getStoreVisitAvailableStoreState = useAppSelector(
    selectGetStoreVisitAvailableStore
  );

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(resetStoreVisitStoresSearch());
  }, [dispatch]);

  useEffect(() => {
    if (!search) {
      dispatch(resetStoreVisitStoresSearch());

      return;
    }

    if (getStoreVisitAvailableStoreState.data) {
      const regions = getStoreVisitAvailableStoreState.data;
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

      dispatch(searchStoreVisitStores({ stores: search_stores }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <MaterialInput
      colorTheme="white"
      value={search}
      name="search"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      fullWidth
      label={props.label}
    />
  );
}

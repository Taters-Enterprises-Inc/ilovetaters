import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { MaterialInput } from "features/shared/presentation/components";
import { useEffect, useState } from "react";
import {
  resetBranchesSearch,
  searchBranches,
  selectGetStoresAvailableBranches,
} from "../slices/get-stores-available-branches.slice";

interface BranchesSearchProps {
  label: string;
}
export function BranchesSearch(props: BranchesSearchProps) {
  const dispatch = useAppDispatch();

  const getStoresAvailableBranchesState = useAppSelector(
    selectGetStoresAvailableBranches
  );
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(resetBranchesSearch());
  }, []);

  useEffect(() => {
    if (!search) {
      dispatch(resetBranchesSearch());

      return;
    }

    if (getStoresAvailableBranchesState.data) {
      const regions = getStoresAvailableBranchesState.data;
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

      dispatch(searchBranches({ stores: search_stores }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <MaterialInput
      colorTheme="white"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      name="search"
      fullWidth
      label={props.label}
    />
  );
}

import { Autocomplete, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getStores, selectGetStores } from "../slices/get-stores.slice";
import { useEffect } from "react";
import { MdNavigateNext, MdOutlineNavigateNext } from "react-icons/md";

export function AuditFormContent() {
  const dispatch = useAppDispatch();
  const getStoreState = useAppSelector(selectGetStores);

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col space-y-10 lg:px-10">
        <div>
          <h1 className="flex justify-center text-4xl font-['Bebas_Neue'] text-center py-6">
            INTERNAL QUALITY AUDIT FORM
          </h1>
        </div>
        <div className="flex flex-col space-y-10 px-10">
          <div>
            <h1 id="section_1" className="font-semibold text-xl">
              Internal Audit Quality General Information
            </h1>
            <span className="text-md">
              Setup store and attention Information
            </span>
          </div>

          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-2">
              <span>Store Name: </span>
              <TextField id="Store" size="small" variant="outlined" />
            </div>
            <div className="flex flex-col space-y-2">
              <span>Attention: </span>
              <TextField id="Store" size="small" variant="outlined" />
            </div>
            <div className="flex flex-col space-y-2">
              <span>Store Type: </span>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={
                  getStoreState.data
                    ? getStoreState.data.map((row) => row.name)
                    : []
                }
                renderInput={(params) => (
                  <TextField {...params} label="Taters Store" />
                )}
              />
            </div>
            <Button
              variant="contained"
              startIcon={<MdNavigateNext className="text-white text-4xl" />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

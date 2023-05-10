import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { getStores, selectGetStores } from "../slices/get-stores.slice";
import { FormEvent, useEffect, useState } from "react";
import { MdNavigateNext, MdOutlineNavigateNext } from "react-icons/md";
import { GetAuditStoreModel } from "features/audit/core/domain/get-store-model.model";
import {
  getAuditEvaluationFormQuestion,
  selectGetAuditEvaluationFormQuestion,
} from "../slices/get-audit-evaluation-form_questions.slice";
import { createQueryParams } from "features/config/helpers";
import { AuditEvaluationAnswer } from "features/audit/core/domain/audit-evaluation-answer.model";

export function AuditFormContent() {
  const dispatch = useAppDispatch();
  const query = useQuery();

  const getStoreState = useAppSelector(selectGetStores);
  const getCriteria = useAppSelector(selectGetAuditEvaluationFormQuestion);

  const [formState, setFormState] = useState<AuditEvaluationAnswer>({});
  const [attention, setAttention] = useState("");

  const [selectedType, setselectedType] = useState<
    | {
        id: number;
        type_name: string;
      }
    | undefined
  >();
  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: number;
        name: string;
      }
    | undefined
  >();

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = createQueryParams({ type: selectedType?.type_name });

    dispatch(getAuditEvaluationFormQuestion(query));
  };

  return (
    <>
      <div className="flex flex-col space-y-10 lg:px-10">
        <div>
          <h1 className="flex justify-center text-4xl font-['Bebas_Neue'] text-center py-6">
            INTERNAL QUALITY AUDIT FORM
          </h1>
        </div>

        <form onSubmit={handleFormSubmit}>
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
                <span>Attention: </span>
                <TextField
                  required
                  id="Store"
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setAttention(event.target.value);
                  }}
                  value={attention}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <span>Store: </span>

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={
                    getStoreState.data
                      ? getStoreState.data.stores.map((row) => row.name)
                      : []
                  }
                  onChange={(event, value: any) => {
                    if (value && getStoreState.data) {
                      const selectedStoreObj = getStoreState.data.stores.find(
                        (store) => store.name === value
                      );
                      setSelectedStore(selectedStoreObj);
                    } else {
                      setSelectedStore(undefined);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      value={selectedStore ?? ""}
                      {...params}
                      label="Select store to evaluate"
                    />
                  )}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <span>Store Type: </span>

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={
                    getStoreState.data
                      ? getStoreState.data.store_type.map(
                          (row) => row.type_name
                        )
                      : []
                  }
                  onChange={(event, value: any) => {
                    if (value && getStoreState.data) {
                      const selectedStoreObj =
                        getStoreState.data.store_type.find(
                          (store) => store.type_name === value
                        );
                      setselectedType(selectedStoreObj);
                    } else {
                      setselectedType(undefined);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={selectedType ?? ""}
                      required
                      {...params}
                      label="Taters Store Type"
                    />
                  )}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                startIcon={<MdNavigateNext className="text-white text-4xl" />}
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

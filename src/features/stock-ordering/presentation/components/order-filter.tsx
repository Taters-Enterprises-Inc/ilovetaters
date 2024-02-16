import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";
import {
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppSelector } from "features/config/hooks";
import { theme } from "features/shared/constants";
import {
  MaterialDateInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { set } from "lodash";
import { useEffect, useState } from "react";

import { FaChevronDown } from "react-icons/fa";

function not(a: readonly StoreArray[], b: readonly StoreArray[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly StoreArray[], b: readonly StoreArray[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly StoreArray[], b: readonly StoreArray[]) {
  return [...a, ...not(b, a)];
}

interface filterData {
  store?: string | null;
  type?: string | null;
  start?: string | null;
  end?: string | null;
}

interface ListOfActiveStores {
  store_id: number;
  name: string;
  menu_name: string;
}

interface OrderFilterProps {
  anchor: HTMLButtonElement | null;
  onClose: () => void;
  filter: (data: filterData | string) => void;
}

interface StoreArray extends Array<ListOfActiveStores> {}

export function OrderFilter(props: OrderFilterProps) {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const [filter, setfilter] = useState<filterData | null>(null);
  const [checked, setChecked] = useState<readonly StoreArray[]>([]);
  const [storeList, setStoreList] = useState<readonly StoreArray[]>([]);

  const stores = getAdminSessionState.data?.admin.user_details.stores;

  const dateOption = [
    { id: 1, text: "Order placement date", name: "order_placement_date" },
    { id: 2, text: "Requested delivery date", name: "requested_delivery_date" },
    { id: 3, text: "Commited delivery date", name: "commited_delivery_date" },
    { id: 4, text: "Actual delivery date", name: "actual_delivery_date" },
  ];

  useEffect(() => {
    if (storeList.length === 0) {
      const storeListData: StoreArray[] =
        getAdminSessionState.data?.admin.user_details.stores.map((row) => [
          {
            store_id: row.store_id,
            name: row.name,
            menu_name: row.menu_name,
          },
        ]) ?? [];

      setStoreList(storeListData);
    }
  }, [props.anchor]);

  const handleFilter = () => {
    if (filter?.store !== null) {
      props.filter(filter ?? "");
    }

    if (
      filter?.type !== null &&
      filter?.start !== null &&
      filter?.end !== null
    ) {
      props.filter(filter ?? "");
    }

    props.onClose();
  };

  const handleResetFilter = () => {
    setfilter((previousValue) => ({
      ...previousValue,
      store: null,
      type: null,
      start: null,
      end: null,
    }));
    props.filter({ store: null, type: null, start: null, end: null });

    props.onClose();
  };

  const handleStoreSearch = (event: { target: { value: string } }) => {
    const storeListData: StoreArray[] =
      getAdminSessionState.data?.admin.user_details.stores.map((row) => [
        {
          store_id: row.store_id,
          name: row.name,
          menu_name: row.menu_name,
        },
      ]) ?? [];

    const searchTerm = event.target.value.toLowerCase();
    const filtered = storeList.map((store) =>
      store.filter((row) => row.name.toLowerCase().includes(searchTerm))
    );

    setStoreList(searchTerm ? filtered : storeListData);
  };

  const numberOfChecked = (items: readonly StoreArray[]) =>
    intersection(checked, items).length;

  const handleSelectAllStore = (items: readonly StoreArray[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleSelectStore = (value: StoreArray) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Popover
      anchorEl={props.anchor}
      open={Boolean(props.anchor)}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        elevation: 4,
        sx: {
          padding: 2,
          width: { sm: "100%", md: "50%", lg: "25%" },
          overflow: "auto",
        },
        style: { maxHeight: "50vh" },
      }}
    >
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Filter</span>
          <div className="flex space-x-3">
            <Button variant="text" size="small" onClick={handleResetFilter}>
              Reset filter
            </Button>
            <Button variant="text" size="small" onClick={handleFilter}>
              Save filter
            </Button>
          </div>
        </div>

        <div>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="store-panel-content"
              id="store-panel-header"
            >
              <Typography>Store</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Card elevation={0}>
                <CardHeader
                  avatar={
                    <Checkbox
                      onClick={handleSelectAllStore(
                        stores as unknown as readonly StoreArray[]
                      )}
                      checked={
                        numberOfChecked(
                          stores as unknown as readonly StoreArray[]
                        ) === stores?.length && stores?.length !== 0
                      }
                      indeterminate={
                        numberOfChecked(
                          stores as unknown as readonly StoreArray[]
                        ) !== stores?.length &&
                        numberOfChecked(
                          stores as unknown as readonly StoreArray[]
                        ) !== 0
                      } //if not equal to length and not equal to zer0
                      inputProps={{
                        "aria-label": "all items selected",
                      }}
                    />
                  }
                  title={"List of active stores"}
                  subheader={`${numberOfChecked(
                    stores as unknown as readonly StoreArray[]
                  )}/${stores?.length} selected`}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Search store"
                  size="small"
                  onChange={handleStoreSearch}
                  name={"searchStore"}
                />
                <List dense component="div" role="list">
                  {storeList.map((value: StoreArray, index) => {
                    const labelId = `store-list-item-${value}-label`;
                    return (
                      <>
                        <ListItemButton
                          key={index}
                          role="listitem"
                          onClick={handleSelectStore(value)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={value.map((row) => row.name)}
                          />
                        </ListItemButton>
                        <Divider variant="middle" />
                      </>
                    );
                  })}
                </List>
              </Card>

              {/* <MaterialInputAutoComplete
                placeholder="Filter by store"
                colorTheme={"black"}
                fullWidth
                size="small"
                options={
                  stores.stores ?? []
                }
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                onChange={(event, value) => {
                  if (value) {
                    setfilter({
                      ...filter,
                      store: value.name ?? null,
                    });
                  } else {
                    setfilter({
                      ...filter,
                      store: null,
                    });
                  }
                }}
              /> */}
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="Date-panel-content"
              id="Date-panel-header"
            >
              <Typography>Date range</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-1">
                <div>
                  <MaterialInputAutoComplete
                    placeholder="Date type"
                    colorTheme={"black"}
                    fullWidth
                    size="small"
                    options={dateOption ?? []}
                    getOptionLabel={(option) => option.text || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.text === value.text
                    }
                    onChange={(event, value) => {
                      if (value) {
                        setfilter({
                          ...filter,
                          type: value.name ?? null,
                        });
                      } else {
                        setfilter({
                          ...filter,
                          type: null,
                          start: null,
                          end: null,
                        });
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 space-y-1">
                    <span>Start Date</span>
                    <MaterialDateInput
                      value={filter?.start ?? null}
                      size="small"
                      colorTheme={"black"}
                      openTo="year"
                      views={["year", "month", "day"]}
                      disableFuture={false}
                      onChange={(value: any) => {
                        setfilter({
                          ...filter,
                          start: value ?? null,
                        });
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span>End Date</span>
                    <MaterialDateInput
                      value={filter?.end ?? null}
                      size="small"
                      colorTheme={"black"}
                      openTo="year"
                      views={["year", "month", "day"]}
                      onChange={(value: any) => {
                        setfilter({
                          ...filter,
                          end: value ?? null,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Popover>
  );
}

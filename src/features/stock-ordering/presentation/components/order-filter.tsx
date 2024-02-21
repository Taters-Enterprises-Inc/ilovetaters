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
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppSelector } from "features/config/hooks";
import {
  MaterialDateInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
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
  store?: readonly StoreArray[] | null;
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

  const [filter, setFilter] = useState<filterData | null>(null);
  const [checked, setChecked] = useState<readonly StoreArray[]>([]);
  const [storeList, setStoreList] = useState<readonly StoreArray[]>([]);
  const [filteredStoreDataList, setFilteredStoreDataList] = useState<
    readonly StoreArray[]
  >([]);

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

  useEffect(() => {
    setFilter((previousValue) => ({
      ...previousValue,
      store: checked ?? [],
    }));
  }, [checked]);

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
    setFilter((previousValue) => ({
      ...previousValue,
      store: null,
      type: null,
      start: null,
      end: null,
    }));
    setChecked([]);
    setFilteredStoreDataList([]);
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

    const newFilter = filtered.filter((values) => values.length !== 0);

    if (searchTerm) {
      setStoreList(filtered);
      setFilteredStoreDataList(newFilter);
    } else {
      setStoreList(storeListData);
      setFilteredStoreDataList([]);
    }
  };

  const numberOfChecked = (items: readonly StoreArray[]) =>
    intersection(checked, items).length;

  const handleSelectAllStore = (items: readonly StoreArray[]) => () => {
    const newItems =
      filteredStoreDataList.length !== 0 ? filteredStoreDataList : items;

    if (numberOfChecked(newItems) === newItems.length) {
      setChecked(not(checked, newItems));
    } else {
      setChecked(union(checked, newItems));
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

  const filterStoreList = (items: readonly StoreArray[]) => (
    <Card elevation={0}>
      <CardHeader
        avatar={
          <Checkbox
            onClick={handleSelectAllStore(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={"List of active stores"}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
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
        {items.map((value: StoreArray, index) => {
          const labelId = `store-list-item-${value}-label`;
          if (value.length !== 0) {
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
          }
        })}
      </List>
    </Card>
  );

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
          width: { sm: "100%", md: "50%", lg: "25%" },
          overflow: "auto",
        },
        style: { maxHeight: "50vh" },
      }}
    >
      <div className="px-5 space-y-3">
        <div className="sticky top-0 bg-white w-full py-3 z-10">
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
            <AccordionDetails>{filterStoreList(storeList)}</AccordionDetails>
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
                        setFilter({
                          ...filter,
                          type: value.name ?? null,
                        });
                      } else {
                        setFilter({
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
                        setFilter({
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
                        setFilter({
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

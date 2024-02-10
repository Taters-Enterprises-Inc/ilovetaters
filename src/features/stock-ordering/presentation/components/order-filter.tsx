import { Button, Divider, Popover, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppSelector } from "features/config/hooks";
import {
  MaterialDateInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import { useState } from "react";

interface filterData {
  store?: string | null;
  type?: string | null;
  start?: string | null;
  end?: string | null;
}

interface OrderFilterProps {
  anchor: HTMLButtonElement | null;
  onClose: () => void;
  //   filter.store: (data: string) => void;
  //   filter: (data: filterData) => void;
  filter: (data: filterData | string) => void;
}

export function OrderFilter(props: OrderFilterProps) {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const [filter, setfilter] = useState<filterData | null>(null);
  const dateOption = [
    { id: 1, text: "Order placement date" },
    { id: 2, text: "Requested delivery date" },
    { id: 3, text: "Commited delivery date" },
    { id: 3, text: "Actual delivery date" },
  ];

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
        style: {
          padding: 10,
          marginTop: 5,
          backgroundColor: "white",
          borderRadius: 5,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: "md",
        },
      }}
    >
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Filter</span>
          <Button variant="contained" size="small" onClick={handleFilter}>
            Save filter
          </Button>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex-1 space-y-1">
            <MaterialInputAutoComplete
              placeholder="Filter by store"
              colorTheme={"black"}
              fullWidth
              size="small"
              options={
                getAdminSessionState.data?.admin.user_details.stores ?? []
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
            />
          </div>
          <Divider />
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
                      type: value.text ?? null,
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
        </div>
      </div>
    </Popover>
  );
}

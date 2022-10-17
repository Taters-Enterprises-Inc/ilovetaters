import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
  ADMIN_POPCLUB_REDEEM_STATUS,
  ADMIN_SCPWD_VERIFICATION_STATUS,
} from "features/shared/constants";
import Moment from "react-moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEye } from "react-icons/fa";
import { AdminPopclubRedeemModal } from "../modals";
import { getAdminPopclubRedeem } from "../slices/get-admin-popclub-redeem.slice";
import {
  getAdminPopclubRedeems,
  resetGetAdminPopclubRedeemsStatus,
  selectGetAdminPopclubRedeems,
} from "../slices/get-admin-popclub-redeems.slice";
import { DataList } from "features/shared/presentation/components";
import moment from "moment";
import { createQueryParams } from "features/config/helpers";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "appDate", label: "Application Date" },
  { id: "name", label: "Profile Name" },
  { id: "fname", label: "First Name" },
  { id: "lname", label: "Last Name" },
  { id: "mname", label: "Middle Name" },
  { id: "birthday", label: "Birthday" },
  { id: "scpwdNumber", label: "SC/PWD Number" },
  { id: "action", label: "Action" },
];

export function AdminScPwdVerification() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const redeemCode = query.get("redeem_code");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openAdminPopclubRedeemModal, setOpenAdminPopclubRedeemModal] =
    useState(false);
  const getAdminPopclubRedeemsState = useAppSelector(
    selectGetAdminPopclubRedeems
  );

  useEffect(() => {
    if (redeemCode) {
      dispatch(getAdminPopclubRedeem(redeemCode)).then(() => {
        setOpenAdminPopclubRedeemModal(true);
      });
    }
  }, [dispatch, redeemCode]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminPopclubRedeems(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    openAdminPopclubRedeemModal,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          SC/PWD Verification
        </span>
        <div className="flex">
          <Select
            size="small"
            defaultValue={status ?? -1}
            onChange={(event) => {
              if (event.target.value !== status) {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: event.target.value === -1 ? null : event.target.value,
                  redeem_code: redeemCode,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminPopclubRedeemsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
          >
            <MenuItem value={-1}>All</MenuItem>
            {ADMIN_SCPWD_VERIFICATION_STATUS.map((value, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <MenuItem key={index} value={index}>
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>
    </>
  );
}

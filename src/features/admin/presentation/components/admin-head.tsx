import { MdOutlineNotificationsNone } from "react-icons/md";
import { AdminBreadCrumbs, AdminBreadCrumbsProps } from "./admin-breadcrumbs";
import Popper from "@mui/material/Popper";
import { useState, useEffect, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import Badge from "@mui/material/Badge";
import {
  getAdminNotifications,
  selectGetAdminNotifications,
} from "../slices/get-admin-notifications.slice";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import moment from "moment";
import {
  selectUpdateAdminNotificationDateSeen,
  updateAdminNotificationDateSeen,
} from "../slices/update-admin-notification-dateseen.slice";
interface AdminHeadProps {
  AdminBreadCrumbsProps: AdminBreadCrumbsProps;
}

export function AdminHead(props: AdminHeadProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const getAdminNotificationsState = useAppSelector(
    selectGetAdminNotifications
  );
  const updateAdminNotificationDateSeenState = useAppSelector(
    selectUpdateAdminNotificationDateSeen
  );

  useEffect(() => {
    dispatch(getAdminNotifications());
  }, [updateAdminNotificationDateSeenState]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div className="flex justify-between p-4">
      <AdminBreadCrumbs {...props.AdminBreadCrumbsProps} />
      <div className="relative flex items-center justify-end text-secondary ">
        <button aria-describedby={id} type="button" onClick={handleClick}>
          <Badge
            badgeContent={
              getAdminNotificationsState.data?.all.unseen_notifications_count
            }
            color="primary"
          >
            <MdOutlineNotificationsNone className="cursor-pointer " size={20} />
          </Badge>
        </button>

        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="z-40 mr-4 shadow-2xl lg:hidden bg-paper">
            <div className="bg-color-paper h-[600px] w-[300px]">
              <div className="bg-secondary font-bold text-white text-center text-xl w-100% p-2">
                Notifications
              </div>

              {getAdminNotificationsState.data?.all.notifications ? (
                <ul>
                  {getAdminNotificationsState.data.all.notifications.map(
                    (notification) => (
                      <li>
                        <Link
                          className={`flex py-2 items-center px-3 space-x-2 mb-1 ${
                            notification.dateseen === null ? " bg-gray-200" : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              updateAdminNotificationDateSeen(notification.id)
                            );
                          }}
                          to={`/admin/order?tracking_no=${notification.tracking_no}`}
                        >
                          <FaExclamationCircle className="text-4xl text-green-700" />
                          <div className="flex flex-col justify-start">
                            <span className="text-sm font-semibold">
                              {notification.text}
                            </span>
                            <span className="text-xs">
                              {moment(notification.dateadded)
                                .startOf("hour")
                                .fromNow()}
                            </span>
                          </div>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="z-40 hidden mr-6 shadow-2xl lg:block bg-paper">
            <div className="bg-color-paper h-[400px] max-w-[400px] min-w-[300px] overflow-y-auto">
              <div className="bg-secondary font-bold text-white text-center text-xl w-100% p-2">
                Notifications
              </div>
              {getAdminNotificationsState.data?.all.notifications ? (
                <ul>
                  {getAdminNotificationsState.data.all.notifications.map(
                    (notification) => (
                      <li>
                        <Link
                          className={`flex py-2 items-center px-3 space-x-2 mb-1 ${
                            notification.dateseen === null ? " bg-gray-200" : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              updateAdminNotificationDateSeen(notification.id)
                            );
                          }}
                          to={`/admin/order?tracking_no=${notification.tracking_no}`}
                        >
                          <FaExclamationCircle className="text-4xl text-green-700" />
                          <div className="flex flex-col justify-start">
                            <span className="text-sm font-semibold">
                              {notification.text}
                            </span>
                            <span className="text-xs">
                              {moment(notification.dateadded)
                                .startOf("hour")
                                .fromNow()}
                            </span>
                          </div>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        </Popper>
      </div>
    </div>
  );
}

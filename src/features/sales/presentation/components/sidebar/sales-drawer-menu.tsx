import { useEffect } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { SiPlatformdotsh } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getAdminSession,
  selectGetAdminSession,
} from "features/admin/presentation/slices/get-admin-session.slice";
import {
  LogoutAdminState,
  logoutAdmin,
  resetLogoutAdmin,
  selectLogoutAdmin,
} from "features/admin/presentation/slices/logout-admin.slice";
import { BsFillPersonFill, BsListTask } from "react-icons/bs";
import { selectSalesSideBar } from "../../slices/sales-sidebar.slice";
import { FaHistory } from "react-icons/fa";

export function SalesDrawerMenu() {
  const salesSidebar = useAppSelector(selectSalesSideBar);
  const getLogoutAdminState = useAppSelector(selectLogoutAdmin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const cashier =
    getAdminSessionState.data?.admin.user_details.sales_groups.some(
      (group) => group.id === 1
    );
  const tc = getAdminSessionState.data?.admin.user_details.sales_groups.some(
    (group) => group.id === 2
  );
  const manager =
    getAdminSessionState.data?.admin.user_details.sales_groups.some(
      (group) => group.id === 3
    );

  const menuitems = [
    {
      text: "Dashboard",
      path: "dashboard",
      icon: <MdDashboardCustomize size={20} />,
      enable: true,
    },
    {
      text: "Form",
      path: "form-list",
      icon: <SiPlatformdotsh size={20} />,
      enable: cashier,
    },
    {
      text: "Task",
      path: "task",
      icon: <BsListTask size={20} />,
      enable: tc || manager,
    },
    {
      text: "History",
      path: "history",
      icon: <FaHistory size={20} />,
      enable: false,
    },
  ];

  useEffect(() => {
    if (getLogoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
      navigate("/admin");
    }
  }, [getLogoutAdminState, dispatch, navigate]);

  return (
    <div className="relative flex flex-col pb-4 m-0 mt-10 text-sm text-white">
      <nav>
        <ul>
          <li className="flex flex-col">
            {menuitems.map((item, index) => {
              const { text, path, icon, enable } = item;
              const key = index;
              return (
                <>
                  {enable ? (
                    <NavLink
                      key={key}
                      to={path}
                      className={(navData) =>
                        navData.isActive
                          ? "flex bg-white text-secondary"
                          : "flex text-white"
                      }
                    >
                      <span className="flex items-center px-4 ">
                        <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                          {icon}
                          <span
                            className={`whitespace-pre duration-300 ${
                              !salesSidebar.status &&
                              "opacity-0 overflow-hidden"
                            }`}
                          >
                            {text}
                          </span>
                        </span>
                      </span>
                    </NavLink>
                  ) : null}
                </>
              );
            })}
          </li>

          <li>
            <button
              onClick={() => {
                dispatch(logoutAdmin());
              }}
              className="flex w-full"
            >
              <span className="flex items-center px-4 ">
                <span className="flex px-[0.5rem] py-[0.85rem] space-x-4 items-center">
                  <TbLogout size={20} />

                  <span
                    className={`whitespace-pre duration-300 ${
                      !salesSidebar.status && "opacity-0 overflow-hidden"
                    }`}
                  >
                    Logout
                  </span>
                </span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

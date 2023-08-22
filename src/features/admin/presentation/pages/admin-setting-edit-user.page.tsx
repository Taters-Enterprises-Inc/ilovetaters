import { AdminHead } from "../components";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAdminUser,
  GetAdminUserState,
  resetAdminUser,
  selectGetAdminUser,
} from "../slices/get-admin-user.slice";
import {
  getAdminGroups,
  selectGetAdminGroups,
} from "../slices/get-admin-groups.slice";
import Checkbox from "@mui/material/Checkbox";
import {
  editAdminUser,
  EditAdminUserState,
  resetEditAdminUser,
  selectEditAdminUser,
} from "../slices/edit-admin-user.slice";
import {
  MaterialInput,
  MaterialInputPassword,
  MaterialPhoneInput,
} from "features/shared/presentation/components";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { RiSurroundSoundLine } from "react-icons/ri";

export function AdminSettingEditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [stockOrderingEnabled, setStockOrderingEnabled] = useState(false);

  const getAdminUserState = useAppSelector(selectGetAdminUser);
  const getAdminGroupsState = useAppSelector(selectGetAdminGroups);
  const editAdminUserState = useAppSelector(selectEditAdminUser);

  const [formState, setFormState] = useState<{
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    groups: Array<number> | null;
    stock_order_group: Array<number> | null;
  }>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    groups: null,
    stock_order_group: null,
  });

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    if (editAdminUserState.status === EditAdminUserState.success) {
      dispatch(resetEditAdminUser());
      navigate("/admin/setting/user");
    }
  }, [editAdminUserState, navigate, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(resetAdminUser());
      dispatch(getAdminUser(id));
      dispatch(getAdminGroups());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getAdminUserState.status === GetAdminUserState.success &&
      getAdminUserState.data
    ) {
      let groups = null;

      if (getAdminUserState.data.groups) {
        const currentGroups = getAdminUserState.data.groups;

        for (let i = 0; i < currentGroups.length; i++) {
          if (groups === null) {
            groups = [currentGroups[i].id];
          } else {
            groups.push(currentGroups[i].id);
          }
        }
      }

      let stock_order_groups = null;

      if (getAdminUserState.data.stockOrderGroup) {
        const currentStockOrderGroups = getAdminUserState.data.stockOrderGroup;

        for (let i = 0; i < currentStockOrderGroups.length; i++) {
          if (stock_order_groups === null) {
            stock_order_groups = [currentStockOrderGroups[i].id];
          } else {
            stock_order_groups.push(currentStockOrderGroups[i].id);
          }
        }
      }

      setFormState({
        firstName: getAdminUserState.data.first_name,
        lastName: getAdminUserState.data.last_name,
        company: getAdminUserState.data.company,
        email: getAdminUserState.data.email,
        phoneNumber: getAdminUserState.data.phone,
        password: "",
        confirmPassword: "",
        groups: groups,
        stock_order_group: stockOrderingEnabled ? stock_order_groups : null,
      });
    }
  }, [getAdminUserState, stockOrderingEnabled]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (id) {
      dispatch(
        editAdminUser({
          userId: id,
          body: formState,
        })
      );
    }
    e.preventDefault();
  };

  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "User", url: "/admin/setting/user" },
            { name: "Edit User", url: location.pathname },
          ],
        }}
      />

      <div className="px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit User
        </span>

        <div className="pb-10 space-y-6">
          <span>Please enter the user's information below.</span>

          {getAdminUserState.data && getAdminGroupsState.data ? (
            <form onSubmit={onSubmit} className="flex flex-col space-y-4">
              <MaterialInput
                colorTheme="black"
                required
                label="First Name"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
              />
              <MaterialInput
                colorTheme="black"
                required
                label="Last Name"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
              />
              <MaterialInput
                colorTheme="black"
                required
                label="Company Name"
                name="company"
                value={formState.company}
                onChange={handleInputChange}
              />
              <MaterialPhoneInput
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.phoneNumber}
                name="phoneNumber"
              />

              <MaterialInputPassword
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.password}
                name="password"
                label="Password"
              />
              <MaterialInputPassword
                colorTheme="black"
                onChange={handleInputChange}
                value={formState.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
              />

              <div className="flex flex-wrap">
                {getAdminGroupsState.data?.shop.map((group, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base"
                  >
                    <Checkbox
                      color="primary"
                      value={group.id}
                      defaultChecked={getAdminUserState.data?.groups.some(
                        (element) => {
                          if (element.id === group.id) {
                            return true;
                          }

                          return false;
                        }
                      )}
                      onChange={(event) => {
                        let groups = formState.groups;

                        if (groups === null) {
                          groups = [group.id];
                        } else if (groups.some((e) => e === group.id)) {
                          groups = groups.filter((e) => e !== group.id);
                        } else {
                          groups.push(group.id);
                        }

                        setFormState({
                          ...formState,
                          groups: groups,
                        });
                      }}
                    />
                    <span>{group.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={stockOrderingEnabled}
                        onChange={(event) =>
                          setStockOrderingEnabled(event.target.checked)
                        }
                      />
                    }
                    label="Enable Stock Ordering"
                  />

                  {stockOrderingEnabled === true ? (
                    <div className="flex flex-wrap">
                      {getAdminGroupsState.data?.stock_order.map(
                        (stock_order_gr, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base"
                          >
                            <Checkbox
                              color="primary"
                              value={stock_order_gr.id}
                              defaultChecked={
                                getAdminUserState.data?.stockOrderGroup
                                  ?.length === 0
                                  ? false
                                  : getAdminUserState.data?.stockOrderGroup?.some(
                                      (element) => {
                                        if (element.id === stock_order_gr.id) {
                                          return true;
                                        }
                                        return false;
                                      }
                                    )
                              }
                              onChange={(event) => {
                                let groups = formState.stock_order_group;

                                if (groups === null) {
                                  groups = [stock_order_gr.id];
                                } else if (
                                  groups.some((e) => e === stock_order_gr.id)
                                ) {
                                  groups = groups.filter(
                                    (e) => e !== stock_order_gr.id
                                  );
                                } else {
                                  groups.push(stock_order_gr.id);
                                }

                                setFormState({
                                  ...formState,
                                  stock_order_group: groups,
                                });
                              }}
                            />
                            <span>{stock_order_gr.name}</span>
                          </div>
                        )
                      )}
                    </div>
                  ) : null}
                </FormGroup>
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-white rounded-lg bg-button w-fit"
              >
                Edit User
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
}

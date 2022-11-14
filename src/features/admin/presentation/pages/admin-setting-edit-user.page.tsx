import { AdminHead } from "../components";
import { FormEvent, useEffect, useState } from "react";
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

export function AdminSettingEditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

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
  }>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    groups: null,
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
      console.log(groups);

      setFormState({
        firstName: getAdminUserState.data.first_name,
        lastName: getAdminUserState.data.last_name,
        company: getAdminUserState.data.company,
        email: getAdminUserState.data.email,
        phoneNumber: getAdminUserState.data.phone,
        password: "",
        confirmPassword: "",
        groups: groups,
      });
    }
  }, [getAdminUserState]);

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
                {getAdminGroupsState.data?.map((group) => (
                  <div className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base">
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

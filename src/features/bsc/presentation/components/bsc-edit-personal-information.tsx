import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialInput,
  MaterialInputPassword,
  MaterialPhoneInput,
} from "features/shared/presentation/components";
import {
  getAllCompanies,
  selectGetAllCompanies,
} from "features/shared/presentation/slices/get-all-companies.slice";
import {
  getAllStores,
  selectGetAllStores,
} from "features/shared/presentation/slices/get-all-stores.slice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateBscUser } from "../slices/bsc-update-user.slice";
import {
  getBscGroups,
  selectGetBscGroups,
} from "../slices/get-bsc-groups.slice";
import {
  getBscUser,
  GetBscUserState,
  resetBscUser,
  selectGetBscUser,
} from "../slices/get-bsc-user.slice";

export function BscEditPersonalInformation() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [formState, setFormState] = useState<{
    firstName: string;
    lastName: string;
    designation: string;
    company: string;
    store: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    groups: Array<number> | null;
  }>({
    firstName: "",
    lastName: "",
    designation: "",
    company: "",
    store: "none",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    groups: null,
  });

  const getBscGroupsState = useAppSelector(selectGetBscGroups);
  const getBscUserState = useAppSelector(selectGetBscUser);
  const getAllStoresState = useAppSelector(selectGetAllStores);
  const getAllCompaniesState = useAppSelector(selectGetAllCompanies);

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllCompanies());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(resetBscUser());
      dispatch(getBscUser(id));
      dispatch(getBscGroups());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getBscUserState.status === GetBscUserState.success &&
      getBscUserState.data
    ) {
      setFormState({
        firstName: getBscUserState.data.first_name,
        lastName: getBscUserState.data.last_name,
        designation: getBscUserState.data.designation,
        company: getBscUserState.data.companies[0].id.toString(),
        store: getBscUserState.data.stores[0].store_id.toString(),
        email: getBscUserState.data.email,
        phoneNumber: getBscUserState.data.phone_number,
        password: "",
        confirmPassword: "",
        groups: null,
      });
    }
  }, [getBscUserState]);

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (id) {
      console.log(formState);
      dispatch(
        updateBscUser({
          userId: id,
          ...formState,
        })
      );
    }
    e.preventDefault();
  };

  return (
    <>
      {getBscUserState.data && getBscUserState.data ? (
        <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
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
            name="designation"
            label="Designation"
            value={formState.designation}
            onChange={handleInputChange}
            fullWidth
          />
          <MaterialInput
            colorTheme="black"
            fullWidth
            select
            required
            onChange={handleInputChange}
            value={formState.company}
            name="company"
            label="Company"
          >
            {getAllCompaniesState.data?.map((company) => (
              <MenuItem value={company.id}>{company.name}</MenuItem>
            ))}
          </MaterialInput>
          <MaterialInput
            colorTheme="black"
            fullWidth
            required
            select
            onChange={handleInputChange}
            value={formState.store}
            name="store"
            label="Store"
          >
            <MenuItem value="none">None</MenuItem>
            {getAllStoresState.data?.map((store) => (
              <MenuItem value={store.store_id}>{store.name}</MenuItem>
            ))}
          </MaterialInput>
          <MaterialInput
            colorTheme="black"
            required
            label="E-mail"
            name="email"
            value={formState.email}
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
            {getBscGroupsState.data?.map((group) => (
              <div className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base">
                <Checkbox
                  color="primary"
                  value={group.id}
                  defaultChecked={getBscUserState.data?.groups.some(
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

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-button w-fit"
            >
              Save Account Information
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
}

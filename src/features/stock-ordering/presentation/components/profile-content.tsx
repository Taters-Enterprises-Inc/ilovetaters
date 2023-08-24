import { Divider } from "@mui/material";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { useAppSelector } from "features/config/hooks";
import { ChangePassword } from "./change-password";

export function ProfileContent() {
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const userDatails = getAdminSessionState.data?.admin.user_details;

  const { first_name, last_name, phone, company, sos_groups, stores } =
    userDatails ?? {};
  const email = getAdminSessionState.data?.admin.email;

  return (
    <>
      {getAdminSessionState.data?.admin ? (
        <div className="flex flex-col space-y-5">
          <div>
            <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
              Profile
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-5 w-full md:w-1/3">
              <span className="text-secondary text-2xl font-['Bebas_Neue'] flex">
                General Information
              </span>

              <div className="flex flex-col space-y-5">
                <div className="flex space-x-3 text-base">
                  <span className="basis-32 font-bold ">Name: </span>
                  <span>{first_name + " " + last_name}</span>
                </div>

                <Divider />

                <div className="flex space-x-3 text-base">
                  <span className="basis-32 font-bold">Email: </span>
                  <span>{email}</span>
                </div>

                <Divider />

                <div className="flex space-x-3 text-base">
                  <span className="basis-32 font-bold">Company: </span>
                  <span>{company}</span>
                </div>

                <Divider />

                <div className="flex space-x-3 text-base">
                  <span className="basis-32 font-bold">Phone Number: </span>
                  <span>{phone}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white space-y-5 w-full max-h-80 md:w-1/5  overflow-y-auto">
              <div className="sticky top-0 bg-white py-3 border-b-2">
                <span className=" text-secondary px-5 text-2xl font-['Bebas_Neue']">
                  Tasked with
                </span>
              </div>
              {sos_groups?.map((group) => (
                <div key={group.id} className="flex flex-col px-5 space-y-5">
                  <span>{group.short_name}</span>
                  <Divider />
                </div>
              ))}
            </div>

            <div className="flex-auto flex-col border border-gray-200 rounded-md shadow-sm bg-white space-y-5 w-full max-h-80 md:w-1/3 overflow-y-auto">
              <div className="sticky top-0 bg-white py-3 border-b-2">
                <span className=" text-secondary px-5 text-2xl font-['Bebas_Neue']">
                  Managed Store
                </span>
              </div>
              {stores?.map((store) => (
                <div
                  key={store.store_id}
                  className="flex flex-col px-5 space-y-5"
                >
                  <span>{store.name}</span>
                  <Divider />
                </div>
              ))}
            </div>

            <div className="flex-auto flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-5 w-full md:w-1/3">
              <span className="text-secondary text-2xl font-['Bebas_Neue']">
                Change Password
              </span>
              <ChangePassword />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

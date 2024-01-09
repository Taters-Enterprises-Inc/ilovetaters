import { useAppDispatch } from "features/config/hooks";
import { FormEvent } from "react";
import { Helmet } from "react-helmet";
import { hrImportUsers } from "../slices/hr-import-users.slice";

export function HrImportUsers() {
  const dispatch = useAppDispatch();

  const handleOnSubmitPayment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    dispatch(hrImportUsers(formData));
  };

  return (
    <>
      <Helmet>
        <title>Taters | Hr Import Users</title>
      </Helmet>
      <main className="min-h-screen text-[#242424] flex flex-col border-b-[#F2F2F2] p-8">
        <form
          onSubmit={handleOnSubmitPayment}
          className="flex flex-col items-center justify-center space-x-2 space-y-2 lg:justify-start lg:space-y-0 lg:flex-row"
        >
          <strong>Upload Users:</strong>{" "}
          <input type="file" name="users_file" id="users_file" />
          <button
            type="submit"
            className="px-3 py-1 mb-2 text-base text-white bg-green-700 rounded-md shadow-md lg:mb-0"
          >
            Upload
          </button>
          <span>(You can only upload excel or csv files)</span>
        </form>
      </main>
    </>
  );
}

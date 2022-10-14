import { FormEvent, useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ProfileContainer } from "../components/profile-container";

export function ProfileCsPwd() {
  const [birthDate, setBirthDate] = useState(moment(Date.now()));
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cs_pwd_id, set_cs_pwd_id] = useState("");
  const [images, setImages] = useState<Array<any>>([]);
  const [uploadedFile, setUploadedFile] = useState<Array<any>>([]);
  const [errorUploadFile, setErrorUploadFile] = useState("");

  const onDrop = useCallback((acceptedFiles: any) => {
    setUploadedFile(acceptedFiles);
    const selectedFiles: Array<any> = [];
    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        selectedFiles.push({ id: index, src: e.target.result });
        setImages(selectedFiles);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      multiple: true,
      maxFiles: 2,
    });

  useEffect(() => {
    console.log(fileRejections);
    if (fileRejections.length === 0) {
      return setErrorUploadFile("");
    }

    fileRejections.map(({ file, errors }: any) =>
      errors.map((e: any) => {
        setErrorUploadFile("maximum of two files");
      })
    );
  }, [fileRejections]);

  const handleSubmitApplication = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      middleName,
      birthDate,
      cs_pwd_id,
    });
    console.log(uploadedFile);
  };

  return (
    <form onSubmit={handleSubmitApplication}>
      <ProfileContainer title="My Profile" activeTab="sc-pwd">
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
          CS/PWD Application Form
        </h1>

        <div className="flex   sm:space-y-0 sm:space-x-4 sm:flex-row flex-col space-y-4 ">
          {"logic" ? (
            <TextField
              required
              label="First Name"
              defaultValue={"default value"}
              className="flex-1"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e: any) => {
                setFirstName(e.target.value);
              }}
            />
          ) : null}
          <TextField
            required={false}
            label="First Name"
            variant="outlined"
            className={`flex-1 ${"logic" ? "!hidden" : ""}`}
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
          />

          {"logic" ? (
            <TextField
              required
              label="Middle  Name"
              defaultValue={"default value"}
              className="flex-1"
              name="lastName"
              value={middleName}
              onChange={(e: any) => {
                setMiddleName(e.target.value);
              }}
            />
          ) : null}
          <TextField
            required={false}
            label="Middle Name"
            variant="outlined"
            className={`flex-1 ${"logic" ? "!hidden" : ""}`}
            name="middlename"
            type="text"
            value={middleName}
            onChange={(e: any) => {
              setMiddleName(e.target.value);
            }}
          />

          {"logic" ? (
            <TextField
              required
              label="Last Name"
              defaultValue={"default value"}
              className="flex-1"
              name="lastName"
              value={lastName}
              onChange={(e: any) => {
                setLastName(e.target.value);
              }}
            />
          ) : null}
          <TextField
            type="text"
            required={false}
            label="Last Name"
            variant="outlined"
            className={`flex-1 ${"logic" ? "!hidden" : ""}`}
            name="lastName"
            value={lastName}
            onChange={(e: any) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <div className="flex sm:space-y-0 sm:space-x-4 sm:flex-row flex-col space-y-4 ">
          {"logic" ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className={`flex sm:w-[calc(50%-10px)] w-full `}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    maxDate={new Date()}
                    label="Birth Date"
                    value={birthDate}
                    onChange={(newValue: any) => {
                      setBirthDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </LocalizationProvider>
          ) : null}
          <div
            className={`flex sm:w-[calc(50%-10px)] w-full ${
              "logic" ? "!hidden" : ""
            }`}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                value={birthDate}
                onChange={(newValue: any) => {
                  setBirthDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth {...params} />
                )}
              />
            </LocalizationProvider>
          </div>
          {"logic" ? (
            <TextField
              required
              label="SC/PWD Number"
              defaultValue={"default value"}
              className="w-full flex-1"
              name="sc-pwd-number"
              type="text"
              value={cs_pwd_id}
              onChange={(e: any) => {
                set_cs_pwd_id(e.target.value);
              }}
            />
          ) : null}

          <TextField
            required={false}
            label="SC/PWD Number"
            variant="outlined"
            className={`w-full ${"logic" ? "!hidden" : ""}`}
            name="sc-pwd-number"
            type="text"
            value={cs_pwd_id}
            onChange={(e: any) => {
              set_cs_pwd_id(e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="font-['Bebas_Neue'] text-xl text-secondary tracking-[3px] text-center">
            Upload - SC/PWD ID FRONT AND SC/PWD ID BACK
          </h2>

          {errorUploadFile && (
            <div
              className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Upload file error! </strong>
              <span className="block sm:inline">{errorUploadFile}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => {
                  setErrorUploadFile("");
                }}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          <div>
            <input
              type="text"
              className="hidden"
              name="tracking_no"
              value={"getOrdersState.data?.order.clients_info.tracking_no"}
              readOnly
            />
            <input
              type="text"
              className="hidden"
              name="trans_id"
              value={"getOrdersState.data?.order.clients_info.id"}
              readOnly
            />

            <div>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-secondary h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2"
              >
                <input
                  type="file"
                  name="uploaded_file"
                  {...getInputProps()}
                  multiple
                />

                {isDragActive ? (
                  <span className="text-lg text-secondary">
                    Drop the files here ...
                  </span>
                ) : (
                  <>
                    {images.length !== 0 ? (
                      <div className="sm:justify-center sm:gap-x-2  sm:p-0 p-2 sm:flex items-center gap- relative sm:overflow-none overflow-y-scroll  w-full h-full">
                        {images.map((data: any, idx: number) => {
                          return (
                            <img
                              key={idx}
                              src={data.src}
                              className=" sm:h-[150px] h-full w-[150px] object-cover sm:mb-0 mb-2  border sm:mx-0 mx-auto"
                              alt="upload file"
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        <AiOutlineCloudUpload className="text-5xl text-secondary" />
                        <span className="text-lg text-white">
                          Drag and drop here to upload
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 text-lg text-white rounded-lg bg-secondary"
                        >
                          Or select file
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              <h4 className="mt-1 text-sm leading-5 text-secondary">
                <strong>Note:</strong> Supported file types: JPG, JPEG, PNG and
                GIF. Maximum file size is 2MB.
              </h4>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-button border-2 border-secondary w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-lg mt-[-10px]"
          >
            Submit Application
          </button>
        </div>
      </ProfileContainer>
    </form>
  );
}


import React from "react";
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
  const [imagesFront, setImagesFront] = useState<any>(undefined);
  const [imagesBack, setImagesBack] = useState<any>(undefined);
  const [uploadedFileFront, setUploadedFileFront] = useState<any>(undefined);
  const [uploadedFileBack, setUploadedFileBack] = useState<any>(undefined);


  const onDropFrontImage = useCallback((acceptedFiles: any) => {
    setUploadedFileFront(acceptedFiles);
    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImagesFront({ id: index, src: e.target.result });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onDropBackImage = useCallback((acceptedFiles: any) => {
    setUploadedFileBack(acceptedFiles);
    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImagesBack({ id: index, src: e.target.result });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

 

  const {
    getRootProps: getRootPropsFrontImage,
    getInputProps: getInputPropsFrontImage,
    isDragActive: isDragActiveFrontImage,
  } = useDropzone({
    onDrop: onDropFrontImage,
    multiple: false,
  });

  const {
    getRootProps: getRootPropsBackImage,
    getInputProps: getInputPropsBackImage,
    isDragActive: isDragActiveBackImage,
  } = useDropzone({
    onDrop: onDropBackImage,
    multiple: false,
  });

  const handleSubmitApplication = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      firstName,
      lastName,
      middleName,
      birthDate,
      cs_pwd_id,
    });
    console.log(uploadedFileFront);
    console.log(uploadedFileBack);

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
            Upload - SC/PWD ID FRONT 
          </h2>

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
                {...getRootPropsFrontImage()}
                className="border-dashed border-2 border-secondary h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2"
              >
                <input
                  type="file"
                  name="uploaded_file"
                  {...getInputPropsFrontImage()}
                  multiple
                />

                {isDragActiveFrontImage ? (
                  <span className="text-lg text-secondary">
                    Drop the files here ...
                  </span>
                ) : (
                  <>
                    {imagesFront !== undefined ? (
                      <img
                        src={imagesFront.src}
                        className=" sm:h-[150px] h-full w-[150px] object-cover sm:mb-0 mb-2  border sm:mx-0 mx-auto"
                        alt="upload file"
                      />
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
          <h2 className="font-['Bebas_Neue'] text-xl text-secondary tracking-[3px] text-center">
            Upload - SC/PWD ID BACK
          </h2>

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
                {...getRootPropsBackImage()}
                className="border-dashed border-2 border-secondary h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2"
              >
                <input
                  type="file"
                  name="uploaded_file"
                  {...getInputPropsBackImage()}
                  multiple
                />

                {isDragActiveBackImage ? (
                  <span className="text-lg text-secondary">
                    Drop the files here ...
                  </span>
                ) : (
                  <>
                    {imagesBack !== undefined ? (
                      <img
                        src={imagesBack.src}
                        className=" sm:h-[150px] h-full w-[150px] object-cover sm:mb-0 mb-2  border sm:mx-0 mx-auto"
                        alt="upload file"
                      />
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

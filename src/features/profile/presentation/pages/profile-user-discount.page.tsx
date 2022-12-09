import { useEffect } from "react";
import { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ProfileContainer } from "../components/profile-container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  applyUserDiscount,
  selectApplyUserDiscount,
} from "../slices/apply-user-discount.slice";
import {
  getUserDiscount,
  GetUserDiscountState,
  selectGetUserDiscount,
} from "../slices/get-user-discount.slice";
import {
  ADMIN_USER_DISCOUNT_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import { updateUserDiscount } from "../slices/update-user-discount.slice";
import {
  MaterialDateInput,
  MaterialInput,
} from "features/shared/presentation/components";

export function ProfileUserDiscount() {
  const dispatch = useAppDispatch();
  const getUserDiscountState = useAppSelector(selectGetUserDiscount);
  const applyUserDiscountState = useAppSelector(selectApplyUserDiscount);
  const [imagesFront, setImagesFront] = useState<any>(undefined);
  const [imagesBack, setImagesBack] = useState<any>(undefined);

  const [formState, setFormState] = useState<{
    firstName: string;
    middleName: string;
    lastName: string;
    birthday: string;
    idNumber: string;
    idFront: string;
    idBack: string;
    discountTypeId: number | null;
  }>({
    firstName: "",
    middleName: "",
    lastName: "",
    birthday: "",
    idNumber: "",
    idFront: "",
    idBack: "",
    discountTypeId: null,
  });

  useEffect(() => {
    dispatch(getUserDiscount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyUserDiscountState]);

  useEffect(() => {
    if (
      getUserDiscountState.status === GetUserDiscountState.success &&
      getUserDiscountState.data
    ) {
      setFormState({
        firstName: getUserDiscountState.data.first_name,
        middleName: getUserDiscountState.data.middle_name,
        lastName: getUserDiscountState.data.last_name,
        birthday: getUserDiscountState.data.birthday,
        idNumber: getUserDiscountState.data.id_number,
        idFront: getUserDiscountState.data.id_front,
        idBack: getUserDiscountState.data.id_back,
        discountTypeId: getUserDiscountState.data.discount_type_id,
      });
      setImagesFront({
        src: `${REACT_APP_DOMAIN_URL}api/load-image-user-discount/${getUserDiscountState.data.id_front}`,
      });
      setImagesBack({
        src: `${REACT_APP_DOMAIN_URL}api/load-image-user-discount/${getUserDiscountState.data.id_back}`,
      });
    }
  }, [getUserDiscountState]);

  function handleInputChange(evt: any) {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  }
  const onDropFrontImage = useCallback(
    (acceptedFiles: any) => {
      setFormState({
        ...formState,
        idFront: acceptedFiles[0],
      });
      acceptedFiles.map((file: any, index: any) => {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          setImagesFront({ id: index, src: e.target.result });
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    [formState]
  );

  const onDropBackImage = useCallback(
    (acceptedFiles: any) => {
      setFormState({
        ...formState,
        idBack: acceptedFiles[0],
      });
      acceptedFiles.map((file: any, index: any) => {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          setImagesBack({ id: index, src: e.target.result });
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    [formState]
  );

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
    console.log(formState);
    if (
      formState &&
      formState.firstName &&
      formState.middleName &&
      formState.lastName &&
      formState.idNumber &&
      formState.idFront &&
      formState.idBack &&
      formState.birthday &&
      formState.discountTypeId
    ) {
      if (
        getUserDiscountState.data &&
        getUserDiscountState.status === GetUserDiscountState.success
      ) {
        dispatch(
          updateUserDiscount({
            id: getUserDiscountState.data.id,
            firstName: formState.firstName,
            middleName: formState.middleName,
            lastName: formState.lastName,
            idNumber: formState.idNumber,
            idFront: formState.idFront,
            idBack: formState.idBack,
            birthday: formState.birthday,
            discountTypeId: formState.discountTypeId,
          })
        );
      } else {
        dispatch(
          applyUserDiscount({
            firstName: formState.firstName,
            middleName: formState.middleName,
            lastName: formState.lastName,
            idNumber: formState.idNumber,
            idFront: formState.idFront,
            idBack: formState.idBack,
            birthday: formState.birthday,
            discountTypeId: formState.discountTypeId,
          })
        );
      }
    }
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmitApplication}>
      <ProfileContainer title="User Discount" activeTab="user-discount">
        <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl ">
            User Discount Form
          </h1>

          {getUserDiscountState.data?.status ? (
            <span
              className="px-4 py-1 text-base rounded-lg"
              style={{
                color: "white",
                backgroundColor:
                  ADMIN_USER_DISCOUNT_STATUS[getUserDiscountState.data.status]
                    .color,
              }}
            >
              {
                ADMIN_USER_DISCOUNT_STATUS[getUserDiscountState.data.status]
                  .name
              }
            </span>
          ) : (
            <span
              className="px-4 py-1 text-base rounded-lg"
              style={{
                color: "white",
                backgroundColor: "#a21013",
              }}
            >
              No Application
            </span>
          )}
        </div>

        <FormControl>
          <label id="discount-type-id" className="text-lg font-bold">
            Discount Type
          </label>
          <RadioGroup
            row
            aria-labelledby="discount-type-id"
            onChange={(e) => {
              setFormState({
                ...formState,
                discountTypeId: parseInt(e.target.value),
              });
            }}
            name="discountTypeId"
            value={formState.discountTypeId}
          >
            <FormControlLabel
              value={1}
              control={<Radio required />}
              label="Senior Citizen Discount"
            />
            <FormControlLabel
              value={2}
              control={<Radio required />}
              label="Person With Disability Discount"
            />
            <FormControlLabel
              value={3}
              control={<Radio required />}
              label="Employee Discount"
            />
          </RadioGroup>
        </FormControl>

        <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row ">
          <MaterialInput
            colorTheme="black"
            required
            label="First Name"
            value={formState.firstName}
            onChange={handleInputChange}
            name="firstName"
            className="flex-1"
            type="text"
          />

          <MaterialInput
            colorTheme="black"
            required
            label="Middle Name"
            className="flex-1"
            value={formState.middleName}
            onChange={handleInputChange}
            name="middleName"
          />

          <MaterialInput
            colorTheme="black"
            required
            label="Last Name"
            className="flex-1"
            value={formState.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>

        <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row ">
          <div className="flex-1">
            <MaterialDateInput
              colorTheme="black"
              label="Birthday"
              openTo="year"
              views={["year", "month", "day"]}
              value={formState.birthday ? formState.birthday : null}
              shouldDisableYear={(year: Date) => {
                let currentYear = new Date().getFullYear();

                return formState.discountTypeId === 1
                  ? year.getFullYear() > currentYear - 60
                  : year.getFullYear() > currentYear;
              }}
              onChange={(newValue: any) => {
                setFormState({
                  ...formState,
                  birthday: newValue,
                });
              }}
            />
          </div>
          <MaterialInput
            colorTheme="black"
            required
            label="ID Number"
            className="flex-1 w-full"
            value={formState.idNumber}
            onChange={handleInputChange}
            name="idNumber"
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h2 className="font-['Bebas_Neue'] text-xl text-secondary tracking-[3px] text-center">
              Upload ID Picture FRONT
            </h2>

            <div>
              <div>
                <div
                  {...getRootPropsFrontImage()}
                  className="border-dashed border-2 border-secondary h-[400px] rounded-lg flex justify-center items-center flex-col space-y-2"
                >
                  <input type="file" {...getInputPropsFrontImage()} />

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
                          alt="id front user discount"
                        />
                      ) : (
                        <>
                          <AiOutlineCloudUpload className="text-5xl text-secondary" />
                          <span className="text-lg text-secondary">
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
                  <strong>Note:</strong> Supported file types: JPG, JPEG, PNG
                  and GIF. Maximum file size is 2MB.
                </h4>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-['Bebas_Neue'] text-xl text-secondary tracking-[3px] text-center">
              Upload ID Picture BACK
            </h2>

            <div>
              <div>
                <div
                  {...getRootPropsBackImage()}
                  className="border-dashed border-2 border-secondary h-[400px] rounded-lg flex justify-center items-center flex-col space-y-2"
                >
                  <input type="file" {...getInputPropsBackImage()} />

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
                          alt="id back user discount"
                        />
                      ) : (
                        <>
                          <AiOutlineCloudUpload className="text-5xl text-secondary" />
                          <span className="text-lg text-secondary">
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
                  <strong>Note:</strong> Supported file types: JPG, JPEG, PNG
                  and GIF. Maximum file size is 2MB.
                </h4>
              </div>
            </div>
          </div>
        </div>
        {getUserDiscountState.data === null ||
        getUserDiscountState.data === undefined ? (
          <div>
            <button
              type="submit"
              className="bg-button border-2 border-secondary w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-lg mt-[-10px]"
            >
              Submit Application
            </button>
          </div>
        ) : getUserDiscountState.data?.status === 1 ? (
          <div>
            <button
              type="submit"
              className="bg-button border-2 border-secondary w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-lg mt-[-10px]"
            >
              Edit Application
            </button>
          </div>
        ) : null}
      </ProfileContainer>
    </form>
  );
}

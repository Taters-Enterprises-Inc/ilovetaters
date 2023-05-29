import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  ADMIN_INFLUENCER_STATUS,
  REACT_APP_DOMAIN_URL,
} from "features/shared/constants";
import { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaFileContract } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import {
  selectUploadContractInfluencer,
  uploadContractInfluencer,
} from "../slices/upload-contract-influencer.slice";
import { InfluencerContractViewer } from "./influencer-contract-viewer";
import { useEffect } from "react";
import {
  getInfluencer,
  selectGetInfluencer,
} from "../slices/get-influencer.slice";

export function ProfileInfluencerContractIsRequired() {
  const dispatch = useAppDispatch();
  const [uploadedFile, setUploadedFile] = useState<any>([]);
  const [contract, setContract] = useState<{ id: number; name: string }>();

  const getInfluencerState = useAppSelector(selectGetInfluencer);

  const uploadContractInfluencerState = useAppSelector(
    selectUploadContractInfluencer
  );

  useEffect(() => {
    dispatch(getInfluencer());
  }, [uploadContractInfluencerState, dispatch]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setUploadedFile(acceptedFiles[0]);

    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setContract({ id: index, name: file.name });
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleContractInfluencer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploadedFile) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append("uploaded_file", uploadedFile);
      dispatch(uploadContractInfluencer({ formData }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl ">
          Influencer Registration
        </h1>

        {getInfluencerState.data?.status ? (
          <span
            className="px-4 py-1 text-base rounded-lg"
            style={{
              color: "white",
              backgroundColor:
                ADMIN_INFLUENCER_STATUS[getInfluencerState.data.status].color,
            }}
          >
            {ADMIN_INFLUENCER_STATUS[getInfluencerState.data.status].name}
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
      <div className=" flex flex-col justify-between lg:flex-row">
        <div className="lg:flex-[0_0_57%] lg:max-w-[57%] order-2 lg:order-1 lg:mt-0 mt-4">
          <div
            className="hidden px-4 py-3 mb-4 text-blue-900 bg-blue-100 border-t-4 border-blue-500 rounded-b shadow-md lg:block"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="w-6 h-6 mr-4 text-blue-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="m-0 font-bold">Signed contract is required</p>
                <p className="text-xs">
                  Kindly download and review the contract, and then upload the
                  signed contract.
                </p>
              </div>
            </div>
          </div>
          <InfluencerContractViewer />
        </div>

        <div className="lg:flex-[0_0_40%] lg:max-w-[40%] order-1  lg:order-2">
          <div
            className="px-4 py-3 mb-4 text-blue-900 bg-blue-100 border-t-4 border-blue-500 rounded-b shadow-md lg:hidden"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="w-6 h-6 mr-4 text-blue-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="m-0 font-bold">Signed contract is required</p>
                <p className="text-xs">
                  Kindly download and review the contract, and then upload the
                  signed contract.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <a
              href={`${REACT_APP_DOMAIN_URL}api/download/influencer-contract`}
              className="flex items-center justify-center px-4 py-2 space-x-2 text-lg text-white border rounded-md border-secondary bg-button"
            >
              <FiDownload className="text-2xl" />{" "}
              <span className="text-base font-bold">
                Download and Review Contract
              </span>
            </a>
          </div>

          <div className="pt-4">
            <h2 className="font-['Bebas_Neue'] text-xl lg:text-3xl  text-secondary tracking-[3px] text-center mb-4">
              Upload Signed Contract
            </h2>

            <form onSubmit={handleContractInfluencer}>
              <input
                type="text"
                className="hidden"
                name="hash_key"
                value="hash"
                readOnly
              />
              <div>
                <div
                  {...getRootProps()}
                  className="border-dashed border-t-2 border-l-2 border-r-2 border-secondary h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2"
                >
                  <input
                    type="file"
                    name="uploaded_file"
                    {...getInputProps()}
                  />

                  {isDragActive ? (
                    <span className="text-lg text-secondary">
                      Drop the files here ...
                    </span>
                  ) : (
                    <>
                      {contract ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <FaFileContract className="text-6xl text-secondary" />
                          <span className="text-sm truncate text-secondary w-36">
                            {contract.name}
                          </span>
                        </div>
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

                <button
                  type="submit"
                  className="bg-button border border-secondary w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-b-lg mt-[-10px]"
                >
                  Upload
                </button>

                <h4 className="mt-1 text-sm leading-5 text-secondary">
                  <strong>Note:</strong> Supported file types: JPG, JPEG, PNG
                  and GIF. Maximum file size is 2MB.
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

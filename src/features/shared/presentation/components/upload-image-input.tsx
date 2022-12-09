import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface UploadPhotoParams {
  setFormState: (value: React.SetStateAction<any>) => void;
  name: string;
  titleStyle?: string;
  title?: string;
  defaultValue?: any;
}

export function UploadImageInput({
  setFormState,
  name,
  titleStyle,
  title,
  defaultValue,
}: UploadPhotoParams) {
  const [image, setImages] = useState<any>(undefined);
  useEffect(() => {
    if (defaultValue) {
      setImages(REACT_APP_DOMAIN_URL + defaultValue);
    }
  }, [defaultValue]);

  const onDropImage = useCallback((acceptedFiles: any) => {
    setFormState((data: any) => ({
      ...data,
      [`${name}`]: acceptedFiles[0],
    }));
    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropImage,
    multiple: false,
  });
  return (
    <div>
      <h2
        className={
          titleStyle
            ? titleStyle
            : `font-['Bebas_Neue'] text-xl text-secondary tracking-[3px] text-center `
        }
      >
        {title ? title : "Upload Photo"}
      </h2>

      <div>
        <div>
          <div
            {...getRootProps()}
            className="border-dashed overflow-hidden border-2 border-secondary  h-[400px] rounded-lg flex justify-center items-center flex-col space-y-2"
          >
            <input type="file" {...getInputProps()} />

            {isDragActive ? (
              <span className="text-lg text-secondary">
                Drop the files here ...
              </span>
            ) : (
              <>
                {image !== undefined || defaultValue ? (
                  <img
                    src={image}
                    className="h-auto md:w-[500px] relative object-cover sm:mb-0 mb-2  border sm:mx-0 mx-auto"
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
            <strong>Note:</strong> Supported file types: JPG, JPEG, PNG and GIF.
            Maximum file size is 2MB.
          </h4>
        </div>
      </div>
    </div>
  );
}

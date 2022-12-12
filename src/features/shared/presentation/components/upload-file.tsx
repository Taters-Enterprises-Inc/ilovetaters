import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

interface UploadFileProps {
  description: string;
  image: File | string;
  onChange: (file: File) => void;
}

export function UploadFile(props: UploadFileProps) {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result) {
            props.onChange(file);
          }
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    [props]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className=" border-dashed border-2 border-secondary h-[250px] rounded-lg flex justify-center items-center flex-col space-y-2"
    >
      <input type="file" name="uploaded_file" {...getInputProps()} />

      {isDragActive ? (
        <span className="text-lg text-secondary">Drop the files here ...</span>
      ) : (
        <>
          {props.image ? (
            <>
              <img
                src={
                  props.image instanceof File
                    ? URL.createObjectURL(props.image as File)
                    : props.image
                }
                className="object-contain h-[150px] w-[150px]"
                alt="upload file"
              />
              <span className="text-xs text-center text-secondary">
                {props.description}
              </span>
            </>
          ) : (
            <>
              <AiOutlineCloudUpload className="text-5xl text-secondary" />
              <span className="text-xs text-center text-secondary">
                Drag and drop here to upload <br /> {props.description}
              </span>
              <button
                type="button"
                className="px-3 py-1 text-xs text-white rounded-lg bg-secondary"
              >
                Or select file
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

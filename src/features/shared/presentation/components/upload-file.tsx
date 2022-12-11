import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

interface UploadFileProps {
  description: string;
  onChange: (file: File) => void;
}

export function UploadFile(props: UploadFileProps) {
  const [image, setImage] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      props.onChange(acceptedFiles[0]);

      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target?.result) {
            setImage(e.target.result as string);
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
          {image ? (
            <>
              <img
                src={image}
                className="object-contain h-[150px] w-[150px]"
                alt="upload file"
              />
              <span className="text-sm text-secondary text-center">
                {props.description}
              </span>
            </>
          ) : (
            <>
              <AiOutlineCloudUpload className="text-5xl text-secondary" />
              <span className="text-sm text-secondary text-center">
                Drag and drop here to upload <br /> {props.description}
              </span>
              <button
                type="button"
                className="px-3 py-1 text-sm text-white rounded-lg bg-secondary"
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

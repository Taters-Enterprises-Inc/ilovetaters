import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ExcelPreviewModal,
  UploadDeliveryRecieptModal,
  ViewImageModal,
} from "../modals";

interface StockOrderUploadFileProps {
  uploadedImage: (image: File | string) => void;
  uploadButtonName: string;
  excelFile?: boolean;
  hidden?: boolean;
  className?: string;
}

export function StockOrderUploadFile(props: StockOrderUploadFileProps) {
  const [uploadedFile, setUploadedFile] = useState<File | string>("");
  const [openFileUploadModal, setOpenFileUploadModal] = useState(false);
  const [openPreviewUploadedImageFile, setOpenPreviewUploadedImageFile] =
    useState(false);
  const [openPreviewUploadedExcelFile, setOpenPreviewUploadedExcelFile] =
    useState(false);

  useEffect(() => {
    props.uploadedImage(uploadedFile);
  }, [uploadedFile]);

  const handleOpenViewFile = () => {
    if (props.excelFile) {
      setOpenPreviewUploadedExcelFile(true);
    } else {
      setOpenPreviewUploadedImageFile(true);
    }
  };

  const handleUploadFileModal = () => setOpenFileUploadModal(true);

  return (
    <div
      className={`mb-1 w-full md:mb-0 ${props.hidden ? "hidden" : ""} ${
        props.className
      }`}
    >
      {uploadedFile === "" ? (
        <Button
          fullWidth
          variant="contained"
          sx={{ color: "white", backgroundColor: "#CC5801" }}
          onClick={handleUploadFileModal}
          size="small"
        >
          Upload {props.uploadButtonName}
        </Button>
      ) : (
        <div className="flex flex-col justify-center space-y-1">
          <span className="w-full flex justify-center font-semibold text-base">
            {props.uploadButtonName}
          </span>

          <Button
            onClick={handleOpenViewFile}
            size="small"
            fullWidth
            variant="outlined"
          >
            View Uploaded {props.uploadButtonName} File
          </Button>

          <Button
            onClick={handleUploadFileModal}
            fullWidth
            variant="outlined"
            size="small"
          >
            Re-upload {props.uploadButtonName} File
          </Button>
        </div>
      )}

      <UploadDeliveryRecieptModal
        open={openFileUploadModal}
        onClose={() => setOpenFileUploadModal(false)}
        setUploadedReciept={setUploadedFile}
        isButtonAvailable={true}
        title={props.uploadButtonName}
      />

      <ViewImageModal
        open={openPreviewUploadedImageFile}
        onClose={() => setOpenPreviewUploadedImageFile(false)}
        image={uploadedFile}
        isDownloadable={false}
      />

      <ExcelPreviewModal
        open={openPreviewUploadedExcelFile}
        onClose={() => setOpenPreviewUploadedExcelFile(false)}
        file={uploadedFile}
      />
    </div>
  );
}

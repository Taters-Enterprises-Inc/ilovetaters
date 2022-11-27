import { Box, Button, Dialog, Modal } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface AdminSurveyResponseModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSurveyVerificationResponseModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen} className="cursor-pointer hover:underline">
        <strong>Survey Responses</strong>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 ">
          <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
            <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
              <span className="text-2xl text-white">Survey Responses Form</span>
              <button className="text-2xl text-white" onClick={handleClose}>
                <IoMdClose />
              </button>
            </div>
            <div className="px-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
              <h1>Hello</h1>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

import { Button, TextField } from "@mui/material";
import { useAppDispatch } from "features/config/hooks";
import { UploadFile } from "features/shared/presentation/components";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { getAuditAcknowledge } from "../slices/audit-acknowledge.slice";

interface ResponseAcknowledgeProps {
  open: boolean;
  onClose: () => void;
  hash: string;
}

export function ResponseAcknowledgeModal(props: ResponseAcknowledgeProps) {
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<{
    acknowledgeby: string;
    image: File | string;
    hash: string;
  }>({ acknowledgeby: "", image: "", hash: "" });

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (props.hash) {
      setFormState({
        ...formState,
        hash: props.hash,
      });
    } else {
      return <div>Encountered Problem...</div>;
    }
  };

  useEffect(() => {
    if (
      formState.hash != "" ||
      (formState.hash != undefined && props.open == true)
    ) {
      dispatch(getAuditAcknowledge(formState));
    }
  }, [formState.hash, dispatch]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white border-secondary border-2 px-4 pt-[30px] pb-3 mb-[200px] lg:mb-0 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div className="flex flex-col mt-5 px-5 ">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <span>Acknowledged By: </span>
              <div>
                <TextField
                  required
                  fullWidth
                  id="Store"
                  size="small"
                  variant="outlined"
                  onChange={(event) => {
                    setFormState({
                      ...formState,
                      acknowledgeby: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Upload E-Signiture:</span>
              <div>
                <UploadFile
                  image={formState.image}
                  onChange={(file) => {
                    setFormState({
                      ...formState,
                      image: file,
                    });
                  }}
                  description="500x500"
                />
              </div>
            </div>

            <div>
              <Button fullWidth type="submit" variant="contained">
                <span>Sign</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

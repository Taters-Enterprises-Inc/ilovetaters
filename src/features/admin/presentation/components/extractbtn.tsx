import { EmptyObject } from "@reduxjs/toolkit";
import React from "react";

type ExtractDataProps = {
  type: any;
  children: any;
  processing: any;
  className: any;
};

const ExtractBtn: React.FC<ExtractDataProps> = ({
  className,
  children,
  processing,
}) => {
  return (
    <button
      type="submit"
      className={
        `inline-flex items-center px-4 py-2 bg-button border border-transparent rounded-md font-semibold 
        text-xs text-white uppercase tracking-widest active:bg-button transition ease-in-out duration-150 ${
          processing && "opacity-25"
        } ` + className
      }
      disabled={processing}
    >
      {children}
    </button>
  );
};

export default ExtractBtn;

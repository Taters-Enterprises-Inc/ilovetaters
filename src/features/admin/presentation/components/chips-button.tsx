import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface AdminSnackshopOrderStatusBbuttonParams {
  createQueryParams: (params: object) => string;
  params: (value: any) => any;
  status: string | null;
  dispactAction: () => void;
  data: Array<any>;
}

export const AdminChipsButton: React.FC<
  AdminSnackshopOrderStatusBbuttonParams
> = ({ params, createQueryParams, status, dispactAction, data }) => {
  const navigate = useNavigate();

  const Data = useCallback(() => {
    return data
  }, [data]);

  const Dispatch = useCallback((): void => {
    return dispactAction();
  }, [dispactAction]);

  return (
    <div className="flex flex-wrap gap-2 px-4 md:justify-end justify-center">
      <button
        onClick={() => {
          if (status !== null) {
            const queryParams = createQueryParams(params(-1));
            Dispatch();
            navigate({
              pathname: "",
              search: queryParams,
            });
          }
        }}
        className={` ${
          !status ? "text-base" : "text-xs opacity-40"
        } rounded-full px-4 py-1 text-white bg-black`}
      >
        All
      </button>
      {Data()?.map((value, index) => {
        if (index === 0) {
          return null;
        }
        if (value.name === "" && value.color === "") {
          return null;
        }
        return (
          <button
            key={index}
            onClick={() => {
              if (index?.toString() !== status) {
                const queryParams = createQueryParams(params(index));
                Dispatch();
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
            style={{
              backgroundColor: value.color,
            }}
            className={` ${
              status && parseInt(status) === index
                ? "text-base"
                : "text-xs opacity-40"
            } rounded-full px-4 py-1 text-white `}
          >
            {value.name}
          </button>
        );
      })}
    </div>
  );
};

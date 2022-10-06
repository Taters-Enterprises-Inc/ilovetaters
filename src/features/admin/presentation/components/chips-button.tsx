import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";


interface AdminSnackshopOrderStatusBbuttonParams {
  createQueryParams: (params: object) => string;
  params: (value: any) => any;
  status: string | null;
  dispactAction:()=>void
  data :Array<any>
}
export const AdminChipsButton: React.FC<
  AdminSnackshopOrderStatusBbuttonParams
> = ({ params, createQueryParams, status ,dispactAction ,data}) => {
  const navigate = useNavigate();

  const Data = useCallback(() => {
    return data.filter((value)=>value.name !== '')
  }, [data]);

  const Dispatch = useCallback((): void => {
      return dispactAction()
  }, [dispactAction]);

  return (
    <div className="flex flex-wrap gap-2">
      {Data()?.map((value, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              const queryParams = createQueryParams(params(value));
              Dispatch();
              navigate({
                pathname: "",
                search: queryParams,
              });
            }}
            style={{
              backgroundColor: value.color,
            }}
            className={` ${
              status && status === value.name
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

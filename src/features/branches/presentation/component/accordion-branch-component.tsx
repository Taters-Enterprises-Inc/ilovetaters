import { useEffect, useState } from "react";
import {
  getBranchesStore,
  selectGetBranchesStore,
} from "../slices/get-branches-store";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { BranchesStoreModel } from "features/branches/core/domain/branches-store.model";
import { AccordioCard } from "./accordion-card";

export const AccordionComponent: React.FC<{
  region: string;
}> = ({ region }): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const getBranchesStoreState: any = useAppSelector(selectGetBranchesStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBranchesStore());
  }, [dispatch]);


  return (
    <div className={`relative  `}>
      <div
        className={`
          cursor-pointer flex ${
            !show ? "mb-4" : ""
          } transition-all py-2 border items-center font rounded cursor-pointer px-4	  
        `}
        onClick={() => {
          setShow((isShow: boolean) => !isShow);
        }}
      >
        <h1 className="text-left flex-1 text-[#fff] tracking-[2px] font-['Bebas_Neue'] ">
          {region}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8  transition-all  ${
            show ? "rotate-0" : "rotate-180"
          } `}
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {show && (
        <div
          className={`w-f ${
            show ? "h-auto bg-primary " : "h-0"
          } grid lg:grid lg:grid-cols-2  md:w-full transition-all duration-1000 gap-x-4 gap-y-4 grid-cols-2 py-4 rounded-lg w-full  `}
        >
          {getBranchesStoreState?.data?.[`${region}`].map(
            (
            data: BranchesStoreModel,
              index: number
            ): JSX.Element => {
              return (<AccordioCard key={index} data={data} show={show}/>)
            }
          )}
        </div>
      )}
    </div>
  );
};

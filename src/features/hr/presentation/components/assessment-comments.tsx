import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { AssessmentRatingSection } from "./assessment-rating-section";
import {
  selectGetHrComments,
  updateGetHrCommentsState,
} from "../slices/get-hr-comments.slice";
import { useEffect } from "react";

export function AssessmentComments() {
  const dispatch = useAppDispatch();

  const getHrCommentsState = useAppSelector(selectGetHrComments);
  return (
    <AssessmentRatingSection>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className=" border-b border-gray-300">
          <div className="flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold uppercase">Comments</h1>
          </div>
        </div>

        <div className=" border-b border-gray-300 px-2">
          <h1 className=" text-[11px] font-semibold uppercase">
            A. Self Assessment on the Overall Performance and Development
          </h1>
        </div>

        <div className="flex border-b border-gray-30">
          <div className="flex-1 p-2 flex justify-center items-center">
            <h1 className="text-[10px] font-semibold uppercase ">
              Key Strengths
            </h1>
          </div>
          <div className="flex-1 p-2 flex justify-center items-center border-l border-gray-300">
            <h1 className="text-[10px] font-semibold uppercase">
              Areas for Development
            </h1>
          </div>
          <div className="flex-initial w-[250px] p-2 flex justify-center items-center border-l border-gray-300">
            <h1 className="text-[10px] font-semibold uppercase">
              Major Development Plans for next year
            </h1>
          </div>
        </div>

        <div className="flex border-b border-gray-30 min-h-[50px]">
          <div className="flex-1">
            <textarea
              className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
              value={getHrCommentsState.data?.comments?.key_strengths ?? ""}
              onChange={(element) => {
                let data = JSON.parse(
                  JSON.stringify(getHrCommentsState.data ?? {})
                );

                if (data != undefined) {
                  data.comments = {
                    ...data.comments,
                    key_strengths: element.target.value,
                  };

                  dispatch(
                    updateGetHrCommentsState({
                      data: data,
                    })
                  );
                }
              }}
            />
          </div>
          <div className="flex-1 border-l border-gray-300">
            <textarea
              className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
              value={
                getHrCommentsState.data?.comments?.areas_for_development ?? ""
              }
              onChange={(element) => {
                let data = JSON.parse(
                  JSON.stringify(getHrCommentsState.data ?? {})
                );

                if (data != undefined) {
                  data.comments = {
                    ...data.comments,
                    areas_for_development: element.target.value,
                  };

                  dispatch(
                    updateGetHrCommentsState({
                      data: data,
                    })
                  );
                }
              }}
            />
          </div>
          <div className="flex-initial w-[250px] border-l border-gray-300">
            <textarea
              className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
              value={
                getHrCommentsState.data?.comments
                  ?.major_development_plans_for_next_year ?? ""
              }
              onChange={(element) => {
                let data = JSON.parse(
                  JSON.stringify(getHrCommentsState.data ?? {})
                );

                if (data != undefined) {
                  data.comments = {
                    ...data.comments,
                    major_development_plans_for_next_year: element.target.value,
                  };

                  dispatch(
                    updateGetHrCommentsState({
                      data: data,
                    })
                  );
                }
              }}
            />
          </div>
        </div>

        <div className=" border-b border-gray-300 px-2">
          <h1 className="text-[11px] font-semibold uppercase">
            B. Comments on your Overall Performance and Development Plan
          </h1>
        </div>
        <div className="flex border-b border-gray-300  min-h-[80px]">
          <textarea
            className="w-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
            value={
              getHrCommentsState.data?.comments
                ?.comments_on_your_overall_performance_and_development_plan ??
              ""
            }
            onChange={(element) => {
              let data = JSON.parse(
                JSON.stringify(getHrCommentsState.data ?? {})
              );

              if (data != undefined) {
                data.comments = {
                  ...data.comments,
                  comments_on_your_overall_performance_and_development_plan:
                    element.target.value,
                };

                dispatch(
                  updateGetHrCommentsState({
                    data: data,
                  })
                );
              }
            }}
          />
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

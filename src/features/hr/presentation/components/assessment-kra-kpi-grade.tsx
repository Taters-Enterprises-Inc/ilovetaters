import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { AssessmentRatingSection } from "./assessment-rating-section";
import { useEffect } from "react";
import {
  selectGetHrKraKpiGrade,
  updateGetHrKraKpiGradeState,
} from "../slices/get-hr-kra-kpi-grade.slice";

export function AssessmentKraKpiGrade() {
  const dispatch = useAppDispatch();

  const getHrKraKpiGradeState = useAppSelector(selectGetHrKraKpiGrade);

  const getAvarage = (): number => {
    let data = getHrKraKpiGradeState.data;

    if (data != undefined) {
      let sum: number = 0;

      data.kra_kpi_grade.forEach((val) => {
        if (val.rating != undefined && val.rating != "")
          sum += parseFloat(val.rating);
      });

      return parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(sum / data.kra_kpi_grade.length)
      );
    }

    return 0;
  };

  return (
    <AssessmentRatingSection title="KRA/KPI Grade :" avarage={getAvarage()}>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className="flex border-b border-gray-300">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold">
              Key Result Areas / Key Performance Indicators{" "}
              <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">Weight</h1>
          </div>
          <div className="flex-initial w-[230px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Result Achieved / Not Achieved{" "}
              <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Rating <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">Score</h1>
          </div>
        </div>
        {getHrKraKpiGradeState.data?.kra_kpi_grade.map((value, index) => (
          <div className="flex border-b border-gray-300 min-h-[80px]">
            <div className="flex-initial w-[290px]">
              <textarea
                required
                className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
                value={
                  value.key_result_areas_or_key_performance_indiciators ?? ""
                }
                onChange={(element) => {
                  let data = JSON.parse(
                    JSON.stringify(getHrKraKpiGradeState.data)
                  );

                  if (data != undefined) {
                    data.kra_kpi_grade[
                      index
                    ].key_result_areas_or_key_performance_indiciators =
                      element.target.value;

                    dispatch(updateGetHrKraKpiGradeState({ data: data }));
                  }
                }}
              />
            </div>
            <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
              <h1 className="text-[11px] font-semibold text-blue-400">
                {parseFloat(value.weight) * 100}%
              </h1>
            </div>
            <div className="flex-initial w-[230px] border-l border-gray-300">
              <textarea
                required
                className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
                value={value.result_achieved_or_not_achieved ?? ""}
                onChange={(element) => {
                  let data = JSON.parse(
                    JSON.stringify(getHrKraKpiGradeState.data)
                  );

                  if (data != undefined) {
                    data.kra_kpi_grade[index].result_achieved_or_not_achieved =
                      element.target.value;

                    dispatch(updateGetHrKraKpiGradeState({ data: data }));
                  }
                }}
              />
            </div>
            <div className="flex-initial w-[60px] border-l border-gray-300">
              <input
                type="number"
                required
                onWheel={(e) => (e.target as HTMLElement).blur()}
                className="w-full block text-[12pt] text-center h-full m-0 pl-2 text-green-600"
                value={value.rating ?? ""}
                onChange={(element) => {
                  let data = JSON.parse(
                    JSON.stringify(getHrKraKpiGradeState.data)
                  );

                  if (data != undefined) {
                    let val =
                      parseFloat(element.target.value) *
                      parseFloat(data.kra_kpi_grade[index].weight);

                    let round = new Intl.NumberFormat("en", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    }).format(val);

                    data.kra_kpi_grade[index].rating = element.target.value;
                    data.kra_kpi_grade[index].score =
                      element.target.value != "" ? round : "";

                    dispatch(updateGetHrKraKpiGradeState({ data: data }));
                  }
                }}
              />
            </div>
            <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center">
              <h1 className="text-[12pt] text-center text-green-600">
                {value.score}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[13px] font-semibold text-blue-400">Total</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold text-blue-400">100%</h1>
          </div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

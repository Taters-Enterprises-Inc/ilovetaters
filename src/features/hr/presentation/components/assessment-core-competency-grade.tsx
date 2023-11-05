import { AssessmentRatingSection } from "./assessment-rating-section";

import data from "../../data/json/core_competency_grade.json";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  selectGetHrCoreCompetencyGrade,
  updateGetHrCoreCompetencyGradeState,
} from "../slices/get-hr-core-competency-grade.slice";

export function AssessmentCoreCompetencyGrade() {
  const dispatch = useAppDispatch();

  const getHrCoreCompetencyGradeState = useAppSelector(
    selectGetHrCoreCompetencyGrade
  );

  const getAvarage = (): number => {
    let data = getHrCoreCompetencyGradeState.data;

    if (data != undefined) {
      let sum: number = 0;

      data.core_competency_grade.forEach((val) => {
        if (val.rating != undefined && val.rating != "")
          sum += parseFloat(val.rating);
      });

      return parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(sum / data.core_competency_grade.length)
      );
    }

    return 0;
  };

  return (
    <AssessmentRatingSection
      title="Core Competency Grade : "
      avarage={getAvarage()}
    >
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className="flex border-b border-gray-300">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold">Core Competencies</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Rating <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-1 border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Critical Incidents / Comments{" "}
              <span className="text-red-500">*</span>
            </h1>
          </div>
        </div>

        {getHrCoreCompetencyGradeState.data?.core_competency_grade.map(
          (value, index) => (
            <div className="flex border-b border-gray-30">
              <div className="flex-initial w-[290px] p-2">
                <h1 className="text-[13px] font-semibold">{value.title}</h1>
                <h1 className="text-[10px] font-semibold">
                  {value.description}
                </h1>
              </div>
              <div className="flex-initial w-[60px] border-l border-gray-300">
                <input
                  type="number"
                  required
                  className="w-full block text-[12pt] text-center h-full m-0 pl-2 text-green-600"
                  value={value.rating ?? ""}
                  onChange={(element) => {
                    let data = JSON.parse(
                      JSON.stringify(getHrCoreCompetencyGradeState.data)
                    );

                    if (data != undefined) {
                      data.core_competency_grade[index].rating =
                        element.target.value;

                      dispatch(
                        updateGetHrCoreCompetencyGradeState({ data: data })
                      );
                    }
                  }}
                />
              </div>
              <div className="flex-1 border-l border-gray-300">
                <textarea
                  required
                  className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
                  value={value.critical_incidents_or_comments ?? ""}
                  onChange={(element) => {
                    let data = JSON.parse(
                      JSON.stringify(getHrCoreCompetencyGradeState.data)
                    );

                    if (data != undefined) {
                      data.core_competency_grade[
                        index
                      ].critical_incidents_or_comments = element.target.value;

                      dispatch(
                        updateGetHrCoreCompetencyGradeState({ data: data })
                      );
                    }
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </AssessmentRatingSection>
  );
}

import { AssessmentRatingSection } from "./assessment-rating-section";

import data from "../../data/json/functional_competency_and_punctuality_grade.json";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  selectGetHrFunctionalCompetencyAndPunctualityGrade,
  updateGetHrFunctionalCompetencyAndPunctualityGradeState,
} from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";

export function AssessmentFunctionalCompetencyAndPunctualityGrade() {
  const dispatch = useAppDispatch();

  const getHrFunctionalCompetencyAndPunctualityGradeState = useAppSelector(
    selectGetHrFunctionalCompetencyAndPunctualityGrade
  );

  const getFunctionalSubtotal = (): number => {
    let data = getHrFunctionalCompetencyAndPunctualityGradeState.data;

    if (data != undefined) {
      let sum: number = 0;

      data.functional_competency_and_punctuality_grade.forEach((val) => {
        if (val.rating != undefined && val.rating != "")
          sum += parseFloat(val.rating);
      });

      return parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(sum / data.functional_competency_and_punctuality_grade.length)
      );
    }

    return 0;
  };

  const getFunctionalCompetencyAvarage = (): number => {
    let data = getHrFunctionalCompetencyAndPunctualityGradeState.data;

    if (data != undefined) {
      let sum: number = 0;

      data.functional_competency_and_punctuality_grade.forEach((val) => {
        if (val.rating != undefined && val.rating != "")
          sum += parseFloat(val.rating);
      });

      return parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(
          (sum / data.functional_competency_and_punctuality_grade.length) * 0.9
        )
      );
    }

    return 0;
  };
  const getPunctualityAvarage = (): number => {
    let data = getHrFunctionalCompetencyAndPunctualityGradeState.data;

    if (data != undefined) {
      if (data.attendance_and_punctuality_grade == undefined) {
        return 0;
      }

      let absences = data.attendance_and_punctuality_grade.absences
        ? parseFloat(data.attendance_and_punctuality_grade.absences)
        : 0;
      let tardiness = data.attendance_and_punctuality_grade.tardiness
        ? parseFloat(data.attendance_and_punctuality_grade.tardiness)
        : 0;

      return parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(((absences + tardiness) / 2) * 0.1)
      );
    }

    return 0;
  };

  const functionalSubtotal = getFunctionalSubtotal();
  const functionalCompetencyAvarage = getFunctionalCompetencyAvarage();
  const punctualityAvarage = getPunctualityAvarage();

  return (
    <AssessmentRatingSection
      title="Functional Competency and Punctuality Grade: "
      avarage={parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(functionalCompetencyAvarage + punctualityAvarage)
      )}
    >
      <div className="flex">
        <div
          className={
            "flex bg-white border-t border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex flex-initial w-[290px] flex justify-end items-center px-2">
            <div className="flex-1  flex justify-end items-end">
              <h1 className="text-[10px] font-semibold">
                Functional Competencies Average
              </h1>
            </div>
            <div className="flex-initial w-[87px] flex justify-end items-end">
              <h1 className="text-[12px] font-semibold text-blue-400">90%</h1>
            </div>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">
              {functionalCompetencyAvarage == 0
                ? null
                : functionalCompetencyAvarage}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-t border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex flex-initial w-[290px] flex justify-end items-center px-2">
            <div className="flex-1  flex justify-end items-end">
              <h1 className="text-[10px] font-semibold">Punctuality</h1>
            </div>
            <div className="flex-initial w-[87px] flex justify-end items-end">
              <h1 className="text-[12px] font-semibold text-blue-400">10%</h1>
            </div>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">
              {punctualityAvarage == 0 ? null : punctualityAvarage}
            </h1>
          </div>
        </div>
      </div>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className="flex border-b border-gray-300">
          <div className="flex-initial w-[290px] px-2 flex items-center justify-center">
            <h1 className=" text-[11px] font-semibold">
              Functional Competencies
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Rating <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-1 border-l border-gray-300 px-2 flex items-center justify-center">
            <h1 className="text-[11px] font-semibold ">
              Critical Incidents / Comments
            </h1>
          </div>
        </div>

        {getHrFunctionalCompetencyAndPunctualityGradeState.data?.functional_competency_and_punctuality_grade.map(
          (value, index) => (
            <div className="flex border-b border-gray-30">
              <div className="flex-initial w-[290px] p-2">
                <h1 className="text-[10px] font-semibold">
                  <b>1. {value.title}</b> - {value.description}
                </h1>
              </div>
              <div className="flex-initial w-[60px] border-l border-gray-300">
                <input
                  type="number"
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  required
                  className="w-full block text-[12pt] text-center h-full m-0 pl-2 text-green-600"
                  value={value.rating ?? ""}
                  onChange={(element) => {
                    let data = JSON.parse(
                      JSON.stringify(
                        getHrFunctionalCompetencyAndPunctualityGradeState.data
                      )
                    );

                    if (data != undefined) {
                      data.functional_competency_and_punctuality_grade[
                        index
                      ].rating = element.target.value;

                      dispatch(
                        updateGetHrFunctionalCompetencyAndPunctualityGradeState(
                          { data: data }
                        )
                      );
                    }
                  }}
                />
              </div>
              <div className="flex-1 border-l border-gray-300">
                <textarea
                  className="w-full h-full text-[10px] flex-1 m-0 pt-2 pl-2 text-green-600"
                  value={value.critical_incidents_or_comments ?? ""}
                  onChange={(element) => {
                    let data = JSON.parse(
                      JSON.stringify(
                        getHrFunctionalCompetencyAndPunctualityGradeState.data
                      )
                    );

                    if (data != undefined) {
                      data.functional_competency_and_punctuality_grade[
                        index
                      ].critical_incidents_or_comments = element.target.value;

                      dispatch(
                        updateGetHrFunctionalCompetencyAndPunctualityGradeState(
                          { data: data }
                        )
                      );
                    }
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[13px] font-semibold">Sub Total Functional</h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">
              {functionalSubtotal == 0 ? null : functionalSubtotal}
            </h1>
          </div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { AssessmentRatingSection } from "./assessment-rating-section";
import { selectGetHrAttendanceAndPunctualityGrade } from "../slices/get-hr-attendance-and-punctuality-grade.slice";
import {
  selectGetHrFunctionalCompetencyAndPunctualityGrade,
  updateGetHrFunctionalCompetencyAndPunctualityGradeState,
} from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";

export function AssessmentAttendanceAndPunctuality() {
  const dispatch = useAppDispatch();

  const getHrAttendanceAndPunctualityGradeState = useAppSelector(
    selectGetHrAttendanceAndPunctualityGrade
  );
  const getHrFunctionalCompetencyAndPunctualityGradeState = useAppSelector(
    selectGetHrFunctionalCompetencyAndPunctualityGrade
  );

  const getAvarage = (): number => {
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
        }).format((absences + tardiness) / 2)
      );
    }

    return 0;
  };

  const avarage = getAvarage();

  return (
    <AssessmentRatingSection>
      <div
        className={"bg-white w-[700px] border border-gray-300 shadow relative"}
      >
        <div className=" border-b border-gray-300">
          <div className="flex items-center px-2">
            <h1 className=" text-[11px] font-semibold uppercase">
              Section III: Attendance and Punctuality
            </h1>
            <h1 className=" text-[9px] font-semibold mt-[2px]">
              - Pls. refer to the summary of the attendance and indicate
              appropriate grade.
            </h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <div className="flex items-center justify-center flex-initial h-[45px] border-b border-gray-300 px-2">
              <h1 className="text-[11px] font-semibold text-center">
                Performance <br /> Criteria
              </h1>
            </div>
            <div className="flex-initial flex items-center justify-center h-[35px] border-b border-gray-300 px-2 ">
              <h1 className=" text-[11px] font-semibold ">
                Absences <br /> (Unauthorized){" "}
              </h1>
            </div>
            <div className="flex-initial  h-[78px]">
              <h1 className=" text-[11px] font-semibold px-2 ">Tardiness</h1>
            </div>
          </div>

          {getHrAttendanceAndPunctualityGradeState.data?.attendance_and_punctuality.map(
            (value, index) => (
              <div className="flex-initial flex flex-col border-l border-gray-300">
                <div className="flex items-center justify-center flex-initial h-[45px] border-b border-gray-300 px-2 ">
                  <h1 className=" text-[11px] font-semibold text-center">
                    {value.name}
                  </h1>
                </div>
                <div className="flex-initial h-[35px] border-b border-gray-300 px-2 ">
                  <h1 className=" text-[11px] ">{value.absences}</h1>
                </div>
                <div className="flex-initial h-[78px]">
                  <h1 className=" text-[11px] px-2 ">{value.tardiness}</h1>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[11px]">
              Absences (Unauthorized) <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <input
              type="number"
              required
              onWheel={(e) => (e.target as HTMLElement).blur()}
              className="w-full block text-[11px] text-center h-full m-0 pl-2 text-green-600"
              value={
                getHrFunctionalCompetencyAndPunctualityGradeState.data
                  ?.attendance_and_punctuality_grade?.absences ?? ""
              }
              onChange={(element) => {
                let data = JSON.parse(
                  JSON.stringify(
                    getHrFunctionalCompetencyAndPunctualityGradeState.data
                  )
                );

                if (data != undefined) {
                  data.attendance_and_punctuality_grade = {
                    ...data.attendance_and_punctuality_grade,
                    absences: element.target.value,
                  };

                  dispatch(
                    updateGetHrFunctionalCompetencyAndPunctualityGradeState({
                      data: data,
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[11px]">
              Tardiness <span className="text-red-500">*</span>
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <input
              type="number"
              required
              onWheel={(e) => (e.target as HTMLElement).blur()}
              className="w-full block text-[11px] text-center h-full m-0 pl-2 text-green-600"
              value={
                getHrFunctionalCompetencyAndPunctualityGradeState.data
                  ?.attendance_and_punctuality_grade?.tardiness ?? ""
              }
              onChange={(element) => {
                let data = JSON.parse(
                  JSON.stringify(
                    getHrFunctionalCompetencyAndPunctualityGradeState.data
                  )
                );

                if (data != undefined) {
                  data.attendance_and_punctuality_grade = {
                    ...data.attendance_and_punctuality_grade,
                    tardiness: element.target.value,
                  };

                  dispatch(
                    updateGetHrFunctionalCompetencyAndPunctualityGradeState({
                      data: data,
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={
            "flex bg-white border-b border-l border-r border-gray-300 shadow relative"
          }
        >
          <div className="flex-initial w-[290px] flex justify-end items-center px-2">
            <h1 className="text-[13px] font-semibold">
              Sub Total Punctuality Average :
            </h1>
          </div>
          <div className="flex-initial w-[60px] border-l border-gray-300 flex justify-center items-center px-2">
            <h1 className="text-[13px] font-semibold">
              {avarage == 0 ? null : avarage}
            </h1>
          </div>
        </div>
      </div>
    </AssessmentRatingSection>
  );
}

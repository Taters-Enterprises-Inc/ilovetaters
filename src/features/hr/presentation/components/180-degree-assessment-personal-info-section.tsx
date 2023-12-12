import { useAppSelector } from "features/config/hooks";
import { AssessmentSection } from "./assessment-section";
import { selectGetHrKraKpiGrade } from "../slices/get-hr-kra-kpi-grade.slice";
import { selectGetHrCoreCompetencyGrade } from "../slices/get-hr-core-competency-grade.slice";
import { selectGetHrFunctionalCompetencyAndPunctualityGrade } from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";
import { selectGetHrSession } from "../slices/get-hr-session.slice";

export function Hr180DegreeAssessmentPersonalInfoSection() {
  const getHrKraKpiGradeState = useAppSelector(selectGetHrKraKpiGrade);
  const getHrCoreCompetencyGradeState = useAppSelector(
    selectGetHrCoreCompetencyGrade
  );
  const getHrFunctionalCompetencyAndPunctualityGradeState = useAppSelector(
    selectGetHrFunctionalCompetencyAndPunctualityGrade
  );

  const getHrSessionState = useAppSelector(selectGetHrSession);

  const getActualRatingAndTotalScore = (
    array: Array<any> | undefined,
    weight: number
  ): {
    actualRating: number;
    totalScore: number;
  } => {
    if (array != undefined) {
      let sum: number = 0;

      array.forEach((val) => {
        if (val.rating != undefined && val.rating != "")
          sum += parseFloat(val.rating);
      });

      let actualRating = sum / array.length;
      let totalScore = actualRating * weight;

      return {
        actualRating: parseFloat(
          new Intl.NumberFormat("en", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }).format(actualRating)
        ),
        totalScore: parseFloat(
          new Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(totalScore)
        ),
      };
    }

    return {
      actualRating: 0,
      totalScore: 0,
    };
  };
  const getActualRatingAndTotalScoreWithoutLoop = (
    avarage: number,
    weight: number
  ): {
    actualRating: number;
    totalScore: number;
  } => {
    return {
      actualRating: parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(avarage)
      ),
      totalScore: parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(avarage * weight)
      ),
    };
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
  const functionalCompetencyAvarage = getFunctionalCompetencyAvarage();
  const punctualityAvarage = getPunctualityAvarage();

  const kpa_kpi = getActualRatingAndTotalScore(
    getHrKraKpiGradeState.data?.kra_kpi_grade,
    0.4
  );

  const core_competency = getActualRatingAndTotalScore(
    getHrCoreCompetencyGradeState.data?.core_competency_grade,
    0.3
  );

  const functional_competency_and_punctuality_grade =
    getActualRatingAndTotalScoreWithoutLoop(
      functionalCompetencyAvarage + punctualityAvarage,
      0.3
    );

  const total_score = parseFloat(
    new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(
      kpa_kpi.totalScore +
        core_competency.totalScore +
        functional_competency_and_punctuality_grade.totalScore
    )
  );

  return (
    <AssessmentSection className="flex h-[150px]">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="flex-initial flex justify-center items-center border-b border-gray-300">
            <h1 className="text-[12px] uppercase font-semibold ">
              Evaluator Information
            </h1>
          </div>
          <div className="flex-1 flex">
            <div className="flex-initial w-[120px] border-r border-gray-300 flex flex-col justify-center pr-[10px]">
              <div className="flex-1 flex items-center justify-end">
                <h1 className="text-[12px] uppercase font-semibold ">Name :</h1>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <h1 className="text-[12px] uppercase font-semibold ">
                  Position :
                </h1>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex-1 flex items-center justify-end border-b border-gray-300">
                <input
                  type="text"
                  readOnly
                  value={
                    getHrSessionState.data?.hr.user_personal_details
                      ?.first_name +
                    " " +
                    getHrSessionState.data?.hr.user_personal_details?.last_name
                  }
                  className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                />
              </div>
              <div className="flex-1 flex items-center justify-end ">
                <input
                  type="text"
                  readOnly
                  value={getHrSessionState.data?.hr.user_job_details?.position}
                  className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
                />
              </div>
            </div>
          </div>
          <div className="flex-initial flex justify-center items-center border-t border-gray-300">
            <h1 className="text-[12px] uppercase font-semibold ">
              Evaluatee Information
            </h1>
          </div>
        </div>
        <div className="flex flex-initial h-[60px] border-t border-gray-300">
          <div className="flex-initial w-[120px] border-r border-gray-300 flex flex-col justify-center pr-[10px]">
            <div className="flex-1 flex items-center justify-end">
              <h1 className="text-[12px] uppercase font-semibold ">Name :</h1>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <h1 className="text-[12px] uppercase font-semibold ">
                Position :
              </h1>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex-1 flex items-center justify-end border-b border-gray-300">
              <input
                type="text"
                readOnly
                value={
                  getHrSessionState.data?.hr.user_direct_report?.first_name +
                  " " +
                  getHrSessionState.data?.hr.user_direct_report?.last_name
                }
                className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
              />
            </div>
            <div className="flex-1 flex items-center justify-end">
              <input
                type="text"
                readOnly
                value={getHrSessionState.data?.hr.user_direct_report?.position}
                className="w-full block text-[10px] h-full m-0 pl-2 text-green-600"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-initial border-l border-gray-300 w-[220px]">
        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-[12px] text-center font-semibold">
              Overall Self <br /> Assessment <br /> Rating
            </h1>
          </div>
          <div className="flex-1  border-l border-gray-300 bg-yellow-100 flex items-center justify-center">
            <h1 className="text-[28pt]  uppercase font-bold">
              {total_score == 0 ? null : total_score}
            </h1>
          </div>
        </div>

        <div className="flex-initial h-[60px] border-t border-gray-300 flex flex-col items-center">
          <h1 className="text-[11px]  uppercase font-semibold">
            Performance Period
          </h1>
          <h1 className="text-[14px] uppercase font-bold  mt-1">Year End</h1>
        </div>
      </div>
    </AssessmentSection>
  );
}

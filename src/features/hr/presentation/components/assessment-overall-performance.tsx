import { useAppSelector } from "features/config/hooks";
import { AssessmentAccordionSection } from "./assessment-accordion-section";
import { selectGetHrKraKpiGrade } from "../slices/get-hr-kra-kpi-grade.slice";
import { selectGetHrCoreCompetencyGrade } from "../slices/get-hr-core-competency-grade.slice";
import { selectGetHrFunctionalCompetencyAndPunctualityGrade } from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";

export function AssessmentOverallPerformance() {
  const getHrKraKpiGradeState = useAppSelector(selectGetHrKraKpiGrade);
  const getHrCoreCompetencyGradeState = useAppSelector(
    selectGetHrCoreCompetencyGrade
  );
  const getHrFunctionalCompetencyAndPunctualityGradeState = useAppSelector(
    selectGetHrFunctionalCompetencyAndPunctualityGrade
  );

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
    <AssessmentAccordionSection
      title="SUMMARY OF OVERALL PERFORMANCE"
      className="flex flex-col"
    >
      <div className="flex-initial">
        <h1 className="text-[11px] font-semibold text-center">
          Computation: Actual Rating X Weight = Total Score
        </h1>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold text-center">
            Areas Measured
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">
            Actual Rating
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">Weight</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">Total Score</h1>
        </div>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold ml-2">
            Section I - KRA / KPI
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 bg-yellow-100">
          <h1 className="text-[11px] font-semibold text-center ">
            {kpa_kpi.actualRating == 0 ? null : kpa_kpi.actualRating}
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">40%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">
            {kpa_kpi.totalScore == 0 ? null : kpa_kpi.totalScore}
          </h1>
        </div>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold ml-2">
            Section II - Core Competency
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 bg-yellow-100">
          <h1 className="text-[11px] font-semibold text-center">
            {core_competency.actualRating == 0
              ? null
              : core_competency.actualRating}
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">30%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">
            {core_competency.totalScore == 0
              ? null
              : core_competency.totalScore}
          </h1>
        </div>
      </div>
      <div className="flex-initial flex border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold ml-2">
            Section III - Functional Competency and Punctuality
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300 bg-yellow-100">
          <h1 className="text-[11px] font-semibold text-center">
            {functional_competency_and_punctuality_grade.actualRating == 0
              ? null
              : functional_competency_and_punctuality_grade.actualRating}
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">30%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">
            {functional_competency_and_punctuality_grade.totalScore == 0
              ? null
              : functional_competency_and_punctuality_grade.totalScore}
          </h1>
        </div>
      </div>
      <div className="flex-initial h-[25px] flex items-center border-t border-gray-300">
        <div className="flex-1">
          <h1 className="text-[11px] font-semibold mr-2 text-end">
            PMS OVERALL RATING
          </h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">100%</h1>
        </div>
        <div className="flex-initial w-[120px] border-l border-gray-300">
          <h1 className="text-[11px] font-semibold text-center">
            {total_score == 0 ? null : total_score}
          </h1>
        </div>
      </div>
    </AssessmentAccordionSection>
  );
}

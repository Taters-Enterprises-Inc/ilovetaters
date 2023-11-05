import { AssessmentAccordionSection } from "./assessment-accordion-section";
import { useAppSelector } from "features/config/hooks";
import { selectGetHrPerformanceCriteria } from "../slices/get-hr-performance-criteria.slice";
import { selectGetHrKraKpiGrade } from "../slices/get-hr-kra-kpi-grade.slice";
import { selectGetHrCoreCompetencyGrade } from "../slices/get-hr-core-competency-grade.slice";
import { selectGetHrFunctionalCompetencyAndPunctualityGrade } from "../slices/get-hr-functional-competency-and-punctuality-grade.slice";

export function AssessmentPerformanceCriteria() {
  const getHrPerformanceCriteriaState = useAppSelector(
    selectGetHrPerformanceCriteria
  );
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

  const isOnRange = (
    total_score: number,
    min: number,
    max: number
  ): boolean => {
    if (total_score >= min && total_score <= max) {
      return true;
    }
    return false;
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
      title="Grade : Equaivalent Performance Criteria Will be determined from
        Overall Rating"
      className="flex"
    >
      <div className="flex-auto flex flex-col w-[100px]">
        <div className="flex-initial">
          <h1 className="text-[11px] font-semibold text-center py-1 ">
            Total Score{" "}
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center border-t border-gray-300 p-1">
          <h1 className="text-[11px] italic  font-semibold text-center">
            Performance <br /> Criteria
          </h1>
        </div>
      </div>
      {getHrPerformanceCriteriaState.data?.performance_criteria.map((value) => {
        const checkRange = isOnRange(
          total_score,
          parseFloat(value.minimum_score),
          parseFloat(value.maximum_score)
        );

        return (
          <div className="flex-auto flex flex-col border-l border-gray-300 ">
            <div className="flex-initial">
              <h1 className="text-[11px] font-semibold text-center py-1 ">
                {value.minimum_score} - {value.maximum_score}
              </h1>
            </div>
            <div className="flex-initial flex justify-center items-center border-t border-gray-300 p-1 h-[45px]">
              <h1
                className="text-[13px] italic font-semibold text-center leading-[16px]"
                dangerouslySetInnerHTML={{
                  __html: value.name,
                }}
              />
            </div>
            <div
              className={`flex-1 flex justify-center items-center border-t border-gray-300  ${
                checkRange ? "text-white bg-green-700" : ""
              }`}
            >
              <h1 className="text-[16px] font-semibold text-center uppercase">
                {checkRange ? "True" : "False"}
              </h1>
            </div>
          </div>
        );
      })}
    </AssessmentAccordionSection>
  );
}

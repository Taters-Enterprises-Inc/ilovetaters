import { useAppSelector } from "features/config/hooks";
import { AssessmentAccordionSection } from "./assessment-accordion-section";
import { selectGetHrRatingScale } from "../slices/get-hr-rating-scale.slice";

export function AssessmentRatingScale() {
  const getHrRatingScaleState = useAppSelector(selectGetHrRatingScale);

  return (
    <AssessmentAccordionSection
      title="Rating Scale:"
      className="flex flex-col leading-[14px]"
    >
      {getHrRatingScaleState.data?.rating_scale.map((value) => (
        <div className="flex-initial flex border-t border-gray-300">
          <div className="flex-initial w-[80px] flex items-center justify-center">
            <h1 className="text-[13px] font-semibold text-center">
              {value.rate}
            </h1>
          </div>
          <div className="flex-initial w-[120px] border-l border-gray-300 flex items-center justify-center">
            <h1 className="text-[13px] font-semibold text-center">
              {value.name}
            </h1>
          </div>
          <div className="flex-1 border-l border-gray-300 p-2">
            <h1 className="text-[11px] font-semibold ">{value.description}</h1>
          </div>
        </div>
      ))}
    </AssessmentAccordionSection>
  );
}

import { ReactNode } from "react";

interface AssessmentRatingSectionProps {
  children?: ReactNode;
  title?: string;
  className?: string | undefined;
}

export function AssessmentRatingSection(props: AssessmentRatingSectionProps) {
  return (
    <section className="flex flex-col justify-stretch">
      {props.title ? (
        <div className="flex justify-center items-center">
          <div className="flex bg-white w-[400px] border-t border-l border-r border-gray-300 shadow relative">
            <div className="flex-1">
              <h1 className="text-[13px] font-semibold text-center py-1 ">
                {props.title}
              </h1>
            </div>
            <div className="flex-initial w-[60px]">
              <h1 className="text-[13px] font-semibold text-center py-1 bg-yellow-100 ">
                4.3
              </h1>
            </div>
          </div>
        </div>
      ) : null}
      {props.children}
    </section>
  );
}

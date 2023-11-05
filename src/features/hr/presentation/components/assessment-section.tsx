import { ReactNode } from "react";

interface AssessmentSectionProps {
  children?: ReactNode;
  className?: string | undefined;
}

export function AssessmentSection(props: AssessmentSectionProps) {
  return (
    <section
      className={
        props.className +
        " bg-white w-[700px] border border-gray-300 shadow relative"
      }
    >
      {props.children}
    </section>
  );
}

import { AssessmentSection } from "./assessment-section";

interface AssessmentInfoProps {
  title: string;
}

export function AssessmentInfo(props: AssessmentInfoProps) {
  return (
    <AssessmentSection className="px-6 py-3">
      <div className="bg-primary h-[10px] absolute w-full left-0 top-0" />
      <div className="space-y-4">
        <h1 className="text-[24pt] uppercase tracking-wide">{props.title}</h1>

        <h2 className="text-[11pt]">
          This is the self-assessment form for Taters. Please use this form to
          assess your qualifications and needs. The self-assessment is for
          personal evaluation and will help us better understand your
          requirements.
        </h2>

        <h2 className="text-[11pt]">
          <b>Note:</b> For any inquiries or assistance related to the
          self-assessment, please contact our team. This form is specifically
          designed for personal evaluation.
        </h2>
        <hr className="absolute w-full left-0" />

        <h2 className="text-[11pt] text-red-600 text-[14px] pt-3">
          * Indicates required question
        </h2>
      </div>
    </AssessmentSection>
  );
}

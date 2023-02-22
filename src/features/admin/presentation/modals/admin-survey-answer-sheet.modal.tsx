import { IoMdClose } from "react-icons/io";
import { selectGetAdminSurveyVerification } from "../slices/get-admin-survey-verification.slice";
import { useAppSelector } from "features/config/hooks";

interface AdminSurveyAnswerSheetModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSurveyAnswerSheetModal(
  props: AdminSurveyAnswerSheetModalProps
) {
  const getAdminSurveyVerificationState = useAppSelector(
    selectGetAdminSurveyVerification
  );

  if (props.open) {
    const surveyVerificationModal = document.getElementById(
      "survey-verification-modal"
    );
    if (surveyVerificationModal) {
      surveyVerificationModal.classList.remove("overflow-auto");
    }
  } else {
    const surveyVerificationModal = document.getElementById(
      "survey-verification-modal"
    );
    if (surveyVerificationModal) {
      surveyVerificationModal.classList.add("overflow-auto");
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Survey Answer Sheet</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 py-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <div>
            <span className="font-bold">Store Name : </span>
            <span className="font-bold text-green-800">
              {getAdminSurveyVerificationState.data?.store_name}
            </span>
          </div>
          <div>
            <span className="font-bold">Invoice Number : </span>
            <span className="font-bold text-green-800">
              {getAdminSurveyVerificationState.data?.invoice_no}
            </span>
          </div>
          {getAdminSurveyVerificationState.data?.answers.map((survey) => (
            <div>
              <span className="font-bold">{survey.question} : </span>
              <span className="font-bold text-green-800">
                {survey.answer} {survey.text}
                {survey.others}
              </span>
            </div>
          ))}
          {getAdminSurveyVerificationState.data?.ratings ? (
            <div>
              <h1 className="mb-2 text-xl font-bold">Ratings</h1>
              <div className="space-y-2">
                {getAdminSurveyVerificationState.data.ratings.map((survey) => (
                  <div>
                    <span>
                      <span className="font-bold">{survey.name}:</span>{" "}
                      <span className="font-bold text-green-800">
                        {survey.rate}
                      </span>
                    </span>
                    <div className="space-x-4 text-sm">
                      {survey.lowest_rate} = {survey.lowest_rate_text} and{" "}
                      {survey.highest_rate} = {survey.highest_rate_text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

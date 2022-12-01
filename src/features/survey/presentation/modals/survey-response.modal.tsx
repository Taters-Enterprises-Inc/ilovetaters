import { IoMdClose } from "react-icons/io";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getCustomerSurveyResponse,
  GetCustomerSurveyResponseState,
  selectGetCustomerSurveyResponse,
} from "../slices/get-customer-survey-response.slice";
import { useEffect } from "react";

interface SurveyResponseModalProps {
  open: boolean;
  onClose: () => void;
}

export function SurveyResponseModal(props: SurveyResponseModalProps) {
  const query = useQuery();
  const dispatch = useAppDispatch();

  const service = query.get("service");
  const hash = query.get("hash");

  const getCustomerSurveyResponseState = useAppSelector(
    selectGetCustomerSurveyResponse
  );

  useEffect(() => {
    if (hash && service) {
      dispatch(
        getCustomerSurveyResponse({
          hash,
          service,
        })
      );
    }
  }, [hash, service, dispatch]);

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
          <span className="text-2xl text-white">Survey Response</span>
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
          {getCustomerSurveyResponseState.data?.answers.map((survey) => (
            <div>
              <span className="font-bold">{survey.question}</span>
              <br />
              <span>
                <strong>Answer:</strong> {survey.answer} {survey.other_text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { HeaderNav, FooterNav } from "features/shared/presentation/components";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getCustomerSurveyResponse } from "../slices/get-customer-survey-response.slice";
import { selectGetCustomerSurveyResponse } from "../slices/get-customer-survey-response.slice";

export function SurveyComplete() {
  const { hash } = useParams();
  const dispatch = useAppDispatch();

  const getCustomerSurveyResponseState = useAppSelector(
    selectGetCustomerSurveyResponse
  );

  useEffect(() => {
    if (hash) {
      dispatch(
        getCustomerSurveyResponse({
          hash,
        })
      );
    }
  }, [hash, dispatch]);

  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <HeaderNav
          activeUrl="HOME"
          logoProps={{
            src:
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shared/logo/taters-logo.png",
            alt: "Taters Logo",
            className: "w-[150px] lg:w-[120px]",
          }}
        />

        <section className="container pt-4 pb-24 mx-auto">
          <h1 className='text-secondary text-6xl font-["Bebas_Neue"]'>
            Taters CUSTOMER SATISFACTION SURVEY
          </h1>

          <div className="py-2 space-y-4 lg:flex-w-full lg:max-w bg-paper ">
            <section className="text-lg text-secondary bg-paper">
              <p>
                <strong>
                  We appreciate your feedback and looking forward to serve you
                  again soon.
                </strong>
              </p>
              <p className="text-lg text-secondary bg-paper">
                We are also encouraging you to visit our website for more
                information about our deals and information
              </p>
            </section>
          </div>

          <h1 className='text-secondary text-4xl mt-4 font-["Bebas_Neue"]'>
            Answers
          </h1>

          <div className="space-y-3">
            {getCustomerSurveyResponseState.data?.answers.map((survey) => (
              <div>
                <span className="font-bold">{survey.question}:</span>{" "}
                <span className="font-bold text-green-800">
                  {survey.answer} {survey.text} {survey.others}
                </span>
              </div>
            ))}
            {getCustomerSurveyResponseState.data?.ratings ? (
              <div>
                <h1 className="text-xl font-bold mb-2">Ratings</h1>
                <div className="space-y-2">
                  {getCustomerSurveyResponseState.data.ratings.map((survey) => (
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
        </section>

        <FooterNav activeUrl="HOME" />
      </main>
    </>
  );
}

import { useAppDispatch } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { HeaderNav, FooterNav } from "features/shared/presentation/components";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { SurveyResponseModal } from "../modals";
import { getCustomerSurveyResponse } from "../slices/get-customer-survey-response.slice";

export function SurveyComplete() {
  const { hash } = useParams();
  const dispatch = useAppDispatch();

  const [openSurveyResponseModal, setOpenSurveyResponseModal] = useState(false);

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

        <section className="container py-4 mx-auto ">
          <h1 className='text-secondary text-6xl text-center font-["Bebas_Neue"]'>
            Taters CUSTOMER SATISFACTION SURVEY
          </h1>

          <div className="py-6 pt-10 space-y-4 lg:flex-w-full lg:max-w bg-paper lg:px-4">
            <section className="px-2 text-lg text-center text-secondary bg-paper">
              <p>
                <strong>
                  We appreciate your feedback and looking forward to serve you
                  again soon.
                </strong>
              </p>
              <p className="px-2 text-lg text-center text-secondary bg-paper">
                We are also encouraging you to visit our website for more
                information about our deals and information
              </p>
            </section>
          </div>

          <div className="flex items-center justify-center sm:flex-row flex-col py-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => {
                setOpenSurveyResponseModal(true);
              }}
              className="text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg"
            >
              <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                Check Answers
              </span>
            </button>
            <Link
              to="/"
              className="text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg"
            >
              <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                VISIT SITE
              </span>
            </Link>
          </div>
        </section>

        <FooterNav activeUrl="HOME" />
      </main>

      <SurveyResponseModal
        open={openSurveyResponseModal}
        onClose={() => {
          setOpenSurveyResponseModal(false);
        }}
      />
    </>
  );
}

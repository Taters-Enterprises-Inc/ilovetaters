import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function CustomerSurveyComplete() {
  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <section className="container py-4 mx-auto ">
          <div className="hidden pl-10 sm:block">
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

            <div className="flex items-center justify-center py-4">
              <Link
                to="/"
                className={`text-white border border-secondary text-xl flex space-x-2 justify-center items-center bg-[#000000] py-2 w-[400px] rounded-lg shadow-lg`}
              >
                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                  VISIT SITE
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-center pb-6 bg-paper"></div>
          </div>
        </section>
      </main>
    </>
  );
}
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import React from "react";
import { contactData, ContactDataType } from "../pages/data/contact-data";

export const ContactComponent: React.FC = (): JSX.Element => {
  return (
    <main className="min-h-screen bg-primary">
      <img
        className="lg:hidden"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/branches/hero/mobile/branches_nationwide.webp"
        }
        alt="The best pop corn in town"
      ></img>
      <img
        className="hidden w-full lg:block"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/branches/hero/desktop/branches_nationwide.webp"
        }
        alt="The best pop corn in town"
      ></img>

      <section className="blockfont-['Bebas_Neue']">
        <h1 className="text-center py-4 text-white font-['Bebas_Neue'] md:text-[3rem] text-[2rem] font-normal tracking-[2px]">
          Contact Us
        </h1>
      </section>

      <section className="container flex flex-col gap-4 text-center md:grid xl:grid-cols-4 md:grid-cols-2">
        {contactData.map(
          (
            { Icon, heading, href, paragraph, cardOpt }: ContactDataType,
            idx: number
          ): JSX.Element => {
            return cardOpt.active ? (
              cardOpt.title === "all" ? (
                <a
                  key={idx}
                  href={href}
                  className="block w-full p-6 border-gray-200 rounded-lg shadow-md bg-secondary "
                >
                  <div className="flex justify-center w-full h-auto my-4">
                    {Icon}
                  </div>
                  <h5 className="mb-2 text-medium  text-[#fff] tracking-[2px] font-['Bebas_Neue']">
                    {heading}
                  </h5>
                  <p className="text-[12px] text-[#e7e6eb]	tracking-[1px]">
                    {paragraph}
                  </p>
                </a>
              ) : (
                <div
                  key={idx}
                  className="block w-full p-6 rounded-lg shadow-md bg-secondary "
                >
                  <div className="flex justify-center w-full h-auto my-4">
                    {Icon}
                  </div>
                  <h5 className="mb-2 text-medium  tracking-[2px] text-[#fff] font-['Bebas_Neue']">
                    {heading}
                  </h5>
                  <a
                    href={href}
                    className="text-[12px] text-[#e7e6eb] hover:text-red-400	tracking-[1px]"
                  >
                    {paragraph}
                  </a>
                </div>
              )
            ) : (
              <div
                key={idx}
                className="block w-full p-6 rounded-lg shadow-md bg-secondary "
              >
                <div className="flex justify-center w-full h-auto my-4">
                  {Icon}
                </div>
                <h5 className="mb-2 text-medium tracking-[2px] text-[#fff] font-['Bebas_Neue']">
                  {heading}
                </h5>
                <p className="text-[12px] text-[#e7e6eb] tracking-[1px]	">
                  {paragraph}
                </p>
              </div>
            );
          }
        )}
      </section>
    </main>
  );
};

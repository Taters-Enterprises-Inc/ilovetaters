import React from "react";
import { contactData, ContactDataType } from "../pages/data/contact-data";

export const FranchisingContactComponent: React.FC = (): JSX.Element => {
  return (
    <>
   
      <section className="block bg-primary font-['Bebas_Neue']">
        <h1 className="text-center my-4 text-white  md:text-[3rem] text-[2rem] font-normal tracking-[2px]">
          Contact Us
        </h1>
      </section>
      <section className="px-4 container text-center md:grid gap-4 xl:grid-cols-4 md:grid-cols-2 flex flex-col">
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
                  className="block p-6 w-full bg-secondary rounded-lg  border-gray-200 shadow-md 	"
                >
                  <div className="w-full h-auto flex justify-center my-4">
                    {Icon}
                  </div>
                  <h5 className="mb-2 text-medium  text-[#fff] tracking-[2px] font-['Bebas_Neue']">
                    {heading}
                   </h5>
                  <p className="text-[12px] text-[#e7e6eb]	tracking-[1px]">{paragraph}</p>
                </a>
              ) : (
                <div
                  key={idx}
                  className="block p-6 w-full bg-secondary rounded-lg   shadow-md "
                >
                  <div className="w-full h-auto flex justify-center my-4">
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
                className="block p-6  w-full bg-secondary rounded-lg  shadow-md "
              >
                <div className="w-full h-auto flex justify-center my-4">
                  {Icon}
                </div>
                <h5 className="mb-2 text-medium tracking-[2px] text-[#fff] font-['Bebas_Neue']">
                  {heading}
                </h5>
                <p className="text-[12px] text-[#e7e6eb] tracking-[1px]	">{paragraph}</p>
              </div>
            );
          }
        )}
      </section>
    </>
  );
};

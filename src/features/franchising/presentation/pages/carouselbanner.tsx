import { useState } from "react";
import BannerModel from "partials/model/BannerModel";
import { REACT_APP_API_URL } from "partials/constants";

interface CarouselBannerProps{
    images:Array<BannerModel>;
}

export default function CarouselBanner(props:CarouselBannerProps){

    const [activeStep, setActiveStep] = useState(0);

    return (
        <div>
            {
                props.images.map((step, index) => (
                    <div key={index} className="relative">
                      {
                        Math.abs(activeStep - index) <= 2 ? (
                          <>
                            <img src={ REACT_APP_API_URL + 'assets' + step.fileName + 'top.png'} alt='carousel' className='w-full object-contain object-center lg:block hidden' />
                            <img src={ REACT_APP_API_URL + 'assets' + step.fileName + 'bot.png'} alt='carousel' className='w-full object-contain object-center lg:hidden block' />
                          </>
                        ) : null
                      }
                        <div className="absolute w-full h-full top-0 ">
                          <div className="flex flex-col lg:flex-row container h-full">
                            <div className="lg:flex-1">
                            </div>
                    </div>
                  </div>
              </div>
                  ))
            }
        </div>
    );
}
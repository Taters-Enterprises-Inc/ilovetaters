import FormControl from "@mui/material/FormControl";
import LinearProgress from "@mui/material/LinearProgress";
import { BSCSentenceRadioButton } from "./bsc-sentence-radio-button";
import { BSCRadioCustomerSurvey } from "./bsc-radio-customer-survey";

export function BSCCustomerSurveyOne() {
  return (
    <main className="lg:w-[60%] bg-white mx-auto h-auto font-['Varela_Round'] text-sm rounded my-6 md:w-[70%] w-[80%]">
      <div
        className="text-center text-secondary rounded-xl h-[20vh] lg:h-[25vh] bg-paper mb-3 
            border-t-[16px] border-solid border-secondary flex justify-evenly items-center flex-col"
      >
        <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] md:text-4xl w-[85%]">
          {" "}
          CUSTOMER SATISFACTION SURVEY{" "}
        </h1>
        <p className="text-xs lg:text-sm w-[90%] sm:w-[90%]">
          Thank you for choosing Taters! It would be great if you would
          participate in our short survey so that we can improve our service.
        </p>
      </div>

      <FormControl
        className="block py-10 text-xs font-light bg-paper md:text-sm rounded-xl w-[100%]"
        sx={{ py: 5 }}
      >
        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            1. Please rate your overall satisfaction with your Taters
            Experience.
          </p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 2. Which type of delivery did you do recently?</p>
          <BSCRadioCustomerSurvey type="order" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 3. Rate the friendliness of the delivery driver.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 4. Rate the taste of the food you received.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 5. Rate the availability of the menu items.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 6. Rate the speed of service.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 7. Rate the temperature of food.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 8. Rate the accuracy of the order.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 9. Rate the portion you received.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 10. Rate the overall value of the price you paid.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] flex justify-between items-center my-4">
          <button
            className="py-2 text-md text-white border rounded-lg bg-button w-[100px]"
            type="submit"
            value="prev"
          >
            Prev
          </button>
          <button
            className="py-2 text-md text-white border rounded-lg bg-button w-[100px]"
            type="submit"
            value="next"
          >
            Next
          </button>
        </div>

        <div className="w-[40%] ml-[50%] mt-[3%]">
          <LinearProgress
            variant="determinate"
            value={33}
            className="w-[100%] mx-auto mb-4 h-4"
            sx={{
              "& .MuiLinearProgress-bar1Determinate": {
                color: "#004d00",
                backgroundColor: "#004d00",
              },
              "&.MuiLinearProgress-root": {
                backgroundColor: "gray",
                height: 8,
              },
            }}
          />
          <p className="text-xs text-center text-black"> Page 1 of 3 </p>
        </div>
      </FormControl>
    </main>
  );
}

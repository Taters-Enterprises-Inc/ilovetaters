import FormControl from "@mui/material/FormControl";
import LinearProgress from "@mui/material/LinearProgress";
import { BSCSentenceRadioButton } from "./bsc-sentence-radio-button";
import { BSCRadioCustomerSurvey } from "./bsc-radio-customer-survey";

export function BSCCustomerSurveyTwo() {
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
          <p> 11. Did you have a problem during your experience?</p>
          <BSCRadioCustomerSurvey type="close" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            12. Based on this visit, what is the likelihood that you will
            recommend Taters to others in the next 30 days?
          </p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            13. Please tell us in three or more sentences about your experience
            with Taters.
          </p>
          <BSCRadioCustomerSurvey type="comment" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            14. If you were to choose the next store destination of Taters,
            where would you want it located?
          </p>
          <BSCRadioCustomerSurvey type="comment" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            15. If you were to add a new permanent entree on the menu, what
            would you want to see?
          </p>
          <BSCRadioCustomerSurvey type="comment" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 16. Was your order delivered as promised?</p>
          <BSCRadioCustomerSurvey type="close" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 17. Select your gender.</p>
          <BSCRadioCustomerSurvey type="gender" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p> 18. Select your gender.</p>
          <BSCRadioCustomerSurvey type="satisfaction" />
        </div>

        <div className="mx-[10%] py-5 leading-relaxed text-justify">
          <p>
            {" "}
            19. Please select which of the following best describes your
            background.
          </p>
          <BSCRadioCustomerSurvey type="background" />
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

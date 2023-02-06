import { SurveyRatingModel } from "features/survey/core/domain/survey-rating.model";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

interface SurveyRatingProps {
  rate: string;
  rating: SurveyRatingModel;
  surveyName: string;
  onRateSelect: (rate: string) => void;
}

export function SurveyRating(props: SurveyRatingProps) {
  const ratings = [];
  const lowestRate = props.rating.lowest_rate;
  const highestRate = props.rating.highest_rate;

  if (lowestRate < highestRate) {
    for (let i = lowestRate; i <= highestRate; i++) {
      ratings.push(i);
    }
  }

  if (lowestRate > highestRate) {
    for (let i = lowestRate; i >= highestRate; i--) {
      ratings.push(i);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-center text-secondary">
          {props.rating.name}
        </span>
        <span className="text-xs text-center">{props.rating.description}</span>
      </div>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span>{props.rating.lowest_rate_text}</span>
          <span>{props.rating.highest_rate_text}</span>
        </div>

        <FormControl>
          <RadioGroup
            onChange={(e) => {
              const rateString = e.target.value;
              props.onRateSelect(rateString);
            }}
            name={props.surveyName}
            value={props.rate}
          >
            <div className="flex items-center justify-between">
              {ratings.map((rate) => (
                <FormControlLabel
                  className="relative"
                  value={rate}
                  control={<Radio required size="small" color="secondary" />}
                  label={
                    <button
                      type="button"
                      onClick={() => {
                        const rateString = rate.toString();
                        props.onRateSelect(rateString);
                      }}
                      className={`h-[30px] w-[30px] text-xs ${
                        rate.toString() === props.rate
                          ? "text-white bg-secondary"
                          : "border border-secondary bg-white "
                      } rounded-full absolute left-0 top-[5px] z-10`}
                    >
                      {rate}
                    </button>
                  }
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

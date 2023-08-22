import { AdminCustomerFeedbackRatingsQuestionAvarageModel } from "./admin-customer-feedback-ratings-question-avarage.model";

export interface AdminCustomerFeedbackRatingsSectionAvarageModel {
  section_name: string;
  averages: Array<{
    lowest_rate: number;
    highest_rate: number;
    name: string;
    avg: string;
  }>;
  questions: Array<AdminCustomerFeedbackRatingsQuestionAvarageModel>;
}

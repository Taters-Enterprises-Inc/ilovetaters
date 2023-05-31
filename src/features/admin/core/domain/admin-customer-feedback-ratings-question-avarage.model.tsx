export interface AdminCustomerFeedbackRatingsQuestionAvarageModel {
  question_name: string;
  averages: Array<{
    lowest_rate: number;
    highest_rate: number;
    name: string;
    avg: string;
  }>;
}

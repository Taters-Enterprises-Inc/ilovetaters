export interface HrRatingScaleModel {
  rating_scale: Array<{
    name: string;
    description: string;
    rate: number;
  }>;
}

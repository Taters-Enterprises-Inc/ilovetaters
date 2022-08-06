import { GetDealProductVariantsRepository, GetDealProductVariantsResponse } from "features/popclub/data/repository/popclub.repository";
import { GetDealProductVariantsParam } from "../popclub.params";

export default function GetDealProductVariants(param: GetDealProductVariantsParam) : Promise<GetDealProductVariantsResponse> {
    return GetDealProductVariantsRepository(param);
}
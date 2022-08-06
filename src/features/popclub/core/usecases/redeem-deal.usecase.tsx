import { GetAllPlatformRepository, GetAllPlatformRepositoryResponse, RedeemDealRepository, RedeemDealResponse } from "features/popclub/data/repository/popclub.repository";
import { RedeemDealParam } from "../popclub.params";

export default function RedeemDealUsecase(param : RedeemDealParam) : Promise<RedeemDealResponse> {
    return RedeemDealRepository(param);
}
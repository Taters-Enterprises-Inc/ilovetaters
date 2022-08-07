import { GetLatestUnexpiredRedeemRepository, GetLatestUnexpiredRedeemResponse } from "features/popclub/data/repository/popclub.repository";


export default function GetLatestUnexpiredRedeemUsecase() : Promise<GetLatestUnexpiredRedeemResponse> {
    return GetLatestUnexpiredRedeemRepository();
}
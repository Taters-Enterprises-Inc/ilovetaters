import { GetRedeemRepository, GetRedeemResponse } from "features/popclub/data/repository/popclub.repository";
import { GetRedeemParam } from "../popclub.params";


export default function GetRedeemUsecase(param: GetRedeemParam) : Promise<GetRedeemResponse> {
    return GetRedeemRepository(param);
}
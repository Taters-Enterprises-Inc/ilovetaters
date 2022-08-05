import { GetDealRepository, GetDealResponse } from "features/popclub/data/repository/popclub.repository";


export default function GetDealUsecase(hash: string) : Promise<GetDealResponse> {
    return GetDealRepository(hash);
}
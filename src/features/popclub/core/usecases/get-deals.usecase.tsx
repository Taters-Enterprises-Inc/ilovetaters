import { GetDealsRepository, GetDealsRepositoryResponse } from "features/popclub/data/repository/popclub.repository";
import { GetDealsParam } from "../popclub.params";


export default function GetDealsUsecase(param: GetDealsParam) : Promise<GetDealsRepositoryResponse> {
    return GetDealsRepository(param);
}
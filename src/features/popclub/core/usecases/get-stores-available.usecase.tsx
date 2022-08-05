import { GetStoresAvailableRepository, GetStoresAvailableResponse } from "features/popclub/data/repository/popclub.repository";
import { GetStoresAvailableParam } from "../popclub.params";

export default function GetStoresAvailableUsecase(param : GetStoresAvailableParam) : Promise<GetStoresAvailableResponse> {
    return GetStoresAvailableRepository(param);
}
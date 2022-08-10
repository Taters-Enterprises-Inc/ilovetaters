import { GetStoresAvailableRepository, GetStoresAvailableResponse } from "features/shared/data/repository/shared.repository";
import { GetStoresAvailableParam } from "../shared.params";

export default function GetStoresAvailableUsecase(param : GetStoresAvailableParam) : Promise<GetStoresAvailableResponse> {
    return GetStoresAvailableRepository(param);
}
import { GetAllPlatformCategoriesRepository, GetAllPlatformCategoriesRepositoryResponse } from "features/popclub/data/repository/popclub.repository";
import { GetAllPlatformCategoriesParam } from "../popclub.params";

export default function GetAllOrdersUsecase(param : GetAllPlatformCategoriesParam) : Promise<GetAllPlatformCategoriesRepositoryResponse> {
    return GetAllPlatformCategoriesRepository(param);
}
import { GetAllPlatformRepository, GetAllPlatformRepositoryResponse } from "features/popclub/data/repository/popclub.repository";

export default function GetAllOrdersUsecase() : Promise<GetAllPlatformRepositoryResponse> {
    return GetAllPlatformRepository();
}
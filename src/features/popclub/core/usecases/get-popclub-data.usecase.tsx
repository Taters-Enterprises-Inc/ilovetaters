import { GetPopClubDataRepositortyResponse, GetPopClubDataRepository } from "features/popclub/data/repository/popclub.repository";

export default function GetDealsUsecase() : Promise<GetPopClubDataRepositortyResponse> {
    return GetPopClubDataRepository();
}
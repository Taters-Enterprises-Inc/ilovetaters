import { GetRedeemsRepository, GetRedeemsResponse } from "features/popclub/data/repository/popclub.repository";

export default function GetRedeemsUsecase() : Promise<GetRedeemsResponse> {
    return GetRedeemsRepository();
}
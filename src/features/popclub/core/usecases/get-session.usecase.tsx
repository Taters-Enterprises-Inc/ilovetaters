import { GetSessionRepository, GetSessionResponse } from "features/popclub/data/repository/popclub.repository";


export default function GetSessionUsecase() : Promise<GetSessionResponse> {
    return GetSessionRepository();
}
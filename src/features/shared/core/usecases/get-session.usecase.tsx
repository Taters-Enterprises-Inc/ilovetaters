import { GetSessionRepository, GetSessionResponse } from "features/shared/data/repository/shared.repository";


export default function GetSessionUsecase() : Promise<GetSessionResponse> {
    return GetSessionRepository();
}
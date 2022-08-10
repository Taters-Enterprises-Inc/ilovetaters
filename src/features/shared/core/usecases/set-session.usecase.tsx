import { SetSessionRepository, SetSessionResponse } from "features/shared/data/repository/shared.repository";
import { SetSessionParam } from "../shared.params";

export default function SetSessionUsecase(param: SetSessionParam) : Promise<SetSessionResponse> {
    return SetSessionRepository(param);
}
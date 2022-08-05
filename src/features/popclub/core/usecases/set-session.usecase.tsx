import { SetSessionRepository, SetSessionResponse } from "features/popclub/data/repository/popclub.repository";
import { SetSessionParam } from "../popclub.params";

export default function SetSessionUsecase(param: SetSessionParam) : Promise<SetSessionResponse> {
    return SetSessionRepository(param);
}
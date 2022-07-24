import { SetPopClubDataRepository, SetPopClubDataResponse } from "features/popclub/data/repository/popclub.repository";
import { SetPopclubDataParam } from "../popclub.params";

export default function SetPopClubDataUsecase(param: SetPopclubDataParam) : Promise<SetPopClubDataResponse> {
    return SetPopClubDataRepository(param);
}
import { SetStoreAndAddressRepository, SetStoreAndAddressResponse } from "features/shared/data/repository/shared.repository";
import { SetStoreAndAddressParm } from "../shared.params";

export default function SetStoreAndAddressUsecase(param: SetStoreAndAddressParm) : Promise<SetStoreAndAddressResponse> {
    return SetStoreAndAddressRepository(param);
}
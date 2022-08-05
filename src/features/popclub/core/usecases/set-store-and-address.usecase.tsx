import { SetStoreAndAddressRepository, SetStoreAndAddressResponse } from "features/popclub/data/repository/popclub.repository";
import { SetStoreAndAddressParm } from "../popclub.params";

export default function SetStoreAndAddressUsecase(param: SetStoreAndAddressParm) : Promise<SetStoreAndAddressResponse> {
    return SetStoreAndAddressRepository(param);
}
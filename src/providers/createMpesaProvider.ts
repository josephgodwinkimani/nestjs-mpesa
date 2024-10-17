import { Provider } from "@nestjs/common";
import MpesaPay from "mpesapay";
import { MpesaOptions } from "../interfaces";
import { getMpesaClient } from "../util";
import { mpesaToken } from "src/constants";

export function createMpesaProvider(options: MpesaOptions): Provider<MpesaPay> {
    return {
        provide: mpesaToken,
        useValue: getMpesaClient(options),
    };
}

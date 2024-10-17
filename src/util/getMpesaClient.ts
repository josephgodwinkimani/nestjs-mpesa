import MpesaPay from "mpesapay";
import { MpesaOptions } from "../interfaces";

export function getMpesaClient({ ...options }: MpesaOptions): MpesaPay {
    const MpesaClient: MpesaPay = new MpesaPay({
        ...options,
    });

    return MpesaClient;
}

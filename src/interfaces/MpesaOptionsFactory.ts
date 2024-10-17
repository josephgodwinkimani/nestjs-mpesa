import { MpesaOptions } from "./MpesaOptions";

export interface MpesaOptionsFactory {
    createMpesaOptions(): Promise<MpesaOptions> | MpesaOptions;
}

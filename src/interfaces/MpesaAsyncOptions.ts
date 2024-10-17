import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { MpesaOptions } from "./MpesaOptions";
import { MpesaOptionsFactory } from "./MpesaOptionsFactory";

export interface MpesaAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[];
    useClass?: Type<MpesaOptionsFactory>;
    useExisting?: Type<MpesaOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<MpesaOptions> | MpesaOptions;
}

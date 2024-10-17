import { DynamicModule, Module } from "@nestjs/common";
import { MpesaAsyncOptions, MpesaOptions } from "./interfaces";
import { MpesaCoreModule } from "./MpesaCoreModule";

@Module({})
export class MpesaModule {
    public static forRoot(options: MpesaOptions): DynamicModule {
        return {
            module: MpesaModule,
            imports: [MpesaCoreModule.forRoot(options)],
        };
    }

    public static forRootAsync(options: MpesaAsyncOptions): DynamicModule {
        return {
            module: MpesaModule,
            imports: [MpesaCoreModule.forRootAsync(options)],
        };
    }
}

import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { MpesaOptions, MpesaAsyncOptions, MpesaOptionsFactory } from "./interfaces";
import { createMpesaProvider } from "./providers";
import { getMpesaClient } from "./util";
import { mpesaModuleOptions, mpesaToken } from "./constants";

@Global()
@Module({})
export class MpesaCoreModule {
    public static forRoot(options: MpesaOptions): DynamicModule {
        const provider = createMpesaProvider(options);

        return {
            exports: [provider],
            module: MpesaCoreModule,
            providers: [provider],
        };
    }

    static forRootAsync(options: MpesaAsyncOptions): DynamicModule {
        const mpesaProvider: Provider = {
            inject: [mpesaModuleOptions],
            provide: mpesaToken,
            useFactory: (mpesaOptions: MpesaOptions) => getMpesaClient(mpesaOptions),
        };

        return {
            exports: [mpesaProvider],
            imports: options.imports,
            module: MpesaCoreModule,
            providers: [...this.createAsyncProviders(options), mpesaProvider],
        };
    }

    private static createAsyncProviders(options: MpesaAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }

    private static createAsyncOptionsProvider(options: MpesaAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: mpesaModuleOptions,
                useFactory: options.useFactory,
            };
        }

        return {
            inject: [options.useExisting || options.useClass],
            provide: mpesaModuleOptions,
            useFactory: (optionsFactory: MpesaOptionsFactory) => optionsFactory.createMpesaOptions(),
        };
    }
}

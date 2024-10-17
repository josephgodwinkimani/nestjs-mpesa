import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { mpesaToken } from "./constants";
import { MpesaOptions, MpesaOptionsFactory } from "./interfaces";
import { MpesaModule } from "./MpesaModule";
import MpesaPay from "mpesapay";

describe("MpesaModule", () => {
    const consumerKey = "YOUR_consumerKey";
    const consumerSecret = "YOUR_CONSUMER_SECRET";
    const businessShortCode = "YOUR_BUSINESS_SHORT_CODE";
    const passkey = "YOUR_PASS_KEY";
    const transactionDesc = "YOUR_TRANSACTION_DESCRIPTION";
    const accountReference = "YOUR_ACCOUNT_REFERENCE";
    const partyA = "YOUR_MPESA_PARTYA";
    const b2cSecurityCredential = "YOUR MPESA B2C SECURITY CREDENTIAL";
    const initiatorName = "YOUR MPESA INITIATORS NAME";
    const environment = "sandbox";
    const transactionType = "paybill";

    class TestService implements MpesaOptionsFactory {
        createMpesaOptions(): MpesaOptions {
            return {
                consumerKey,
                consumerSecret,
                businessShortCode,
                passkey,
                accountReference,
                transactionDesc,
                partyA,
                b2cSecurityCredential,
                initiatorName,
                environment,
                transactionType,
            };
        }
    }

    @Module({
        exports: [TestService],
        providers: [TestService],
    })
    class TestModule {}

    describe("forRoot", () => {
        it("should provide the mpesa client", async () => {
            const module = await Test.createTestingModule({
                imports: [
                    MpesaModule.forRoot({
                        consumerKey,
                        consumerSecret,
                        businessShortCode,
                        passkey,
                        accountReference,
                        transactionDesc,
                        partyA,
                        b2cSecurityCredential,
                        initiatorName,
                        environment,
                        transactionType,
                    }),
                ],
            }).compile();

            const MpesaClient = module.get<MpesaPay>(mpesaToken);
            expect(MpesaClient).toBeDefined();
            expect(MpesaClient).toBeInstanceOf(MpesaPay);
        });
    });

    describe("forRootAsync", () => {
        describe("when the `useFactory` option is used", () => {
            it("should provide the mpesa client", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        MpesaModule.forRootAsync({
                            useFactory: () => ({
                                consumerKey,
                                consumerSecret,
                                businessShortCode,
                                passkey,
                                accountReference,
                                transactionDesc,
                                partyA,
                                b2cSecurityCredential,
                                initiatorName,
                                environment,
                                transactionType,
                            }),
                        }),
                    ],
                }).compile();

                const MpesaClient = module.get<MpesaPay>(mpesaToken);
                expect(MpesaClient).toBeDefined();
                expect(MpesaClient).toBeInstanceOf(MpesaPay);
            });
        });

        describe("when the `useExisting` option is used", () => {
            it("should provide the mpesa client", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        MpesaModule.forRootAsync({
                            imports: [TestModule],
                            useExisting: TestService,
                        }),
                    ],
                }).compile();

                const MpesaClient = module.get<MpesaPay>(mpesaToken);
                expect(MpesaClient).toBeDefined();
                expect(MpesaClient).toBeInstanceOf(MpesaPay);
            });
        });

        describe("when the `useClass` option is used", () => {
            it("should provide the mpesa client", async () => {
                const module = await Test.createTestingModule({
                    imports: [
                        MpesaModule.forRootAsync({
                            useClass: TestService,
                        }),
                    ],
                }).compile();

                const MpesaClient = module.get<MpesaPay>(mpesaToken);
                expect(MpesaClient).toBeDefined();
                expect(MpesaClient).toBeInstanceOf(MpesaPay);
            });
        });
    });
});

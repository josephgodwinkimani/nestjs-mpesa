import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MpesaModule } from "../MpesaModule";
import { InjectMpesa } from "./InjectMpesa";
import MpesaPay from "mpesapay";

describe("InjectMpesa", () => {
    describe("InjectMpesa", () => {
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
        let module: TestingModule;

        @Injectable()
        class TestService {
            public constructor(@InjectMpesa() public readonly lnmClient: MpesaPay) {}
        }

        beforeEach(async () => {
            module = await Test.createTestingModule({
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
                providers: [TestService],
            }).compile();
        });

        describe("when decorating a class constructor parameter", () => {
            it("should inject the mpesa client", () => {
                const testService = module.get(TestService);
                expect(testService).toHaveProperty("lnmClient");
                expect(testService.lnmClient).toBeInstanceOf(MpesaPay);
            });
        });
    });
});

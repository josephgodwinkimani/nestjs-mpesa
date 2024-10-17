import MpesaPay from "mpesapay";
import { mpesaToken } from "./../constants";
import { createMpesaProvider } from "./createMpesaProvider";

describe("MpesaProvider", () => {
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

    describe("when called", () => {
        it("should use the correct token", () => {
            const provider = createMpesaProvider({
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
            });
            expect(provider).toHaveProperty("provide", mpesaToken);
        });

        it("should provide a Mpesa client", () => {
            const provider = createMpesaProvider({
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
            });
            expect(provider).toHaveProperty("useValue");
            expect((provider as any).useValue).toBeInstanceOf(MpesaPay);
        });
    });
});

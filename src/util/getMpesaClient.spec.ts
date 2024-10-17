import MpesaPay from "mpesapay";
import { getMpesaClient } from "./getMpesaClient";

describe("getmpesaClient", () => {
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

    it("should return the mpesa pay client", () => {
        const mpesaClient = getMpesaClient({
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
        expect(mpesaClient).toBeInstanceOf(MpesaPay);
    });
});

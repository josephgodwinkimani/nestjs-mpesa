export interface MpesaOptions {
    readonly consumerKey: string;
    readonly consumerSecret: string;
    readonly businessShortCode: string;
    readonly passkey: string;
    accountReference: string;
    transactionDesc: string;
    partyA: string;
    readonly b2cSecurityCredential: string;
    readonly initiatorName: string;
    readonly environment: "sandbox" | "live";
    readonly transactionType: "paybill" | "till";
}

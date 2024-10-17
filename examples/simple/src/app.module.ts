import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MpesaModule } from "../../../lib/MpesaModule";

@Module({
    imports: [
        MpesaModule.forRoot({
            consumerKey: process.env.MPESA_CONSUMER_KEY,
            consumerSecret: process.env.MPESA_CONSUMER_SECRET,
            businessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
            passkey: process.env.MPESA_PASSKEY,
            accountReference: process.env.MPESA_ACCOUNT_REFERENCE,
            transactionDesc: process.env.MPESA_TRANSACTION_DESC,
            partyA: process.env.MPESA_PARTYA,
            b2cSecurityCredential: process.env.MPESA_B2C_SECURITY_CREDENTIAL,
            initiatorName: process.env.MPESA_INITIATOR_NAME,
            environment: process.env.MPESA_ENVIRONMENT as "sandbox" | "live",
            transactionType: process.env.MPESA_TRANSACTION_TYPE as "paybill" | "till",
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

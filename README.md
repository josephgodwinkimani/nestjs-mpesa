# Lipa na M-PESA Payment Integration

A module for Lipa na M-PESA (LNM) payments built for the Nestjs framework.

## Installation

```bash
npm install --save nestjs-mpesa
```

## Usage

### Module Initialization

You can initialize the M-PESA module either synchronously or asynchronously.

### Synchronous Initialization

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MpesaModule } from "nestjs-mpesa";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
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
})
export class AppModule {}
```

### Asynchronous Initialization

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MpesaModule } from "nestjs-mpesa";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MpesaModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                consumerKey: configService.get("MPESA_CONSUMER_KEY"),
                consumerSecret: configService.get("MPESA_CONSUMER_SECRET"),
                businessShortCode: configService.get("MPESA_BUSINESS_SHORTCODE"),
                passkey: configService.get("MPESA_PASSKEY"),
                accountReference: configService.get("MPESA_ACCOUNT_REFERENCE"),
                transactionDesc: configService.get("MPESA_TRANSACTION_DESC"),
                partyA: configService.get("MPESA_PARTYA"),
                b2cSecurityCredential: configService.get("MPESA_B2C_SECURITY_CREDENTIAL"),
                initiatorName: configService.get("MPESA_INITIATOR_NAME"),
                environment: configService.get("MPESA_ENVIRONMENT") as "sandbox" | "live",
                transactionType: configService.get("MPESA_TRANSACTION_TYPE") as "paybill" | "till",
            }),
        }),
    ],
})
export class AppModule {}
```

### Dependency Injection

To use the M-PESA client in your service, you can inject it as follows:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectMpesa } from "nestjs-mpesa";
import MpesaPay from "MpesaPay";

@Injectable()
export class AppService {
    public constructor(@InjectMpesa() private readonly mpesaClient: MpesaPay) {}

    // To initiate a payment using Mpesa Pay, you can call the stkPush method:
    async initiatePayment(amount: string, phoneNumber: string, callbackUrl: string) {
        try {
            const response = await this.mpesaClient.stkPush({ amount, phoneNumber, callbackUrl });
            console.log(response);
            // Handle the response data
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }
}
```

## Examples

-   [simple](./examples/simple/)
-

## Acknowledgements

-   [nestjs](https://nestjs.com)
-   [mpesapay](https://www.npmjs.com/package/mpesapay)

## Contributing

Thanks to everyone who has contributed to this project so far.

<a href="https://github.com/josephgodwinkimani/nestjs-mpesa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=josephgodwinkimani/nestjs-mpesa" />
</a>

## License

[MIT](./LICENSE)

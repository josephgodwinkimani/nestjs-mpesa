import { Injectable } from "@nestjs/common";
import { InjectMpesa } from "../../../lib";
import MpesaPay from "MpesaPay";

@Injectable()
export class AppService {
    constructor(@InjectMpesa() private readonly mpesaClient: MpesaPay) {}

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

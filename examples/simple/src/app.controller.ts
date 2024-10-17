import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async pay(): Promise<void> {
        return this.appService.initiatePayment("1", "254722100156", "https://example.com/callback");
    }
}

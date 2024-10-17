import { Inject } from "@nestjs/common";
import { mpesaToken } from "../constants";

export function InjectMpesa() {
    return Inject(mpesaToken);
}

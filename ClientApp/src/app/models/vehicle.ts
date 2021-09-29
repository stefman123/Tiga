import { Contact } from "./Contact";
import { KeyValuePair } from "./KeyValuePair";

export interface Vechicle {
    id: number;
    model:KeyValuePair;
    make:KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;
}


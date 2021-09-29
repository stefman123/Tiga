import { Contact } from "./Contact";


export interface SaveVechicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}

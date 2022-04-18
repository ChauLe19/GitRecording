import { File } from "./filetree";
import { Timestamp } from "./timestamp";
export class Recording{
    title!: string;
    filetree!: File[];
    timestamps!: Timestamp[];
    audioURL: string = "";
    url:string = ""
}
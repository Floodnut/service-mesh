import { Vars } from "../../common/vars";

export class GCSVars extends Vars {
    location: string;
    class?: string | "STANDARD";
    website?: {
        main: string;
        notFound: string;
    };
    cors?: {
        origin: string[];
        method: string[];
        responseHeader: string[];
    };
}

export class GCSBucketIAMMemberVars extends Vars {
    role: string;
    member: string;
    condition?: {
        title: string;
        description: string;
        expression: string;
    }[] 
}

export const vars: GCSVars = {
    name: "gcs",
    location: ""
}

export const iamVars: GCSBucketIAMMemberVars = {
    name: "demo",
    role: "roles/storage.objectViewer",
    member: "allUsers",
}
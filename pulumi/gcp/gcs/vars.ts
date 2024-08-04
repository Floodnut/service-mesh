export class GCSVars {
    name: string;
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
    iam?: GCSBucketIAMMemberVars[];
}

export interface GCSBucketIAMMemberVars {
    name: string;
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
    location: "",
    iam: [
        {
            name: "demo",
            role: "roles/storage.objectViewer",
            member: "allUsers",
        }
    ] as GCSBucketIAMMemberVars[]
}

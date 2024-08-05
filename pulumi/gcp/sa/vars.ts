import { name } from "../../common/util";

export interface ServiceAccountVars {
    accountId: string;
    displayName?: string;
    isWorkloadIdentity?: boolean | false;
    iamBindings?: {
        name: string;
        role: string;
        members: string[];
    }[];
}

export const vars: ServiceAccountVars = {
    accountId: name({prefix: "sa", alias: "demo"}),
    displayName: name({prefix: "sa", alias: "demo"}),
    isWorkloadIdentity: false,
    iamBindings: []
}
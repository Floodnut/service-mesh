export interface FirewallVars {
    name: string;
    network: string;
    direction?: string | "INGRESS";
    description?: string;
    disabled?: boolean;
    priority?: number;
    ranges?: string[];
    sourceTags?: string[];
    sourceServiceAccounts?: string[];
    targetTags?: string[];
    targetServiceAccounts?: string[];
    allow?: {
        protocol: string;
        ports?: string[];
    }[];
    deny?: {
        protocol: string;
        ports?: string[];
    }[];
}

export const vars: FirewallVars = {
    name: "demno",
    network: "default",
    direction: "INGRESS",
    disabled: false,
    priority: 1000,
    ranges: [""]
}
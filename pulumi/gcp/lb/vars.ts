import { name } from "../../common/util";


export interface LoadbalancerBackendVars {
    group: string;
    zone: string;
    balancingMode?: string | "RATE";
    capacityScaler?: number | 1;
    maxRatePerEndpoint?: number | 10;
}

export interface LoadbalancerHealthCheckVars {
    port: number | 80;
    portName?: string;
    requestPath?: string | "/";
}

export interface LoadbalancerVars {
    name: string;
    sslId: string;
    backends: LoadbalancerBackendVars[];
    healthCheck?: LoadbalancerHealthCheckVars;
}

export const vars: LoadbalancerVars = {
    name: name({prefix: "lb", alias: "demo"}),
    sslId: name({prefix: "ssl", alias: "demo"}),
    backends: [
        {
            group: name({prefix: "instance-group", alias: "demo"}),
            zone: "us-central1-a",
            balancingMode: "RATE",
            capacityScaler: 1,
            maxRatePerEndpoint: 10,
        }
    ] as LoadbalancerBackendVars[],
    healthCheck: {
        port: 80,
        portName: "http",
        requestPath: "/",
    } as LoadbalancerHealthCheckVars
};

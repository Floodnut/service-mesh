import { name } from "../../common/util";
import { VPCRoutingMode } from "./enums";

export interface SubnetVars {
    name: string
    region: string
    ipCidrRange: string
    secondaryIpRanges?: {
        rangeName: string
        ipCidrRange: string
    }[]
}

export interface VPCVars {
    name: string
    routingMode?: string
    connector?: {
        ipCidrRange: string
    }
    subnets: SubnetVars[]
}

export const vars: VPCVars = {
    name: name({prefix: "vpc", alias: "demo"}),
    routingMode: VPCRoutingMode.REGIONAL,
    connector: {
        ipCidrRange: ""
    },
    subnets: [
        {
            name: name({prefix: "subnet", alias: "demo"}),
            region: "us-central1",
            ipCidrRange: ""
        }
    ]
}
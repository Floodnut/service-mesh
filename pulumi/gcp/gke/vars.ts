import { name } from "../../common/util";

export interface ContainerNodePoolVars {
    name: string;
    nodeCount: number;
    machineType: string;
    nodeLocations: string[];
    diskSizeGb: number;
}

export interface GKEVars { // Google Container Cluster
    name: string;
    location: string;
    network: string;
    subnet: string;
    masterIpv4CidrBlock: string;
    ipAllocationPolicy: {
        cluster_secondary_range_name: string;
        services_secondary_range_name: string;
    }
    nodePools: ContainerNodePoolVars[]
}

export const vars: GKEVars = {
    name: "gke",
    location: "US",
    network: "default",
    subnet: "default",
    masterIpv4CidrBlock: "",
    ipAllocationPolicy: {
        cluster_secondary_range_name: "",
        services_secondary_range_name: "",
    },
    nodePools: [
        {
            name: name({prefix: 'node-pool', alias: "demo"}),
            nodeCount: 1,
            nodeLocations: ["us-central1-a"],
            machineType: "e2-medium",
            diskSizeGb: 100,
        }
    ]
}
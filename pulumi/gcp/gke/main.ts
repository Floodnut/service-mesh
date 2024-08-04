import * as gcp from "@pulumi/gcp";
import { name } from "../../common/util";
import { vars } from "./vars";
import { NETWORKING_MODE } from "./constants";
import { NodePool } from "@pulumi/gcp/container";

const resourcePrefix = "gke";

const gkeCluster = new gcp.container.Cluster(name({prefix: resourcePrefix, alias: "demo"}), {
    name: name({prefix: resourcePrefix, alias: "demo"}),
    network: vars.network,
    subnetwork: vars.subnet,
    location: vars.location,
    removeDefaultNodePool: true,
    enableShieldedNodes: true,
    initialNodeCount: 1,
    networkingMode: NETWORKING_MODE.VPC_NATIVE,
});

const nodePools : NodePool[] = vars.nodePools.map(nodePool => {
    return new gcp.container.NodePool(nodePool.name, {
        cluster: gkeCluster.name,

        name: nodePool.name,
        nodeCount: nodePool.nodeCount,
        nodeLocations: nodePool.nodeLocations,

        management: {
            autoRepair: true,
            autoUpgrade: true,
        },
        nodeConfig: {
            preemptible: false,
            machineType: nodePool.machineType,
            diskSizeGb: nodePool.diskSizeGb,
            spot: true, 
            oauthScopes: [
                "https://www.googleapis.com/auth/compute",
                "https://www.googleapis.com/auth/cloud-platform",
                "https://www.googleapis.com/auth/devstorage.read_only",
                // optional scopes
                "https://www.googleapis.com/auth/logging.write",
                "https://www.googleapis.com/auth/monitoring",
            ],
            tags: ["ssh"]
        },
        // workloadMetadataConfig: {
        //  mode: "GKE_METADATA",
        // },
    });
});

export {
    gkeCluster,
    nodePools,
}
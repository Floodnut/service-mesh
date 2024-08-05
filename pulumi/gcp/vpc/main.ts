import * as gcp from "@pulumi/gcp";

import { name } from "../../common/util";
import { vars } from "./vars";

const vpcNetwork = new gcp.compute.Network(vars.name, {
    name: vars.name,
    autoCreateSubnetworks: false,
    routingMode: (!vars.routingMode) ? "REGIONAL" : vars.routingMode,
});

const subnets = vars.subnets.map((subnet) => {
    return new gcp.compute.Subnetwork(subnet.name, {
        name: subnet.name,
        network: vpcNetwork.id,
        ipCidrRange: subnet.ipCidrRange,
        region: subnet.region,
        secondaryIpRanges: subnet.secondaryIpRanges?.map((secondaryIpRange) => {
            return {
                rangeName: secondaryIpRange.rangeName,
                ipCidrRange: secondaryIpRange.ipCidrRange
            }
        }),
    });
});

const connector = vars.connector ? new gcp.vpcaccess.Connector(name({prefix: "vpc-connector", alias: "demo"}), {
    name: name({prefix: "vpc-connector", alias: "demo"}),
    network: vpcNetwork.selfLink,
    ipCidrRange: vars.connector.ipCidrRange,
}) : undefined;


const connectorRouter = new gcp.compute.Router(name({prefix: "vpc-connector-router", alias: "demo"}), {
    name: name({prefix: "vpc-connector-router", alias: "demo"}),
    network: vpcNetwork.name,
});


const connectorRouterNat = new gcp.compute.RouterNat(name({prefix: "vpc-connector-router-nat", alias: "demo"}), {
    name: name({prefix: "vpc-connector-router-nat", alias: "demo"}),
    router: connectorRouter.id,
    region: connectorRouter.region,
    natIpAllocateOption: "AUTO_ONLY",
    sourceSubnetworkIpRangesToNat: "ALL_SUBNETWORKS_ALL_IP_RANGES",
    autoNetworkTier: "STANDARD",
});

export {
    vpcNetwork,
    subnets,
    connector,
    connectorRouter,
    connectorRouterNat
}
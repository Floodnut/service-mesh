import * as gcp from "@pulumi/gcp";
import { config } from "../config/config";
import { name, lookup } from "../../common/util";
import { vars } from "./vars";

const resourcePrefix = "firewall";

const firewall = new gcp.compute.Firewall(name({prefix: resourcePrefix, alias: vars.name}), {
    name: name({prefix: resourcePrefix, alias: vars.name}),
    network: vars.network,
    sourceRanges: vars.direction == "INGRESS" ? vars.ranges : undefined,
    destinationRanges : vars.direction == "EGRESS" ? vars.ranges : undefined,
    allows: lookup<gcp.types.input.compute.FirewallAllow>(config, "allow", []),
    denies: lookup<gcp.types.input.compute.FirewallDeny>(config, "deny", []),
});

export {
    firewall,
}
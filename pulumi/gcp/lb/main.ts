import * as gcp from "@pulumi/gcp";
import { name } from "../../common/util";
import { vars} from "./vars";

const healthCheck = new gcp.compute.HealthCheck(name({prefix: "health-check", alias: "demo"}), {
    name: name({prefix: "health-check", alias: "demo"}),
    checkIntervalSec: 1,
    timeoutSec: 1,
    healthyThreshold: 1,
    unhealthyThreshold: 1,
    httpHealthCheck: vars.healthCheck,
});

const backendServices = new gcp.compute.BackendService(name({prefix: "backend-service", alias: "demo"}), {
    name: name({prefix: "backend-service", alias: "demo"}),
    portName: "http",
    protocol: "HTTP",
    timeoutSec: 10,
    backends: vars.backends,
    healthChecks: healthCheck.id,
});

const urlMap = new gcp.compute.URLMap(name({prefix: "url-map", alias: "demo"}), {
    name: name({prefix: "url-map", alias: "demo"}),
    defaultService: backendServices.id,
});

const targetHttpsProxy = new gcp.compute.TargetHttpsProxy(name({alias: 'targetHttpsProxy'}), {
    name: name({alias: 'targetHttpsProxy'}),
    urlMap: urlMap.id,
});

const globalForwardingRule = new gcp.compute.GlobalForwardingRule(name({prefix: 'global-forwarding-rule', alias: 'https'}), {
    name: name({prefix: 'global-forwarding-rule', alias: 'https'}),
    target: targetHttpsProxy.id,
    portRange: "443",
});

export {
    healthCheck,
    backendServices,
    urlMap,
    targetHttpsProxy,
    globalForwardingRule
}
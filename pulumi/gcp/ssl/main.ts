import * as gcp from "@pulumi/gcp";

import { vars } from "./vars";


const ssl = new gcp.compute.ManagedSslCertificate((vars.name), {
    name: vars.name,
    managed: {
        domains: vars.domains,
    }
});

export {
    ssl
}

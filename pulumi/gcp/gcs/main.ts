import * as gcp from "@pulumi/gcp";
import { name } from "../../common/util";
import { vars, iamVars } from "./vars";

const resourcePrefix = "gcs-bucket";

const gcsBucket = new gcp.storage.Bucket(name({prefix: resourcePrefix, alias: "demo"}), {
    name: name({prefix: resourcePrefix, alias: "demo"}),
    location: vars.location,
    storageClass: vars.class,
});

const bucketIamMember = new gcp.storage.BucketIAMMember(name({prefix: `${resourcePrefix}-iam-member`, alias: "demo"}), {
    bucket: gcsBucket.name,
    role: iamVars.role,
    member: iamVars.member,
});

export {
    gcsBucket,
    bucketIamMember,
}

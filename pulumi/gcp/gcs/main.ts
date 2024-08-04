import * as gcp from "@pulumi/gcp";
import { name } from "../../common/util";
import { vars } from "./vars";

const resourcePrefix = "gcs-bucket";

const gcsBucket = new gcp.storage.Bucket(name({prefix: resourcePrefix, alias: vars.name}), {
    name: name({prefix: resourcePrefix, alias: vars.name}),
    location: vars.location,
    storageClass: vars.class,
});

const bucketIamMembers = vars.iam?.map((iamVars) => {
    return new gcp.storage.BucketIAMMember(name({prefix: `${resourcePrefix}-iam-member`, alias: iamVars.name}), {
        bucket: gcsBucket.name,
        role: iamVars.role,
        member: iamVars.member,
    });
});

export {
    gcsBucket,
    bucketIamMembers,
}

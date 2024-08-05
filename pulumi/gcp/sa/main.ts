import * as gcp from "@pulumi/gcp";
import { name } from "../../common/util";
import { vars } from "./vars";

const sa = new gcp.serviceaccount.Account(vars.accountId, {
    accountId: vars.accountId,
    displayName: vars.displayName,
});


const saIam = vars.iamBindings?.map((binding) => {
    return new gcp.serviceaccount.IAMBinding(binding.name, {
        serviceAccountId: sa.id,
        role: binding.role,
        members: binding.members
    });
});


const saIamWorkIdentity = vars.isWorkloadIdentity ?  new gcp.serviceaccount.IAMBinding(name({prefix: "sa-iam-binding", alias: "workflow_identity"}), {
    serviceAccountId: sa.id,
    role: "roles/iam.workloadIdentityUser",
    members: [`serviceAccount:${sa.email}`]
}) : undefined;

export {
    sa,
    saIam,
    saIamWorkIdentity
}
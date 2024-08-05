import { name } from "../../common/util";

export interface SSLVars {
    name: string
    domains: string[]
}

export const vars: SSLVars = {
    name: name({prefix: "ssl", alias: "demo"}),
    domains: ["example.com"]
}
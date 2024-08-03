import * as pulumi from '@pulumi/pulumi';

interface CommonConfig {
  APP_ENV: string;
  GCLOUD_REGION: string;
  [key: string]: string;
}

const cfg = new pulumi.Config();

export const config = cfg.requireObject<CommonConfig>('config');

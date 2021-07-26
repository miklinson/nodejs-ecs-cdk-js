#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { NodejsEcsCdkJsStack } = require('../lib/nodejs-ecs-cdk-js-stack');

const app = new cdk.App();
new NodejsEcsCdkJsStack(app, 'NodejsEcsCdkJsStack', {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION, 
  },
});
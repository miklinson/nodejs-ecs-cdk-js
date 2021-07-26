# NodeJS Rest API deployment in AWS ECS + Fargate using CDK

This project will deploy a Simple NodeJS Rest API app using CDK with CodePipeline for CI/CD. 

### NodeJS source:
[NodeJS Source](https://github.com/miklinson/dockerized-simple-nodejs-rest-api)

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template

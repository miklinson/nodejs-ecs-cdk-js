const { Vpc } = require('@aws-cdk/aws-ec2');
const { Cluster } = require('@aws-cdk/aws-ecs');
const { ApplicationLoadBalancedFargateService } = require('@aws-cdk/aws-ecs-patterns');
const { Stack, Fn } = require('@aws-cdk/core');

class NodejsEcsCdkJsStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const vpcId = Fn.importValue('VpcId');

    const liveVpc =  Vpc.fromLookup(this, 'getVPC', {
      isDefault: false,
      vpcId: vpcId
    });

    const nodeJsCluster  = new Cluster(this, "NoodeJsApiCluster", {
      vpc: liveVpc
    });

    // Create a load-balanced Fargate service and make it public
    new ApplicationLoadBalancedFargateService(this, "NodeJSEcsFargateService", {
      cluster: nodeJsCluster,
      cpu: 256, // Default is 256
      desiredCount: 1,
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true
    })
  }
}

module.exports = { NodejsEcsCdkJsStack }

const { Vpc, SubnetType } = require('@aws-cdk/aws-ec2');
const { Repository } = require('@aws-cdk/aws-ecr');
const { Cluster, ContainerImage, RepositoryImage } = require('@aws-cdk/aws-ecs');
const { ApplicationLoadBalancedFargateService } = require('@aws-cdk/aws-ecs-patterns');
const { Stack, Fn } = require('@aws-cdk/core');

class NodejsEcsCdkJsStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const vpcId = this.node.tryGetContext('vpc').id;

    const liveVpc =  Vpc.fromLookup(this, 'getVPC', {
      isDefault: false,
      vpcId: vpcId
    });

    const nodeJsCluster  = new Cluster(this, "NoodeJsApiCluster", {
      vpc: liveVpc
    });

    const nodeRestImage = Repository.fromRepositoryName(this, 'NodeJsRestImage', 'nodejs-rest-sample')
    
    // Create a load-balanced Fargate service and make it public
    const nodeJFargate = new ApplicationLoadBalancedFargateService(this, "NodeJSEcsFargateService", {
      cluster: nodeJsCluster,
      cpu: 256, // Default is 256
      desiredCount: 1,
      taskImageOptions: { 
        image: ContainerImage.fromEcrRepository(nodeRestImage),
        containerPort: 8080,
      },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true
    })

    const cfnLoadBalancer = nodeJFargate.loadBalancer.node.defaultChild
    cfnLoadBalancer.subnets = liveVpc.selectSubnets({ onePerAz: true, subnetType: SubnetType.PUBLIC}).subnetIds
  }
}

module.exports = { NodejsEcsCdkJsStack }

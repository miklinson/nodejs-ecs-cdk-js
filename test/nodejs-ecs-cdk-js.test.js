const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const NodejsEcsCdkJs = require('../lib/nodejs-ecs-cdk-js-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NodejsEcsCdkJs.NodejsEcsCdkJsStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

print(context.getVariable('request.querystring'));
// Reference error to trigger Default Fault Rule
ctx.getVariable('request.querystring');
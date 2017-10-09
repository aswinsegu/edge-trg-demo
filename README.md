# Demos and labs for Apigee Edge Developer Training

1. Hello Proxy (trg-demo-hello)
	- Assign Message policy to say "Hello World!"
	- Attach in proxy response post flow
	- Enable/Disable the policy and check behavior
	- If querystring present say "Hello <querystring>" otherwise "Hello World!"
	- JavaScript callout to decide the echo message
	- JavaScript print statement to log echo message
2. Test RBAC
	- Create a custom role HelloRole with permission to 
		+ View all API proxies
		+ View and trace trg-demo-hello proxy
	- Participants pair up and do this
		+ Add a user with Hello Role
		+ Shift to other org and verify the restricted permission
		+ Revert back and delete the user
3. Echo (trg-demo-echo)
	- Echo {request.querystring}
	- Raise Fault if {request.querystring} is not sent
	- Raise Fault if {request.verb} is not GET
	- Trace to check how fault condition breaks flow execution
4. API Products (trg-demo-apikey)
	- Create Hello and Echo API Product
	- Add Verify API Key policy to both hello and echo API
	- Trace and see variables populated
	- Add Fault Rule to send custom 401 message if apikey is invalid "InvalidApiKey"
	- Add Fault Rule to send custom 404 message if apikey is invalid "FailedToResolveAPIKey"
	- Add Default Fault to send 500 error and trigger it by sending a queryparam trigger=500
5. Developer Portal
	- OpenAPI Spec 
		+ Take raw content from (https://github.com/apigee/api-platform-samples/blob/master/default-proxies/helloworld/openapi/mocktarget.yaml)
	- Create Proxy from OpenAPI Spec with VerifyAPIKey
	- Create a PortalProduct
	- Create developer portal
	- View Product details
	- Register and sign in
	- Create app and verify call
	- Check on management UI to see developer and app are added
6. httpbin (trg-demo-target)
	- Add passthrough proxy to httpbin. (Make sure to use http and not https, https not working)
	- Named target server
	- Add Spike Arrest policy and check behavior
	- Add Quota policy and check behavior
7. Authentication (trg-demo-authn)
	- Setup passthrough proxy to httpbin "http://httpbin.org/basic-auth/:user/:passwd"
	- Basic Authentication - "curl -i -u "aa:bb" http://httpbin.org/basic-auth/aa/bb"
	- Setup KVM map httpbin with username and password
	- Get username and password from KVM policy
	- Basic Authentication from Shared Flow and Flow Callout
8. Authorization (trg-demo-authz-)
	- Setup trg-demo-authz-hello with hello proxy
	- Setup trg-demo-authz-clientcred with client credentials grant type
	- Setup trg-demo-authz-password with password grant type
	- Setup trg-demo-authz-refresh for refresh token
	- Demo Authorization Code grant type
9. Logging (trg-demo-log)
	- Setup passthrough proxy to httpbin
	- Flow logger
		+ JavaScript print
		+ Log with Message Logging policy 
			- Loggly (https://<username>.loggly.com/search)
			- Source Setup tab > Customer tokens > get the token here to use in Message Logging policy
			- Search or Dashboard tab to look at logs
		+ Flow Hook for logging (does not work when last checked)
10. Transformation (trg-demo-transform)
	- Setup passthrough proxy to httpbin
	- JSON to XML with "https://httpbin.org/get"
	- XML to JSON with "https://httpbin.org/xml"
11. Caching
	- Response Cache (trg-demo-cache-response)
		+ Call to "https://httpbin.org/delay/10" will delay for 10 seconds
		+ Response cache with Key as request.uri will get it quicker after first
		+ If request.ui changes with "?key=value", then a new call happens
	- Data cache (trg-demo-cache)
		+ Setup current time in cache with "https://now.httpbin.org/"
		+ Lookup cache and if cachehit do not call target, show cached timestamp
		+ After cache timeout a new call will be made showing a new timestamp
12. Service Callout (trg-demo-mashup)
	- TODO
13. Analytics
	- Standard reports
	- Create a custom report
	- Create stats collector policy and create a custom report on it
14. Management API
	- Demo samples for api proxy revisions, KVMs, products, etc
	- Demo authn and authz for management API calls
		+ Using basic auth and OAuth2
		+ Using tools acurl and get_token
15. NodeJS
	- Demo Hello/Echo
16. Dev Tools
	- OpenAPI Spec
	- Git / Branching
	- Maven
	- ApigeeTool
	- Testing / BDD (https://github.com/gahana/echo)
	- Demo Jenkins
17. API BaaS
	- Data store best practices
		+ http://docs.apigee.com/app-services/content/optimizing-access-your-api-baas-data-store
	- When to use BaaS and when not to
		+ http://docs.apigee.com/api-baas/content/evaluating-api-baas-data-store
18. Monetization

19. Patterns and AntiPatterns
	- Deployment patterns
		+ Fault handling (https://community.apigee.com/content/kbentry/23724/an-error-handling-pattern-for-apigee-proxies.html)


## Policies covered

- AssignMessage
- JavaScript
- RaiseFault
- VerifyAPIKey
- SpikeArrest
- Quota
- BasicAuthentication
- KVM
- FlowCallout
- ExtractVariables
- MessageLogging
- JSONToXML
- XMLToJSON
- OAuthV2
- Cache
- Statistics Collector?
- Service Callout?


## Features Covered
- API Proxy
- API Product
- API Developer
- API Application
- FaultRules
- DefaultFaultRule
- Named Target Server
- Shared Flow
- Flow Hook ?
- TCP Monitor
- HTTP Monitor
- Management API

## Quota policy config
Quota configuration on API Product

```xml
<Allow count="2" countRef="verifyapikey.Verify-API-Key-1.apiproduct.developer.quota.limit"/>
<Interval ref="verifyapikey.Verify-API-Key-1.apiproduct.developer.quota.interval">1</Interval>
<TimeUnit ref="verifyapikey.Verify-API-Key-1.apiproduct.developer.quota.timeunit">minute</TimeUnit>
```

Quota configured as cusotm attribute on application

```xml
<Allow count="2" countRef="app_quota_limit"/>
<Interval ref="app_quota_interval">1</Interval>
<TimeUnit ref="app_quota_timeunit">minute</TimeUnit>
```



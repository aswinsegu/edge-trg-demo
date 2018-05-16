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
		+ Take raw content from (https://goo.gl/ut6A6d) (https://github.com/apigee/api-platform-samples/blob/master/default-proxies/helloworld/openapi/mocktarget.yaml)
		+ Or from here emp-spec: (https://goo.gl/oWVyHS) (http://playground.apistudio.io/070cde0a-44f7-4e2c-8085-6e1020db7baf/spec)
	- Create 
		+ Proxy from OpenAPI Spec (emp-api)
		+ Add SpikeArrest
		+ Add VerifyAPIKey
	- Create a EmpProduct
	- Create developer portal (emp-portal)
	- View Product details
	- Register and sign in
	- Create app and verify call
	- Check on management UI to see developer and app are added
	- Add Quota policy and check behavior
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
	- Get JSON response from "http://mocktarget.apigee.net/json"
	- Get JSON response from "http://httpbin.org/uuid"
	- Merge the two responses to get a single JSON response with attributes firstName, lastName, city, state and uuid
13. Analytics
	- Standard reports
	- Create a custom report
		+ Traffic and proxy errors by verb
		+ Traffic and proxy errors by day of the week
	- Create stats collector policy and create a custom report on it
	- Idea: Histogram of response times for requests
14. Management API
	- Demo samples for api proxy revisions, KVMs, products, etc
	- Demo authn and authz for management API calls
		+ Using basic auth and OAuth2
		+ Using tools acurl and get_token
15. NodeJS
	- Demo Hello/Echo
		+ https://github.com/gahana/node-echo
		+ https://github.com/gahana/node-hello
16. Dev Tools
	- OpenAPI Spec
	- Git / Branching
	- Maven (https://github.com/gahana/node-hello)
	- ApigeeTool
	- Testing / BDD (https://github.com/gahana/echo)
	- Demo Jenkins
17. Monetization
	- Showcase features
18. Patterns and AntiPatterns
	- Deployment patterns
		+ Fault handling (https://community.apigee.com/content/kbentry/23724/an-error-handling-pattern-for-apigee-proxies.html)
    - Anti patterns book by support team
    	+ https://community.apigee.com/storage/attachments/5345-the-book-of-apigee-edge-antipatterns.pdf
19. Load balancing and Health check
	- demo-lb-ping proxy deployed on org 1
	- demo-lb-pong proxy deployed on org 2
	- demo-lb-test proxy deployed on any org
	- Modify load balance algorithm and check behavior
	- Undeploy pong proxy to see calls routed to only ping without any error
	- Redeploy pong proxy to see calls routed to pong automatically
20. REST to SOAP to REST
	- Pick WSDL `https://ws.cdyne.com/delayedstockquote/delayedstockquote.asmx?wsdl`
	- UI `https://ws.cdyne.com/delayedstockquote/delayedstockquote.asmx`
	- Try operation `GetQuote`
	- Request `curl -i "http://ws.cdyne.com/delayedstockquote/delayedstockquote.asmx/GetQuote?StockSymbol=AAPL&LicenseKey=0"`
	- Request `curl -i "https://org-test.apigee.net/trg-soap/quote?StockSymbol=AAPL&LicenseKey=0"`
	- What more:
		- Add API Key and secure the API
		- Trim nested objects from the response. Add below JavaScript and conditional flow:

```js
var content = response.content;
var quote = JSON.parse(content);
quote = quote.GetQuoteResponse.GetQuoteResult;
quote.log = 'Processed by Apigee at ' + (new Date()).toString();
context.setVariable('response.content', JSON.stringify(quote));
```

```xml
    <Flow name="GetQuoteResponseTrim">
        <Description>GetQuoteResponseTrim</Description>
        <Request/>
        <Response>
            <Step>
                <Name>JavaScript-1</Name>
            </Step>
        </Response>
        <Condition>(proxy.pathsuffix MatchesPath "/quote")</Condition>
    </Flow>
```

21. JSON Threat Protection (demo-threat-json)
	- Deploy proxy with target set to `https://httpbin.org/post`
	- Send below JSON object and get success response from httpbin
	- Add JSON Threat Protection policy with default values
	- Now the request should error out
	- Notice the error message and correct that part of the JSON object by trimming it
	- Repeat till you get a success message

```json
{
	"obj-count": {
		"prop01": "value", "prop02": "value", "prop03": "value", "prop04": "value", "prop05": "value",
		"prop06": "value", "prop07": "value", "prop08": "value", "prop09": "value", "prop10": "value",
		"prop11": "value", "prop12": "value", "prop13": "value", "prop14": "value", "prop15": "value",
		"prop16": "value"
	},
	"arr-count": [
		"entry01", "entry02", "entry03", "entry04", "entry05",
		"entry06", "entry07", "entry08", "entry09", "entry10",
		"entry11", "entry12", "entry13", "entry14", "entry15",
		"entry16", "entry17", "entry18", "entry19", "entry20",
		"entry21"
	],
	"depth01": { "depth02": { "depth03": { "depth04": { "depth05": { "depth06": { "depth07": { "depth08": { "depth09": { "depth10": { "depth11": "value" } } } } } } } } } },
	"a-really-long-object-name-which-will-be-hopefully-caught-by-a-good-api-management-product": "value",
	"long-value": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<JSONThreatProtection async="false" continueOnError="false" enabled="true" name="JSON-Threat-Protection-1">
    <DisplayName>JSON Threat Protection-1</DisplayName>
    <Properties/>
    <ArrayElementCount>20</ArrayElementCount>
    <ContainerDepth>10</ContainerDepth>
    <ObjectEntryCount>15</ObjectEntryCount>
    <ObjectEntryNameLength>50</ObjectEntryNameLength>
    <Source>request</Source>
    <StringValueLength>500</StringValueLength>
</JSONThreatProtection>
```

22. Protection against injection attacks (demo-threat-injection)
	- Passthrough proxy to target `https://httpbin.org/anything`
	- Injection attack goes through `curl "https://ssudhindras-eval-test.apigee.net/demo-threat-injection?search=drop%20table%20users"`
	- Add `RegularExpressionProtection` policy with QueryParam on search with pattern `<Pattern>[\s]*(?i)((delete)|(exec)|(drop\s*table)|(insert)|(shutdown)|(update)|(\bor\b))</Pattern>`
	- Try these
		- Error `curl "https://ssudhindras-eval-test.apigee.net/demo-threat-injection?search=drop%20table%20users"`
		- Error `curl "https://ssudhindras-eval-test.apigee.net/demo-threat-injection?search=delete"`
		- Success `curl "https://ssudhindras-eval-test.apigee.net/demo-threat-injection?search=select"`

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

Quota configured as custom attribute on application

```xml
<Allow count="2" countRef="app_quota_limit"/>
<Interval ref="app_quota_interval">1</Interval>
<TimeUnit ref="app_quota_timeunit">minute</TimeUnit>
```



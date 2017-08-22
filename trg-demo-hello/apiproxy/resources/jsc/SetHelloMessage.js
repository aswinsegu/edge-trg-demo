var helloMessage = context.getVariable('request.querystring');
if (!helloMessage || ('' === helloMessage)) {
    helloMessage = 'World!';
}
context.setVariable('hello_message', helloMessage + "!");

print(helloMessage);
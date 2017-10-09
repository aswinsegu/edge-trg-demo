var helloMessage = context.getVariable('message.queryparam.name');
if (!helloMessage || ('' === helloMessage)) {
    helloMessage = 'World!';
}
context.setVariable('hello_message', helloMessage + "!");

print(helloMessage);
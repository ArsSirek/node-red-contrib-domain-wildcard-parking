adds Node to call Wildcard parking API by Personal Access Token



# wcp-api

 #### getDomain 
- expects msg.payload to be string with domain name
- returns json with id field and other information

#### updateEmailForwardingRule 
 - expects msg.payload to be object with following fields 
```js
msg.payload = {
    "is_new": true,
    "rule_id": null,
    "domain_id": 1, // msg.payload.data.id 
    "inboxes": ["myname"], // array of ids or text values
    "forwardTo": ["existing-mail@example.com"], // array of ids or text values
    "description": "Node Red generated",
    "status": "active",
}
```
If rule_id is empty and is_new true - creates a new record. 
When rule_id provided and is_new false - will update existing rule inboxes and forwards to

Returns array with two elements 1-st one is email forwarding rule object just update/created 
2-nd one is affected DNS rows modified for the email forwarding rule to work if no DNS was deleted then we should receive empty array here.

#### deleteEmailForwardingRule
payload {
    rule_id: number,
}
or payload {
    domain_name: string,
} if you want to delete all forwarding rules for a domain name

#### getDns
- expects msg.payload to be string with domain name
- returns json

#### getDns
```js
msg.payload = {
    id: null,
    domain_name: 'example.com',
    dns_type: 'A', // "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"
    dns_name: 'subdomain',
    dns_value: '127.0.0.1',
    dns_ttl: '3600',
}

```

## on Out msg
we receive following fields
 - status HTTP status code
 - data JSON parsed response data
 - error in case of internal module error (please open issue on github in case if error happens)


---
layout: post
title:  "Designing APi's"
date:   2020-11-09
categories: api design course
---

Few things to consider when building an API

- You can't fix API after publishing
- Well written API can mature


#### Pieces

 There are few things to consider when building an API

- URI 
- Verb



#### URI
 the URI contains headers that say more about the request or response.

#### Verbs
verbs are what determines the response or request type being made

- GET: used to retrieve a resource
- POST: creating a resource
- PUT: used to update a resource
- PATCH: update specific items in a resource
- Delete: remove a resource

#### Idempotency

Idempotency is expecting the same action from the same verbs. get should always get a resource, delete should always delete something, same as patch and put, as well as delete. Only Post isn't idempotency, Post should always create something new.

#### Designing Results

- camelCasing member name
- Collections
	- Array
	- Show total results 
	- pagination

#### Formatting design

format your api using headers. choose format in which the data should show

- JSON: application/json
- XMl: text/xml
- JSONP: application/javascript
- RSS

#### Complex scenarios

##### Paging

It's a good idea to add pagination 
	
- Query strings for paging
- Use wrappers to imply paging

```javascript
{
totalResults: 423,
nextPage:"uri/page"
prevPage:"uri/page"
results: [
...
]
}
```

##### Error Handling

When showing errors, don't just use status codes , you can return object with error info.


##### Caching

Use Etags for caching

- if-None-Match
- If-Match


#### Versioning

versioning your API is a good idea, there are several ways of versioning

- url api/v2
- query string ?v=20
- using headers x-version:2.0
- using Accept header: application/json; version=2.0

#### Api and Security

there are different type of securing API's

- Cookies
	- easy amd common
	- very easy to hack

- Basic Auth
	- Not really secured because credentials are sent on every request

- Token
	- more secured and simple
	- tokens are easy and expire much faster than cookies

- OAUTH





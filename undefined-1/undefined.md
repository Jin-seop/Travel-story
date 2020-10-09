# 게시글 상세정보

{% api-method method="post" host="https://api.cakes.com" path="/post" %}
{% api-method-summary %}
Detail Post
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="cookie" type="string" required=false %}

{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="userId" type="string" required=false %}

{% endapi-method-parameter %}

{% api-method-parameter name="title" type="number" required=false %}

{% endapi-method-parameter %}

{% api-method-parameter name="tag" type="string" required=false %}

{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Cake successfully retrieved.
{% endapi-method-response-example-description %}

```
{userId:'$$', title:'$$' ,tag:'$$',image:'$$',chat:'$$'}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find a cake matching this query.
{% endapi-method-response-example-description %}

```
{"message": 잘못된 요청입니다."}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}




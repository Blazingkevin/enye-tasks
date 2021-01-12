## Solution to Enye Coding Tasks


### Frontend task
Basically, consume a given API and present data the best way you can. 

Must have - filter, search and pagination.

*Response from API*

```
{
    "records": {
        "profiles": [{
            "FirstName": "",
            "LastName": "",
            "Gender": "",
            "Latitude": "",
            "Longitude": "",
            "CreditCardNumber": "",
            "CreditCardType": "",
            "Email": "",
            "DomainName": "",
            "PhoneNumber": "",
            "MacAddress": "",
            "URL": "",
            "UserName": "",
            "LastLogin": "",
            "PaymentMethod": ""
        }, ...]
    },
    "status": "",
    "size": ""
}

```

Implementation -  /frontend-task directory  
Live Demo - https://kevinuti-frontend.herokuapp.com/

### Backend task
Build an express API that integrates with [Exchange Rate API](https://api.exchangeratesapi.io/latest) to proxy request

Must have - Appropriate HTTP response code

*Expected request/respone*
```
/api/rates?base=CZK&currency=EUR,GBP,USD

{
    "results": {
        "base": "CZK",
        "date": "2020-11-17",
        "rates": {
            "EUR": 0.0377244605,
            "GBP": 0.033795458,
            "USD": 0.044824204
        }
    }
}
```
Implementation - /backend-task directory  
Live Demo - https://kevinuti-backend.herokuapp.com/api/rates

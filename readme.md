# Haircare Backend - API & Database

Deployed URL: TBD

A GET request to the base URL should return a JSON object like this:
```
{
    status: "It's alive!"
}
```
## Authentication

All endpoints except for `Login` and `Register` will require authentication by the client. Any client will need to authenticate their requests by placing a token as the value for the `Authorization` header. A token property is returned in the response on `Login` requests and does not expire for 7 days.

The token for a user can only be used to perform actions for that user specifically. Requests made to data made by different users will receive a `401` error code. Customer and stylist authentication is seperate, and access to one set of routes will not work for the other's.

## Endpoints

### Summary

| Route | Method | Description | Requires Auth |
|---|---|---|---|
|`/customer/login`| POST | Send user credentials for a customer to login to the application | No |
|`/customer/register`| POST | Send user information to register a new customer with the application | No |
|`/stylist/login`| POST | Send user credentials for a stylist to login to the application | No |
|`/stylist/register`| POST | Send user credentials for a stylist to login to the application | No |
|---|---|---|---|
|`/customer/:id`| GET | Retrieve data for a customer based on ID | Yes |
|`/customer/:id`| PUT | Allows updates to a customer's information | Yes |
|`/customer/:id/reviews`| POST | Adds a review for a customer | Yes |
|`/customer/:id/reviews`| GET | Gets all reviews for a customer | Yes |
|`/customer/:customerId/reviews/:reviewId`| PUT | Allows a customer to update a review | Yes |
|`/customer/:customerId/reviews/:reviewId`| DELETE | Deletes a customer's review | Yes |
|---|---|---|---|
|`/stylist`| GET | Retrieve a list of all stylists in the database | Yes |
|`/stylist/:id`| GET | Retrieve stylist profile based on ID | Yes |
|`/stylist/:id`| PUT | Allows updates to a stylist's information | Yes |
|`/stylist/:id`| DELETE | Deletes a stylist's profile | Yes |
|`/stylist/:id/posts`| GET | Retrieve a stylist's image posts | Yes |
|`/stylist/:id/posts`| POST | Allows a stylist to add a new image post | Yes |
|`/stylist/:stylistId/posts/:postId`| PUT | Update a stylist's image post | Yes |
|`/stylist/:stylistId/posts/:postId`| DELETE | Deletes a stylist's image post | Yes |

### Customer Accounts
****
**Login**

Route:
`/customer/login`

Method:
`POST`

Description:
Send user credentials for a customer to login to the application.

Body:
```
{ "username": string, "password": string }
```

Returns:
Customer login object
```
{
    "id": integer,
    "username": string,
    "token": string
}
```
****
**Register**

Route:
`/customer/register`

Method:
`POST`

Description:
Send user information to register a new customer with the application.

Body:
```
{
    "username": string,
    "password": string,
    "location": string,
    "email": string
}
```

All fields are required to register a new user.

Returns:
Registered customer object
```
{
    "customer": {
        "id": integer,
        "username": string,
        "location": string,
        "email": string
    },
    "token": string
}
```
****
### Stylist Accounts
****
**Login**
Route:
`/stylist/login`

Method:
`POST`

Description:
Send user credentials for a stylist to login to the application.

Body:
```
{ "username": string, "password": string }
```

Returns:
Stylist login object
```
{
    "id": integer,
    "username": string,
    "token": string
}
```
****
**Register**

Route:
`/stylist/register`

Method:
`POST`

Description:
Send user information to register a new stylist with the application.

Body:
```
{
    "username": string,
    "password": string,
    "location": string,
    "email": string
}
```

All fields are required to register a new user.

Returns:
Registered stylist object
```
{
    "stylist": {
        "id": integer,
        "username": string,
        "location": string,
        "email": string
    },
    "token": string
}
```
****
### Customer Routes
****
**Get customer profile**

Route:
`/customer/:id`

Method:
`GET`

Description:
Retrieve a customer's profile information

Returns:
Customer object
```
{
    "username": string,
    "location": string,
    "email": string
}
```
****
**Update customer profile**

Route:
`/customer/:id`

Method:
`PUT`

Description:
Allows customer to update their profile

Body:
```
{
    "username": string,
    "location": string,
    "email": string
}
```

Returns:
Updated customer object
```
{
    "username": string,
    "location": string,
    "email": string
}
```
****
**Add customer review**

Route:
`/customer/:id/reviews`

Method:
`POST`

Description:
Allows customer to add a stylist review

Body:
```
{
    "description": string,
    "rating": integer,
    "image_1": string,
    "image_2": string,
    "image_3": string,
    "customer_id": integer,
    "stylist_id": integer
}
```

Returns:
Created review object
```
{
    "description": string,
    "rating": integer,
    "image_1": string,
    "image_2": string,
    "image_3": string,
    "customer_id": integer,
    "stylist_id": integer
}
```
****
**Get customer reviews**

Route:
`/customer/:id/reviews`

Method:
`GET`

Description:
Gets all reviews for a customer

Returns:
Array of review objects
```
[
    {
        "description": string,
        "rating": integer,
        "image_1": string,
        "image_2": string,
        "image_3": string,
        "customer_id": integer,
        "stylist_id": integer
    }
]
```
****
**Update customer review**

Route:
`/customer/:customerId/reviews/:reviewId`

Method:
`PUT`

Description:
Allows an update to a review

Body:
```
{
    "description": string,
    "rating": integer,
    "image_1": string,
    "image_2": string,
    "image_3": string,
    "customer_id": integer,
    "stylist_id": integer
}
```

Returns:
Updated review object
```
{
    "description": string,
    "rating": integer,
    "image_1": string,
    "image_2": string,
    "image_3": string,
    "customer_id": integer,
    "stylist_id": integer
}
```
****
**Delete customer review**

Route:
`/customer/:customerId/reviews/:reviewId`

Method:
`DELETE`

Description:
Allows customer to delete a review

Returns:
The deleted review object
```
{
    "description": string,
    "rating": integer,
    "image_1": string,
    "image_2": string,
    "image_3": string,
    "customer_id": integer,
    "stylist_id": integer
}
```
****
### Stylist Routes
****
**Get stylist list**

Route:
`/stylist`

Method:
`GET`

Description:
Gets all stylists in the database

Returns:
Array of stylist objects
```
[
    {
        "username": string,
        "location": string,
        "email": string
    }
]
```
****
**Get stylist profile**

Route:
`/stylist/:id`

Method:
`GET`

Description:
Retrieve a stylist's profile information

Returns:
Stylist object
```
{
    "username": string,
    "location": string,
    "email": string
}
```
****
**Update stylist profile**

Route:
`/stylist/:id`

Method:
`PUT`

Description:
Allows stylist to update their profile

Body:
```
{
    "username": string,
    "location": string,
    "email": string
}
```

Returns:
Updated stylist object
```
{
    "username": string,
    "location": string,
    "email": string
}
```
****
**Delete stylist profile**

Route:
`/stylist/:id`

Method:
`DELETE`

Description:
Allows stylist to delete their profile. This will delete all their image posts, but not reviews associated with the stylist.

Returns:
Deleted stylist object
```
{
    "username": string,
    "location": string,
    "email": string
}
```
****
**Get stylist posts list**

Route:
`/stylist/:id/posts`

Method:
`GET`

Description:
Gets all posts a stylist has made

Returns:
Array of post objects
```
[
    {
        "image_link": string,
        "description": string
    }
]
```
****
**Add stylist post**

Route:
`/stylist/:id/posts`

Method:
`POST`

Description:
Allows a stylist to add a new image post

Body:
```
{
    "image_link": string,
    "description": string,
    "stylist_id": integer
}
```

Returns:
Created post object
```
{
    "image_link": string,
    "description": string
}
```
****
**Update stylist post**

Route:
`/stylist/:stylistId/posts/:postId`

Method:
`PUT`

Description:
Allows a stylist to update an image post

Body:
```
{
    "image_link": string,
    "description": string,
    "stylist_id": integer
}
```

Returns:
Updated post object
```
{
    "image_link": string,
    "description": string
}
```
****
**Delete stylist post**

Route:
`/stylist/:stylistId/posts/:postId`

Method:
`DELETE`

Description:
Allows a stylist to delete an image post

Returns:
Deleted post object
```
{
    "image_link": string,
    "description": string
}
```
# URL Shortener

## Introduction

This is a URL shortener API built using Node.js, Express.js, and MongoDB. It allows users to create short URLs from long URLs and also update the long URL associated with a short URL. The short URLs are generated using a random string of 7 characters. The short URLs are valid for 30 days by default, but this can be changed by the user. The API also allows users to update the expiry date of a short URL.

## API Reference

### Create a short URL

```http
POST /shorten
```

| Parameter        | Type     | Description                                |
| :--------------- | :------- | :----------------------------------------- |
| `destinationUrl` | `string` | **Required**. The long URL to be shortened |

#### Response

```json
{
    "shortUrl": "http://localhost:3000/abc1234"
}
```

### Update the long URL associated with a short URL

```http
PUT /update
```

| Parameter        | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `shortUrl`       | `string` | **Required**. The short URL to be updated                          |
| `destinationUrl` | `string` | **Required**. The new long URL to be associated with the short URL |

#### Response

```json
{
    "success": true
}
```

### Redirect to the long URL associated with a short URL

```http
GET /:urlCode
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `urlCode` | `string` | **Required**. The short URL code |

#### Response

Redirects to the long URL associated with the short URL

### Update the expiry date of a short URL

```http
POST /update-expiry
```

| Parameter   | Type     | Description                                                |
| :---------- | :------- | :--------------------------------------------------------- |
| `shortUrl`  | `string` | **Required**. The short URL to be updated                  |
| `daysToAdd` | `number` | **Required**. The number of days to add to the expiry date |

#### Response

```json
{
    "success": true
}
```

## Middleware

The API uses the following middleware:

### validateUrl

This middleware is used in the `POST /shorten`, `PUT /update`, and `POST /update-expiry` routes to validate the `destinationUrl` parameter. It checks if the provided URL is valid using a regular expression. If the URL is invalid, the middleware returns a `400 Bad Request` response with an error message.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - The URL of your MongoDB database

`BASE_URL` - The base URL of your API

`NODE_ENV` - The environment in which your API will run (`development` or `production`)

`PORT` - The port on which your API will run

## Run Locally

1. Clone the project

```bash
git clone https://github.com/sauravhathi/url-shortner.git
```

2. Go to the project directory

```bash
cd url-shortener
```

3. Install dependencies

```bash
npm install

# or

yarn install
```

4. Start the server

```bash
npm run start

# or

yarn start
```

## Postman API Tests

You can use Postman to test the API endpoints. Below are the examples of API requests that you can test using Postman.

### Create a short URL

**Request**

```http
POST /shorten
Content-Type: application/json

{
    "destinationUrl": "https://www.example.com/xyz/abc"
}
```

**Response**

```json
{
    "shortUrl": "http://localhost:3000/abc1234"
}
```

### Update the long URL associated with a short URL

**Request**

```http
PUT /update
Content-Type: application/json

{
    "shortUrl": "http://localhost:3000/abc1234",
    "destinationUrl": "https://www.example.com/xyz/abc/123"
}
```

**Response**

```json
{
    "success": true
}
```

### Redirect to the long URL associated with a short URL

**Request**

```http
GET /abc1234
```

**Response**

Redirects to the long URL associated with the short URL

### Update the expiry date of a short URL

**Request**

```http
POST /update-expiry
Content-Type: application/json

{
    "shortUrl": "http://localhost:3000/abc1234",
    "daysToAdd": 7
}
```

**Response**

```json
{
    "success": true
}
```

## Tech Stack

- Server: Node, Express, MongoDB

## Authors

- [Saurav Hathi](https://www.github.com/sauravhathi)
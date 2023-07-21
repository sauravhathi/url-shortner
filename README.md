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

````javascript
{
    "shortUrl": "http://localhost:3000/abc1234"
    }
    ```

### Update the long URL associated with a short URL

```http
PUT /update
````

| Parameter        | Type     | Description                                                        |
| :--------------- | :------- | :----------------------------------------------------------------- |
| `shortUrl`       | `string` | **Required**. The short URL to be updated                          |
| `destinationUrl` | `string` | **Required**. The new long URL to be associated with the short URL |

#### Response

```javascript
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

```javascript
Redirects to the long URL associated with the short URL
```

### Update the expiry date of a short URL

```http
POST /update-expiry
```

| Parameter   | Type     | Description                                                |
| :---------- | :------- | :--------------------------------------------------------- |
| `shortUrl`  | `string` | **Required**. The short URL to be updated                  |
| `daysToAdd` | `number` | **Required**. The number of days to add to the expiry date |

#### Response

```javascript
{
    "success": true
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - The URL of your MongoDB database

`BASE_URL` - The base URL of your API

`PORT` - The port on which your API will run

## Run Locally

Clone the project

```bash
    git clone
```

Go to the project directory

```bash
    cd url-shortener
```

Install dependencies

```bash
    npm install

    # or

    yarn install
```

Start the server

```bash
    npm run start

    # or

    yarn start
```

## Tech Stack

**Server:** Node, Express, MongoDB

## Authors

- [@sauravhathi](https://www.github.com/sauravhathi)

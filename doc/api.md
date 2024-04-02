# Endpoints

## /api/auth/signup

Method: POST

Body:

```
{
    email: string;
    username: string;
    password: string;
}
```

Response:

```
{
    message: string;
}
```

## /api/auth/signin

Method: POST

Body:

```
{
    username: string;
    password: string;
}
```

Response:

```
{
  id: number;
  username: string;
  email: string;
  accessToken: string;
  tokenType: "Bearer";
}
```

## /api/auth/calculate_bmi

Method: POST

Header:

```
Authorization: "Bearer <Token>",
```

Body:

```
{
    username: string;
    age: number;
    weight: number;
    height: number;
}
```

Response:

```
{
    message: string;
}
```

Example:

```
{
    message: 'Your bmi : 0.009009009009009009 You are underweight.'
}
```

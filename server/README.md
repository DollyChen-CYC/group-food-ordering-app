## API

- Base URL of API = https://limitless-waters-88608.herokuapp.com/api
- Users API

| Method    | HTTP                                  | Admin | Oneself | User |
|-----------|---------------------------------------|-------|---------|------|
|   POST    |   /users                              |       |         |   V  |
|   POST    |   /users/login                        |       |         |   V  |
|   GET     |   /users/:user_id                     |   Ｖ  |   Ｖ    |      |
|   PUT     |   /users/:user_id                     |   Ｖ  |   Ｖ    |      |
|   POST    |   /users/:user_id/orders              |   V   |   V     |      |
|   GET     |   /users/:user_id/orders              |   V   |   V     |      |
|   GET     |   /users/orders/:order_id             |   V   |         |      |
|   DELETE  |   /users/orders/:order_id             |   V   |         |      |
|   DELETE  |   /users/:user_id/orders/:order_id    |   V   |   V     |      |

- Groups API

| Method    | HTTP                                  | Admin | Oneself | User |
|-----------|---------------------------------------|-------|---------|------|
|   POST    |   /groups                             |   V   |         |      |
|   GET     |   /groups                             |       |         |   V  |
|   GET     |   /groups/:group_id                   |       |         |   V  |
|   PUT     |   /groups/:group_id                   |   V   |         |      |
|   DELETE  |   /groups/:group_id                   |   V   |         |      |
|   PUT     |   /groups/:group_id/status            |   V   |         |      |
|   GET     |   /groups/orders/:group_id            |   V   |         |      |

- Restaurants API

| Method    | HTTP                                  | Admin | Oneself | User |
|-----------|---------------------------------------|-------|---------|------|
|   POST    |   /restaurants                        |   V   |         |      |
|   GET     |   /restaurants                        |       |         |   V  |
|   GET     |   /restaurants/:restaurant_id         |       |         |   V  |
|   PUT     |   /restaurants/:restaurant_id         |   V   |         |      |
|   POST    |   /restaurants/:restaurant_id/dishes  |   V   |         |      |
|   PUT     |   /restaurants/dishes/:dish_id        |   V   |         |      |
|   DELETE  |   /restaurants/dishes/:dish_id        |   V   |         |      |



## ENTITY RELATIONSHIP DIAGRAM (ERD)
<img height="550" src="https://github.com/DollyChen-CYC/DollyChen-CYC/blob/main/src/images/group-ordering-app-ERD.jpeg" alt="ERD" />

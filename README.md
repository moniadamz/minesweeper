# Minesweeper

This API was built using [Atlas](https://cloud.mongodb.com) and was deployed using [Heroku](https://www.heroku.com/).

## Techs:

- NodeJS v12.18.4, MongoDB and Mocha v8.4.0

## How to build:

- Run ```npm install```.

# How to run:

- To run locally is necessary to create the file ``` .env ``` with the following value:

``` MONGO_URI=xxx ``` *

* The xxx must be replaced for a mongoDB URI.
 
- Run ``` npm start ``` to start the application.

## Endpoints:

| Route | Verb | Description |
| --- | --- | --- |
| `https://api-minesweeper-devget.herokuapp.com/game/:id` | PATCH | It reveals a cell |
| `https://api-minesweeper-devget.herokuapp.com/game/:id/flag` | PATCH | It flags the selected cell |
| `https://api-minesweeper-devget.herokuapp.com/game/resume/:id` | GET | It returns a game by the ID |
| `https://api-minesweeper-devget.herokuapp.com/game/start` | POST | It starts a new game |


## How to test

- ``` npm run test ```

### Examples of requests

#### REQUEST

POST: [https://api-minesweeper-devget.herokuapp.com/game/start](https://api-minesweeper-devget.herokuapp.com/game/start)

Body:

| Attribute         | Description     | Mandatory |
| ------------- |-------------| --------- |
| rows | Number of rows (height of the board) | ✓ |
| columns | Number of columns (width of the board) | ✓ |
| minesQty | Number of mines | ✓ |


#### RESPONSE

``` 
{
    "gameId": "60ad9f688defeb00360c9e65"
} 
```


#### REQUEST

GET: [https://api-minesweeper-devget.herokuapp.com/game/resume/:id](https://api-minesweeper-devget.herokuapp.com/game/resume/:id)

Params:

| Attribute         | Description     | Mandatory |
| ------------- |-------------| --------- |
| id | The game ID returned when the game was created | ✓ |

#### RESPONSE

``` 
{
    "game": {
        "board": [
            [
                {
                    "_id": "60ada69a8defeb00360c9e9d",
                    "hasBomb": false,
                    "isRevealed": false,
                    "isFlagged": false
               }
            ]
        ],
        "_id": "60ada69a8defeb00360c9e9c",
        "rows": 3,
        "columns": 3,
        "startedAt": "2021-05-26T01:38:34.193Z",
        "endedAt": null,
        "__v": 0
    }
} 
```

#### REQUEST

PATCH: [https://api-minesweeper-devget.herokuapp.com/game/:id/flag](https://api-minesweeper-devget.herokuapp.com/game/:id/flag)

Body:

| Attribute         | Description     | Mandatory |
| ------------- |-------------| :---------: |
| row | Row position | ✓ |
| column | Column position | ✓ |

#### RESPONSE

``` 
{
    "game": {
        "board": [
            [
                {
                    "_id": "60ada69a8defeb00360c9e9d",
                    "hasBomb": false,
                    "isRevealed": false,
                    "isFlagged": true
                },
            ]
        ],
        "_id": "60ada69a8defeb00360c9e9c",
        "rows": 1,
        "columns": 1,
        "startedAt": "2021-05-26T01:38:34.193Z",
        "endedAt": null,
        "__v": 0
    }
} 
```

#### REQUEST

PATCH: [https://api-minesweeper-devget.herokuapp.com/game/:id](https://api-minesweeper-devget.herokuapp.com/game/:id)

Body:

| Attribute         | Description     | Mandatory |
| ------------- |-------------| :---------: |
| row | Row position | ✓ |
| column | Column position | ✓ |

#### RESPONSE

```
{
    "game": {
        "board": [
            [
                {
                    "_id": "60ada69a8defeb00360c9e9d",
                    "hasBomb": false,
                    "isRevealed": true,
                    "isFlagged": false
                },
            ]
        ],
        "_id": "60ada69a8defeb00360c9e9c",
        "rows": 1,
        "columns": 1,
        "startedAt": "2021-05-26T01:38:34.193Z",
        "endedAt": null,
        "__v": 0
    }
} 
```




# Eddie RedMan

A management tool for RWBBC, LLC

---
## Installation
---

What are you, some kind of jamoke?

In `app` lives the server. In `frontend` lives, you guessed it, the front end.

Regrettably, you have to run them separately for development, but they get deployed together via `serverless`.

`npm install` in `app` and `frontend`.

`npm run start` in the `app` directory will run the server.

`npm run start` in the `frontend` directory will run the react front end.


## Database

You'll need to create a mysql database to run locally, as well as setup a `.env` file with variables to point to the database.

Download `mysql workbench` or something, I really don't care. Set up a mysql database on your machine.

Use `npx db-migrate up` in the `app` directory to run the migrations and setup the database locally. Note that before you do this. you'll likely need to at least have one database set up on your server and specified in your `.env` file. See below about how to set up the environment.

## Environment

Create a `.env` file in your `app` directory and populate it with the following values:

```
DB_HOST=localhost
DB_USER=<your database user>
DB_PASS=<your database user's password>
DB_PORT=<your database port>
DB_DATABASE=rwbbc_data

RWB_DB_LOCAL_HOST=localhost
RWB_DB_LOCAL_USER=<your database user>
RWB_DB_LOCAL_PASSWORD=<your database user's password>
RWB_DB_LOCAL_PORT=<your database port>
RWB_DB_LOCAL_DATABASE=<an existing database you can run the migrations from>
```

To be perfectly honest I don't remember right this minute if you need `DB_XXX` or `RWB_DB_LOCAL_XXX`, but hell, put them both in there, can't hurt. The database migrations read from the `RWB_DB_LOCAL` variables. I think the app itself still reads the `DB_XXX` stuff.

Now you can run `db-migrate up` to configure your database.

Note that the `down`s don't really...work..totally right. They migrate down based on the migrations table of the database specified in your environment, which won't exist, so it'll always say you have nothing to run. I think there's probably a way with `db-migrate` to specify the database, but I haven't looked at it that deep yet.

Anyawy. Should work 🤷‍♀️🤷‍♀️🤷‍♀️
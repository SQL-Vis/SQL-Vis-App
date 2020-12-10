# seeQL

This is the repository for the [Heroku-hosted demo](https://seeql-app.herokuapp.com/) of seeQL. seeQL is an npm library that assists developers with building SQL queries by displaying a visualization of a potential query alongside a table of search results. You can access the npm link [here](https://seeql-app.herokuapp.com/).

This demo is set up with a default database that has three tables of data– songs, albums, and artists.


## Tutorial

To submit a custom query, type a query into the form and click submit.

To view a sample query, select a sample query or prior custom query from the dropdown menu.

The results of the current query can be viewed in the results table. The key can be used for identifying denotations represented by icons in the schema diagram.

## Supported grammar

Currently, only select statements are supported. seeQL follows SQL grammar conventions for PostgreSQL. Enclose string values in single quotes, and enclose column names with uppercase letters in double quotes.\
\
For example,

```
select songs.title, artists.age from songs right join artists on songs.artistId = artists.id;
```

would be correct, whereas

```
select title, age from songs right join artists on songs.artistId = artists.id;
```

would be incorrect.\
\
Querying the column artistId from the table artists would look like `"artistId".artists`, and creating a join where the table songs' FK albumId is equal to the table albums' PK id woud look like `songs."albumId" = albums.id`.

## Sample Queries

+ select songs.title, artists.age from songs right join artists on songs.artistId = artists.id

+ select \* from artists
+ select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28

+ select songs.title, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28 and artists.age < 35

+ select songs.title, songs.length, artists.age from songs right join artists on songs."artistId" = artists.id where artists.age > 28 and artists.age < 35 and songs.length < 250

+ select count(\*) from songs // we need to make sure that our selector code can not throw an error with this.

+ select songs.title, artists.name, albums.title
from songs left join artists on songs."artistId" = artists.id left join albums on songs."albumId" = albums.id

+ select songs.title as songTitle, albums.title as albumTitle, artists.name from songs left join artists on songs."artistId" = artists.id left join albums on songs."albumId" = albums.id


## Start

Running `npm install` and `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

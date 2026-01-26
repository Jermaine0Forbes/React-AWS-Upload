
# Upload app

- ~~installed mui, react query, and  react router~~
- ~~make repository and push~~
- ~~create pages (home, signup, login, profile, content)~~
-  ~~install sass~~
-  ~~creating basic styling for header~~
-  ~~construct profile page~~
- ~~install react hook form~~
- ~~create a profile directory~~
- ~~constructing upload components on the profile page~~
- ~~creating a service to upload data to symfony endpoint~~
- ~~creating an environment variable to hold symfony's url~~
- ~~adding cors to receive data from react~~
- ~~create api to receive upload data~~
- ~~successfully complete upload process~~
- ~~create an entity to hold information on the upload content~~
- ~~save upload content to table~~
- ~~install aws sdk~~
- ~~create identity with limited privileges~~
- ~~upload file to bucket~~
- ~~create api to retrieve files from bucket~~
- ~~create fetch service to get s3 files~~
- ~~construct user media content components~~
- ~~create media page~~
- ~~create endpoint to get media~~
- ~~create service to fetch media~~
- ~~style media page~~
- ~~work on home page~~
- ~~create endpoint to get all content~~
- ~~create service to fetch all content~~
- ~~construct content components~~
- show plan and quota in user profile
- create response if upload exceeds quota
- create response if user maxes out uploads
- work on signup page
- create register api
- return jwt token



## important commands 

```
// starts dev server
symfony server:start

php bin/console cache:clear

// create the models
php bin/console make:entity

// creates the database based off the DATABASE_URL in your .env
symfony console doctrine:database:create

// create a migration
symfony console make:migration

// create the tables from the migration file
symfony console doctrine:migrations:migrate

// drop tables based on the migration version number that you'll find in database
symfony console doctrine:migrations:execute DoctrineMigrations\Version20260124232337 --down
```

# drone-delivery-api

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

# Migrations

To use the migration feature, you need to install the Sequelize CLI tool named **sequelize-cli**.

You can install it on your computer using npm or Yarn. Because the CLI tool is used from the command line, you need to install it globally:

```bash
$ npm install sequelize-cli --global
# or
$ yarn global add sequelize-cli
```

Alternatively, you can also use the npx command to run sequelize-cli without installing it globally:

```bash
$ npx sequelize-cli --version
```

## create migrations

```bash
$ sequelize-cli migration:create --name {{name of the migration}}

# example
$ sequelize-cli migration:create --name create-users-table
```

Migration files will be created inside the **migrations/** folder.

Modify the migration file in the migrations folder to what you need done.

A migration file created using Sequelize will automatically add the timestamp of when it was created.

## Run migrations

It’s time to run the migration file you just created with the db:migrate command:

```bash
$ yarn migrate

#or
sequelize-cli db:migrate
```

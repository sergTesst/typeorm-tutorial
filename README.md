# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

4. in the package.json add the following script `node --require ts-node/register ./node_modules/typeorm/cli.js`
5. generate migration with this command ` npm run typeorm migration:generate -- -n nameOfMigration`
6. run migration with this command `npm run typeorm migration:run`

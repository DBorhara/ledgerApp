# Ledger

## Installation

- Run `npm install` from root folder
- Create the ledger database

  ```
  export MY_APP_NAME=boilermaker
  createdb $MY_APP_NAME
  createdb $MY_APP_NAME-test
  ```

- You can create dummy accounts by running `node script/seed.js`

  Dummy Account 1:
  email: cody@email.com
  password:123

  Dummy Account 2:
  email: murphy@email.com
  password :123
  
- To run the app you can use the command:

  ```
  npm run start-dev
  ```

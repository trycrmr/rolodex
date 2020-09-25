### Rolodex

A contact management application.

### Issues

Open new issues on https://github.com/trycrmr/rolodex/issues

### Running the client

1. Navigate to the APP_ROOT/client directory.
2. `npm install` to install dependencies
3. `npm start` to run the client\*. Default port is 3001. `npm test` will run the test suite.

\*Of note: The server is only configured for development at this time. `npm test` will run the test suite.

### Running the server

1. Navigate to the APP_ROOT/server directory.
2. `npm install` to install dependencies
3. `npm start` to run the server. Default port is 3000.

\*Of note: The client is only configured for development at this time.

### Functionality

1. Displays the contacts in a table or list.
2. Allows the user to delete an existing contact.
3. Allows the user to update an existing contact.
4. Allows the user to create a new contact.

## Contributions

1. Fork the repo (click the button in the top right your Github interface)
2. Clone the repo (SSH: `git clone git@github.com:[YOUR_USERNAME]/rolodex.git` or HTTPS: `git clone https://github.com/[YOUR_USERNAME]/rolodex.git`)
3. Add git@github.com:trycrmr/rolodex.git as an upstream repo (`git remote add upstream https://github.com/trycrmr/rolodex.git`)
4. See the "Running the client/server" instructions at the top of the readme to stand up Rolodex locally
5. Create a new branch named on your forked repo with the following convention: "[issue-number][1-3 words summarizing the issue]" (Example: "19-adds-animations"). If an issue doesn't exist, open one, reference it, and start working on it.
6. Open all PRs into master of the upstream repo. Must maintain feature & performance parity. No PRs that vary from the branch naming convention or have merge conflicts with master will be accepted as well.
7. Your PR will be reviewed shortly. In the meantime, repeat steps #5 & #6!

### API

The server runs on `localhost:3001`. Feel free to edit the port number. The existing routes include:

```
GET /contacts
POST /contacts
GET /contacts/:id
PUT /contacts/:id
DELETE /contacts/:id
```

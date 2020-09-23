### Task
Develop a small React CRUD application for contact management. You will use the small Node-Express server found in the `/server` directory as the API.

### Running the server
1. `npm install` to install dependencies
2. `node server` to run the server

### Creating the React app
1. Feel free to use something like `create-react-app` or setup your React app manually.
2. For the purposes of this exercise, the server and the front end can share the same `package.json` file.
3. Choose a state management solution (Redux, React Context, etc.).
4. Feel free to use class-based components or functional components.

### Requirements
1. Display the contacts in a table or list.
2. Allow the user to delete an existing contact.
3. Allow the user to update an existing contact.
4. Allow the user to create a new contact.
5. Add a README file with setup instructions and any information you feel is relevant for another developer to know.

### API
The server will run on `localhost:3001`. Feel free to edit the port number. The existing routes include:
```
GET /contacts
POST /contacts
GET /contacts/:id
PUT /contacts/:id
DELETE /contacts/:id
```

### Notes
We know your time is valuable, and we definitely don't expect a large, production-worthy project. The intent is to evaluate your technical implementation and thought-process in a scenario closely matching day-to-day work.

We highly encourage code comments to clarify your choices, explain complicated code, and signal shortcuts taken (e.g. "in a production app, I would do it this way...").

This assignment is our primary technical evaluation during the interview process. At the in-office interview stage we will discuss the sample and how you would go about expanding it. You can store this on Github, Codepen, or send it over as a zip file - whatever you're most comfortable with.

If anything is unclear or you run into problems with the server code, please feel free to reach out at any time to the person who emailed you the assignment.

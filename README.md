# Demo micro-fronted vertical approach using index.html as entrypoint
Demo project to build Micro Frontends with a Team-Based Vertical Architecture using html as entry point.
The project load 3 different micro-frontends built in angular, react and vue.

The idea behind this project is to enable teams to work in parallel. That's an organization problem that we'll solve with a technical solution. Micro Frontends architecture with a vertical Team-Based solution will create natural boundaries between teams reducing the communication between them to just the minimum.

Our web application will be split into vertical domains and each of them is called Micro Frontend. They will be loaded, one at a time, in the page, and will be owned by one team.

In this demo we'll create not only the Micro Frontends in Vue.js, Angular and React, but also the client-side orchestrator, Bootstrap, that will handle tasks such as: loading the right Micro Frontend, persist authentication, routing and comunication between them.

## START

To start the project it's necessary to execute the following scripts from the root of the project:

1. npm run install:app
2. npm run build
3. npm start

then type in the browser the url: http://localhost:3000 to open the project.

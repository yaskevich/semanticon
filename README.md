# Semanticon

## Platform for collecting and annotating discourse units

As for January 2024, it supports the annotating schemes for two types of units &ndash; **Discourse Formulae** and **Conversational Routines**.

Code for data processing, as well as a backend server application is [here](../server/). 

The latest version of the client can be built as completely **static** application. In that form it can be published on Github Pages without a need to host a fully-fledged server.

## Project history

Nov 2020 it started as UI for Russian Pragmaticon &ndash; a database of discourse formulae. The project consisted of 3 separate repos - client, server and mediafiles. Later, the codebase was modified to support new data type &ndash; conversational routines, while the feature of building a client as fully static app was added. Jan 2024 client and server were merged into monorepo.

Initial term _pragmaticon_ remained as referring to the database of formulae, new project for routines was named _routinicon_. For avoiding ambiguity between the program environment and the datatsets, the platform has to be rebranded. Since Jan 2024 it's _semanticon_.


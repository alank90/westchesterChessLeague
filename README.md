# The Westchester Chess League Signup Web Site

This web site is written in plain vanialla javascript and uses
the [Stein library](https://steinhq.com/) to create an API
for your google sheet.

The app uses Vite to build the site and [Auth0](https://manage.auth0.com/dashboard/us/movieapi/) for authentication .

**_Notes_** :

-   You need to create an .env file
-   The .env file should include the stein API url endpoint(VITE_STEIN_URL),the Auth0 domain and Client ID for the westchesterChessLeague app.
-   Within the file define keys **VITE_STEIN_URL = \<stein url\>**, **VITE_AUTH0_DOMAIN = domain**, and **VITE_CLIENT_ID = clientid**.
-   The Auth0 key values for domain and clientid can be found at [Auth0 app settings](https://manage.auth0.com/dashboard/us/movieapi/applications/OQqFGJzX4JiUOu3UYCvHVY5IGoSWm5LT/settings)
-   The whitelist rules can be found at [wcl Whitelist](https://manage.auth0.com/dashboard/us/movieapi/rules/rul_jXCQ2rOnfmFmqtdn)
-   The app is deployed to [Netlify](https://app.netlify.com/teams/akillian90/overview).
-   Remember to add the three environment variables(VITE_STEIN_URL etc...) to the Netlify app via the Dashboard.

[![Netlify Status](https://api.netlify.com/api/v1/badges/5dd5095a-b5c5-45fc-a2f9-d09df51cb7ce/deploy-status?branch=main)](https://app.netlify.com/sites/weschessleague/deploys)

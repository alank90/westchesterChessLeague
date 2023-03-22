import SteinStore from 'stein-js-client';
import accessAttendeesTables from './modules/accessAttendeesTables';

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

// Variable Declarations
const button = document.querySelector('.btn');
const form = document.querySelector('form');

// ====== Handlebars.js helpers definition to generate ==== //
// ====== row numbers for table =========================== //
Handlebars.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});

// ================================================================== //
// ===== Event listener to submit form data to Google sheets ======== //
// ================================================================== //

button.addEventListener('click', function () {
    // ================================================================= //
    // ========= This is sign up code to   ============================= //
    // ========= construct array to send to Stein API to consume ======= //
    // ================================================================= //
    const isValid = form.reportValidity();
    const numberOfEntriesInForm = 10;
    // Run form validity check
    form.reportValidity();

    if (isValid) {
        // Form passed validity check, lets grab data from form
        let formData = new FormData(form);

        // Need to convert FormData object to array object for Stein to accept.
        formData = Object.fromEntries(formData.entries());

        // Build an array of objects to send to stein as group
        let teamMember = {};
        let teamMembers = [];

        // Iterate thru the array and check if any group member
        // names are null so we dont send them to Google sheets
        for (let i = 1; i < numberOfEntriesInForm + 1; i++) {
            if (formData['player_name' + i]) {
                teamMember['school'] = formData['school'];
                teamMember['teacher_advisor'] = formData['teacher_advisor'];
                teamMember['player_name'] = formData['player_name' + i];
                teamMember['ranking'] = formData['ranking' + i];

                // Push students in group onto an array
                teamMembers = [...teamMembers, teamMember];

                // clear the teammember object to be reused
                teamMember = {};
            }
        }

        // Let's hit the stein API with the form data in array form
        try {
            store.append('registration', teamMembers).then((res) => {
                console.log(res);
                form.reset();
                var regex = /\d+/g;
                var string = `${res.updatedRange}`;
                var matches = string.match(regex); // creates array from matches
                document.querySelector(
                    '.message'
                ).innerHTML = `Sign-up succesful. ${
                    matches[1] - matches[0] + 1
                } rows added!`;
                // Delete error message if there
                if (document.querySelector('.error-message').innerHTML !== '') {
                    document.querySelector('.error-message').innerHTML = '';
                }
            });
        } catch (error) {
            console.error(error);
            alert('Add attendee failed! Sorry try again.');
        }
    } else {
        // Form failed validity check.
        // Delete previous success message if there
        if (document.querySelector('.message').innerHTML !== '') {
            document.querySelector('message').innerHTML = '';
        }
        document.querySelector(
            '.error-message'
        ).innerHTML = `Form incorrect. Please check.`;
    }
});

// ===== End Event listener to submit form data =================== //

// -------------------------------------------------------------------------- //

// ==================================================================== //
// ============== Auth0 Client JS ===================================== //
// ==================================================================== //
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientID = import.meta.env.VITE_CLIENT_ID;

auth0
    .createAuth0Client({
        domain: domain,
        clientId: clientID,
        authorizationParams: {
            redirect_uri: window.location.origin,
        },
    })
    .then(async (auth0Client) => {
        // Assumes a button with id "login" in the DOM
        const loginButton = document.getElementById('login');
        // ======================================================================= //
        // ===== Event listener for displaying attendees table w/Handlebars.js === //
        // ======================================================================= //
        loginButton.addEventListener('click', (e) => {
            if (isAuthenticated) {
                accessAttendeesTables();
                logoutButton.style.display = 'inherit';
            } else {
                console.log('not auth');
                e.preventDefault();
                auth0Client.loginWithRedirect();
            }
        });

        if (
            location.search.includes('state=') &&
            (location.search.includes('code=') ||
                location.search.includes('error='))
        ) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, '/');
        }

        // Assumes a button with id "logout" in the DOM
        const logoutButton = document.getElementById('logout');

        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            auth0Client.logout();
            logoutButton.style.display = 'none';
        });

        const isAuthenticated = await auth0Client.isAuthenticated();
        const userProfile = await auth0Client.getUser();

        // Assumes an element with id "profile" in the DOM
        const profileElement = document.getElementById('profile');

        if (isAuthenticated) {
            profileElement.style.display = 'block';
            profileElement.innerHTML = `
              <p class="user-name">${userProfile.name}</p>`;
        } else {
            profileElement.style.display = 'none';
        }
    });

// ==================================================================== //
// ============== End of Auth0 Client JS ============================== //
// ==================================================================== /

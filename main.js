import SteinStore from 'stein-js-client';
import accessAttendeesTables from './modules/accessAttendeesTables';

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

// Variable Declarations
const signUp = document.getElementById('signup');
const user = document.querySelector('.user');
const button = document.querySelector('.btn');
const form = document.querySelector('form');

// ================================================================== //
// ===== Event listener to submit form data to Google sheets ======== //
// ================================================================== //

button.addEventListener('click', function () {
    // ================================================================= //
    // ========= This is sign up code to   ============================= //
    // ========= construct array to send to Stein API to consume ======= //
    // ================================================================= //
    const isValid = form.reportValidity();
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
        // Note- the magic number 6 is the maximum number of players(5) in form we can submit
        for (let i = 1; i < 6; i++) {
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
                button.innerHTML = `Sign-up succesful. ${res.updatedRange}`;
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
        document.querySelector(
            '.error-message'
        ).innerHTML = `Form incorrect. Please check.`;
    }
});

// ===== End Event listener to submit form data =================== //

// ===== Event listener for accessing attendees table ==================== //

// Sign-up button listener
signUp.addEventListener('click', () => {
    console.log("I've been clicked!.");
    accessAttendeesTables();
});

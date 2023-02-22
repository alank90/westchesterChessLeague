import SteinStore from 'stein-js-client';
import sortTable from './sortTable';

const tableTemplate = document.getElementById('target');

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

/**
 * @Description - Retrieves google sheets via the Stein JS client
 * @Called from - /main.js
 * @Returns - Google sheets signup table and then uses Handlebars.js
 *           to inject data into HTML template
 */

export default function accessAttendeesTables() {
    let attendeesArray = [];

    try {
        store
            .read('registration')
            .then((data) => {
                attendeesArray = data;
                // ===== Handlebars template code ============ //
                let template = document.getElementById('template').innerHTML;

                //Compile the template
                let compiled_template = Handlebars.compile(template);

                //Render the data into the template
                let rendered = compiled_template({ attendeesArray });

                //Overwrite the contents of #target with the renderer HTML
                document.getElementById('target').innerHTML = rendered;

                const closeButton = document.querySelector('.close');
                const formElem = document.querySelector('.main-block');

                // Make the form element disappear
                formElem.classList.add('hidden');
                // Add an event listener for close button on table, now that it is
                // finally created in the DOM.
                closeButton.addEventListener('click', () => {
                    const attendeeTableElem = document.getElementById('target');
                    const formElem = document.querySelector('.main-block');
                    const navElem = document.querySelector('nav');

                    attendeeTableElem.classList.add('hidden');
                    formElem.classList.remove('hidden');
                    navElem.scrollIntoView({ behavior: 'smooth' });
                });
            })
            .then(() => {
                sortTable();
                tableTemplate.scrollIntoView({ behavior: 'smooth' });

                //  ============= End Template code =============== //
            });
    } catch (error) {
        console.error(error);
    }
}

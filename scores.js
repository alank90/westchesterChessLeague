import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

createApp({
    data() {
        return {
            matchesArray: [],
            playerPointsArray: [],
            schoolPointsArray: [],
            count: 0,
            message: '',
        };
    },
    methods: {
        accessMatches() {
            const el = document.querySelector('.lds-roller');
            el.classList.remove('hidden');
            try {
                store.read('matches').then((data) => {
                    this.matchesArray = data;
                    el.classList.add('hidden');

                });
            } catch (error) {
                console.error(error);
            }
        },
        accessPlayerPoints() {
            try {
                store.read('player_points').then((data) => {
                    this.playerPointsArray = data;
                });
            } catch (error) {
                console.error(error);
            }
        },
        accessSchoolPoints() {
            try {
                store.read('school_points').then((data) => {
                    this.schoolPointsArray = data;
                });
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        // methods can be called in lifecycle hooks, or other methods!
        this.accessMatches();
        this.accessPlayerPoints();
        this.accessSchoolPoints();
    },
}).mount('#app');

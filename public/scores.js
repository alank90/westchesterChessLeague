import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// Create Stein Store instance
const VITE_STEIN_URL =  "https://api.steinhq.com/v1/storages/63f150abd27cdd09f0e48d76";
const store = new SteinStore(VITE_STEIN_URL);

createApp({
    data() {
        return {
            matchesArray: [],
            previousMatchesArray: [],
            playerPointsArray: [],
            schoolPointsArray: [],
            loading: false,
        };
    },
    methods: {
        accessMatches() {
            this.loading = true;
            try {
                store.read('matches').then((data) => {
                    this.matchesArray = data;
                    this.loading = false;
                });
            } catch (error) {
                this.loading = false;
                console.error(error);
            }
        },
        accessPreviousMatches() {
            this.loading = true;
            try {
                store.read('prev_matches').then((data) => {
                    this.previousMatchesArray = data;
                    this.loading = false;
                });
            } catch (error) {
                this.loading = false;
                console.error(error);
            }
        },

        accessPlayerPoints() {
            this.loading = true;
            try {
                store.read('player_points').then((data) => {
                    this.playerPointsArray = data;
                    this.loading = false;
                });
            } catch (error) {
                this.loading = false;
                console.error(error);
            }
        },
        accessSchoolPoints() {
            this.loading = true;
            try {
                store.read('school_points').then((data) => {
                    this.schoolPointsArray = data;
                    this.loading = false;
                });
            } catch (error) {
                this.loading = false;
                console.error(error);
            }
        },
    },
    mounted() {
        // methods can be called in lifecycle hooks, or other methods!
        this.accessMatches();
        this.accessPreviousMatches();
        this.accessPlayerPoints();
        this.accessSchoolPoints();
    },
}).mount('#app');

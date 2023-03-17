import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// Create Stein Store instance
const VITE_STEIN_URL = import.meta.env.VITE_STEIN_URL;
const store = new SteinStore(VITE_STEIN_URL);

createApp({
    data() {
        return {
            matchesArray: [],
            count: 0,
            message: '',
        };
    },
    methods: {
        accessMatches() {
            try {
                store.read('matches').then((data) => {
                    this.matchesArray = data;
                    console.log('Stop clicking me...');
                });
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        // methods can be called in lifecycle hooks, or other methods!
        this.accessMatches();
    },
}).mount('#app');

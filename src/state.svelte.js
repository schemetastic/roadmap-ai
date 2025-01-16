
import { writable } from "svelte/store";

export const roadmap = writable(null);
export const selectedField = writable(null);
export let currentScreen = writable("home");

export const isLoading = writable(false);

export let collectedGems = writable(0);

export const dialog = $state({
    visible: false,
    title: "Title",
    message: "Message",
    closeAction: "none"
});


import { writable } from "svelte/store";

export const roadmap = writable(null);
export const selectedField = writable(null);
export let currentScreen = writable("home");

export const isLoading = writable(false);

export let collectedGems = writable(0);

export let canAdvance = writable(true);
export let canClickSkillBtn = writable(true);
export let canFinishGame = writable(false);

export const levels = $state({
    oneComplete: false,
    twoComplete: false,
    threeComplete: false,
    current: 0
});

export let patchedHoles = $state({
    first: false,
    second: false
});

export const dialog = $state({
    visible: false,
    type: "text",
    gemNum: 0,
    title: "Title",
    message: "Message",
    closeAction: "none"
});

<script>
    import "../global.css";
    import { roadmapFields } from "$lib/roadmap-options";
    import { fade } from "svelte/transition";
    import { currentScreen, dialog } from "../state.svelte";
    import HomeScreen from "$lib/HomeScreen.svelte";
    import RoadmapScreen from "$lib/RoadmapScreen.svelte";
    import DialogSign from "$lib/DialogSign.svelte";
</script>

<head>
    <title>Roadmap AI</title>
</head>

<div class="gameContainer">
    <div class="gameBox">
        {#if $currentScreen == "home"}
            <div class="screenContainer" transition:fade={{ duration: 300 }}>
                <HomeScreen />
            </div>
        {/if}
    </div>
</div>

<style>
</style>

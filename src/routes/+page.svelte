<script>
    import "../global.css";
    import { roadmapFields } from "$lib/roadmap-options";
    import { fade } from "svelte/transition";
    import { currentScreen, dialog } from "../state.svelte";
    import HomeScreen from "$lib/HomeScreen.svelte";
    import RoadmapScreen from "$lib/RoadmapScreen.svelte";
    import DialogSign from "$lib/DialogSign.svelte";
    import ProjectScreen from "$lib/ProjectScreen.svelte";
    import OutroScreen from "$lib/OutroScreen.svelte";
    dialog.visible = false;
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
        {#if $currentScreen == "roadmap"}
            <div class="screenContainer" transition:fade={{ duration: 300 }}>
                <RoadmapScreen />
            </div>
        {/if}
        {#if $currentScreen == "project"}
            <div class="screenContainer" transition:fade={{ duration: 300 }}>
                <ProjectScreen />
            </div>
        {/if}
        {#if $currentScreen == "outro"}
            <div class="screenContainer" transition:fade={{ duration: 300 }}>
                <OutroScreen />
            </div>
        {/if}
        {#if dialog.visible}
            <div class="dialogContainer" transition:fade={{ duration: 300 }}>
                <DialogSign />
            </div>
        {/if}
    </div>
</div>

<style>
</style>

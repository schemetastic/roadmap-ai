<script>
    import { roadmapFields } from "./roadmap-options";
    import Load from "./Load.svelte";
    import { isLoading, selectedField } from "../state.svelte";

    let loading = false;

    function handleClick(field) {
        selectedField.set(field);
        isLoading.set(true);
    }
</script>

<div class="screen" style="--bg: url(/img/home-bg.webp)">
    <div class="logoContainer">
        <img src="/img/logo.webp" class="floating" alt="Roadmap AI logo" />
        <h2>Which roadmap will you take?</h2>
    </div>
    <div class="optionsContainer x-center">
        {#each Object.keys(roadmapFields) as field}
            <button
                class="button"
                on:click={() => {
                    handleClick(field);
                }}>{roadmapFields[field]}</button
            >
        {/each}
    </div>
    {#if $isLoading}
        <div class="loadingContainer">
            <Load />
        </div>
    {/if}
</div>

<style>
    .logoContainer {
        padding: 120px;
        text-align: center;
    }
    .optionsContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        position: absolute;
        top: 300px;
        width: 720px;
    }
    .loadingContainer {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(5px);
        z-index: 90;
    }
</style>

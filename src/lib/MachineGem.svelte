<script>
    import { onMount } from "svelte";
    let {
        xVariant = 0,
        yVariant = 0,
        canClick = false,
        title = "",
        opacity = 1,
        description = "",
        cursor = "default",
        applyPos = true,
        xPos = 0,
        yPos = 0,
        zIndex = 1,
        bright = false,
        hoverAnim = "",
        float = false,
        floatDelay = 0,
        dialogType = "text",
    } = $props();
    import { dialog } from "../state.svelte";

    function handleClick() {}
</script>

<button
    on:click={handleClick}
    class={`${hoverAnim} ${float ? "floating" : ""} ${bright ? "bright" : ""}`}
    aria-label="Gem"
    style={`${applyPos ? `position: absolute; left: ${xPos}px; top:${yPos}px` : ""}; --bg-x: -${xVariant * 100}%; --bg-y: -${yVariant * 100}%; cursor: ${cursor}; opacity: ${opacity}; --float-delay: ${floatDelay}ms; z-index: ${zIndex};`}
></button>

<style>
    button {
        background-image: url("/img/gems-machine-sprite.webp");
        background-size: 300% auto;
        background-position-x: var(--bg-x);
        background-position-y: var(--bg-y);
        border: none;
        background-color: transparent;
        width: 202px;
        height: 195px;
        animation-delay: var(--float-delay);
    }
    .scale {
        transition: scale ease-in-out 0.2s;
        scale: 1;
    }
    .scale:hover {
        scale: 1.1;
    }
    .scale-opacity {
        transition:
            scale ease-in-out 0.2s,
            opacity ease-in-out 0.2s;
        scale: 1;
        opacity: 0.85;
    }
    .scale-opacity:hover {
        transition:
            scale ease-in-out 0.2s,
            opacity ease-in-out 0.2s;
        scale: 1.1;
        opacity: 1;
    }
    .bright {
        animation: brightnessAnimation 3s 2;
    }

    @keyframes brightnessAnimation {
        0% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(25);
        }
        100% {
            filter: brightness(1);
        }
    }
</style>

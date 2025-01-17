<script>
    let {
        xVariant = 0,
        applyPos = true,
        playLevel = 0,
        xPos = 0,
        yPos = 0,
    } = $props();
    import { dialog, currentScreen, levels } from "../state.svelte";

    function handleClick() {
        if (xVariant) {
            levels.current = playLevel;
            currentScreen.set("project");
        } else {
            dialog.title = "Locked!";
            dialog.message = "You need to collect more gems to unlock this.";
            dialog.visible = true;
        }
    }
</script>

<button
    on:click={handleClick}
    class={`${xVariant ? "scale-opacity" : ""}`}
    aria-label="Lock"
    style={`${applyPos ? `position: absolute; left: ${xPos}px; top:${yPos}px` : ""}; --bg-x: -${xVariant * 100}%; cursor: ${xVariant ? "pointer" : ""};`}
></button>

<style>
    button {
        background-image: url("/img/lock-sprite.webp");
        background-size: 200% auto;
        background-position-x: var(--bg-x);
        border: none;
        background-color: transparent;
        width: 111px;
        height: 150px;
    }
    .scale-opacity {
        transition:
            scale ease-in-out 0.2s,
            opacity ease-in-out 0.2s;
        scale: 1;
        opacity: 0.85;
    }
    .scale-opacity:hover,
    .scale-opacity:focus {
        transition:
            scale ease-in-out 0.2s,
            opacity ease-in-out 0.2s;
        scale: 1.1;
        opacity: 1;
    }
</style>

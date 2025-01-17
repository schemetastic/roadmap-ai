<script>
    let {
        xVariant = 0,
        yVariant = 0,
        canClick = false,
        title = "",
        description = "",
        cursor = "pointer",
        applyPos = true,
        hoverAnim = "",
        xPos = 0,
        yPos = 0,
        size = 92,
        dialogType = "collect-gem",
    } = $props();
    import { dialog } from "../state.svelte";

    function handleClick() {
        if (canClick) {
            dialog.title = title;
            dialog.message = description;
            dialog.visible = true;
            dialog.type = dialogType;
            dialog.closeAction =
                dialogType === "collect-gem" ? "collect-gem" : "";
        }
    }
</script>

<button
    on:click={handleClick}
    class={`${hoverAnim}`}
    aria-label="Gem"
    style={`--size:${size}px; ${applyPos ? `position: absolute; left: ${xPos}px; top:${yPos}px` : ""}; --bg-x: -${xVariant * 100}%; --bg-y: -${yVariant * 100}%; cursor: ${cursor}`}
></button>

<style>
    button {
        background-image: url("/img/gems-sprite.webp");
        background-size: 1200% auto;
        background-position-x: var(--bg-x);
        background-position-y: var(--bg-y);
        border: none;
        background-color: transparent;
        width: var(--size);
        height: var(--size);
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
</style>

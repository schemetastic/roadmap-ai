<script>
    import { onMount } from "svelte";
    import {
        dialog,
        currentScreen,
        collectedGems,
        patchedHoles,
        canClickSkillBtn,
    } from "../state.svelte";
    import MachineGem from "./MachineGem.svelte";

    onMount(() => {
        document.querySelector("#dialog").focus();
    });
    function handleClose() {
        if (dialog.closeAction == "collect-gem") {
            dialog.closeAction = "none";
            collectedGems.update((gems) => {
                gems++;
                return gems;
            });
        }
        if (dialog.closeAction == "outro") {
            dialog.closeAction = "none";
            currentScreen.set("outro");
        }
        if (dialog.closeAction == "go-to-roadmap") {
            dialog.closeAction = "none";
            currentScreen.set("roadmap");
        }
        if (dialog.closeAction == "insecurity-hole-1") {
            dialog.closeAction = "none";
            patchedHoles.first = true;
            if (patchedHoles.second) canClickSkillBtn.set(true);
        }
        if (dialog.closeAction == "insecurity-hole-2") {
            dialog.closeAction = "none";
            patchedHoles.second = true;
            if (patchedHoles.first) canClickSkillBtn.set(true);
        }
        dialog.visible = false;
        dialog.type = "text";
    }
</script>

<div class="dialogContent" tabindex="-1" id="dialog">
    <div class="textContent">
        <h2>{dialog.title}</h2>
        <p>{dialog.message}</p>
    </div>
    <div class="buttonContainer">
        <button class="button" style="--btn-font: 28px" on:click={handleClose}
            >{dialog.type == "collect-gem"
                ? "Collect"
                : dialog.type.startsWith("insecurity-hole")
                  ? "Got it!"
                  : "Close"}</button
        >
    </div>
    {#if dialog.type == "insecurity-hole-1"}
        <MachineGem
            xVariant={0}
            yVariant={2}
            yPos={150}
            xPos={150}
            float={true}
        />
    {/if}
    {#if dialog.type == "insecurity-hole-2"}
        <MachineGem
            xVariant={1}
            yVariant={2}
            yPos={150}
            xPos={150}
            float={true}
        />
    {/if}
</div>

<style>
    .dialogContent {
        position: relative;
        outline: none;
        width: 540px;
        height: 440px;
        padding: 1rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 5px;
    }
    .dialogContent:focus {
        outline: 2px dashed rgba(0, 0, 0, 0.25);
    }
    .buttonContainer {
        padding-top: 15px;
        width: 100%;
    }
    .textContent {
        min-height: 280px;
        width: 100%;
    }
    h2 {
        font-size: 32px;
        padding-bottom: 25px;
    }
    p {
        font-family: var(--font-text);
        font-size: 24px;
        line-height: 1.25;
    }
</style>

<script>
    import { onMount } from "svelte";
    import MachineGem from "./MachineGem.svelte";
    import {
        dialog,
        levels,
        canAdvance,
        canFinishGame,
        canClickSkillBtn,
        patchedHoles,
    } from "../state.svelte";

    const barMaxWidth = 523;
    let progress = 0;

    let multiplier = null;
    let decreaseBy = null;
    let intervalMs = null;
    let interValCleared = false;
    let completedLevel = false;
    let xVariant = levels.current - 1;
    let yVariant = 1;

    let interval = null;

    let fogOpacity = 1;

    if (levels.current === 1) {
        multiplier = 15;
        decreaseBy = 2;
        intervalMs = 100;
        dialog.title = "You've made it to your first project!";
        dialog.message =
            "Let's keep things simple, just press the “Apply Skill” button until the energy meter is filled.";
        dialog.visible = true;
    }
    if (levels.current === 2) {
        multiplier = 12;
        decreaseBy = 4;
        intervalMs = 90;
        dialog.title = "Oh no! Imposter syndrome fog is hitting you!";
        dialog.message =
            "(Sounds a bit too corny?) Does the “Apply Skill” button even works?";
        dialog.visible = true;
    }
    if (levels.current === 3) {
        multiplier = 10;
        decreaseBy = 4;
        intervalMs = 80;
        canClickSkillBtn.set(false);
        canClickSkillBtn.subscribe((canClick) => {
            if (canClick) {
                dialog.title = "You've patched all the insecurity holes!";
                dialog.message =
                    "Great job! Now you can continue applying your skills to fill the energy meter.";
                dialog.visible = true;
            }
        });
        dialog.title =
            "You are almost there! But... it looks like something happens to your energy meter!";
        dialog.message =
            "Insecurity holes have appeared in your energy meter, so the “Apply Skill” button is disabled. What happens if you press/click the holes?";
        dialog.visible = true;
    }

    function handleInsecurityHole(num) {
        if (num === 1) {
            dialog.title = "This was your first project!";
            dialog.message =
                "It was very easy, but it gave you motivation to keep it going.";
            dialog.type = "insecurity-hole-" + num;
            dialog.closeAction = "insecurity-hole-" + num;
        }
        if (num === 2) {
            dialog.title = "This was your Second project!";
            dialog.message =
                "No doubt you were already committed enough to work hard.";
            dialog.type = "insecurity-hole-" + num;
            dialog.closeAction = "insecurity-hole-" + num;
        }

        dialog.visible = true;
    }

    onMount(() => {
        interval = setInterval(() => {
            if (progress > 0) {
                progress -= decreaseBy;
                if (levels.current === 2) fogOpacity = (100 - progress) / 100;
                if (progress < 0) {
                    progress = 0;
                    if (levels.current === 2) fogOpacity = 1;
                }
            }
        }, intervalMs);
    });

    function handleApplySkill() {
        if (!$canClickSkillBtn) return;

        progress += multiplier;

        if (levels.current === 2) fogOpacity = (100 - progress) / 100;

        if (progress >= 100) {
            progress = 100;
            if (levels.current === 2) fogOpacity = 0;
            if (!interValCleared) {
                completeLevel();
                interValCleared = true;
                clearInterval(interval);
            }
            return;
        }
    }

    function completeLevel() {
        completedLevel = true;
        progress = 100;
        setTimeout(() => {
            yVariant = 2;
        }, 3000);
        setTimeout(() => {
            dialog.title = "It looks like you've created something!";
            if (levels.current === 1) {
                levels.oneComplete = true;
                dialog.message =
                    "Hurray! You finished your first project, but the next is a bit tougher. Are you up for the challenge?";
            }
            if (levels.current === 2) {
                levels.twoComplete = true;
                dialog.message =
                    "Great job! When the imposter syndrome hits, you have to keep pushing! You're above halfway of the road!";
            }
            if (levels.current === 3) {
                levels.threeComplete = true;
                dialog.message =
                    "Amazing! When you feel insecure about your skills, always take a look to what you have achieved to remember who you are and what you can do. And that's it, now a little surprise awaits you! 🎉";
                canFinishGame.set(true);
            }
            canAdvance.set(true);
            dialog.visible = true;
            dialog.closeAction = "go-to-roadmap";
        }, 7300);
    }
</script>

<div class="screen" style="--bg: url(/img/project-bg.webp)">
    <h1>
        Project: {levels.current === 1
            ? "Small"
            : levels.current === 2
              ? "Medium"
              : "Large"}
    </h1>
    <h2>Energy Meter</h2>
    <div
        class="bar"
        style={`--width: ${(progress * (barMaxWidth / 100)).toFixed()}px`}
    ></div>
    <button
        aria-label="Press repeatedly"
        class="skillBtn"
        on:click={() => {
            handleApplySkill();
        }}
        disabled={!$canClickSkillBtn}
    >
        Apply Skill
    </button>
    <MachineGem
        {xVariant}
        xPos={590}
        yPos={330}
        float={true}
        opacity={completedLevel ? 0 : 0.9}
    />
    <MachineGem
        {xVariant}
        {yVariant}
        xPos={590}
        yPos={330}
        float={true}
        bright={completedLevel}
        opacity={progress / 100}
        zIndex={2}
    />

    {#if levels.current === 2}
        <img
            class="fog"
            src="/img/fog-texture.webp"
            alt="Fog"
            style={`--fog-opacity: ${fogOpacity}`}
        />
    {/if}
    {#if levels.current === 3}
        <button
            class={`insecurityHole ${patchedHoles.first ? "insecurityHole-removed" : ""}`}
            aria-label="Insecurity hole"
            style="--x-pos:450px; --y-pos: 127px"
            on:click={() => {
                handleInsecurityHole(1);
            }}
        ></button>
        <button
            class={`insecurityHole ${patchedHoles.second ? "insecurityHole-removed" : ""}`}
            aria-label="Insecurity hole"
            style="--x-pos:700px; --y-pos: 127px"
            on:click={() => {
                handleInsecurityHole(2);
            }}
        ></button>
    {/if}
</div>

<style>
    h1 {
        color: white;
        font-size: 38px;
        position: absolute;
        bottom: 100px;
        right: 205px;
        width: 230px;
        text-align: center;
    }
    h2 {
        color: white;
        font-size: 32px;
        position: absolute;
        top: 140px;
        left: 140px;
        width: 175px;
        text-align: left;
    }
    .skillBtn {
        background-color: #192369;
        color: white;
        border: 2px solid #ffcc00;
        border-radius: 5px;
        position: absolute;
        bottom: 150px;
        left: 152px;
        mix-blend-mode: multiply;
        font-size: 32px;
        padding: 15px 20px;
        cursor: pointer;
    }
    .skillBtn:hover,
    .skillBtn:focus {
        background-color: #ffcc00;
        color: #192369;
        border: 2px solid #192369;
    }
    .skillBtn[disabled] {
        background-color: #2e2e2e;
        color: #9e9e9e;
        border: 2px solid #666;
        cursor: not-allowed;
    }
    .bar {
        position: absolute;
        top: 147px;
        left: 363px;
        width: var(--width);
        height: 20px;
        border-radius: 20px;
        mix-blend-mode: lighten;
        background-color: #ff0081;
        transition: width ease-in-out 0.15s;
    }
    .fog {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: var(--fog-opacity, 1);
        z-index: 10;
        pointer-events: none;
    }
    .insecurityHole {
        background-image: url("/img/hole.webp");
        background-color: transparent;
        border: none;
        width: 56px;
        height: 58px;
        position: absolute;
        top: var(--y-pos);
        left: var(--x-pos);
        cursor: pointer;
        visibility: visible;
        transition:
            scale ease-in-out 0.2s,
            opacity ease-in-out 0.35s,
            visibility ease-in-out 0.35s;
    }
    .insecurityHole:hover,
    .insecurityHole:focus {
        filter: drop-shadow(0 0 5px #ff0081);
        scale: 1.1;
    }
    .insecurityHole-removed {
        opacity: 0;
        visibility: hidden;
    }
</style>

<script>
    import Gem from "./Gem.svelte";
    import Lock from "./Lock.svelte";
    import MachineGem from "./MachineGem.svelte";
    import {
        collectedGems,
        roadmap,
        levels,
        canAdvance,
        canFinishGame,
        currentScreen,
        dialog,
    } from "../state.svelte";

    const gemsStatic = [
        { x: 70, y: 175 },
        { x: 207, y: 150 },
        { x: 330, y: 130 },
        { x: 727, y: 175 },
        { x: 827, y: 275 },
        { x: 670, y: 325 },
        { x: 530, y: 337 },
        { x: 100, y: 360 },
        { x: 144, y: 486 },
        { x: 281, y: 510 },
        { x: 460, y: 507 },
        { x: 613, y: 493 },
    ];

    collectedGems.subscribe((gems) => {
        if (gems === 3 && !levels.oneComplete) {
            canAdvance.set(false);
        }
        if (gems === 7 && !levels.twoComplete) {
            canAdvance.set(false);
        }
        if (gems === 12 && !levels.threeComplete) {
            canAdvance.set(false);
        }
    });

    function handleEndClick() {
        if ($canFinishGame) {
            currentScreen.set("outro");
        } else {
            dialog.title = "Locked!";
            dialog.message = "You need to finish the roadmap to unlock this.";
            dialog.visible = true;
        }
    }
</script>

<div class="screen" style="--bg: url(/img/roadmap-bg.webp)">
    <h1>Collect gems to progress</h1>
    {#each gemsStatic as { x, y }, index}
        <Gem
            xVariant={index}
            yVariant={index === $collectedGems && $canAdvance
                ? 2
                : index === $collectedGems && !$canAdvance
                  ? 1
                  : index < $collectedGems
                    ? 0
                    : 1}
            yPos={y}
            xPos={x}
            title={$roadmap[index].step}
            description={$roadmap[index].description}
            canClick={$collectedGems > index ||
                ($collectedGems === index && $canAdvance)}
            dialogType={$collectedGems === index ? "collect-gem" : "text"}
            hoverAnim={$collectedGems === index && !$canAdvance
                ? ""
                : $collectedGems >= index
                  ? "scale-opacity"
                  : ""}
            cursor={$collectedGems === index && !$canAdvance
                ? "default"
                : $collectedGems >= index
                  ? "pointer"
                  : "default"}
        />
    {/each}
    {#if !levels.oneComplete}
        <Lock
            xPos={520}
            yPos={120}
            xVariant={$collectedGems === 3 ? 1 : 0}
            playLevel={1}
        />
    {:else}
        <MachineGem
            xVariant={0}
            yVariant={2}
            xPos={480}
            yPos={90}
            float={true}
        />
    {/if}
    {#if !levels.twoComplete}
        <Lock
            xPos={280}
            yPos={280}
            xVariant={$collectedGems === 7 ? 1 : 0}
            playLevel={2}
        />
    {:else}
        <MachineGem
            xVariant={1}
            yVariant={2}
            xPos={250}
            yPos={260}
            float={true}
            floatDelay={400}
        />
    {/if}
    {#if !levels.threeComplete}
        <Lock
            xPos={780}
            yPos={460}
            xVariant={$collectedGems === 12 ? 1 : 0}
            playLevel={3}
        />
    {:else}
        <MachineGem
            xVariant={2}
            yVariant={2}
            xPos={780}
            yPos={460}
            float={true}
            floatDelay={800}
        />
    {/if}

    <button
        class="button x-center"
        style={$canFinishGame ? "--btn-bg: #004fc5; --btn-h-bg: #006fe5" : ""}
        on:click={handleEndClick}>{$canFinishGame ? "Finish!" : "? ? ?"}</button
    >
</div>

<style>
    h1 {
        font-size: 48px;
        text-align: center;
        padding-top: 50px;
    }
    .button {
        position: absolute;
        bottom: 50px;
        --btn-font: 43px;
    }
</style>

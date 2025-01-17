<script>
    import { selectedField, roadmap, dialog } from "../state.svelte";
    import { roadmapFields } from "./roadmap-options";

    import Gem from "./Gem.svelte";
    import { onMount } from "svelte";

    const leftColGems = [0, 1, 2, 3, 4, 5];
    const rightColGems = [6, 7, 8, 9, 10, 11];

    onMount(() => {
        dialog.visible = true;
        dialog.title = "🎉 Congratulations! You made it 'till the end, but...";
        dialog.message =
            "This is just the beginning of a never ending journey. Remember, good things are HARD! When we learn something new we can feel like impostors, and no matter how much experience you have, insecurities come and go. When that happens, take a look at what you have achieved and keep pushing! (don't forget to take a screenshot of the roadmap. Save it and share it where you want to!)";
    });
</script>

<div class="screen" style="--bg: url(/img/outro-bg.webp)">
    <h1>My {roadmapFields[$selectedField]} Roadmap</h1>
    <div class="container x-center">
        <ol class="leftColumn">
            {#each leftColGems as gemNum}
                <li class="item">
                    <div>
                        <Gem
                            size={60}
                            xVariant={gemNum}
                            applyPos={false}
                            canClick={true}
                            dialogType="text"
                            title={$roadmap[gemNum].step}
                            description={$roadmap[gemNum].description}
                            hoverAnim="scale"
                        />
                    </div>
                    <span>{gemNum + 1}. {$roadmap[gemNum].step}</span>
                </li>
            {/each}
        </ol>
        <ol class="rightColumn">
            {#each rightColGems as gemNum}
                <li class="item">
                    <Gem
                        size={60}
                        xVariant={gemNum}
                        applyPos={false}
                        canClick={true}
                        dialogType="text"
                        title={$roadmap[gemNum].step}
                        description={$roadmap[gemNum].description}
                        hoverAnim="scale"
                    />
                    <span>{gemNum + 1}. {$roadmap[gemNum].step}</span>
                </li>
            {/each}
        </ol>
    </div>
</div>

<style>
    h1 {
        font-size: 42px;
        width: 100%;
        position: absolute;
        top: 70px;
        left: 0;
        text-align: center;
    }
    .container {
        display: flex;
        align-items: center;
        width: 920px;
        height: 575px;
        position: absolute;
        top: 130px;
    }
    .leftColumn {
        width: 50%;
    }
    .rightColumn {
        width: 50%;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        gap: 5px;
        padding: 7px;
    }
    .item span {
        font-size: 24px;
    }
</style>

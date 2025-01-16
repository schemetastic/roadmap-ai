<script>
    import { onMount } from "svelte";
    import { roadmap, currentScreen, isLoading } from "../state.svelte";

    let loadingText = "Loading...";
    onMount(async () => {
        const response = await fetch("/get-roadmap/");
        const data = await response.json();
        if (data.hasError) {
            loadingText = "There was an error with the request, try again.";
            setTimeout(() => {
                isLoading.set(false);
            }, 3000);
        } else {
            roadmap.set(data.data);
            currentScreen.set("roadmap");
        }
    });
</script>

<div class="loadingBox xy-center">
    <img src="/img/spinner.webp" alt="Loading..." />
    <h3>{loadingText}</h3>
</div>

<style>
    .loadingBox {
        width: 320px;
        position: absolute;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        text-align: center;
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    img {
        animation: spin 1s linear infinite;
    }
    h3 {
        padding-top: 15px;
        font-size: 28px;
    }
</style>

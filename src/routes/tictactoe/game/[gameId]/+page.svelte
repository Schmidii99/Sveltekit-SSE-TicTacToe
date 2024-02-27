<script lang="ts">
    import type { PageData } from './$types.js';
    export let data: PageData;
    $: console.log(data.gameId);
</script>

<div class=" w-full h-full space-y-3 mt-5">
    <div class="flex justify-center items-center space-x-3">
        <button class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></button>
    </div>
    <div class="flex justify-center items-center space-x-3">
        <div class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></div>
        <div class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></div>
        <div class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></div>
    </div>
    <div class="flex justify-center items-center space-x-3">
        <div class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></div>
        <div class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></div>
        <div class=" bg-gray-300 rounded-lg lg:rounded-2xl box"></div>
    </div>
</div>

<div class="popup">

</div>

<style>
    .box {
        height: min(20dvh, 20dvw);
        width: min(20dvh, 20dvw);
    }
</style>
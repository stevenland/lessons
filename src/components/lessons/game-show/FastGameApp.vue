<template>
    <div class="container mt-3 mb-5">
        <h3 class="lesson-subheading">Fast game</h3>
        <hr class="subheading-separator">
    <div class="container">
        <app-fast-game v-if="trialNum" :trialNum="trialNum"></app-fast-game>
        <app-enter-trials-number @acceptTrialNumber="trialNum=$event" v-else></app-enter-trials-number>
    </div>
    </div>
</template>

<script>
    import FastGame from './FastGame.vue';
    import EnterTrialsNumber from './EnterTrialsNumber.vue';
    export default {
        components: {
            appEnterTrialsNumber: EnterTrialsNumber,
            appFastGame: FastGame
        },
        data: function() {
            return {
                trialNum: null
            };
        }
    }
</script>

<style scoped>

</style>

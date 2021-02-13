<template>
<q-card>
    <q-card-section class="row justify-between bg-secondary q-py-sm">
        <div class="row no-wrap items-center">
            <p class="q-ma-none text-subtitle1 text-uppercase">Class:</p>
            <p class="q-ma-none q-ml-sm text-subtitle1 text-bold">{{season.vehicleClass}}</p>
        </div>
    </q-card-section>
    <q-card-section class="bg-primary">
        Perhaps if the season has finished, the overall result can be here.
        For example, show the top 3, and a link to 'view full results'.
        This could either open a page or a dialog (either way, it would be ideal to be able to link directly to it).
        This would show the full season results (names/teams in order of classification, points accrued. Any other info i guess.)

    </q-card-section>
    <q-card-section>
        A display of each event will go here.
        Perhaps if the event has results, the top 3 finishers can me shown on each event too.
        Probably as tiles.
        Each event can then be clicked on to view more info (if applicable) or its results.
        This could be a dialogue or new page. Either way, being able to link to it would be nice.
    </q-card-section>
</q-card>
</template>

<script>
export default {
  props: {
    season: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>

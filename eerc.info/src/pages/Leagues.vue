<template>
  <q-page class="flex column items-center">
    <h1>Leagues</h1>
    <q-card class="bg-info">
      <q-card-section>
        <p>Here we will have all management of leauges</p>
        <p>This will include:</p>
        <ul>
          <li>View, Edit and Create a league</li>
          <li>Overview of all leagues</li>
          <li>Drill down into a league, to edit rules, format, calendar and participants</li>
        </ul>
        <p><b>If anything is missing, drop a suggestion</b></p>
      </q-card-section>
    </q-card>
    <div class="flex q-pa-md justify-start q-gutter-md">
      <q-card>
        <q-card-section class="q-pb-xs row items-center justify-between">
          <h5 class="q-my-none q-mx-xs">Super 7 Cup</h5>
          <q-badge class="text-caption">S7C</q-badge>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <p>Brief descriptor</p>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div>
            <p>10 events</p>
            <p><b>Next event:</b></p>
            <p>Redbull Ring - 17/05/2020 18:50BST</p>
          </div>
        </q-card-section>
        <q-card-section class="flex justify-end q-pt-xs">
          <q-btn icon="settings"/>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section class="q-pb-xs row items-center justify-between">
          <h5 class="q-my-none q-mx-xs">DiRT World Rally Championship</h5>
          <q-badge class="text-caption">DIRT</q-badge>
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <p>Brief descriptor</p>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div>
            <p>8 events</p>
            <p><b>Next event:</b></p>
            <p>Finland - 17/05/2020 18:50BST</p>
          </div>
        </q-card-section>
        <q-card-section class="flex justify-end q-pt-xs">
          <q-btn icon="settings"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Leagues',
  data () {
    return {
    }
  }
}
</script>

<style>
.logo {
  max-width: 15rem;
}
</style>

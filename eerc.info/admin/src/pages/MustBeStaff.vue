<template>
  <q-page class="q-pa-md text-center column justify-center items-center">
    <q-icon name="mdi-alert" size="10rem" />
    <h1>{{ getDenialMessage() }}</h1>
    <h4>
      You are trying to access a staff only page. You are not staff. Contact a site admin if you believe this is an error.
    </h4>
    <q-btn label="Return to Login" color="primary" text-color="black" @click="routeToLogin" />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      messages: [
        '🦀Access is denied🦀',
        'All your access are belong to us.',
        'Get fucked.',
        '🚫🚫🚫🚫🚫',
        'Fuck off Jenson.',
        'Suck a dick.',
        'Whomst the fuck are you?',
        'Suck my dick.',
        'Fuck off',
        'Fuck you',
        'I am Metatron! I am one with God! God says FUCK YOU.',
        'Kachow.',
        'Remove yourself',
        'Get the fuck out of my room im playing Minecraft.',
        'What the FUCK is up Kyle?',
        '🤠You aint from round these parts boy.',
        'YOU AINT SHIT.',
        'Fuck off and go play your games.',
        'Okay coomer.',
        'You cannot consoom this.',
        'Commit go away.',
        "I'm shy 😳",
        "I'm sorry, I can't let you do that.",
        'You have 7 days left to live.'
      ]
    }
  },
  methods: {
    routeToLogin () {
      this.$router.push('/login')
    },
    getDenialMessage () {
      return this.messages[Math.floor(Math.random() * this.messages.length)]
    }
  }
}
</script>

<style></style>

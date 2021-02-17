<template>
  <!-- Init login idea:
    If not logged in, redirect to login page (this will always happen upon first connecting)
    On login page, wait for the store to have 'init' set to true - this will be me applied for firebase authOnStateChanged.
    From there, we can check if we are logged in. If we aren't, prompt the user for log in.
    When going to login page then, show a spinner and maybe text sayingbundleRenderer.
    Once login action is done, redirect back to target. -->
  <q-page class="flex justify-center items-center column">
    <h5>admin.eerc.info</h5>
    <div class="flex row items-center justify-center">
      <q-icon name="mdi-login" size="xl"/>
      <h2 class="q-pa-none">Login</h2>
    </div>
    <q-form @submit.prevent class="flex column q-ma-md q-gutter-sm">
      <q-input
        v-model="email"
        label="Email Address"
        type="email"
        filled
      />
      <q-input
        v-model="password"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
        :hint="isRegister ? 'Must be at least 8 characters' : undefined"
        filled>
        <template v-slot:append>
            <q-icon
              :name="isPwd ? 'mdi-eye-off' : 'mdi-eye'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
      </q-input>
      <!-- Register form -->
      <template v-if="isRegister">
        <q-input
          v-model="passwordConfirm"
          label="Confirm password"
          :type="isPwd ? 'password' : 'text'"
          filled>
        </q-input>
        <q-btn class="bg-primary" type="submit" :label="registering ? '' : 'Register'" @click="register">
          <q-spinner-dots v-if="registering"
            :thickness="4"/>
        </q-btn>
      </template>
      <!-- Login form -->
      <template v-else>
        <q-btn class="bg-primary" type="submit" :label="loggingIn ? '' : 'Login'" @click="login">
          <q-spinner-dots v-if="loggingIn"
            :thickness="4"/>
        </q-btn>

      </template>

      <q-separator />

      <!-- Both of these are just used to change between registering and logging in, they do not perform the actions of logging in or registering -->
      <!-- Login form -->
      <template v-if="!isRegister">
        <q-btn class="bg-primary" label="Register" @click="isRegister = true"/>
      </template>
      <!-- Register form -->
      <template v-else>
        <q-btn class="bg-primary" label="Login" @click="isRegister = false"/>
      </template>
    </q-form>
  </q-page>
</template>

<script>
export default {
  meta: {
    title: 'Login | admin.eerc.info',
    description: { name: 'description', content: 'Log into the EERC Admin portal' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
  },
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      isPwd: true,
      isRegister: false,
      loggingIn: false,
      registering: false
    }
  },
  methods: {
    login () {
      if (this.loggingIn)
        return
      console.log('Login')
      this.loggingIn = true
      this.$store.dispatch('auth/signIn', { email: this.email, password: this.password })
        .then(() => {
          this.$q.notify({ type: 'positive', message: 'Logged in.' })
          let path = '/'
          if (this.$route.query && this.$route.query.source) {
            path = this.$route.query.source
          }
          this.loggingIn = false
          this.$router.push(path)
        })
        .catch((err) => {
          this.loggingIn = false
          this.$q.notify({ type: 'negative', message: `Failed to log in: ${err.message}` })
        })
    },
    register () {
      if (this.registering)
        return
      console.log('Register')
      this.registering = true
      this.$store.dispatch('auth/register', { email: this.email, password: this.password, passwordConfirm: this.passwordConfirm })
        .then(() => {
          let path = '/'
          if (this.$route.query && this.$route.query.source) {
            path = this.$route.query.source
          }
          this.registering = false
          this.$router.push(path)
          this.$q.notify({ type: 'positive', message: 'Successfully registered.' })
        }).catch(err => {
          this.registering = false
          this.$q.notify({ type: 'negative', message: `Failed to register: ${err.message}` })
        })
    }
  }
}
</script>

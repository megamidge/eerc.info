<template>
  <div class="countdown">
    <p class="title">{{name}}</p>
    <p class="deadline">{{deadline.toLocaleDateString(undefined,dateOptions)}}</p>
    <div class="timer">
      <div class="value">
        <h1>{{days(difference) | twoDigits}}</h1>
        <p>days</p>
      </div>
      <div class="value">
        <h1>{{hours(difference) | twoDigits}}</h1>
        <p>hours</p>
      </div>
      <div class="value">
        <h1>{{minutes(difference) | twoDigits}}</h1>
        <p>minutes</p>
      </div>
      <div class="value">
        <h1>{{seconds(difference) | twoDigits}}</h1>
        <p>seconds</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "countdown",
  props: {
    deadline: Date,
    name: String
  },
  data() {
    return {
      interval: null,
      now: Math.trunc(new Date().getTime() / 1000),
      difference: 0,
      date: null,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short"
      }
    };
  },
  created() {
    this.date = Math.trunc(this.deadline / 1000);
    this.interval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  watch: {
    now(value) {
      this.difference = this.date - this.now;
      if (this.difference <= 0) {
        this.difference = 0;
        clearInterval(this.interval);
        //Tick onto next timer, raise event? I Dunno.
      }
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    seconds(date) {
      return Math.trunc(date) % 60;
    },
    minutes(date) {
      return Math.trunc(date / 60) % 60;
    },
    hours(date) {
      return Math.trunc(date / 60 / 60) % 24;
    },
    days(date) {
      return Math.trunc(date / 60 / 60 / 24);
    }
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return "0" + value.toString();
      }
      return value.toString();
    }
  }
};
</script>

<style scoped>
.countdown {
  background: #18222c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.timer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  background: #12181f;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}
.timer h1 {
  margin: 0.8rem;
}
.title {
  margin: 0.2rem;
  padding: 0;
  font-weight: bolder;
  font-size: 1.2rem;
}
.deadline {
  margin: 0.2rem;
  padding: 0;
  font-size: 1rem;
}
.value h1 {
  margin: 0.4rem;
}
.value p {
  margin: 0.4rem;
  font-size: 0.8rem;
}
</style>

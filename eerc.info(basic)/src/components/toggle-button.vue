<template>
  <div class="toggle-button-control">
      <div class="toggle-button-label">
          <slot></slot>
      </div>
      <div class="toggle-button" :class="{enabled: isActive}" @click="toggle">
          <div class="button"></div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentState:false
        }
    },
    model:{
        prop:"isActive",
        event:"toggle"
    },
    props:{
        isActive:Boolean,
    },
    methods:{
        toggle(){
            this.$emit("toggle", !this.isActive)
        }
    },
    computed:{
        checkedValue:{
            get(){
                return this.defaultState
            },
            set(newValue){
                this.currentState = newValue
            }
        }
    }
}
</script>
<style>
.toggle-button-control {
    display:flex;
    flex-direction: row;
    align-items: center;
    margin:0.4rem;
}
.toggle-button-control .toggle-button {
    height:1.6rem;
    width: calc(1.6rem * 2);
    border: 2px solid var(--accent-bright);
    box-shadow: inset 0px 0px 2px 0px rgba(0,0,0,0.33);
    border-radius:1.6rem;
    transition: all 0.3s ease-in-out;
    cursor:pointer;
}
.toggle-button-control .toggle-button .button {
    height: calc(1.6rem - (2* 2px));
    width: calc(1.6rem - (2 * 2px));

    border: 2px solid var(--accent-bright);
    border-radius: calc( 1.6rem - (2 * 2px));
    background: var(--accent-bright);
    transition:all 0.3s ease-in-out;
}
.toggle-button-control .toggle-button.enabled {
    background: var(--accent-bright);
    box-shadow:none;
}
.toggle-button-control .toggle-button.enabled .button{
    background:rgba(var(--colour-main));
    transform: translateX(calc(calc( 1.6rem - (2 * 2px) ) + (2 *2px)));
}
.toggle-button-control .toggle-button-label{
    margin-right: 1rem;
}
</style>
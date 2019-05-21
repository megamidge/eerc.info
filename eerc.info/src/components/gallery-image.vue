<template>
  <div
    class="image-container"
    :class="{wide:displayType === 'wide', square:displayType==='square', tall:displayType==='tall'}"
    
  >
    <img class="lowres" :src="imageMeta.lowres">
    <img ref="image" :src="`img/gallery/${image}`">
    <div class="text">
      <h5>{{image}}</h5>
      <p>{{imageMeta.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryImage",
  props: {
    image: {
      type: String,
      default: ""
    },
    imageMeta: Object
  },
  data() {
    return {
      displayType: "default",
      hover: false,
      imageHeight: 0,
      imageWidth: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.image.complete) this.imageDisplayType();
      else this.$refs.image.addEventListener("load", this.imageDisplayType);
    });
  },
  methods: {
    imageDisplayType() {
      let img = this.$refs.image;
      let gcd = this.gcd(img.naturalWidth, img.naturalHeight);
      this.imageHeight = img.naturalHeight
      this.imageWidth = img.naturalWidth
      let ar = {
        x: img.naturalWidth / gcd,
        y: img.naturalHeight / gcd
      };
      if (ar.x > 16 && ar.y >= 9 && ar.y < ar.x) this.displayType = "wide";
      if (ar.y > ar.x) this.displayType = "tall";
      if (ar.y >= ar.x - 4 && ar.y <= ar.x + 4) this.displayType = "square";
    },
    gcd(a, b) {
      if (b === 0) return a;
      return this.gcd(b, a % b);
    }
  }
};
</script>

<style scoped>
.image-container {
  grid-column: auto/span 1;
  /* background: black; */
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  /* width:100%; */
}
.wide {
  grid-column: auto/span 3;
  grid-row: auto/span 2;
}
.square {
  grid-column: auto/span 2;
  grid-row: auto/span 2;
}
.tall {
  grid-row: auto/span 2;
}
.image-container img {
  /* background: black; */
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all 0.4s;
  transition-delay: 0.2s;
  z-index:1;
}
.image-container .lowres {
  position: absolute;
  z-index:-2;
  image-rendering:pixelated;
}
@media screen and (max-width: 460px) {
  .wide {
    grid-column: auto/span 2;
    grid-row: auto/span 1;
  }
}

.text {
  position: absolute;
  background: #000000aa;
  top: -1%;
  bottom: -1%;
  left: -1%;
  right: -1%;
  transform: rotateY(180deg);
  transition: all 0.4s;
  transition-delay: 0.2s;
  backface-visibility: hidden;
  display: block;
}
.image-container:hover img {
  transform: rotateY(180deg);
  transition: all 0.4s;
  transition-delay: 0.4s;
}
.image-container:hover .text {
  transform: none;
  transition: all 0.4s;
  transition-delay: 0.4s;
}
</style>

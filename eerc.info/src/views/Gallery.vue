<template>
  <div class="main-panel">
    <h1 style="margin:0;">Gallery</h1>
    <h4 style="margin:0;">(Prototype)</h4>
    <div class="gallery-panel">
      <gallery-image
        v-for="(image,index) in images"
        :key="index"
        :image="image.image"
        :imageMeta="image"
      ></gallery-image>
    </div>
  </div>
</template>

<script>
import GalleryImage from "@/components/gallery-image";
export default {
  name: "Gallery",
  components: {
    GalleryImage
  },
  data() {
    return {
      images: [
        {
          image: "378860_20180401172910_1.png",
          text: "Neeeum, is a Porsche doing a fast."
        },
        {
          image: "378860_20180422220841_1.png",
          text: "They is speed."
        },
        {
          image: "378860_20190127212703_1.png",
          text: "Tight."
        },
        {
          image: "ss182955 - sam smith.jpg",
          text: "Battling on the straight."
        },
        {
          image: "378860_20190127234504_1 - ELENSARUV SVET.png",
          text: "Into the sun."
        },
        {
          image: "20180429212541_1 - Ronzio Pilato.jpg",
          text: "Cresting."
        },
        {
          image: "20181111195357_1 - Hatronoth Gaming.jpg",
          text: "2 Xexon drivers battle it out."
        },
        {
          image: "20190125205032_1 - Ronzio Pilato.jpg",
          text: "He Pit."
        },
        {
          image: "20190125211524_1 - Ronzio Pilato.jpg",
          text: "A brewing battle?"
        },
        {
          image: "F1_2017_photo_20171027_001701 - Ronzio Pilato.bmp",
          text: "OOF!"
        },
        {
          image: "pCARS2AVX_2019-01-27_22-27-36 - sam smith.jpg",
          text: "Speeb."
        },
        {
          image: "20190217202028_1.jpg",
          text:
            "Hatronoth and Mr.Beletal side-by-side on the back straight at Sakkitto."
        },
        {
          image: "ss010150 - Ronzio Pilato.jpg",
          text: "Wet."
        },
        {
          image: "ss151155 - Hansje 53.jpg",
          text: "Racing."
        },
        {
          image: "ss195655 - Hansje 53.jpg",
          text: "Oh no."
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.main-panel {
  display: flex;
  flex-direction: column;
  background: #18222c7f;
}
.gallery-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  grid-auto-flow: row dense;
  grid-auto-rows: min-content;
  padding: 1rem;
}
.image-view .image-text {
  margin: 0.8rem;
  max-width: 35%;
}
@media screen and (min-width: 1200px) {
  .gallery-panel {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media screen and (max-width: 700px) {
  .gallery-panel {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 460px) {
  .gallery-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

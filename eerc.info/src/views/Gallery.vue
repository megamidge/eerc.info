<template>
<div class="main-panel">
    <h1 style="margin:0;">Gallery</h1>
    <h4 style="margin:0;">(Prototype)</h4>
    <div class="gallery-panel">
            <div class="image-container" v-for="(image,index) in images" :key="index" :class="{wide:index===9}">
                <img :src="`img/${image.image}`">
            </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Gallery',
    data () {
        return {
            images: [
                {
                    image:"gallery/378860_20180401172910_1.png",
                    text:"Neeeum, is a Porsche doing a fast."
                },
                {
                    image:"gallery/378860_20180422220841_1.png",
                    text:"They is speed."
                },
                {
                    image:"gallery/378860_20190127212703_1.png",
                    text:"Tight."
                },
                {
                    image:"gallery/378860_20190127234504_1 - ELENSARUV SVET.png",
                    text:"Into the sun."
                },
                {
                    image:"gallery/20180429212541_1 - Ronzio Pilato.jpg",
                    text:"Cresting."
                },
                {
                    image:"gallery/20190125205032_1 - Ronzio Pilato.jpg",
                    text:"He Pit."
                },
                {
                    image:"gallery/20190125211524_1 - Ronzio Pilato.jpg",
                    text:"A brewing battle?"
                },
                {
                    image:"gallery/F1_2017_photo_20171027_001701 - Ronzio Pilato.bmp",
                    text:"OOF!"
                },
                {
                    image:"gallery/pCARS2AVX_2019-01-27_22-27-36 - sam smith.jpg",
                    text:"Speeb."
                },
                {
                    image:"gallery/ss182955 - sam smith.jpg",
                    text:"Battling on the straight."
                },
                {
                    image:"gallery/ss010150 - Ronzio Pilato.jpg",
                    text:"Wet."
                },
                {
                    image:"gallery/ss151155 - Hansje 53.jpg",
                    text:"Racing."
                },
                {
                    image:"gallery/ss195655 - Hansje 53.jpg",
                    text:"Oh no."
                }
            ]
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.main-panel{
    display:flex;
    flex-direction: column;
    background:#18222c7F;
}
.gallery-panel {
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap:1rem;
    grid-auto-flow: row dense;
    grid-auto-rows: min-content;
    padding:1rem;
}
.image-container {
    grid-column: auto/span 1;
    background:black;
}
.wide {
    grid-column: auto/span 3;
    grid-row: auto/span 2;
}
.image-container img{
    display: block;
    object-fit: cover;
    width:100%; 
    height:100%;
}
.image-view .image-text {
    margin: 0.8rem;
    max-width:35%;
}
</style>

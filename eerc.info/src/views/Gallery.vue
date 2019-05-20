<template>
<div class="main-panel">
    <h1 style="margin:0;">Gallery</h1>
    <h4 style="margin:0;">(Prototype)</h4>
    <div class="gallery-panel">
        <div class="image-view" v-for="(image,index) in images" :key="index">
            <p class="image-text">{{image.text}}</p>
            <div class="image-container">
                <img :src="`img/${image.image}`">
            </div>
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
                    image:"gallery/ss010150 - Ronzio Pilato.jpg",
                    text:"Wet."
                },
                {
                    image:"gallery/ss151155 - Hansje 53.jpg",
                    text:"Racing."
                },
                {
                    image:"gallery/ss182955 - sam smith.jpg",
                    text:"Battling on the straight."
                },
                {
                    image:"gallery/ss195655 - Hansje 53.jpg",
                    text:"Oh no."
                }
            ]
        }
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
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content: flex-start;
}
.image-view {
    background: #18222c;
    height:18rem;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: stretch;
    max-width:100%;
    min-width:10rem;
    margin:1rem;
}
.image-view .image-container {
    /* height:100%;
    max-height:100%; */
    display:flex;
    flex-direction: row;
    /* max-width:80%; */
    max-height:100%;
}
.image-view .image-container img{
    /* align-self:flex-start;
    width:100%;
    height:auto; */
    object-fit: contain;
    max-height:100%;
    max-width:100%;
    
}
.image-view .image-text {
    margin: 0.8rem;
    max-width:35%;
}
</style>

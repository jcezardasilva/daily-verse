<template>
<div class="vw-100">
    <div class="container d-flex justify-content-center">
        <div class="parameter ms-1 me-1">
            <label>Data Inicial</label>
            <input type="date" class="form-control" @input="setDate">
        </div>
        <div class="parameter ms-1 me-1">
            <label>Data Inicial</label>
            <input type="number" class="form-control" @input="setQtd">
        </div>
        <div class="mt-4 ms-1 me-1">
            <button @click="get" class="btn btn-secondary">
                Gerar
            </button>
        </div>
        <div class="mt-4 ms-1 me-1">
            <button @click="inputFile = !inputFile" class="btn btn-secondary">
                Importar
            </button>
        </div>
        <div class="mt-4 ms-1 me-1">
            <button @click="download" class="btn btn-secondary">
                Exportar
            </button>
        </div>
    </div>
    
    <div class="container d-flex justify-content-center" v-if="inputFile">
        <div class="mb-3 w-50">
            <label for="formFile" class="form-label">Selecionar Arquivo</label>
            <input class="form-control" type="file" id="formFile" @change="upload">
        </div>
    </div>
    
    <div class="verses d-flex flex-wrap w-100 justify-content-center">
        <VerseCard class="verse" v-for="(item,index) in verses" :key="index" :text="item.text" :source="item.source" :date="addDays(date,index)"/>
    </div>
    
</div>
</template>

<script lang="ts">
import { getVerses } from '../core/verseService';
import { Verse } from '../typings/types';
import VerseCard from './VerseCard.vue';
export default {
    name: "VersList",
    data() {
        return {
            verses: new Array<Verse>(),
            date: new Date(),
            qtd: 10,
            inputFile: false
        };
    },
    methods: {
        async get() {
            const verses = await getVerses(this.qtd);
            this.verses = verses.map((verse,index) => {
                verse.date = this.addDays(this.date,index);
                return verse;
            });
        },
        download() {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.verses));
            var a = document.createElement("a");
            a.setAttribute("href",dataStr);
            a.setAttribute("download", "verses.json");
            a.click();
        },
        upload(event: any){
            var reader = new FileReader();
            reader.onload = (event: any)=>{
                this.verses = JSON.parse(event.target.result);
            };
            reader.readAsText(event.target.files[0]);
        },
        setDate(event:Event){
            const {target} = event;
            this.date = new Date((target as HTMLInputElement).value);
        },
        setQtd(event:Event){
            const {target} = event;
            this.qtd = parseInt((target as HTMLInputElement).value);
        },
        addDays(date:Date,days:number){
            let ndate = new Date(date.valueOf());
            ndate.setUTCHours(23);
            ndate.setDate(ndate.getDate() + days);
            return ndate;
        }
    },
    components: { VerseCard }
}
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
.verse {
    width: 40%;
}
.parameter {
    width: 30%;
}
</style>

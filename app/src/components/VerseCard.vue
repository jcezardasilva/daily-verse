<template>
    <div class="card bg-secondary border border-dark text-light m-2" >
        <div class="card-body">
            <h5>Cafezinho: {{ date.toLocaleDateString() }}</h5>
            <div class="mt-2">
                <p>Título: <span class="verse-title copyable" @click="copyText">Devocional Cafezinho - {{source}}</span></p>
                <p>Arquivo: <span class="copyable" @click="copyText">devocional - {{date.toISOString().substring(0, 10).replaceAll("-","")}}</span></p>
                <div class="m-0 copyable d-flex flex-column" @click="copyText">
                    <pre class=""><span class="verse-text">{{ text }}</span>&#x0d;&#x0a;<span class="verse-source">{{ source }}</span></pre>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "VerseCard",
    props: {
        text: String,
        source: String,
        date: {
            type: Date,
            required: true
        }
    },
    methods: {
        copyText(event: any){
            navigator.clipboard.writeText(event.target.innerHTML);
        }
    }
}
</script>
<style scoped>
.copyable {
    cursor: pointer;
}
pre {
    white-space: pre-wrap;
}
span:hover, pre:hover {
    background-color: gray;
}
</style>
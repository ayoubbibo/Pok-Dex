app.component('searchList',
{
    props: 
    {
        searchPokemon : 
        {
            type : Array,
            required : true
        }
    },
    template: 
    /*html*/
    `
    <div class="List-pokemon">

        <form class="reload" @submit.prevent="Reload">
            <button class="btn-reload" type="submit"><img  class="reloaBtn" src="assets/images/favicon.png" alt="poke image" title="reload the page"></button>
        </form>
        <ul class="poke-display-details">
            <li class="lidetails" v-for="(pokemon,index) in searchPokemon" :key="index"> 
                <img class="pokeImageDetails" :src="pokemon.img" alt="image de pokemon">  
                <ul class="pokeDetails">
                    <li class="id_poke">#{{ pokemon.id }}</li>
                    <li class="name_poke"> name : {{ pokemon.name}} </li>
                    <li class="base_experience">base_experience : {{ pokemon.caracteristique[0].base_experience}}exp </li>
                    <li class="height"> height : {{ pokemon.caracteristique[0].height / 10}}m </li>
                    <li class="abilities"> abilities : {{pokemon.caracteristique[0].abilities[0].ability.name}}
                   | {{pokemon.caracteristique[0].abilities[1].ability.name}}
                    </li>
                    
                </ul>
           </li>
        </ul>
    </div>
    `,
    methods:
    {
        Reload()
        {
            let result = true
            this.$emit('reload-submitted',result)
            console.log("before emit" + result)
        }
    }
})
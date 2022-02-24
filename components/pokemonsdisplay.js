app.component('pokemonsdisplay',
{
    template :
    /*html*/
    `
    <pokemonresearch @research-submitted='researchPokemon'></pokemonresearch>

    <searchList :searchPokemon="searchPokemon" @reload-submitted="reload" v-show="isSelected"></searchList>  
    <ul class="poke-display-list" v-show="DisplayAll"> 
        <li class="pokemon-li" v-for="(pokemonDetails, index) in pokemons" :key="pokemonDetails.id" @click="printPokemon(pokemonDetails)">      
        <searchList :searchPokemon="searchPokemon" v-show="isSelected"></searchList>    
        <img class="pokeImage" :src="pokemonDetails.img" alt="image de pokemon">    
            <div class="pokemon" :title="pokemonDetails.name">
                <h3 class="id_poke" >#{{ pokemonDetails.id }}</h3>
                <h5 class="name_poke">{{ pokemonDetails.name }}</h5>
            </div>
        </li> 
    </ul>
       
    `,
    data() {
        return {
            pokemons: [],
            searchPokemon : [],
            NumberPokemonTodisplay:100,
            DisplayAll : true,
            isSelected : false,
            selectedPokemon : []
        }
    },
    created()
    {
        const loop = this.NumberPokemonTodisplay
        for(let i=0; i<loop; i++)
        {
            let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
            fetch(url)
            .then(response => response.json())
            .then( data => {
                let pokemon = {
                    id : null,
                    name : "",
                    img :"",
                    caracteristique : []
                }
                let carac = {
                   base_experience : 0,
                   height : 0,
                   weight : 0,
                   abilities : []
                }
                carac.base_experience = data.base_experience
                carac.height = data.height
                carac.weight = data.weight
                carac.abilities = data.abilities
                pokemon.caracteristique.push(carac) 

                
                pokemon.id = data.id
                pokemon.name = data.name
                pokemon.img = data.sprites.other.dream_world.front_default
                this.pokemons.push(pokemon)
            })
        
            .catch(err => {
                console.log(err)
            })
        }
       // console.log(this.pokemons)
    },
    methods: {
        researchPokemon(Search)
        {
            this.searchPokemon = []
            let foundPokemon = this.pokemons.find(cust => cust.name === Search)
            //   console.log(foundPokemon)
            if(foundPokemon == undefined)
            {
                foundPokemon = this.pokemons.find(cust => cust.id === Number(Search))
            }

            if(foundPokemon != undefined)
            {
                this.searchPokemon.push(foundPokemon)
                this.DisplayAll = false
                this.isSelected = true
                console.log("we found" + foundPokemon)
                foundPokemon = {}
            } else
            {
            //  console.log(foundPokemon)
                console.log("please do another research")
            }
        },
        printPokemon(toPrint)
        {
            this.searchPokemon = []
            this.isSelected = true
            this.DisplayAll = false
            this.searchPokemon.push(this.pokemons.find(cust => cust.name === toPrint.name))
            console.log(this.searchPokemon)
        },
        reload(result)
        {
            console.log("result" + result)
            console.log("isselected" + this.isSelected)
            console.log("DisplayAll" + this.DisplayAll)
            this.isSelected = !result
            this.DisplayAll = result
            console.log("isselected" + this.isSelected)
        }
    }

})
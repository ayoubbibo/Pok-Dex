app.component('pokemonresearch', {
    template :
    /*html*/
    `
    <form class="selector" @submit.prevent="onSubmit">
        <input type="text" class="PokeDex" placeholder="Pokemon Search" v-model="name">
        <button class="btn-research" type="submit"><img  class="researchBtn" src="assets/images/favicon.png" alt="poke image"></button>
    </form>
    `,
    data()
    {
        return{
            name : ""
        }
    },
    methods:
    {
        onSubmit()
        {
            if(this.name != "")
            {
                let pokemonresearch = this.name
                this.$emit('research-submitted',pokemonresearch)
                this.name = ""
            }else
            {
                alert("please fill out the research before ☺")
            }
        }   
    }
})
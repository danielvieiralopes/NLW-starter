

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) // funcao anonima que esta retornando valor
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
     

    fetch(url)
        .then(res => res.json()) // funcao anonima que esta retornando valor
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            }
            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li`s

const itemsToCollect = document.querySelectorAll(".items-grid li") 

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]") 

let selectItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target

   

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    console.log('ITEM ID:', itemId)
    
    // verificar se existem itens selecionados, se sim 
    // pegar os itens selecionados

    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item == itemId // isso sera true ou false
        return itemFound
    })

    // se ja estiver selecionado,

    if(alreadySelected >= 0){
        // tirar da selecao
        const filteredItems = selectItems.filter(item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferentse
        })

        selectItems = filteredItems
    } else {
        // se nao estiver selecionado,
        //  add a selecao

        selectItems.push(itemId)
    }
    
    console.log('selectedItems:', selectItems)

    //att o campo escondido com os itens selecionados
    collectedItems.value = selectItems
    

}
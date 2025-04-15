// seleciona os elementos do formunlário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// captura o evento de input para formatar o valor
amount.oninput = () => { 
    // obtém o valor atual do input e remove os caracteres nao numericos
    let value = amount.value.replace(/\D/g, "")

    // transformar o valor em centavos
    value = Number(value)/100

    // atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    // formata o valor para brl
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

// captura o evento de subit do formulário
form.onsubmit = (event) => {
    // previne o comportameno padrão de fazer reload na página
    event.preventDefault()

    // cria um objeto com os detalhes da nova despesa
   const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
   }

    // chama a função que irá adicionar o item na lista.
   expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        
    } catch (error) {
        alert('Não foi possível atualizar a lista de despesas.')
        console.log(err)
    }
}
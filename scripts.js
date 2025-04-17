// seleciona os elementos do formunlário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

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

// adiciona items na lista
function expenseAdd(newExpense){
    try {
        // criando o elemento de li para adicionar o item na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)
        expenseIcon.classList.add("expense-info")

        // cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")}`

        // cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")

        // adiciona as informações do item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // adiciona o item na lista
        expenseList.append(expenseItem)

        // atualiza os valores totais.
        UpdateTotals()
    } catch (error) {
        alert('Não foi possível atualizar a lista de despesas.')
        console.log(err)
    }
}

// atualiza os valores totais da lista 
function UpdateTotals(){
    try {
        // recopera todos os items da lista
        const items = expenseList.children
        
        // atualiza a quantidade de items na lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // variável para incrementar o total
        let total = 0

        // percorre cada item da lista
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // removendo caracteres não numericos e substituindo a virgula pelo ponto
           let value = itemAmount.textContent.replace(/[^\d,.-]/g, "").replace(",", ".")

           // converte o valor para float
           value = parseFloat(value)

           // verificando se é um número válido
            if(isNaN(value)){
                return alert("Não foi possível calcular o total. Por favo, coloque números válidos.")
            }

            // incrementando o valor total
            total += Number(value)
        }

        // expensesTotal.textContent = formatCurrencyBRL(total)
        // cria a span com o r$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // formata o valor e remove o r$ que será exibido de forma customizada
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // limpa o conteúdo do elemento
        expensesTotal.innerHTML = ""

        // adiciona o simbolo da moeda e o valor formatado
        expensesTotal.append(symbolBRL, total)
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os valores totais.")
    }
}

// capturando clique nos items da lista
expenseList.addEventListener("click", function(event){
    // verifica se o elemento clicado é o X
    if(event.target.classList.contains("remove-icon")){

        // pegando a li pai do elemento clicado
        const item = event.target.closest(".expense")

        // remove o item da lista
        item.remove()
    }

    // atualiza os totais
    UpdateTotals()
})
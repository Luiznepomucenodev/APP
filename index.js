const { select, input, checkbox } = require("@inquirer/prompts")

let metas = []

async function start (){
    while(true){
        const opcao = await select({
            message: "Menu >",
            choices: [{
                name: "Cadastrar meta",
                value: "cadastrar"
            },
            {
                name: "Listar metas",
                value: "listar"
            },
            {
                name: "Metas realizadas",
                value: "realizadas"
            },
            {
                name: "Sair",
                value: "sair"
            }
        ]
        })

        const cadastrarMeta = async () => {
            const meta = await input({
                message: "Digite a meta:"
            })

            if(meta.length == 0){
                console.log("A meta não pode ser vazia")
                return
            }

            metas.push({
                value: meta,
                checked: false
            })
        }

        const listarMetas = async () => {
            const respostas = await checkbox({
                message: "Use a seta para mudar a meta, marcando e desmarcando",
                choices: [...metas]
            })

            if(respostas.length == 0){
                console.log("Nenhuma meta selecionada")
                return
            }
            
            metas.forEach((m) => {
                m.checked = false
            })

            respostas.forEach((resposta) => {
                const meta = metas.find((m) => {
                    return m.value == resposta
                })
                meta.checked = true
            })

            console.log("Meta(s) concluida(s)")
        }

        const metasRealizadas = async () => {
            const realizadas = metas.filter((meta) => {
                return meta.checked == true
            })

            if(realizadas.length == 0 ){
                console.log("Não existe mestas realizadas")
                return
            }

            await select({
                message: "Metas realizadas",
                choices: [...realizadas]
            })
            console.log(realizadas)
        }

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
            break
            case "listar":
                await listarMetas()
            break
            case "realizadas":
                await metasRealizadas()
            break
            case "sair":
                console.log("Até a proxima!")
                return
        }
    }
}

start()
const tela = document.querySelector('div#tela')
const sinais = ['x', '/', '+', '-']

let coden = 0 // indica em qual numero esta sendo inserido as informações, codigo do num
let pn = [false, false] //se número já tem ponto
let n = ['',''] // numeros
let op = 0 // qual tipo de operação a ser realizada
let mem = '' // oq vai aparecerendo na tela /memoria
let trava = 0

function calc(botao){
    if(trava == 1){
        if(botao == 'C'){ // reseta a calc
            mem = ''
            n[0] = ''
            n[1] = ''
            coden = 0
            op = 0
            trava = 0
        }
    }else{
        if(typeof(botao) == 'string' && botao != '.'){ 
            
            if(botao == 'C'){ // reseta a calc
                mem = ''
                n = ['', '']
                pn = [false, false]
                coden = 0
                op = 0

            }else if(botao == 'c'){ // corrige
                if(coden == 1 && (n[coden]).length==0){
                    op = 0
                    coden = 0
                }

                if(mem[(mem.length-1)] == n[coden][(n[coden].length-1)]){
                    if(n[coden][(n[coden].length-1)]=='.'){
                        pn[coden] = false 
                    }
                    n[coden] = (n[coden]).slice(0, ((n[coden]).length-1))
                }

                mem = mem.slice(0, (mem.length-1)) //string - ultimo elemento

            }else{

                switch (botao){
                case 'x':
                    if(add('x')) calcula(1)
                    break
                case '/':
                    if(add('/')) calcula(2)
                    break
                case '+':
                    if (add('+')) calcula(3)
                    break
                case '-':
                    if (add('-')) calcula(4)
                    break
                default: //chamada pelo botão igual
                    calcula(0)
                }
            }
        }else{ // numeros
            if(botao == '.'){ // se for ponto
                if(pn[coden] == false){ // se o número ainda não tem ponto
                    add(botao) // adiciona o ponto
                    pn[coden] = true 
                }
            }else{
                add(botao) // se for numero adiciona o numero
            }
        }
        
    }
    tela.innerHTML = mem
}

function add(a){ // passa info pra tela

    let ret = 1

    if(n[coden].length == 0 && a == '-'){ //sinal menos no inicio do numero
        n[coden] += (a)
        mem += a
        ret = 0

    }else if(sinais.indexOf(a) != -1){ //sinais no geral
        if((a != '-' && (sinais.indexOf(mem[mem.length-1]) != -1)) || (mem[mem.length-1] == '+' && a == '-') ||
        (mem[mem.length-1] == a)){
            mem = mem.slice(0, (mem.length-1)) // tratamento de inserção de sinais seguidos
            if(op!=0) op = (sinais.indexOf(a)+1)
            ret = 0

        }else if(n[coden].length == 0){
            n[coden] = '0' 
            mem += n[coden]
            
        }
        mem+=a  
        if(n[0] != '-') coden = 1
        
    }else{ //numeros e ponto
        n[coden] += (a)
        mem += a
    }

    return ret
}

function calcula(c){
    if (op == 0){
        op = c //primeira chamada
        if(c!=0) coden = 1
    }else{
        if(n[1] == '') n[1] = 0
        
        const result = ['', 'x', '/','+','-'] 
        switch (op){
            case 1:
                n[0] = Number(n[0])*Number(n[1])
                break
            case 2:
                if(n[1]==0){
                    mem = 'ERRO:div/0'
                    alert('Não é possivel dividir por 0!!')
                    tela.innerHTML = mem
                    trava = 1
                    return
                }
                n[0] = Number(n[0])/Number(n[1])
                break
            case 3:
                n[0] = Number(n[0])+Number(n[1])
                break
            case 4:
                console
                n[0] = Number(n[0])-Number(n[1])
                break
        }

        if (c == 0) coden = 0
        else coden = 1 // variavel para setar em qual numero vamos mexer

        if(isNaN(n[0]) || (sinais.indexOf(mem[0]) != -1 && mem[0] != '-')){
            trava = 1
            mem = 'ERRO'
            alert('Erro na expressão')
            return
        }

        n[1] = '' // reseta o segundo número
        pn[1] = false
        n[0] = n[0].toFixed(2)
        pn[0] = true 
        mem = `${n[0]}${result[c]}` //printa o resultado na tela
        op = c // atualiza a variavel de controle
    }
}

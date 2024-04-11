#include <iostream>
#include <stdio.h>
#include <string.h>
#include <locale.h>
#include <fstream>
#include <Windows.h>
#include <time.h>



using namespace std;


#define QNT_CADEIRAS 20


/*
Descri��o: Esta fun��o mostra a hora atual do sistema.
Par�metro: Nenhum
Retorno: Nenhum
*/
void mostraHora()
{
    char comando[50];
    sprintf(comando, "time /T 055");
    system(comando);
}



/*
Descri��o: Esta fun��o ir� apresentar o cabe�alho do sistema.
Par�metro:nenhum
Retorno: nenhum
*/
void cabecalho()
{
    system("cls");
    printf("SISTEMA DE VENDA DE INGRESSOS\n");
    system("echo %date%");
    mostraHora();
    printf("\n");
}

/*
Descri��o: Esta fun��o, validar� as o��es do menu.
Par�metro: Quantidade de op��es dispon�veis
Retorno: Op��o v�lida
*/
int validaOpcao(int qntOpcoes)
{
    int opcao;

    scanf("%d",&opcao);
    while(opcao < 1 || opcao > qntOpcoes)
    {
        printf("\nOp��o inv�lida!\nOpc�o: ");
        scanf("%d",&opcao);
    }
    return opcao;
}

/*
Descri��o: Esta fun��o, validar� os n�meros dos assentos disp�n�veis na sess�o.
Par�metro: Quantidade de cadeiras na sess�o
Retorno: Numero de assento v�lido.
*/
int validaCadeira(int qntCadeiras)
{
    int cadeira;

    printf("\nDigite o n�mero do assento desejado: ");
    scanf("%d",&cadeira);

    while(cadeira < 1 || cadeira > qntCadeiras)
    {
        printf("\nAssento n�o dispon�vel!\nAssento: ");
        scanf("%d",&cadeira);
    }

    return cadeira;
}
/*
Descri��o: Esta fun��o, verifica se ainda h� vagas na sess�o
Par�metro: Vetores de float contendos as cadeiras
Retorno: Se h� ou n�o cadeiras dispon�veis
*/
bool haVagas(float peca1[], float peca2[])
{
    int indice;

    for(indice = 0; indice < 20; ++indice)
    {
        if(peca1[indice] == 1 )
        {
            return true;
        }
        if(peca2[indice] == 1)
        {
            return true;
        }
    }

    printf("\n\nN�O H� MAIS VAGAS EM NENHUMA DAS PE�AS!\n\n");
    system("pause");
    return false;
}

/*
Descri��o: Esta fun��o ir� retornar a pe�a escolhida.
Par�metro: Valor do ingresso(inteira, meia, isento).
Retorno: Pe�a escolhida.
*/
int lePecas(float ingresso)
{

    cabecalho();
    printf("##### Ingressos ####\n\n");
    printf("1 - A BELA E A FERA - 19:00h - R$ %.2f\n",ingresso);
    printf("2 - CATS            - 21:00h - R$ %.2f\n",ingresso);
    printf("\nEscolha a pe�a: ");

    return validaOpcao(2);
}

/*
Descri��o: Esta fun��o apresentar� as cadeiras disp�niveis na sess�o
Par�metro: Vetor de cadeiras da sess�o
Retorno: nenhum
*/
void apresentaCadeiras(float peca[])
{

    int indice;

    for(indice = 1; indice <= 20; ++indice)
    {
        if(peca[indice-1] == 1)
        {
            if(indice < 10)
            {
                printf("[0%d] ",indice);
            }
            else
            {
                printf("[%d] ",indice);
            }

        }
        else
        {
            printf("[*] ");
        }
        if(indice % 5 == 0)
        {
            printf("\n");
        }
    }
}

/*
Descri��o: Esta fun��o, ler� a cadeira desejada e informar� se a mesma j� est� ocupada ou n�o.
Par�metro: Vetor de cadeiras da sess�o
Retorno: nenhum
*/
int leCadeira(float peca[])
{

    bool jaOcupada = false;


    system("cls");
    cabecalho();
    printf("#### Assentos ####\n\n");
    printf("[*] assento ocupado | [D] assento dispon�vel.\n\n");

    apresentaCadeiras(peca);

    int cadeira = validaCadeira(QNT_CADEIRAS);

    do
    {
        if(peca[cadeira-1] != 1)
        {
            jaOcupada = true;
            printf("\nCadeira j� ocupada!\n");
            cadeira = validaCadeira(QNT_CADEIRAS);
        }
        else
        {
            jaOcupada = false;
        }
    }
    while(jaOcupada);

    return cadeira;
}

/*
Descri��o: Est� fun��o retornar� a op��o desejada.
Par�metro: nenhum
Retorno: Op��o v�lida desejada.
*/
int menuVenda()
{

    cabecalho();
    printf("ESCOLHA UMA OP��O:\n");
    printf("1 - VENDA COMUM\n");
    printf("2 - MEIA ENTRADA\n");
    printf("3 - DESCONTO INTEGRAL\n");
    printf("Op��o: ");

    return validaOpcao(3);
}
/*
Descri��o: Esta fun��o, apresenta o recibo de compra ap�s a venda
Par�metro: Data e Hora da compra, qual pe�a foi escolhida e a cadeira selecionada
Retorno: nenhum
*/
void imprimeRecibo(char data[], char hora[],int peca,int cadeira)
{
    system("cls");
    cabecalho();
    printf("#### Ticket Ingresso ####\n\n");
    if(peca == 1)
    {
        char nomePeca[] = "A BELA E A FERA";
        printf("Filme %s \n", nomePeca);
    }
    else
    {
        char nomePeca[] = "CATS";
        printf("Filme %s \n", nomePeca);
    }
    printf("Data da compra %s - %s\n", data,hora);
    printf("N� do assento: %d \n\n", cadeira);
    system("pause");
    system("cls");
}

/*
Descri��o: Est� fun��o apresentar� o fechamento de caixa
Par�metro: Vetores das pecas 1 e 2 contendo as cadeiras utilizadas
Retorno: Nenhum
*/
void fechamento(float peca1[], float peca2[])
{
    int indice;
    float peca1Inteira = 0;
    float peca1Meia = 0;
    float peca2Inteira = 0;
    float peca2Meia = 0;
    int totalInteiraPeca1 = 0;
    int totalInteiraPeca2 = 0;
    int totalMeiaPeca1 = 0;
    int totalMeiaPeca2 = 0;
    int totalIsentoPeca1 = 0;
    int totalIsentoPeca2 = 0;
    int totalVazios = 0;
    float total = 0;


    for(indice = 0; indice < 20; ++indice){
        if(peca1[indice] == 50){
            peca1Inteira += 50;
            totalInteiraPeca1++;
            total += 50;
        }
        if(peca2[indice] == 50){
            peca2Inteira += 50;
            totalInteiraPeca2++;
            total += 50;
        }
        if(peca1[indice] == 25){
            peca1Meia += 25;
            totalMeiaPeca1 ++;
            total += 25;
        }
        if(peca2[indice] == 25){
            peca2Meia += 25;
            totalMeiaPeca2 ++;
            total += 25;
        }
        if(peca1[indice] == 0){
            totalIsentoPeca1++;
        }
        if(peca2[indice] == 0){
            totalIsentoPeca2++;
        }
        if(peca1[indice] == 1){
            totalVazios++;
        }
        if(peca2[indice] == 1){
            totalVazios++;
        }
    }

    cabecalho();

    printf("#### Fechamento de Caixa ####\n\n");
    printf("--- A Bela e a Fera ---\n\n");
    printf("Valor arrecadado inteira : R$ %.2f \n",peca1Inteira);
    printf("Valor arrecadado meia-entrada : R$ %.2f \n",peca1Meia);
    printf("Ingressos isentos: %d\n", totalIsentoPeca1);
    printf("Total de ingressos vendidos: %d", (totalInteiraPeca1 + totalMeiaPeca1 + totalIsentoPeca1));

    printf("\n\n--- Cats ---\n\n");
    printf("Valor arrecadado inteira : R$ %.2f \n",peca2Inteira);
    printf("Valor arrecadado meia-entrada : R$ %.2f \n",peca2Meia);
    printf("Ingressos isentos: %d\n", totalIsentoPeca2);
    printf("Total de ingressos vendidos: %d", (totalInteiraPeca2 + totalMeiaPeca2) + totalIsentoPeca2);

    printf("\n\n Total arrecado: R$ %.2f \n\n", total);

    system("pause");

}
/*
Descri��o: Esta fun��o, valida se a crian�a � valida para recebimento de insen��o
Par�metro: nenhum
Retorno: Se a crian�a � ou n�o v�lida
*/
bool validaCrianca()
{

    int opcao;

    cabecalho();

    printf("\nHoje � ter�a?\n");
    printf("1 - Sim\n");
    printf("2 - N�o\n");
    printf("Op��o: ");
    scanf("%d", &opcao);

    if(opcao == 2)
    {
        return false;
    }

    printf("\n� crian�a carente e estuda em escola publica?\n");
    printf("1 - Sim\n");
    printf("2 - N�o\n");
    printf("Op��o: ");
    scanf("%d", &opcao);

    if(opcao == 2)
    {
        return false;
    }

    return true;
}

/*
Descri��o: Esta fun��o, valida se o cliente se encaixa nos par�metros de meia entrada
Par�metro: nenhum
Retorno: Se a pessoa pode pagar meia-entrada ou n�o
*/
bool validaMeiaEntrada()
{

    int opcao;

    cabecalho();

    printf("\nTipo de meia entrada?\n");
    printf("1 - Estudante\n");
    printf("2 - Crian�a menor de 12 anos\n");
    printf("3 - Idoso\n");
    printf("4 - Professor de escola p�blica\n");
    printf("5 - Nenhuma das alternativas\n");
    printf("Op��o: ");
    opcao = validaOpcao(5);
    if(opcao == 5)
    {
        return false;
    }

    return true;
}

/*
Descri��o: Esta fun��o, apresentar� as op��es de menu de venda.
Par�metro: nenhum
Retorno: nenhum
*/
void vendas()
{

    setlocale(LC_ALL,"");

    bool flag = true;
    int menuPrincipal = 0;
    int peca = 0;
    int cadeira = 0;
    int indice;
    float valorInteira = 50.0;
    float valorMeio = 25.0;
    float valorIsento = 0.0;
    float peca1[QNT_CADEIRAS];
    float peca2[QNT_CADEIRAS];
    char data[9];
    char hora[9];


    for(indice = 0; indice < 20; ++indice)
    {
        peca1[indice] = 1;
        peca2[indice] = 1;
    }

    do
    {
        cabecalho();
        printf("\nESCOLHA UMA OP��O:\n");
        printf("1 - ABERTURA DE VENDA\n");
        printf("2 - FECHAMENTO DE CAIXA\n");
        printf("3 - SAIR \n");
        printf("Op��o: ");
        switch(validaOpcao(3))
        {
        case 1:
            if(!haVagas(peca1,peca2))
            {
                flag = true;
                break;
            }
            switch(menuVenda())
            {
            case 1:
                peca = lePecas(valorInteira);
                if(peca == 1)
                {
                    cadeira = leCadeira(peca1);
                    _strdate(data);
                    _strtime(hora);
                    imprimeRecibo(data,hora,peca,cadeira);
                    peca1[cadeira-1] = valorInteira;
                    break;
                }
                else
                {
                    cadeira = leCadeira(peca2);
                    _strdate(data);
                    _strtime(hora);
                    imprimeRecibo(data,hora,peca,cadeira);
                    peca2[cadeira-1] = valorInteira;
                    break;
                }
                flag = true;
                break;
            case 2:
                if(validaMeiaEntrada())
                {
                    peca = lePecas(valorMeio);
                    if(peca == 1)
                    {
                        cadeira = leCadeira(peca2);
                        _strdate(data);
                        _strtime(hora);
                        imprimeRecibo(data,hora,peca,cadeira);
                        peca1[cadeira-1] = valorMeio;
                        break;
                    }
                    else
                    {
                        cadeira = leCadeira(peca2);
                        _strdate(data);
                        _strtime(hora);
                        imprimeRecibo(data,hora,peca,cadeira);
                        peca2[cadeira-1] = valorMeio;
                        break;
                    }
                }
                flag = true;
                printf("\nOp��o n�o dispon�vel!\n\n");
                system("pause");
                break;
            case 3:
                if(validaCrianca())
                {
                    peca = lePecas(valorIsento);
                    if(peca == 1)
                    {
                        cadeira = leCadeira(peca1);
                        _strdate(data);
                        _strtime(hora);
                        peca1[cadeira-1] = valorIsento;
                        break;
                    }
                    else
                    {
                        cadeira = leCadeira(peca2);
                        _strdate(data);
                        _strtime(hora);
                        peca2[cadeira-1] = valorIsento;
                        imprimeRecibo(data,hora,peca,cadeira);
                        break;
                    }
                }
                flag = true;
                printf("\nOp��o n�o dispon�vel!\n\n");
                system("pause");
                break;
            }
            break;
        case 2:
            fechamento(peca1,peca2);

            break;
        case 3:
            system("cls");
            printf("Deseja realmente sair?\n");
            printf("1 - Sim\n");
            printf("2 - N�o\n");
            printf("Op��o: ");
            if(validaOpcao(2) == 1){
                flag = false;
                break;
            }
            flag = true;
            break;
        }
    }
    while(flag);
}
/*
Descri��o: Esta fun��o ir� configurar o terminal de apresenta��o.
Param�tro: nenhum
Retorno: nenhum
*/
void configuraTerminal(){
    setlocale(LC_ALL,"");
    system("title TEATRO WILLIAN SHAKESPEARE");
    system("mode con: cols=60 lines=20");
    system("color F0");
}


int main()
{
    configuraTerminal();
    vendas();
    return 0;
}

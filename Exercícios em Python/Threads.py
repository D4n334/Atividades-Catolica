import datetime #para contar tempo de execução
import math #para fazer operações

def computar(fim, inicio=1): #definindo a função
    pos = inicio
    while pos < fim:
        pos += 1
        math.sqrt((pos -1000000)* (pos - 1000000)) # operação

def main():
    inicio = datetime.datetime.now() #guarda a data inicial
    fim = 5000000
    computar(fim) #inicia a função computar
    tempo = datetime.datetime.now() - inicio #subtrai a data atual da data inicial
    print(f"Terminou em {tempo.total_seconds():.2f} segundos.") # :.2f dá o valor e, duas casas decimais

if __name__=='__main__':
    main()
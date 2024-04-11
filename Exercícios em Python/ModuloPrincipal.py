from listas_em_modulo import *

minhaLista = []
print("Preenchido\n")
preencherInventario(minhaLista)
print("Exibindo\n")
exibirInventario(minhaLista)

print("Pesquisando\n")
localizarPorNome(minhaLista)
print("Alterando\n")
depreciarPorNome(minhaLista, 20)

print("Excluindo\n")
print(excluirPorSerial(minhaLista))
exibirInventario(minhaLista)

print("Resumindo.\n")
resumirValores(minhaLista)
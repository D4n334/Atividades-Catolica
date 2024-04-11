def preencherInventario(lista):
  resp="S"
  while resp == "S":
    equipamento=[input("Equipamento: "),
              float(input("Valor: ")),
              int(input("Número Serial: ")),
              input("Departamento: ")]
    lista.append(equipamento)
    resp = input("Digite 'S' para continuar: ").upper()

def exibirInventario(lista):
  for elemento in lista:
    print("Nome.........: ", elemento[0])
    print("Valor........: ", elemento[1])
    print("Serial.......: ", elemento[2])
    print("Departamento.: ", elemento[3])

def localizarPorNome(lista):
   busca = input("Digite o nome do equipamento: ").upper()
   for elemento in lista:
     if busca == elemento[0]:
       print("Valor.. ", elemento[1])
       print("Serial. ", elemento[2])
       break
     
def depreciarPorNome(lista):
    depreciar = input("Digite o nome do equipamento para depreciar seu valor: ").upper()
    for elemento in lista:
      if depreciar == elemento[0]:
        print("Valor antigo: ", elemento[1])
        depreciar == elemento[1] * 0.90
        print("Valor depreciado: ", elemento[1])

def excluirPorSerial(lista):
    busca = input("Digite o serial a ser excluído: ").upper()
    for elemento in lista:
      if busca == elemento[2]:
        lista.remove(elemento)
    return "itens excluídos."

def resumirValores(lista):
  valores = []
  for elemento in lista:
      valores.append(elemento[1])
      if len(valores)>0:
        print("O equipamento mais caro: ", max(valores))  
        print("O equipamento mais barato custa: ", min(valores))  
        print("O total de equipamentos é de: ", sum(valores))  


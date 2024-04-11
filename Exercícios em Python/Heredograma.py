import matplotlib.pyplot as plt
import networkx as nx

# Crie um objeto DiGraph (grafo direcionado) para representar o heredograma
G = nx.DiGraph()

# Adicione os nós (indivíduos) ao grafo
G.add_node("George (NN)")
G.add_node("Grace (NN)")
G.add_node("John (Nn)")
G.add_node("Mary (Nn)")

# Adicione as arestas (relações familiares)
G.add_edge("George (NN)", "John (Nn)")
G.add_edge("Grace (NN)", "John (Nn)")
G.add_edge("Grace (NN)", "Mary (Nn)")

# Configure a posição dos nós
pos = nx.spring_layout(G)

# Desenhe o grafo
nx.draw(G, pos, with_labels=True, node_size=800, node_color='lightblue', font_size=10)
plt.title("Heredograma")
plt.show()
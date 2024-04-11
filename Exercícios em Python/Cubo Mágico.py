import random

def main():
    cube.display()
    print('Teste antes')
    cube.shuffle()
    print('Teste embaralhado')
    cube.display()
    

class Cubo:
    def __init__(self):
        self.faces = {
            'U': [['B', 'B', 'B'], ['B', 'B', 'B'], ['B', 'B', 'B']],#Branco/Topo
            'D': [['M', 'M', 'M'], ['M', 'M', 'M'], ['M', 'M', 'M']],#Marelo/Baixo
            'F': [['V', 'V', 'V'], ['V', 'V', 'V'], ['V', 'V', 'V']],#Vermelho/Frente
            'B': [['L', 'L', 'L'], ['L', 'L', 'L'], ['L', 'L', 'L']],#Laranja/Costas
            'L': [['V', 'V', 'V'], ['V', 'V', 'V'], ['V', 'V', 'V']],#Verde/Esquerda
            'R': [['A', 'A', 'A'], ['A', 'A', 'A'], ['A', 'A', 'A']]#Azul/Direita
        }

    def rotate_face_clockwise(self, face):

        self.faces[face] = list(zip(*reversed(self.faces[face])))

    def rotate_face_counterclockwise(self, face):
        self.faces[face] = list(reversed(list(zip(*self.faces[face]))))

    def rotate_row_left(self, row):
        face, index = row
        self.faces[face][index] = self.faces[face][index][1:] + [self.faces[face][index][0]]

    def rotate_row_right(self, row):
        face, index = row
        self.faces[face][index] = [self.faces[face][index][-1]] + self.faces[face][index][:-1]

    def rotate_column_up(self, col):
        face, index = col
        column = [self.faces[face][i][index] for i in range(3)]
        column = [column[-1]] + column[:-1]
        for i in range(3):
            self.faces[face][i][index] = column[i]

    def rotate_column_down(self, col):
        face, index = col
        column = [self.faces[face][i][index] for i in range(3)]
        column = column[1:] + [column[0]]
        for i in range(3):
            self.faces[face][i][index] = column[i]

    def shuffle(self, num_moves=20):
        moves = ['U', 'D', 'F', 'B', 'L', 'R']
        for _ in range(num_moves):
            move = random.choice(moves)
            direction = random.choice(['CB', 'CCB'])
            if direction == 'CB':
                self.rotate_face_clockwise(move)
            else:
                self.rotate_face_counterclockwise(move)

    def display(self):
        # Face U
        for row in self.faces['U']:
            print('       ', end='')
            for color in row:
                print(color, end=' ')
            print()

        # Faces L, F, R, B
        for i in range(3):
            for face in ['L', 'F', 'R', 'B']:
                for color in self.faces[face][i]:
                    print(color, end=' ')
                print(' ', end='')
            print()

        # Face D
        for row in self.faces['D']:
            print('       ', end='')
            for color in row:
                print(color, end=' ')
            print()

cube = Cubo()

if __name__ == '__main__':
    main()
    

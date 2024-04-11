import threading # importa a biblioteca
import time

def contador(coisa, num):
    for n in range(1, num +1):
        print(f'{n} {coisa}(s)...')
        time.sleep(1)

def main():
    threads = [
        threading.Thread(target = contador, args=('gol',9)),
        threading.Thread(target = contador, args=('hora',5)),  
        threading.Thread(target = contador, args=('copo de cerveja',3))
        ]  # instancia a thread
    [t.start() for t in threads] # adiciona a thread ao pool de threads a serem executados
    [t.join() for t in threads] # aguarda nessa linha ate a thread terminar
    print("Agora acabou. ")


    if __name__ == '__main__':
        main()
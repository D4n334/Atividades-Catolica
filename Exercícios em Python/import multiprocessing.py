import multiprocessing

def ping(queue):
    queue.put('Vamos tomar')

def pong(queue):
    msg = queue.get()
    print(f'{msg} Cerveja')

def main():
    Queue = multiprocessing.Queue()
    
    p1 = multiprocessing.Process(target=ping, args=(Queue))
    p2 = multiprocessing.Process(target=pong, args=(Queue))
    
    p1.start()
    p2.start()
    
    p1.join()
    p2.join()
    
if __name__ == '__main__':
    main()
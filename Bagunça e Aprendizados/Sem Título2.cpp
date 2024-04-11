#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
#include<string.h>
#include<locale.h>
#include<time.h>

int main(){
    setlocale(LC_ALL,"Portuguese");
    
    int matriz[5][5], i, j;

    srand(time(NULL));

    printf("Gerando Matriz aleatória\n");
    system("pause");
    system("cls");

    for ( i = 0; i < 5; i++)
    {
        for (j = 0; j < 5; j++)
        {
            matriz[i][j] = rand() % 9;
        }   
    }
    
    
    for ( i = 0; i < 5; i++)
    {
        for (j = 0; j < 5; j++)
        {
            printf("%d ",matriz[i][j]);
    
        } 
        printf("\n");
    }
    
    printf("-----Diagonal Principal-------\n");
    for ( i = 0; i < 5; i++)
    {
        for (j = 0; j < 5; j++)
        {
        	if(i == j)
            printf("%d ",matriz[i][j]);
    
        } 
        printf("/");
    }
    
    return 0;
}

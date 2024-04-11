#include <stdio.h>
#include <string.h>
#include <locale.h>
#include <Windows.h>
#include <time.h>
#include <stdbool.h>
#include<conio.h>


typedef struct cadJogador{
    float idJogador;
    char nomeJogador[30];
    char posicaoJogador[15];
    char clubeJogador[30];
    char deletado;
  }cadJogador;

typedef struct cadClube{
    int clubeNumeroCadastro;
    char nomeClube[30];
    char cidadeClube[20];
    char deletado;
  }cadClube;

int mainMenu();
void incluirJogador();
void incluirClube();
void listar();
void consultar();
void alterar();
void excluir();
void organizar();
void EasterEgg();
bool autentica();
boolean validaSoNumero();

int main(){
  setlocale(LC_ALL, "");
  int op, opListar, opConsultar, opAlterar, opExcluir, opOrganizar;
  
    system("cls");
    printf("------Sistema De E-Sports------\n");
	fflush(stdin);
	while(!autentica())
	{
  		system("cls");
        printf("Login inválido!");
   	}	
  
  do{
    op = mainMenu();
    switch (op){
      case 1:
        printf("\n\n--- Cadastro de Jogadores ---");
        incluirJogador();
      break;
      case 2:
        printf("\n\n--- Cadastro de Clubes ---"); 
        incluirClube();    
      break;
      case 3:
        printf("\n\n------------ Listagem ------------\n");
        printf("-Para listar Jogadores digite 1  -\n-Para listar Clubes digite 2     -\n");
        printf("----------------------------------\n");
        scanf("%d", &opListar);
        listar(opListar);
      break;
      case 4:
        printf("\n\n-------------- Consultar -----------\n");
        printf("-Digite 1 para consultar jogador   -\n-Digite 2 para consultar clube     -\n");
        printf("------------------------------------\n");
        scanf("%i", &opConsultar);
        consultar(opConsultar);
      break;
      case 5:
        printf("\n\n-------------- Alterar -------------\n");
        printf("-Digite 1 para alterar jogador     -\n-Digite 2 para alterar clube       -\n");
        printf("------------------------------------\n");
        scanf("%i", &opAlterar);
        alterar(opAlterar);
      break;
      case 6:
        printf("\n\n-------------- Excluir ------------\n");
        printf("-Digite 1 para excluir jogador   -\n-Digite 2 para excluir clube     -\n");
        printf("------------------------------------\n");
        scanf("%i", &opExcluir); 
        excluir(opExcluir);
	  break;
	  case 7:
        printf("\n\n------------- Organizar ----------\n");
        printf("-Digite 1 para organizar jogadores   -\n-Digite 2 para organizar clubes     -\n");
        printf("------------------------------------\n");
        scanf("%i", &opOrganizar); 
        organizar(opOrganizar);
	  break;
	  case 8:
	  	system("cls");
    		printf("Easter egg mal escondido, fé\n ");
    		printf("\n!!!Ajuste a tela para melhor visualização!!!\n");
    		system("pause");
    		EasterEgg();
	  	
    }         
  }while (op != 0); 
  return 0;        
} 


int mainMenu(void){
  int menu;
  do{
    printf("\n\n----------------- MENU ---------------------\n");
    printf("-  1- Cadastrar Jogador                    -\n");
    printf("-  2- Cadastrar Clube                      -\n");
    printf("-  3- Listar                               -\n");
    printf("-  4- Consultar                            -\n");
    printf("-  5- Alterar                              -\n");
    printf("-  6- Excluir                              -\n");
    printf("-  7- Organizar                            -\n");
    printf("-  0- Sair                                 -\n");
    printf("--------------------------------------------");
    printf("\n\nDigite a operação desejada\n");
    scanf("%d", &menu);
    if ((menu < 0) || (menu > 8))
      printf("Opção não encontrada! Tente Novamente\n");
  }while((menu < 0) || (menu > 8));
  return menu;
}  

void incluirJogador(void) {
  struct cadJogador jogador;
  int x = 0;
  int flag;
  int status;
  FILE *arqJ;
  
  arqJ = fopen("jogadores.dat", "ab");
  
  if (arqJ == NULL) {
    printf("O arquivo não existe!\n");
    exit(1);
  }
        printf("\n\nDigite a ID(código) do Jogador......: ");
  		status = scanf("%i", &jogador.idJogador);
  
  do{
        flag = 0;
    	printf("Digite o nome do jogador...............: ");
  		setbuf(stdin, NULL);
  		scanf("%[^\n]s", jogador.nomeJogador);
  		
	if(strlen( jogador.nomeJogador) < 2)
	{
	   flag = 1;
	}
        for(x = 0; x < strlen(jogador.nomeJogador); x++){
            if(( jogador.nomeJogador[x] >= 65 && ( jogador.nomeJogador[x] <= 90) || ( jogador.nomeJogador[x] >= 97) && ( jogador.nomeJogador[x] <= 122) || ( jogador.nomeJogador[x] == 32)))
			{
				continue;
			}
			else
			{
				flag = 1;
			} 
        }
        if(flag == 1)
		{
            system("cls");
            printf("Nome inválido!\n");
    	}
    }while(flag == 1);
  
   do{
        flag = 0;
    	printf("Digite o clube que o jogador defende ..: ");
  		setbuf(stdin, NULL);
  		scanf("%[^\n]s", jogador.clubeJogador);		
	if(strlen( jogador.clubeJogador) < 2)
	{
	   flag = 1;
	}
        for(x = 0; x < strlen(jogador.clubeJogador); x++){
            if(( jogador.clubeJogador[x] >= 65 && ( jogador.clubeJogador[x] <= 90) || ( jogador.clubeJogador[x] >= 97) && ( jogador.clubeJogador[x] <= 122) || ( jogador.clubeJogador[x] == 32)))
			{
				continue;
			}
			else
			{
				flag = 1;
			} 
        }
        if(flag == 1)
		{
            system("cls");
            printf("Nome inválido!\n");
    	}
    }while(flag == 1);

   do{
        flag = 0;
    	 printf("Digite a posição em que o jogador atua.: ");
  		setbuf(stdin, NULL);
  		scanf("%[^\n]s", jogador.posicaoJogador);	
	if(strlen(  jogador.posicaoJogador) < 2)
	{
	   flag = 1;
	}
        for(x = 0; x < strlen( jogador.posicaoJogador); x++){
            if((  jogador.posicaoJogador[x] >= 65 && (  jogador.posicaoJogador[x] <= 90) || (  jogador.posicaoJogador[x] >= 97) && (  jogador.posicaoJogador[x] <= 122) || (  jogador.posicaoJogador[x] == 32)))
			{
				continue;
			}
			else
			{
				flag = 1;
			} 
        }
        if(flag == 1)
		{
            system("cls");
            printf("Nome inválido!\n");
    	}
    }while(flag == 1);
  
  jogador.deletado = ' '; 
  
  fwrite(&jogador, sizeof(struct cadJogador), 1, arqJ);
  
  fclose(arqJ);
}

void incluirClube(void) {
  struct cadClube clube;
  int flag;
  int x = 0;
  FILE *arqC;
  
  arqC = fopen("clubes.dat", "ab");
  
  if (arqC == NULL) {
    printf("O arquivo não existe!\n");
    exit(1);
  }  
        printf("\n\nDigite o número de cadastro do clube.: ");
  		status = scanf("%d", &clube.clubeNumeroCadastro);  	
   do{
        flag = 0;
    	printf("Digite o nome do clube..............: ");
  		setbuf(stdin, NULL);
  		scanf("%[^\n]s", clube.nomeClube);
  		
	if(strlen(  clube.nomeClube) < 2)
	{
	   flag = 1;
	}
        for(x = 0; x < strlen( clube.nomeClube); x++){
            if(( clube.nomeClube[x] >= 65 && (  clube.nomeClube[x] <= 90) || (  clube.nomeClube[x] >= 97) && (  clube.nomeClube[x] <= 122) || (  clube.nomeClube[x] == 32)))
			{
				continue;
			}
			else
			{
				flag = 1;
			} 
        }
        if(flag == 1)
		{
            system("cls");
            printf("Nome inválido!\n");
    	}
    }while(flag == 1);
  

   do{
        flag = 0;
    	printf("Digite a cidade do clube............: ");
  		setbuf(stdin, NULL);
  		scanf("%[^\n]s", clube.cidadeClube);
  		
	if(strlen(  clube.cidadeClube) < 2)
	{
	   flag = 1;
	}
        for(x = 0; x < strlen( clube.cidadeClube); x++){
            if(( clube.cidadeClube[x] >= 65 && (  clube.cidadeClube[x] <= 90) || (  clube.cidadeClube[x] >= 97) && (  clube.cidadeClube[x] <= 122) || (  clube.cidadeClube[x] == 32)))
			{
				continue;
			}
			else
			{
				flag = 1;
			} 
        }
        if(flag == 1)
		{
            system("cls");
            printf("Nome inválido!\n");
    	}
    }while(flag == 1);
  clube.deletado = ' '; 
  
  fwrite(&clube, sizeof(struct cadClube), 1, arqC);
  
  fclose(arqC);
}

void listar(int pOpListar){
  int op = pOpListar;
  struct cadJogador jogador;
  struct cadClube clube;
  FILE *arqC;
  FILE *arqJ;
  
  switch (op){
    case 1:    
    arqJ = fopen("jogadores.dat", "rb");

    if (arqJ == NULL){
      printf("Arquivo não existe!\n");
      return;
    }
    printf("\n\n--- Jogadores ---");
    while (fread(&jogador, sizeof(jogador), 1, arqJ)){
      if(jogador.deletado == ' '){
        printf("\n\nIdentificação...: %2.0f\n", jogador.idJogador);
        printf("Nome do Jogador.: %s\n", jogador.nomeJogador);
        printf("Clube...........: %s\n", jogador.clubeJogador);
        printf("Posição.........: %s\n", jogador.posicaoJogador);
      }
	}  
    fclose(arqJ);
    break;
    case 2:
      arqC = fopen("clubes.dat", "rb");

      if (arqC == NULL){
        printf("Arquivo não existe!\n");
        return;
      }
      printf("\n\n--- Clubes ---"); 
      while (fread(&clube, sizeof(clube), 1, arqC)){  
	  	if(clube.deletado == ' '){      
          printf("\n\nNúmero de cadastro do clube.: %i\n", clube.clubeNumeroCadastro);
          printf("Clube.......................: %s\n", clube.nomeClube);
          printf("Cidade do Clube.............: %s\n", clube.cidadeClube);
    	}
	  }
    fclose(arqC);
    break;  
  }
}

void consultar(int pOpConsultar){
  int id, acheiJogador=0, acheiClube=0, cod;
  struct cadJogador jogador;
  struct cadClube clube;
  FILE *arqC;
  FILE *arqJ;
    
  switch (pOpConsultar){
    case 1:
      arqJ = fopen("jogadores.dat", "rb");
      
      if (arqJ == NULL) {
        printf("Arquivo não encontrado!\n");
        return;
      }

      printf("Digite a identificação: ");
      scanf("%i", &id);

      while (fread(&jogador, sizeof(jogador), 1, arqJ)) {
        if ((id == jogador.idJogador) && (jogador.deletado == ' ')) {
          printf("Nome do Jogador.: %s\n", jogador.nomeJogador);
          printf("Clube...........: %s\n", jogador.clubeJogador);
          printf("Posição.........: %s\n", jogador.posicaoJogador);
          
          acheiJogador = 1;
        }
      }
      if (!acheiJogador)
        printf("Identificação não encontrado!\n");

      fclose(arqJ);
    break;  
    case 2:
      arqC = fopen("clubes.dat", "rb");

      if (arqC == NULL) {
        printf("Arquivo não encontrado!\n");
        return;
      }  

      printf("Digite a código de cadastro do clube: ");
      scanf("%i", &cod);

      while (fread(&clube, sizeof(clube), 1, arqC)) {
        if ((cod == clube.clubeNumeroCadastro) && (clube.deletado == ' ')) {
          printf("Clube.......................: %s\n", clube.nomeClube);
          printf("Cidade do Clube.............: %s\n", clube.cidadeClube);

          acheiClube = 1;
        }
      }
      if (!acheiClube)
        printf("Código não encontrado!\n");

      fclose(arqC);    
      
    break;
  }    
}  

void alterar(int pOpAlterar){
  int id, cod, acheiJogador=0, acheiClube=0, op = pOpAlterar;
  struct cadJogador jogador;
  struct cadClube clube;
  FILE *arqJ;
  FILE *arqC;
  
  switch(op){
    case 1:
      arqJ = fopen("jogadores.dat", "r+b");
      
      if (arqJ == NULL) {
        printf("Arquivo não existe!\n");
        return;
      }

      printf("Digite a identificação: ");
      scanf("%i", &id);

      while (fread(&jogador, sizeof(jogador), 1, arqJ)) {
        if ((id == jogador.idJogador) && (jogador.deletado == ' ')) {
          printf("Nome do Jogador.: %s\n", jogador.nomeJogador);
          printf("Clube...........: %s\n", jogador.clubeJogador);
          printf("Posição.........: %s\n", jogador.posicaoJogador);
          acheiJogador = 1;
                    
          printf("Digite o nome do jogador...............: ");
          setbuf(stdin, NULL);
          scanf("%[^\n]s", jogador.nomeJogador);
          
          printf("Digite o clube que o jogador defende ..: ");
          setbuf(stdin, NULL);
          scanf("%[^\n]s", jogador.clubeJogador);
          
          printf("Digite a posição em que o jogador atua.: ");
          setbuf(stdin, NULL);
          scanf("%[^\n]s", jogador.posicaoJogador);
          
          fseek(arqJ, (sizeof(jogador) * -1), SEEK_CUR);
          fwrite(&jogador, sizeof(struct cadJogador), 1, arqJ);
          fseek(arqJ, 0, SEEK_CUR);
        }
      }
      if (!acheiJogador)
        printf("Identificação não encontrado!\n");

    fclose(arqJ);
  break;  
  case 2:
    arqC = fopen("clubes.dat", "r+b");
      
      if (arqC == NULL) {
        printf("Arquivo não existe!\n");
        return;
      }

      printf("Digite o código de cadastro do clube: ");
      scanf("%i", &cod);

      while (fread(&clube, sizeof(clube), 1, arqC)) {
        if ((cod == clube.clubeNumeroCadastro) && (clube.deletado == ' ')) {
          printf("Clube.......................: %s\n", clube.nomeClube);
          printf("Cidade do Clube.............: %s\n", clube.cidadeClube);
          acheiClube = 1;
                        
          printf("Digite o nome do clube..............: ");
          setbuf(stdin, NULL);
          scanf("%[^\n]s", clube.nomeClube);
          
          printf("Digite a cidade do clube............: ");
          setbuf(stdin, NULL);
          scanf("%[^\n]s", clube.cidadeClube);
          
          fseek(arqC, (sizeof(clube) * -1), SEEK_CUR);
          fwrite(&clube, sizeof(struct cadClube), 1, arqC);
          fseek(arqC, 0, SEEK_CUR);
        }
      }
      if (!acheiClube)
        printf("Código nÃ£o encontrado!\n");

    fclose(arqC);
  break;  
      
  }
}  

void excluir(int pOpExcluir){         //Função excluir faz apenas exclusão lógica
  int id, cod, acheiJogador=0, acheiClube=0;
  struct cadJogador jogador;
  struct cadClube clube;
  FILE *arqJ;
  FILE *arqC;
    
  switch (pOpExcluir){    
    case 1:
      arqJ = fopen("jogadores.dat", "r+b");
      
      if (arqJ == NULL) {
        printf("Arquivo não existe!\n");
        return;
      }

      printf("Digite a identificação: ");
      scanf("%i", &id);

      while (fread(&jogador, sizeof(jogador), 1, arqJ)) {
        if ((id == jogador.idJogador) && (jogador.deletado == ' ')) {
          printf("Nome do Jogador.: %s\n", jogador.nomeJogador);
          printf("Clube...........: %s\n", jogador.clubeJogador);
          printf("Posição.........: %s\n", jogador.posicaoJogador);
          
          acheiJogador = 1;
          
          jogador.deletado = '*';
          
          fseek(arqJ, (sizeof(jogador) * -1), SEEK_CUR);
          fwrite(&jogador, sizeof(struct cadJogador), 1, arqJ);
          fseek(arqJ, 0, SEEK_CUR);
        }
      }
      if (!acheiJogador)
        printf("Jogador não encontrado!\n");

      fclose(arqJ);
    break;
    case 2:
      arqC = fopen("clubes.dat", "r+b");
      
      if (arqC == NULL) {
        printf("Arquivo não existe!\n");
        return;
      }

      printf("Digite código do clube: ");
      scanf("%i", &cod);

      while (fread(&clube, sizeof(clube), 1, arqC)) {
        if ((cod == clube.clubeNumeroCadastro) && (clube.deletado == ' ')) {
          printf("Clube.......................: %s\n", clube.nomeClube);
          printf("Cidade do Clube.............: %s\n", clube.cidadeClube);
          
          acheiClube = 1;
          
          clube.deletado = '*';
          
          fseek(arqC, (sizeof(clube) * -1), SEEK_CUR);
          fwrite(&clube, sizeof(struct cadClube), 1, arqC);
          fseek(arqC, 0, SEEK_CUR);
        }
      }
      if (!acheiClube)
        printf("Clube não encontrado!\n");

      fclose(arqC); 
    break;   
  }    
}
void EasterEgg()
{
	float A = 0, B = 0;
    float i, j;
    int k;
    float z[1760];
    char b[1760];
    printf("\x1b[2J");
    for(;;) {
        memset(b,32,1760);
        memset(z,0,7040);
        for(j=0; j < 6.28; j += 0.07) {
            for(i=0; i < 6.28; i += 0.02) {
                float c = sin(i);
                float d = cos(j);
                float e = sin(A);
                float f = sin(j);
                float g = cos(A);
                float h = d + 2;
                float D = 1 / (c * h * e + f * g + 5);
                float l = cos(i);
                float m = cos(B);
                float n = sin(B);
                float t = c * h * g - f * e;
                int x = 40 + 30 * D * (l * h * m - t * n);
                int y= 12 + 15 * D * (l * h * n + t * m);
                int o = x + 80 * y;
                int N = 8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n);
                if(22 > y && y > 0 && x > 0 && 80 > x && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                }
            }
        }
        printf("\x1b[H");
        for(k = 0; k < 1761; k++) {
            putchar(k % 80 ? b[k] : 10);
            A += 0.00004;
            B += 0.00002;
        }
        usleep(1);
    }
    return 0;
}

bool autentica(){
    char *login = {"ADMINISTRADOR"};
    char *pass = {"LOLERUIM"};

    char * usuario = (char *) malloc(14 * sizeof(char));
    char * senha = (char *) malloc(9 * sizeof(char));

    COORD admin = {30, 10};
    COORD password = {30, 11};

    int p = 0;

    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),admin);
    printf("Usuario: ");
    gets(usuario);
    for(int i = 0; i < strlen(usuario);i++){
        usuario[i] = toupper(usuario[i]);
    }

    fflush(stdout);

    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),password);
    printf("Senha: ");

    do{
        senha[p]=getch();
        senha[p] = toupper(senha[p]);
        if(senha[p] == 8){
            p = 0;
            strcpy(senha, " ");
            system("cls");
            SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),admin);
            printf("Usuario: ");
            printf("%s",usuario);
            SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),password);
            printf("Senha: ");
        }else if(senha[p]!='\r'){
            printf("*");
        }
        p++;
    }while(senha[p-1]!='\r');
    senha[p-1]='\0';

    if(strcmp(login,usuario) == 0 && strcmp(pass,senha) == 0){
        system("cls");
        return TRUE;
    }

    return FALSE;
}

void organizar(int pOpOrganizar){       //Função Organizar exclui "fisicamente"
  struct cadJogador jogador;
  struct cadClube clube;
  FILE *arqJ, *arqJ2;
  FILE *arqC, *arqC2;
  
  switch(pOpOrganizar){
    case 1:  
      arqJ  = fopen("jogadores.dat", "rb");
      arqJ2 = fopen("jogadores.aux", "wb");
      
      if ((arqJ == NULL) || (arqJ2 == NULL)) {
        printf("Erro de abertura de arquivo!\n");
        return;
      }
      
      while (fread(&jogador, sizeof(jogador), 1, arqJ)){
        if (jogador.deletado == ' ')
          fwrite(&jogador, sizeof(struct cadJogador), 1, arqJ2);
      }  
      fclose(arqJ);
      fclose(arqJ2);

      remove("jogadores.dat");
      rename("jogadores.aux", "jogadores.dat");
    break;
    case 2:
      arqC = fopen("clubes.dat", "rb");
      arqC2 = fopen("clubes.aux", "wb");

      while (fread(&clube, sizeof(clube), 1, arqC)){
        if (clube.deletado == ' ')
          fwrite(&clube, sizeof(struct cadClube), 1, arqC2);
      }
      fclose(arqC);
      fclose(arqC2);

      remove("clubes.dat");
      rename("clubes.aux", "clubes.dat");  
    break;
  }  
}


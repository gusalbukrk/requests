#include <stdio.h>

int main() {
    int N, C, S;
    scanf("%d %d %d", &N, &C, &S);

    int comandos[C];
    for (int i = 0; i < C; i++) {
        scanf("%d", &comandos[i]);
    }

    int estacao_atual = 1;
    int contador_estacao_S = 0;

    for (int i = 0; i < C; i++) {
        if (estacao_atual == S) {
            contador_estacao_S++;
        }
        
        estacao_atual += comandos[i];
        
        if (estacao_atual > N) {
            estacao_atual = 1;
        } else if (estacao_atual < 1) {
            estacao_atual = N;
        }
    }

    if (estacao_atual == S) {
        contador_estacao_S++;
    }

    printf("%d\n", contador_estacao_S);

    return 0;
}





















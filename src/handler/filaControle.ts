export function contador(tipoConsulta: string): Promise<{ segundosGerais: number }> {
  return new Promise((resolve) => {
    let segundosGerais = 0;
    
    const zerar = () => {
      segundosGerais = 0;
    };

    const atualizarContador = () => {
      segundosGerais++;

      switch (tipoConsulta) {
        case 'SP':
          if (segundosGerais === 10) {
            clearInterval(interval);
            zerar();
            resolve({ segundosGerais });
          }
          break;
        case 'SG':
          if (segundosGerais === 18) {
            clearInterval(interval);
            zerar();
            resolve({ segundosGerais });
          }
          break;
        case 'SE':
          if (segundosGerais === 25) {
            clearInterval(interval);
            zerar();
            resolve({ segundosGerais });
          }
          break;
      }
    };
    
    const interval = setInterval(atualizarContador, 1000);
  });
}

# Scuba Ciência Cidadã

App de ciência cidadã do projeto Scuba Ciência Cidadã, para os recifes do Banco de Abrolhos (Caravelas e Alcobaça, BA).

Depois do snorkel, o turista registra:
- a foto horizontal do ponto fixo, feita com a GoPro do barco;
- as espécies que localizou no banner junto com o educador ambiental;
- as condições do dia: temperatura da água, céu, vento, mar e visibilidade.

O app funciona sem internet. Os registros ficam guardados no celular e são enviados quando houver sinal. Os dados vão para uma planilha do Google, e as fotos, para uma pasta privada do Google Drive.

Inspirado no [CarangApp](https://elsonjr18.github.io/monitoramento-caranguejo-noronha), de monitoramento participativo de caranguejos em Fernando de Noronha.

## Arquivos

| Arquivo | Para que serve |
| --- | --- |
| `config.js` | **O único que precisa ser editado no dia a dia:** endereço da planilha, locais e espécies do banner |
| `especies/` | Fotos das espécies (opcional), citadas em `config.js` |
| `index.html` | O app |
| `sw.js` | Guarda o app no celular para funcionar sem internet |
| `apps-script/Codigo.gs` | Código que recebe os registros na planilha (instruções no início do arquivo) |

## Como trocar as espécies

Edite a lista `ESPECIES` em `config.js`. Para pôr foto, envie a imagem para a pasta `especies/` e escreva o caminho no campo `foto`, por exemplo `"especies/coral-cerebro.jpg"`.

Depois de mudar qualquer arquivo, aumente a versão na primeira linha de `sw.js` (por exemplo, de `coral-cidada-v1` para `coral-cidada-v2`). Assim os celulares baixam a versão nova.

## Publicação

O site é publicado pelo GitHub Pages direto da branch `main`. Em *Settings > Pages*, escolha *Deploy from a branch*, a branch `main` e a pasta `/ (root)`.

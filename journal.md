# Dia 1

Hoje comecei a trabalhar efetivamente no projeto. O foco deste primeiro dia foi preparar o ambiente, executar o backend fornecido, explorar o comportamento real da API e documentar as informações que serão necessárias durante o desenvolvimento do frontend.

Ainda não comecei a implementação das interfaces. Antes disso, considerei importante entender exatamente quais dados o backend disponibiliza, quais rotas estão implementadas e como isso se relaciona com os documentos de requisitos do projeto. A ideia foi evitar começar o frontend com base em suposições ou em informações que não correspondem ao estado atual da API.

## Preparação do repositório

Primeiramente, organizei o backend base dentro de um repositório próprio, sem utilizar um fork. Para isso, removi o diretório `.git` original e iniciei um novo histórico de commits.

Optei por essa abordagem porque pretendo utilizar o projeto como parte do meu portfólio e queria que os commits realizados durante o desenvolvimento fossem associados diretamente ao meu perfil do GitHub.

Também organizei a estrutura inicial do projeto, colocando a aplicação existente dentro de uma pasta `backend/`. Posteriormente, o frontend será criado em uma pasta `frontend/` no mesmo nível.

O primeiro commit registrou apenas esse estado inicial, mantendo o backend recebido como um ponto de partida bem definido antes de qualquer modificação.

## Execução do backend

Depois de organizar o repositório, comecei a configurar o ambiente necessário para executar a aplicação.

O processo utilizado foi:

1. iniciar o Docker Desktop;
2. executar `docker compose up -d` para criar e iniciar o container do PostgreSQL;
3. executar `./mvnw spring-boot:run` para iniciar a aplicação Spring Boot.

Não foi necessário instalar o Maven manualmente, pois o projeto utiliza o Maven Wrapper, que realiza automaticamente o download da versão necessária.

Durante esse processo, encontrei um problema de conexão com o banco de dados. A aplicação retornava uma mensagem informando que a autenticação havia falhado para o usuário `postgresql`.

Inicialmente, considerei que o erro poderia estar relacionado a um volume antigo do Docker contendo configurações ou credenciais incorretas. Removi o volume, recriei o container e executei novamente a aplicação, mas o problema continuou acontecendo.

Para investigar melhor, utilizei os comandos `netstat` e `tasklist` e identifiquei que existiam dois processos escutando na porta `5432`: o PostgreSQL executado pelo Docker e outra instalação do PostgreSQL configurada diretamente no Windows.

Com isso, percebi que o Spring Boot estava tentando se conectar à instância local do Windows, que não possuía o usuário e a senha esperados pela aplicação, em vez de utilizar o banco criado pelo Docker.

Para resolver o problema, interrompi o serviço local do PostgreSQL por meio do `services.msc` e alterei sua inicialização para manual. Depois disso, executei novamente o backend e a conexão foi realizada corretamente. O seeder foi processado e a aplicação finalizou a inicialização.

## Exploração da API

Com o backend em execução, comecei a explorar a API utilizando o Swagger.

Testei individualmente as rotas relacionadas a usuários, playlists, artistas, álbuns e músicas. Além das consultas simples, também executei um ciclo completo de operações sobre uma playlist:

* criação da playlist;
* consulta da playlist criada;
* alteração de seus dados;
* adição de uma música;
* remoção da música;
* exclusão da playlist;
* nova consulta para confirmar o retorno do status `404`.

Salvei os JSONs utilizados e retornados durante esses testes dentro da pasta `docs/api-samples`. Organizei os requests e responses separadamente e também criei um arquivo `ids-used.json` para registrar os identificadores utilizados nos testes.

Esse inventário será útil para reproduzir as requisições posteriormente e para diferenciar IDs válidos, removidos ou utilizados em cenários específicos.

## Análise dos dados retornados

Durante a exploração, também confirmei quais são os nomes oficiais dos campos utilizados pela API. Entre eles, estão `title` para o nome de uma música, `duration` para a duração de uma playlist, `about` para as informações sobre um artista e `listeners` para sua quantidade de ouvintes.

Ter esses nomes registrados a partir das respostas reais será útil mais adiante, principalmente na criação dos tipos em TypeScript e na integração entre os componentes do frontend e o backend. Dessa forma, o desenvolvimento pode seguir com base no formato exato dos dados que a aplicação realmente retorna.

## Imagens e reprodução de áudio

O backend não fornece campos relacionados a imagens. Por isso, mais adiante terei que escolher e adicionar manualmente as fotos dos artistas, capas de álbuns e outras imagens que forem necessárias para compor as telas.

Como já era esperado, o backend também não disponibiliza nenhum conteúdo de áudio. Dessa forma, o player será apenas uma simulação visual e funcional no frontend, com controles como play, pause, próxima faixa, faixa anterior, barra de progresso e volume, mas sem reprodução real de músicas.

## Limitações previstas pela especificação

Também confirmei algumas limitações importantes das rotas disponíveis. A API não possui uma rota geral para listar todas as músicas, então vou precisar definir de quais respostas elas serão obtidas quando o usuário quiser adicionar uma faixa a uma playlist. Entre as opções estão as músicas recentes, as mais tocadas, as populares de um artista e as pertencentes a um álbum.

Além disso, não existe uma rota dedicada apenas a buscar um artista pelo ID. As informações da tela de artista precisarão ser montadas a partir das rotas disponíveis, principalmente as que retornam suas músicas populares e seus álbuns. 

## Funcionamento das rotas de álbum

Durante a exploração da API, confirmei que o backend possui apenas a rota `GET /album/{albumId}/musics` para álbuns. Ela retorna as músicas pertencentes ao álbum informado, mas não existe uma rota separada para buscar diretamente seus dados gerais pelo ID.

Por isso, a tela de álbum precisará ser montada a partir das informações disponíveis nas outras respostas da API. Deixei esse funcionamento registrado para definir posteriormente de onde virão dados como nome do álbum, artista e demais informações exibidas na página.

## Comportamentos observados

Nos testes com as músicas populares de um artista, observei que a API retorna os itens em ordem crescente de reproduções. Isso pode ser identificado pelo campo `timesListen`, cujos valores aumentam ao longo da lista.

Como a tela deve destacar as músicas mais populares, essa ordenação precisará ser ajustada durante a implementação, no frontend ou no backend.

Também testei o fluxo de criação de uma playlist vazia seguido da adição de uma música. A playlist é criada normalmente com a lista de músicas vazia e aceita novas faixas sem apresentar erros. Deixei esse comportamento registrado para utilizar como referência durante a integração do frontend.


## Conceitos revisados

Além da parte prática, revisei alguns conceitos necessários para compreender melhor a comunicação entre o frontend e o backend.

Revisei o funcionamento do modelo cliente-servidor, os principais métodos HTTP, os códigos de status, a estrutura de documentos JSON e o papel das portas na comunicação entre processos.

Também revisei a função de cada tecnologia que será utilizada no frontend:

* React será utilizado para a construção dos componentes e das interfaces;
* Vite será responsável pelo ambiente de desenvolvimento e pelo processo de build;
* TypeScript será a linguagem utilizada no código;
* Tailwind CSS será utilizado para a estilização.

Por fim, estudei o conceito de CORS. Esse mecanismo será relevante quando o frontend, executado em uma origem diferente, começar a enviar requisições para o backend.


# Dia 2

No primeiro dia, o foco tinha sido preparar o backend, explorar a API e registrar como os dados e as rotas realmente funcionam. Desta vez, comecei a colocar o projeto React de pé e a preparar a base visual que será usada nas telas.

## Criação do projeto frontend

Primeiramente, criei o projeto dentro da pasta `frontend/`, mantendo a estrutura do repositório com o backend em `backend/` e o frontend ao lado.

Utilizei o Vite com o template de React e TypeScript. Durante a criação, o Vite também perguntou qual ferramenta de linting eu gostaria de utilizar, oferecendo ESLint e Oxlint. Pesquisei brevemente e escolhi o ESLint.

## Configuração do Tailwind CSS

Depois de criar o projeto, instalei e configurei o Tailwind CSS.

A configuração foi feita instalando o pacote `@tailwindcss/vite`, adicionando o plugin ao arquivo `vite.config.ts` e incluindo:

`@import "tailwindcss";` no arquivo principal de CSS.

Depois disso, removi todos os estilos de demonstração que o Vite adiciona automaticamente, incluindo os estilos do logo e da página inicial.

## Preparação dos tokens visuais

A principal parte do dia foi transformar os estilos definidos no Figma em tokens reutilizáveis dentro do Tailwind. Consultei os estilos fornecidos pelos mentores e registrei os valores dentro do bloco `@theme`.

Comecei pela tipografia, definindo a família `Inter` e os tamanhos encontrados nos Text Styles do Figma, que variam entre `8px` e `64px`. Ainda falta importar a fonte de fato. 

Também registrei as cores principais do projeto. Reutilizei os mesmos nomes presentes no Figma, que estão relacionados com as funcionalidades, em vez de aparência da cor.

Essa escolha deixa mais claro onde cada token deve ser utilizado e facilita futuras alterações no design. Caso uma cor mude, será possível alterar o valor do token sem precisar procurar classes específicas espalhadas por vários componentes.

Como os valores adicionados ao `@theme` geram classes reutilizáveis no Tailwind, o projeto agora possui um vocabulário visual inicial baseado no Figma. Isso permitirá construir as telas utilizando padrões consistentes de cor, espaçamento e tipografia.

Para validar a configuração, criei um componente simples utilizando a fonte, as cores e o gradiente definidos. Os testes funcionaram corretamente e confirmaram que o Tailwind está interpretando os tokens e as utilities personalizadas.

## Configuração da fonte

Enquanto a fonte não estiver importada, o navegador utilizará uma fonte de fallback do sistema. Deixei essa pendência registrada para resolver durante a construção do layout, utilizando o Google Fonts ou um pacote local.

Também descobri que o Spotify utiliza originalmente uma fonte própria chamada Circular, que não é distribuída gratuitamente. Por isso, a escolha da Inter no Figma provavelmente funciona como uma alternativa livre e visualmente semelhante para o projeto.

## Planejamento do backend

Além da configuração do frontend, organizei em paralelo uma análise das funcionalidades que precisarão ser implementadas no backend para atender às telas e aos requisitos.

Um dos pontos confirmados foi o funcionamento das rotas de álbum. O Swagger apresenta apenas a rota `GET /album/{albumId}/musics`, responsável por retornar as músicas de um álbum. Não existe atualmente uma rota `GET /album/{albumId}` para consultar diretamente os dados gerais do álbum.

Esse comportamento já ficou registrado para ser considerado quando a tela de álbum for implementada e quando as tarefas de backend forem organizadas.

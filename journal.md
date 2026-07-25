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

# Dia 3

Hoje o objetivo era confirmar que o frontend consegue se comunicar com o backend, e ao final do dia consegui buscar e exibir na tela dados da API.

Comecei criando o arquivo `.env` dentro da pasta `frontend/`, com a variável:

`VITE_API_URL=http://localhost:8080`

Também criei um `.env.example` com o mesmo conteúdo. Dessa forma, a URL do backend não fica escrita diretamente no código e poderá ser alterada futuramente sem precisar modificar os componentes.

O `.env` armazena os valores usados na minha máquina e fica fora do Git. Já o `.env.example` é versionado e serve como referência para indicar quais variáveis precisam ser configuradas por quem clonar o projeto.

Depois disso, substituí o conteúdo de teste que ainda estava no `App.tsx` por uma chamada à rota `/user/playlists`.

Utilizei um `fetch` dentro do `useEffect`, armazenei o resultado no estado do componente e exibi a resposta na tela como JSON. Também reaproveitei alguns dos tokens visuais configurados no dia anterior, como as cores de fundo, destaque e texto secundário.

Nesse processo, removi o arquivo `App.css`, que ainda continha estilos da demonstração inicial do Vite e não seria mais utilizado.

Mantive todo o teste dentro do próprio `App.tsx`, utilizando `fetch` diretamente. A estrutura definitiva de integração com a API, incluindo serviços, tipagem em TypeScript e tratamento de erros, será criada mais adiante, conforme as primeiras telas começarem a utilizar dados reais.

## Configuração do CORS

Com o frontend e o backend em execução, a primeira chamada à API retornou um erro de CORS:

`Access to fetch at 'http://localhost:8080/user/playlists' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.`

O frontend estava executando na porta `5173` e o backend na porta `8080`. Como as portas são diferentes, o navegador considera que as aplicações estão em origens distintas e bloqueia o acesso à resposta quando o backend não autoriza explicitamente essa origem.

Depois de confirmar o comportamento, criei a classe `config/CorsConfig.java` no backend. Nela, liberei a origem `http://localhost:5173` para as rotas da aplicação e para os métodos HTTP utilizados no projeto.

Também incluí o método `OPTIONS`, utilizado pelo navegador nas requisições de verificação que podem acontecer antes de operações como `POST`, `PUT`, `PATCH` e `DELETE`.

Depois da alteração, reiniciei a aplicação e a resposta da rota `/user/playlists` apareceu corretamente na tela. O console também deixou de apresentar o erro de CORS, confirmando a comunicação entre as duas aplicações.

# Dia 4

Hoje montei a estrutura principal da aplicação e configurei a navegação, ainda sem buscar dados da API.

Ao final do dia, deixei prontas as rotas, as páginas temporárias e a moldura que será compartilhada entre as telas.

## Planejamento das rotas

Antes de começar a implementação, defini as rotas principais da aplicação:

* Início: `/`;
* Playlists: `/playlists`;
* Detalhes da playlist: `/playlist/:playlistId`;
* Artista: `/artist/:artistId`;
* Álbum: `/album/:albumId`.

Também adicionei uma rota para exibir uma página de conteúdo não encontrado.

Nos parâmetros das URLs, utilizei os mesmos nomes presentes nas rotas do backend: `playlistId`, `artistId` e `albumId`. Dessa forma, os identificadores obtidos pela página poderão ser utilizados diretamente nas chamadas à API durante a implementação das funcionalidades.

Na sidebar, deixei links fixos apenas para as páginas de início e playlists. As páginas de detalhes dependem de um identificador específico e serão acessadas futuramente por meio de cards, listas e outros elementos da interface.

## Configuração da fonte

Resolvi a pendência da fonte Inter, que já estava declarada nos tokens do Tailwind, mas ainda não tinha sido carregada pelo navegador.

Importei a fonte pelo Google Fonts e mantive o token `--font-app` como a fonte principal da aplicação.

Durante essa configuração, aprendi que os comandos `@import` precisam aparecer no início do arquivo CSS. Por isso, o import da fonte foi colocado antes do `@import "tailwindcss"`.

## Criação das páginas

Criei as páginas de início, playlists, detalhes da playlist, artista, álbum e conteúdo não encontrado.

Por enquanto, cada página contém apenas um título para identificar a rota atual. Nas páginas de detalhes, também utilizei o `useParams` para ler os identificadores presentes na URL e exibi-los na tela.

## Estrutura principal da aplicação

Depois das páginas, comecei a montar o `AppLayout`, responsável pela estrutura que permanecerá visível durante a navegação.

O layout possui:

* sidebar (esquerda);
* topbar;
* área principal de conteúdo;
* painel lateral direito;
* player na parte inferior.

Utilizei Flexbox para organizar a aplicação como uma coluna do tamanho da tela. A região central contém a sidebar, o conteúdo e o painel lateral, enquanto o player aparece como o último elemento da estrutura.

O conteúdo principal possui sua própria rolagem. Dessa forma, o player permanece na parte inferior sem precisar utilizar `position: fixed` e sem cobrir os elementos da página.

Utilizei o componente `<Outlet />` para definir onde o React Router deve renderizar o conteúdo da rota atual. Assim, a estrutura principal é criada apenas uma vez, enquanto somente a área central muda durante a navegação.

Também ajustei a forma como as colunas são separadas visualmente. O fundo externo da aplicação é preto, enquanto a sidebar, o conteúdo principal e o painel lateral utilizam o fundo `#121212`.

Os espaços entre esses elementos deixam o fundo preto visível e criam a separação mostrada no design. Para reproduzir esse efeito, utilizei `gap`, espaçamento interno e cantos arredondados nos três painéis.

Durante esse ajuste, adicionei um novo token com a cor utilizada na barra de busca. 

## Configuração do React Router

No arquivo `main.tsx`, envolvi a aplicação com o `BrowserRouter`.

Depois disso, substituí o teste de conexão que ainda estava no `App.tsx` pela definição das rotas. Esse teste havia sido criado apenas para validar a comunicação com o backend e não era mais necessário nesta fase.

Organizei as páginas como rotas filhas de uma rota principal que renderiza o `AppLayout`. Dessa forma, todas as páginas são exibidas dentro da mesma moldura.

A página de conteúdo não encontrado também ficou dentro dessa estrutura, para que a sidebar, a topbar, o painel e o player continuem aparecendo mesmo quando o endereço acessado não corresponde a uma página existente.

## Testes da navegação

Depois de finalizar a configuração, testei todas as rotas.

Confirmei que a moldura permanece visível durante a navegação e que apenas o conteúdo do `<Outlet />` é substituído. Os links da sidebar trocam a página sem recarregar o navegador e o item correspondente à rota atual recebe o estilo ativo.

Também testei os botões de voltar e avançar do navegador, as rotas com parâmetros e a página de conteúdo não encontrado.

Ao acessar `/playlist/123`, por exemplo, o valor `123` foi lido pelo `useParams` e exibido corretamente na página.

Toda essa etapa pôde ser testada sem iniciar o Docker ou o backend, já que as páginas ainda não fazem chamadas à API.

## Organização dos commits

Separei as alterações em quatro commits:

* configuração da fonte e do novo token visual;
* criação das páginas;
* criação da estrutura principal;
* configuração das rotas e da navegação.

Também mantive a instalação do `react-router-dom` no mesmo commit em que a dependência começou a ser utilizada.

Por descuido, realizei várias alterações antes de começar os commits. Por isso, precisei reconstruir essa divisão no final. Para as próximas etapas, pretendo criar os commits conforme cada parte for concluída, evitando acumular mudanças com responsabilidades diferentes.

# Dia 5

Hoje trabalhei exclusivamente no backend, com o objetivo de preparar e estabilizar os dados que serão utilizados nas próximas etapas do frontend.

Antes de criar as interfaces TypeScript e os componentes que consumirão a API, considerei importante definir o formato definitivo das respostas. Alterar um campo depois que ele já estiver sendo utilizado em diferentes páginas exigiria mudanças em vários arquivos do frontend. Neste momento, essas alterações ainda poderiam ser realizadas diretamente nos DTOs e nas entidades, com um impacto menor.

Por isso, o foco do dia foi consolidar o contrato da API, enriquecer os dados retornados, corrigir problemas de mapeamento e normalizar alguns comportamentos das rotas.

## Origem dos dados do projeto

Antes de implementar os campos relacionados às imagens, investiguei de onde os dados atualmente utilizados pela aplicação são obtidos.

Os artistas, álbuns e músicas são criados diretamente pelo `DataSeeder` e armazenados no PostgreSQL executado pelo Docker.

O seeder cria cinco artistas, quatro álbuns para cada artista e oito músicas para cada álbum. Isso significa que os dados exibidos pelo frontend podem ser controlados diretamente pelo próprio projeto.

## Adição dos campos de imagem

Adicionei os campos `photoUrl` e `headerUrl` à entidade de artista.

* `photoUrl` será utilizado em imagens quadradas, como cards e avatares;
* `headerUrl` será utilizado no banner horizontal exibido no topo da página do artista.

Também adicionei o campo `coverUrl` à entidade de álbum, que será utilizado para armazenar o endereço de sua capa.

Inicialmente, esses campos foram preenchidos no seeder com URLs do `picsum.photos`. 

Utilizei seeds determinísticas pois, dessa forma, a mesma URL sempre retorna a mesma imagem. Mesmo depois de recriar o banco, cada artista ou álbum continuará associado visualmente à mesma imagem.

Durante essa implementação, compreendi melhor que o backend não armazena os arquivos das imagens. O banco guarda apenas o endereço em formato de texto. Posteriormente, quando o frontend renderizar um elemento `<img>`, o próprio navegador será responsável por acessar essa URL e carregar o arquivo.

## Imagem das músicas

Não adicionei um campo de imagem diretamente à entidade de música.

Como cada música pertence a um álbum, a imagem exibida para a faixa deve ser a própria capa do álbum. Armazenar essa informação novamente na música duplicaria o mesmo dado em dois lugares e poderia gerar inconsistências caso apenas um dos valores fosse alterado.

Em vez disso, adicionei o campo `albumCoverUrl` ao `GetMusicDTO`. Seu valor é obtido por meio de:

`music.getAlbum().getCoverUrl()`

Assim, a capa continua armazenada apenas no álbum, mas o frontend recebe essa informação diretamente na resposta da música, sem precisar realizar uma segunda requisição.

## Correção do mapeamento das músicas

Durante os testes anteriores, havia observado que o campo `artistId` retornava como `null` na rota `/user/recentMusics`.

Ao investigar o código, confirmei que esse comportamento era causado pelo MapStruct.

O MapStruct realiza automaticamente os mapeamentos quando os campos da origem e do destino possuem nomes e estruturas equivalentes. Entretanto, na entidade `Music`, não existe diretamente um método `getArtistId()`. O identificador está dentro do objeto relacionado e precisa ser acessado por:

`music.getArtist().getId()`

Como o mapper não possuía uma anotação `@Mapping` indicando esse caminho, o MapStruct não encontrava a origem do campo e atribuía `null` ao valor gerado.

O mesmo acontecia com outros campos aninhados, como `albumId` e `playlistsId`.

## Padronização dos DTOs de leitura

Existiam duas formas diferentes de criar os DTOs de leitura no projeto:

* por meio dos mappers gerados pelo MapStruct;
* por meio dos construtores dos próprios records, como `new GetMusicDTO(music)`.

Decidi utilizar apenas os construtores para os DTOs de leitura.

Os construtores permitem acessar explicitamente os relacionamentos da entidade, além de executar transformações específicas, como converter a lista de playlists em uma lista de identificadores.

A decisão adotada foi:

* DTOs de leitura serão construídos por seus próprios construtores;
* MapStruct continuará sendo utilizado apenas em operações de escrita, como a conversão do DTO de criação de playlist para uma entidade.

Atualizei o `UserService` para utilizar os construtores ao retornar músicas e removi o `MusicMapper`.

Durante essa mudança, identifiquei que o `AlbumMapper` apresentava o mesmo problema. A rota `/user/recentAlbums` retornava `artistId` e `artistName` como `null`, pois esses campos também dependiam de um relacionamento aninhado.

Substituí o mapper pelo construtor do `GetAlbumDTO` e removi o `AlbumMapper`.

O `ArtistMapper` funcionava corretamente porque o DTO de artista utiliza apenas campos diretos da entidade. Mesmo assim, também foi removido para manter o mesmo padrão em todos os DTOs de leitura.

## Normalização das rotas

Também revisei os mapeamentos dos controllers de playlist, artista e álbum.

Anteriormente, algumas classes utilizavam uma barra no final do `@RequestMapping`, como:

`@RequestMapping("/playlist/")`

Normalizei a estrutura para manter a barra no início dos métodos:

`@RequestMapping("/playlist")`

`@GetMapping("/{playlistId}")`

Com essa organização, fica mais claro como o caminho final é formado pela combinação da rota da classe com a rota do método.

Durante os testes, confirmei que o Spring Boot 3 não considera automaticamente `/playlist` e `/playlist/` como a mesma rota. Por isso, a alteração afetou principalmente a criação de playlists, que anteriormente utilizava `POST /playlist/` e passou a utilizar `POST /playlist`.

As rotas de artista e álbum mantiveram seus endereços finais, pois os caminhos concatenados continuaram equivalentes.

## Ajustes na criação de playlists

O método responsável pela criação de playlists possuía o nome `postMethodName`, provavelmente gerado automaticamente pela IDE.

Renomeei o método para `createPlaylist`, tornando sua responsabilidade mais clara.

Também alterei o status da resposta de `200 OK` para `201 Created`.

O status `200` indica que a requisição foi processada corretamente, enquanto o status `201` é mais específico para situações em que um novo recurso foi criado. Como a operação adiciona uma nova playlist ao sistema, o segundo código representa melhor o resultado da requisição.

## Limpeza do código

Aproveitei a revisão para realizar alguns ajustes menores de organização e nomenclatura.

Removi imports duplicados do `PlaylistController` e do `PlaylistService`.

Também renomeei a variável `edited_playlist` para `editedPlaylist`, seguindo a convenção camelCase utilizada em Java.

Em outro trecho, corrigi uma variável chamada `albums` que armazenava uma lista de playlists, apesar disso não alterar o funcionamento do código. 

Por fim, removi dois DTOs que não eram importados ou utilizados em nenhuma parte da aplicação:

* `GetPopSongsResponseDTO`;
* `GetFollowerDTO`.

Se mais pra frente eu precisar deles eu adiciono de novo, mas não acho que vou precisar. 

## Problema com o bean do PlaylistMapper

Depois das alterações, o projeto compilava corretamente, mas a aplicação não iniciava.

O Spring retornava a seguinte mensagem:

`No qualifying bean of type 'PlaylistMapper' available`

Esse erro indicava que o Spring não havia encontrado uma implementação do `PlaylistMapper` para injetar no serviço.

Ao verificar os arquivos gerados, encontrei tanto o `PlaylistMapperImpl.java` dentro de `generated-sources` quanto o `PlaylistMapperImpl.class` dentro de `target/classes`. A implementação também possuía a anotação `@Component`, que deveria permitir sua identificação pelo Spring.

Apesar disso, o log do Maven mostrava:

`Nothing to compile - all classes are up to date`

Isso indicava que o Maven estava reutilizando os arquivos já presentes em `target/`, mesmo que o estado dessa pasta não estivesse consistente com o código atual.

Executei então um `clean compile`, removendo os arquivos antigos e reconstruindo completamente o projeto. Depois disso, iniciei novamente a aplicação e o bean foi encontrado corretamente.

Esse problema ocorreu porque as implementações dos mappers não existem diretamente no código-fonte. Elas são geradas durante a compilação por um annotation processor. Caso o estado do build esteja desatualizado, o código gerado pode não corresponder às interfaces atuais.

Também considerei remover completamente o `PlaylistMapper`, pois sua conversão poderia ser escrita manualmente com poucas linhas. Entretanto, decidi mantê-lo por enquanto, já que o MapStruct continua sendo útil para a conversão de DTOs de escrita e é uma ferramenta comum em projetos Java.

## Recriação do banco de dados

Depois de adicionar os novos campos, foi necessário recriar os dados do banco.

A configuração `ddl-auto=update` permite que o Hibernate adicione novas colunas às tabelas existentes, mas não preenche automaticamente os registros que já estavam armazenados.

Além disso, o `DataSeeder` verifica se já existem artistas cadastrados antes de executar. Caso encontre algum registro, ele encerra o processo para evitar duplicação dos dados.

Por isso, apenas reiniciar a aplicação não seria suficiente para preencher `photoUrl`, `headerUrl` e `coverUrl`.

Executei:

1. `docker compose down`;
2. removi a pasta `spotify_data`, utilizada para persistir os dados do PostgreSQL;
3. iniciei novamente os containers;
4. executei o backend.

Dessa vez, o log apresentou as mensagens de inicialização do seeder e confirmou a criação de 160 músicas.

Quando o banco ainda estava preenchido, a aplicação exibia a mensagem informando que o seeding seria ignorado. A mudança no log confirmou que os dados haviam sido realmente recriados.

## Verificação dos novos dados

Depois da recriação, utilizei o Beekeeper Studio para verificar diretamente as tabelas do banco.

Confirmei que as colunas `photo_url`, `header_url` e `cover_url` estavam presentes e preenchidas.

Também abri uma das URLs armazenadas no navegador e confirmei que a imagem era carregada corretamente.

Com isso, validei o fluxo completo dos novos campos:

* definição na entidade;
* criação da coluna no banco;
* preenchimento pelo seeder;
* armazenamento no PostgreSQL;
* inclusão nos DTOs;
* retorno pela API.

## Atualização dos identificadores

A recriação do banco gerou novos UUIDs para todos os registros. Com isso, os
identificadores antigos deixaram de existir: consultar qualquer um deles agora
retorna `404`.

Percorri o Swagger endpoint por endpoint e reexecutei cada chamada, colando
as novas respostas de volta nos arquivos de exemplo. Os 21 samples em `user/`,
`reads-by-id/` e `playlist-lifecycle/` foram sobrescritos com os corpos atuais,
já refletindo os novos IDs, timestamps e os campos adicionados aos DTOs.

Em seguida, atualizei `ids-used.json` com os novos UUIDs. 

# Mudanças feitas

1. O DTO de música passou a incluir dados prontos para exibição:
   - `artistName`
   - `albumTitle`
   - `albumCoverUrl`

2. As relações de músicas foram corrigidas:
   - `artistId` e `albumId` agora vêm preenchidos.
   - `playlistsId` agora retorna uma lista, usando `[]` quando a música não pertence a nenhuma playlist.

3. O DTO de artista passou a incluir imagens:
   - `photoUrl`
   - `headerUrl`

4. O DTO de álbum passou a incluir:
   - `coverUrl`
   - `artistId` preenchido
   - `artistName` preenchido

---
## 1. Mudanças no objeto de música

### Novo formato 

```json
{
  "id": "uuid",
  "title": "Música 1",
  "artistId": "uuid",
  "artistName": "Artista1",
  "albumId": "uuid",
  "albumTitle": "Álbum 1 do Artista 1",
  "albumCoverUrl": "https://picsum.photos/seed/album-1-1/300/300",
  "playlistsId": [],
  "duration": 175,
  "releaseDate": "timestamp",
  "timesListen": 100,
  "explicit": false,
  "createdAt": "timestamp",
  "updatedAt": null
}
```

### O que mudou

- Foram adicionados:
  - `artistName`
  - `albumTitle`
  - `albumCoverUrl`
- `artistId` deixou de ser `null`.
- `albumId` deixou de ser `null`.
- `playlistsId` deixou de ser `null` e agora segue um contrato consistente de lista:
  - `[]` quando não há playlists;
  - lista de UUIDs quando há associações.


O frontend não precisa mais buscar separadamente o nome do artista, o título do álbum ou a capa do álbum para renderizar uma música. Esses dados já estão disponíveis no próprio objeto.

Também não é mais necessário tratar `playlistsId` como possivelmente `null`; o valor pode ser tratado diretamente como uma lista.

---

## 2. Mudanças no objeto de artista

### Novo formato 
```json
{
  "id": "uuid",
  "name": "Artista1",
  "listeners": 1000,
  "about": "Descrição do artista",
  "photoUrl": "https://picsum.photos/seed/artist-1/300/300",
  "headerUrl": "https://picsum.photos/seed/artist-header-1/1200/400",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### O que mudou

Foram adicionados:

- `photoUrl`: imagem principal ou avatar do artista.
- `headerUrl`: imagem de cabeçalho da página do artista.

As telas de artista podem usar diretamente as imagens fornecidas pela API, sem depender de placeholders definidos no frontend.

---

## 3. Mudanças no objeto de álbum

### Novo formato 

```json
{
  "id": "uuid",
  "title": "Álbum 1 do Artista 1",
  "year": 2026,
  "coverUrl": "https://picsum.photos/seed/album-1-1/300/300",
  "artistId": "uuid",
  "artistName": "Artista1",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### O que mudou

- Foi adicionado `coverUrl`.
- `artistId` deixou de ser `null`.
- `artistName` deixou de ser `null`.

Os cards de álbum agora podem exibir capa, nome do artista e navegar para o artista usando somente os dados do próprio álbum.

---

## 4. Playlists

### Estrutura 

O contrato principal das playlists não mudou. Permanecem os campos:

- `id`
- `name`
- `description`
- `musics`
- `musicQtd`
- `duration`
- `createdAt`
- `updatedAt`

A mudança relevante ocorre apenas quando a playlist contém músicas, pois os objetos dentro de `musics` agora seguem o novo DTO enriquecido descrito anteriormente.
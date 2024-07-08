# HUBusca Pesquisador de Usuários no GitHub

## Descrição

Este aplicativo permite buscar usuários do GitHub pelo nome de usuário e exibir informações detalhadas sobre eles. Além disso, mantém um menu com os usuários pesquisados recentemente.

## Funcionalidades

1. **Busca de Usuários do GitHub**:
   - Permite buscar dados de uma pessoa no GitHub através do nome de usuário.
   - No resultado da busca, exibe a foto, o nome, o login e a localização do usuário.

2. **Exibição de Perfil Detalhado**:
   - Ao clicar na foto do usuário, abre um perfil detalhado com os seguintes dados fornecidos pela API do GitHub:
     - Foto
     - Nome
     - Login
     - Localização
     - ID
     - Quantidade de seguidores
     - Quantidade de repositórios públicos
     - Lista de repositórios, incluindo:
       - Nome do repositório
       - Linguagem utilizada
       - Descrição
       - Data de criação
       - Data do último push

3. **Redirecionamento para Repositórios**:
   - Ao clicar em um repositório, o usuário é redirecionado para a página do repositório no site do GitHub.

4. **Menu de Pesquisas Recentes**:
   - Exibe todos os usuários pesquisados recentemente.
   - Segue o mesmo padrão de exibição dos dados da busca inicial.
   - Permite acessar o perfil detalhado dos usuários pesquisados recentemente.

## Tecnologias Utilizadas

- **React Native**: Para construção da interface do usuário.
- **TypeScript**: Para tipagem estática e melhor manutenção do código.
- **API do GitHub**: Para buscar e exibir os dados dos usuários.

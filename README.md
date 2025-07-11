# VPA

**VPA** é uma aplicação que gerencia e visualiza projetos, oferecendo funcionalidades para criar, editar e visualizar informações detalhadas sobre projetos e suas sessões.

## Funcionalidades

- **Gerenciamento de Projetos**: Criação, visualização e atualização de projetos salvos.
- **Busca de Projetos**: Ferramenta de busca para localizar projetos por nome.
- **Gerenciamento de Sessões**: Visualização e edição de sessões associadas a projetos.
- **Interface Interativa**: Design intuitivo com componentes reutilizáveis.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do cliente e do servidor.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Adiciona tipagem estática ao código JavaScript.
- **TailwindCSS**: Framework CSS para estilização.
- **LocalStorage**: Armazenamento local para persistência de dados no navegador.

## Estrutura do Projeto

- `components/pages/Menu`: Menu lateral para navegação.
- `components/pages/ProjectDetailsGrid`: Exibição e edição de detalhes de projetos.
- `components/global/TextInput`: Componente para entrada de texto com eventos controlados.
- `components/pages/NewProject`: Botão para criação de novos projetos.
- `components/pages/CreateFirstProject`: Componente exibido na ausência de projetos.

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes (npm, yarn ou pnpm)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cubevis.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd cubevis
   ```
3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

### Execução

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```
2. Abra o navegador e acesse: `http://localhost:3000`

## Funcionalidades em Destaque

### Gerenciamento de Projetos

- Projetos são salvos no LocalStorage e podem ser atualizados dinamicamente.
- Cada projeto contém um nome, data e sessões associadas.

### Integração com Componentes

- **Menu Lateral**: Navegação eficiente entre diferentes páginas.
- **TextInput**: Entrada para busca rápida de projetos.
- **CreateProjectButton**: Facilita a criação de novos projetos diretamente na interface.

## Capturas de Tela

Inclua aqui imagens ou GIFs demonstrando a funcionalidade do projeto.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/sua-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Adicionando nova feature"
   ```
4. Envie suas alterações:
   ```bash
   git push origin feature/sua-feature
   ```
5. Abra um pull request no repositório original.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**CUBEVIS**: Visualize e gerencie seus projetos de forma intuitiva e eficiente!

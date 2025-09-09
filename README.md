# Encontrar MT - Sistema de Pessoas Desaparecidas

> **Sistema moderno e responsivo para consulta de pessoas desaparecidas em Mato Grosso**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)

## 🎯 Visão Geral

Aplicação Next.js + TypeScript desenvolvida para facilitar a consulta de pessoas desaparecidas ou localizadas e permitir o envio de informações adicionais às autoridades competentes. 

**Destaques da nova versão:**
- 🎨 **Design agradavel** com foco em UX/UI moderno
- ⚡ **Performance otimizada** com lazy loading e estados de carregamento
- 📱 **Totalmente responsivo** para todos os dispositivos
- ♿ **Acessibilidade melhorada** seguindo padrões WCAG
- 🛡️ **Tratamento robusto de erros** com fallbacks inteligentes

## ✨ Principais Funcionalidades

### 🔍 **Busca e Navegação**
- **Listagem paginada** (10 registros por página) com performance otimizada
- **Busca inteligente** por nome com debounce e feedback visual
- **Filtros avançados** por status (Desaparecido/Localizado)
- **Cards modernos** com informações organizadas e hierarquia visual clara

### 📄 **Detalhes e Informações**
- **Página de detalhes** completamente redesenhada com layout profissional
- **Normalização de dados** da API pública para consistência
- **Formulário intuitivo** para envio de novas informações
- **Upload múltiplo** de fotos (até 5 arquivos / 2MB cada)

### 🎨 **Interface e Experiência**
- **Design system** consistente com componentes reutilizáveis
- **Animações suaves** que melhoram a percepção de performance
- **Estados visuais** claros para loading, erro e sucesso
- **Feedback contextual** com toasts e mensagens apropriadas

### 🛡️ **Robustez e Confiabilidade**
- **Error boundaries** para captura de erros
- **Fallbacks inteligentes** quando APIs estão indisponíveis
- **Validação completa** com Zod e React Hook Form
- **Testes unitários** para componentes críticos

## 🏗️ Arquitetura

```
src/
├── app/                  # App Router (Next.js 14)
│   ├── layout.tsx       # Layout principal com header/footer
│   ├── page.tsx         # Homepage com hero section
│   └── pessoa/[id]/     # Páginas dinâmicas de detalhes
├── components/          # Componentes reutilizáveis
│   ├── PersonCard.tsx   # Card moderno de pessoa
│   ├── SearchBar.tsx    # Busca com estados visuais
│   ├── StatusBadge.tsx  # Badge de status responsivo
│   ├── Pagination.tsx   # Paginação profissional
│   └── ui/             # Componentes base
├── features/           # Lógica por domínio
│   ├── persons/        # Gestão de pessoas
│   └── reports/        # Envio de informações
├── domain/             # Tipos e modelos
├── lib/                # Clientes e utilitários
├── styles/             # Estilos globais customizados
└── hooks/              # Hooks reutilizáveis
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+ 
- npm 10+

### Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/joaooliveira10/encontrar-mt
cd encontrar-mt

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Execute em desenvolvimento
npm run dev
```

**Acesse: http://localhost:3000**

### ⚠️ Status Atual do Build

**Modo Desenvolvimento**: ✅ Funcional  
**Build de Produção**: ⚠️ Limitações conhecidas

O projeto está totalmente funcional em modo de desenvolvimento. O build de produção apresenta problemas relacionados ao SSR (Server-Side Rendering) com React Query. Para produção, recomenda-se:

```bash
# Para desenvolvimento (recomendado)
npm run dev

# Para Docker em desenvolvimento
docker build -f Dockerfile.dev -t encontrar-mt-dev .
docker run -p 3000:3000 encontrar-mt-dev
```

## 🛠️ Scripts Disponíveis

| Script | Descrição | Status | Uso |
|--------|-----------|--------|-----|
| `dev` | Servidor de desenvolvimento | ✅ | `npm run dev` |
| `build` | Build otimizado para produção | ⚠️ | `npm run build` |
| `start` | Servidor de produção | ⚠️ | `npm start` |
| `lint` | Análise de código com ESLint | ✅ | `npm run lint` |
| `type-check` | Verificação TypeScript | ✅ | `npm run type-check` |
| `test` | Execução de testes | ✅ | `npm test` |
| `test:watch` | Testes em modo watch | ✅ | `npm run test:watch` |
| `ci` | Pipeline completo local | ⚠️ | `npm run ci` |

## 🧪 Testes e Qualidade

### Execução de Testes
```bash
# Testes unitários
npm test

# Testes com cobertura
npm test -- --coverage

# Testes em modo watch
npm run test:watch
```

### Pipeline de CI/CD
```bash
# Execute o pipeline completo localmente
npm run ci
```

O pipeline inclui:
1. 📋 Lint (ESLint + Prettier)
2. 🔍 Type checking (TypeScript)
3. 🧪 Testes unitários (Jest)
4. 🏗️ Build de produção

## 🐳 Docker

### Build e Execução
```bash
# Build da imagem
docker build -t encontrar-mt .

# Execução do container
docker run -p 3000:3000 --env-file .env.local encontrar-mt
```

### Características do Dockerfile
- **Multi-stage build** para otimização de tamanho
- **Node.js Alpine** para imagem minimalista
- **Caching otimizado** para builds rápidos
- **Usuário não-root** para segurança

## 🔧 Configuração

### Variáveis de Ambiente
```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL=https://abitus-api.geia.vip
```

### Configurações Importantes
- **Tailwind CSS**: Configuração customizada com design system
- **TypeScript**: Strict mode habilitado
- **ESLint**: Regras otimizadas para Next.js e acessibilidade
- **Jest**: Configurado para componentes React

## 🔗 Integração com API

### Endpoints Utilizados
- **Listagem**: `GET /v1/pessoas/aberto/filtro`
  - Parâmetros: `pagina`, `porPagina`, `nome`, `status`
- **Detalhes**: `GET /v1/pessoas/{id}`
- **Envio de Informação**: `POST /v1/ocorrencias/informacoes-desaparecido`
  - Query params + multipart form data

### Mapeamento de Dados
A aplicação normaliza os dados da API para garantir consistência:
- Status derivado automaticamente
- Datas formatadas para o padrão brasileiro
- URLs de foto tratadas com fallbacks

## 📱 Design Responsivo

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Componentes Adaptativos
- Grid responsivo para cards de pessoas
- Navegação otimizada para mobile
- Formulários que se adaptam ao tamanho da tela
- Tipografia fluida

## ♿ Acessibilidade

- **ARIA labels** em elementos interativos
- **Hierarquia semântica** correta de headings
- **Contraste adequado** seguindo WCAG 2.1
- **Navegação por teclado** funcional
- **Screen readers** suportados

## 🎨 Sistema de Design

### Paleta de Cores
- **Primary**: Vermelho (para alertas e desaparecidos)
- **Secondary**: Azul (para ações e links)
- **Success**: Verde (para pessoas localizadas)
- **Neutros**: Cinzas para texto e backgrounds

### Componentes Base
- **Cards**: Sombras suaves, bordas arredondadas
- **Botões**: Estados visuais claros, animações
- **Formulários**: Feedback visual, validação em tempo real
- **Badges**: Cores contextuais, tamanhos flexíveis

## 📊 Performance

### Otimizações Implementadas
- **Lazy loading** de rotas e componentes
- **Image optimization** automática do Next.js
- **Bundle splitting** para carregamento eficiente
- **Caching inteligente** de requests da API

### Métricas Alvo
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Segurança

- **Validação rigorosa** com Zod
- **Sanitização** de inputs do usuário
- **Rate limiting** natural via debounce
- **Error boundaries** para isolamento de falhas

## 📈 Monitoramento

### Logs e Debugging
- Console logs estruturados
- Error tracking com React Error Boundaries
- Estados de loading e erro visíveis ao usuário


---

## 📞 Suporte

Para dúvidas ou suporte:
- 🔗 **Documentação da API**: https://abitus-api.geia.vip/swagger-ui/index.html
- 📧 **Issues**: Use a aba Issues deste repositório
- 🚨 **Emergências**: Ligue 190

---

**Desenvolvido com ❤️ para ajudar a encontrar quem importa**

### Normalização de Campos
| API (PessoaDTO) | Domínio (Person) | Observação |
|-----------------|------------------|------------|
| id (number) | id (string) | Convertido para string no front |
| nome | nome | — |
| urlFoto | fotoUrl | Mapeado direto |
| ultimaOcorrencia.dtDesaparecimento | dataDesaparecimento | Opcional |
| ultimaOcorrencia.dataLocalizacao | status | Se presente => LOCALIZADO senão DESAPARECIDO |


## Próximos Passos Sugeridos
- Implementar autenticação (login/refresh) se POST exigir token em ambiente protegido.
- Testes adicionais (`useSubmitReport` com validação de parâmetros construídos).
- Testes E2E (Playwright) cobrindo busca, navegação e envio de informação (mock).
- aria-live para feedback de envio e foco automático em erros de formulário.
- Placeholder de imagem quando `fotoUrl` indisponível.
- Observabilidade (Sentry / LogRocket) e métricas de cache.

## Observações
Os tipos podem ser refinados conforme definição final do Swagger oficial. Ajustar chaves de endpoint e nomes de campos quando divergirem.


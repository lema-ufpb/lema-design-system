.PHONY: help install dev build start lint format typecheck storybook build-storybook test test-watch coverage registry clean docker-build docker-run shadcn-add-all shadcn-add-all-dry

# ANSI Colors
CYAN=\033[0;36m
GREEN=\033[0;32m
YELLOW=\033[1;33m
MAGENTA=\033[0;35m
RESET=\033[0m

help:
	@echo "✨ $(MAGENTA)Bem-vindo ao LEMA Design System!$(RESET) ✨"
	@echo ""
	@echo "🚀 $(CYAN)Comandos disponíveis:$(RESET)"
	@echo "  📥 $(GREEN)make install$(RESET)          - Instala as dependências do projeto"
	@echo "  💻 $(GREEN)make dev$(RESET)              - Inicia o servidor local Next.js"
	@echo "  🏗️  $(GREEN)make build$(RESET)            - Faz o build da aplicação Next.js"
	@echo "  🏃 $(GREEN)make start$(RESET)            - Inicia o servidor de produção"
	@echo "  🧹 $(GREEN)make lint$(RESET)             - Executa o ESLint e a verificação do TypeScript"
	@echo "  💅 $(GREEN)make format$(RESET)           - Formata o código com o Prettier"
	@echo "  📚 $(GREEN)make storybook$(RESET)        - Inicia o servidor local do Storybook"
	@echo "  📦 $(GREEN)make build-storybook$(RESET)  - Faz o build estático do Storybook"
	@echo "  🧪 $(GREEN)make test$(RESET)             - Roda os testes (inclui acessibilidade)"
	@echo "  👀 $(GREEN)make test-watch$(RESET)       - Roda os testes em modo watch"
	@echo "  📊 $(GREEN)make coverage$(RESET)         - Roda os testes com relatório de cobertura"
	@echo "  🧩 $(GREEN)make registry$(RESET)         - Faz o build do registry do shadcn"
	@echo "  🗑️  $(GREEN)make clean$(RESET)            - Limpa a casa (artefatos de build)"
	@echo "  🐳 $(GREEN)make docker-build$(RESET)     - Constrói a imagem Docker local"
	@echo "  🚢 $(GREEN)make docker-run$(RESET)       - Roda o container Docker local (porta 8080)"
	@echo "  📥 $(GREEN)make shadcn-add-all$(RESET)   - Adiciona todos os componentes do shadcn (sobrescreve)"
	@echo "  🧪 $(GREEN)make shadcn-add-all-dry$(RESET) - Simula a adição de todos os componentes"
	@echo ""
	@echo "💡 $(YELLOW)Dica: Rode 'make dev' ou 'make storybook' para começar a brincar!$(RESET)"

install:
	@echo "📦 $(CYAN)Baixando as caixas... Instalando dependências (isso pode levar uns minutinhos)$(RESET)"
	npm install --legacy-peer-deps
	@echo "🎉 $(GREEN)Dependências instaladas com sucesso!$(RESET)"

dev:
	@echo "💻 $(CYAN)Ligando as turbinas! Iniciando o servidor de desenvolvimento Next.js...$(RESET)"
	npm run dev

build:
	@echo "🏗️  $(MAGENTA)Construindo o foguete... Fazendo o build otimizado da aplicação!$(RESET)"
	npm run build
	@echo "✅ $(GREEN)Build finalizado! Pronto para decolar!$(RESET)"

start:
	@echo "🚀 $(CYAN)Ignificão! Iniciando o servidor de produção...$(RESET)"
	npm run start

lint:
	@echo "🕵️‍♂️ $(YELLOW)O inspetor está de olho... Rodando o ESLint e TypeCheck!$(RESET)"
	npm run lint
	@echo "✨ $(GREEN)Tudo limpo! Seu código está brilhando!$(RESET)"

format:
	@echo "💅 $(CYAN)Dia de salão! Formatando todo o seu código com Prettier...$(RESET)"
	npm run format
	@echo "🌺 $(GREEN)Código formatado e maravilhoso!$(RESET)"

storybook:
	@echo "📚 $(MAGENTA)Abrindo o livro de histórias... Iniciando o servidor do Storybook!$(RESET)"
	npm run storybook

build-storybook:
	@echo "📦 $(YELLOW)Empacotando as histórias... Gerando o build estático do Storybook!$(RESET)"
	npm run build-storybook
	@echo "✅ $(GREEN)Build do Storybook concluído com sucesso!$(RESET)"

test:
	@echo "🧪 $(CYAN)Vestindo o jaleco... Rodando os testes unitários e de acessibilidade!$(RESET)"
	npm run test

test-watch:
	@echo "👀 $(YELLOW)Olhos de águia ativados! Rodando os testes no modo watch...$(RESET)"
	npm run test:watch

coverage:
	@echo "📊 $(MAGENTA)Verificando a cobertura... Vamos ver se não esquecemos de nada!$(RESET)"
	npm run coverage

registry:
	@echo "🧩 $(CYAN)Montando o quebra-cabeça... Construindo o registry do shadcn/ui!$(RESET)"
	npm run registry:build
	@echo "✅ $(GREEN)Registry criado com sucesso!$(RESET)"

clean:
	@echo "🗑️  $(YELLOW)Faxina geral! Removendo pastas antigas (.next, storybook-static, .vite)...$(RESET)"
	rm -rf .next
	rm -rf storybook-static
	rm -rf node_modules/.vite
	@echo "✨ $(GREEN)Tudo limpo! A casa está cheirosa!$(RESET)"

docker-build:
	@echo "🐳 $(CYAN)Chamando a baleia... Construindo a imagem Docker (lema-ds:local)!$(RESET)"
	docker build -t lema-ds:local .
	@echo "✅ $(GREEN)Imagem Docker construída com sucesso!$(RESET)"

docker-run:
	@echo "🚢 $(MAGENTA)Soltando as amarras... Rodando o container na porta 8080!$(RESET)"
	@echo "🔑 $(YELLOW)Token de acesso: http://localhost:8080/r/registry.json?token=$${REGISTRY_TOKEN}$(RESET)"
	docker run --rm -p 8080:80 -e REGISTRY_TOKEN=test-token lema-ds:local

shadcn-add-all:
	@echo "📥 $(YELLOW)Atenção: Sobrescrevendo tudo! Adicionando TODOS os componentes do shadcn/ui...$(RESET)"
	npx shadcn@latest add --all --overwrite
	@echo "✅ $(GREEN)Componentes fresquinhos instalados!$(RESET)"

shadcn-add-all-dry:
	@echo "🧪 $(CYAN)Apenas uma simulação (dry-run)! Verificando adição dos componentes...$(RESET)"
	npx shadcn@latest add --all --overwrite --dry-run
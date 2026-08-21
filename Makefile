install:
	npm install

dev:
	npm run dev

build:
	npm run build

prisma-generate:
	npm run prisma:generate

prisma-migrate:
	npm run prisma:migrate

prisma-studio:
	npm run prisma:studio

test:
	npm test

test-run:
	npm run test:run

lint:
	npm run lint

format:
	npm run format

typecheck:
	npm run typecheck

check:
	npm run typecheck
	npm run lint
	npm test

help:
	@printf "\033[1;36mMakefile commands:\033[0m\n"
	@printf "  \033[1;32minstall\033[0m          - Install dependencies\n"
	@printf "  \033[1;32mdev\033[0m              - Start development server\n"
	@printf "  \033[1;32mbuild\033[0m            - Build the project\n"
	@printf "  \033[1;32mprisma-generate\033[0m  - Generate Prisma client\n"
	@printf "  \033[1;32mprisma-migrate\033[0m   - Run Prisma migrations\n"
	@printf "  \033[1;32mprisma-studio\033[0m    - Open Prisma Studio\n"
	@printf "  \033[1;32mtest\033[0m             - Run tests\n"
	@printf "  \033[1;32mtest-run\033[0m         - Run tests with watch mode\n"
	@printf "  \033[1;32mlint\033[0m             - Run linter\n"
	@printf "  \033[1;32mformat\033[0m           - Format code\n"
	@printf "  \033[1;32mtypecheck\033[0m        - Check TypeScript types\n"
	@printf "  \033[1;32mcheck\033[0m            - Run typecheck, lint, and tests\n"
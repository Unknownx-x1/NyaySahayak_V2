# NyaySahayak 2.0 — Development Makefile

.PHONY: help infra-up infra-down api-install api-migrate api-dev api-test api-lint web-install web-dev web-build test

help:
	@echo "Available commands:"
	@echo "  make infra-up     - Start local Docker infrastructure (Postgres, Redis, MinIO)"
	@echo "  make infra-down   - Stop local Docker infrastructure"
	@echo "  make api-install  - Install backend dependencies in active virtualenv"
	@echo "  make api-migrate  - Run Alembic database migrations"
	@echo "  make api-dev      - Run FastAPI dev server (port 8000)"
	@echo "  make api-test     - Run backend tests with pytest"
	@echo "  make api-lint     - Run Ruff linter and formatter checks"
	@echo "  make web-install  - Install frontend dependencies"
	@echo "  make web-dev      - Run Next.js frontend dev server (port 3000)"
	@echo "  make web-build    - Build Next.js frontend for production"
	@echo "  make test         - Run both backend and frontend test suites"

infra-up:
	docker compose -f infra/docker-compose.yml up -d

infra-down:
	docker compose -f infra/docker-compose.yml down

api-install:
	pip install -r apps/api/requirements.txt

api-migrate:
	cd apps/api && alembic upgrade head

api-dev:
	cd apps/api && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

api-test:
	cd apps/api && pytest tests/ -v

api-lint:
	ruff check apps/api
	ruff format --check apps/api

web-install:
	cd apps/web && npm install

web-dev:
	cd apps/web && npm run dev

web-build:
	cd apps/web && npm run build

test: api-test
	cd apps/web && npm run test --if-present

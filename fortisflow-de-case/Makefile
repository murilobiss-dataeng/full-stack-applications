.PHONY: dev web-install web-build web-lint test-data infra-up infra-down pipeline-docker

dev:
	cd web && npm run dev

web-install:
	cd web && npm install

web-lint:
	cd web && npm run lint

web-build:
	cd web && npm run build

test-data:
	cd data-platform && python -m pytest

infra-up:
	cd infra && docker compose up -d

infra-down:
	cd infra && docker compose down

pipeline-docker:
	docker build -f infra/docker/Dockerfile.pipeline -t sigma-sec-pipeline:latest .

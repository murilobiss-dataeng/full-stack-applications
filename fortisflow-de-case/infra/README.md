# Infrastructure (Sigma Sec)

Terraform stubs, local containers, and a **batch-style** Docker image for the `data-platform` stub. **Not bound to a live cloud account** — copy into your org’s module layout and connect remote state (S3), OIDC for CI, and real secrets managers.

| Path | Purpose |
|------|---------|
| `terraform/` | Example AWS resources (commented): S3 raw bucket, KMS, IAM roles for pipeline vs analyst. |
| `docker-compose.yml` | Local Postgres for integration tests or future dbt runs (`localhost:5434`). |
| `docker/Dockerfile.pipeline` | Slim Python image: `python -m src.pipeline` (build context = **repository root**). |

See **Governance → Infrastructure as code** in the web app for how this maps to least privilege and CI.

# Infrastructure (reference)

Terraform stubs, local containers, and patterns for IAM-aligned environments. **Not wired to a live cloud account** — copy into your org’s module layout and connect backends (S3 state, OIDC).

| Path | Purpose |
|------|---------|
| `terraform/` | Example AWS resources (commented): S3 raw bucket, KMS, IAM roles for pipeline vs analyst. |
| `docker-compose.yml` | Local Postgres for integration tests and dbt against a disposable schema. |

See **Governance → Infrastructure as code** in the web app for how this maps to secrets, least privilege, and CI.

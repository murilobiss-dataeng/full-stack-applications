# Outline only — paste into your org standard module or split by team.
#
# pipeline_svc (Sigma Sec / fortisflow-de-case):
#   - s3:ListBucket, GetObject, PutObject on raw/* and quarantine/*
#   - kms:Decrypt, Encrypt on lake key
#   - secretsmanager:GetSecretValue on arn:aws:secretsmanager:...:secret:etl/*
#   - snowflake or rds-db:connect for technical ELT role (scoped schemas)
#
# analyst_human:
#   - s3: none on raw (or read-only masked bucket)
#   - warehouse: read curated + marts only; masking policies enforced in Snowflake
#
# github_actions_oidc:
#   - federated principal repo:yourorg/fortisflow-de-case
#   - sts:AssumeRoleWithWebIdentity -> short-lived role for plan/apply or ECR push

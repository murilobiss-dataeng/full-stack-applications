# Outline only — paste into your org standard module or split by team.
#
# pipeline_svc:
#   - s3:ListBucket, GetObject, PutObject on raw/* and quarantine/*
#   - kms:Decrypt, Encrypt on lake key
#   - secretsmanager:GetSecretValue on arn:aws:secretsmanager:...:secret:etl/*
#   - rds-db:connect for etl user (IAM DB auth optional)
#
# analyst_human:
#   - s3: none on raw (or read-only to masked bucket)
#   - rds: connect to reader endpoint, role limited to views in curated + marts schemas
#
# github_actions_oidc:
#   - federated principal repo:yourorg/courtlytics
#   - sts:AssumeRoleWithWebIdentity -> short-lived role for plan/apply or ECR push

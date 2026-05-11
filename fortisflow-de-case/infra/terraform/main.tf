# Example Terraform layout for a governed data plane (AWS-oriented).
# Uncomment when binding to a real account and remote state.
#
# terraform {
#   required_version = ">= 1.6"
#   required_providers { aws = { source = "hashicorp/aws", version = "~> 5.0" } }
#   backend "s3" {
#     bucket = "YOUR_STATE_BUCKET"
#     key    = "sigma-sec/terraform.tfstate"
#     region = "eu-west-2"
#   }
# }
#
# provider "aws" { region = var.aws_region }
# variable "aws_region" { type = string default = "eu-west-2" }
# variable "prefix" { type = string description = "Resource name prefix" }
#
# resource "aws_kms_key" "lake" {}
# resource "aws_s3_bucket" "raw" { bucket = "${var.prefix}-raw" }
#
# resource "aws_iam_role" "pipeline" {
#   name               = "${var.prefix}-pipeline"
#   assume_role_policy = data.aws_iam_policy_document.pipeline_assume.json
# }

terraform {
  required_version = ">= 1.6"
}

# Intentionally minimal: validates repo layout; see iam-outline.tf for permission notes.

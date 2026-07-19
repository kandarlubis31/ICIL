# 🐳 07 — Infrastructure as Code

> 🔴 Advanced | Prereq: 04,05 | ~9 min

IaC treats infrastructure like software: version-controlled, reviewable, and reproducible. No more clicking around cloud consoles — define your infrastructure in code.

---

## 7.1 Why IaC

```
MANUAL (anti-pattern):             IaC (correct):
  Click AWS console →                main.tf describes VPC + subnets
  Forget what you clicked →          Git history shows every change
  "It worked on staging" →           Same code, different variables
  Snowflake server →                 Destroy + recreate identical
  Onboarding = screenshare →         Clone repo + terraform apply
```

## 7.2 Terraform Basics

```hcl
# main.tf
provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_service" "app" {
  name     = "myapp"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/myapp:${var.image_tag}"
        env {
          name  = "DATABASE_URL"
          value = google_secret_manager_secret_version.db_url.secret_data
        }
        resources {
          limits = { cpu = "1000m", memory = "512Mi" }
        }
      }
    }
  }
  traffic { percent = 100; latest_revision = true }
}

# variables.tf
variable "project_id" { type = string }
variable "region"     { type = string; default = "us-central1" }
variable "image_tag"  { type = string; default = "latest" }
```

## 7.3 Terraform Workflow

```bash
terraform init          # Download providers, initialize backend
terraform plan          # Preview changes (always review!)
terraform apply         # Apply changes to infrastructure
terraform destroy       # Tear down everything

# State management — NEVER commit .tfstate to git
# Use remote backend: GCS, S3, or Terraform Cloud
terraform {
  backend "gcs" {
    bucket = "myproject-tfstate"
    prefix = "terraform/state"
  }
}
```

## 7.4 IaC Best Practices

| Rule | Why |
|------|-----|
| **State in remote backend** | Team access, locking, no git conflicts |
| **Plan before apply** | Catch mistakes before they're live |
| **Modules for reuse** | DRY: one VPC module, used everywhere |
| **Variables, not hardcode** | Different envs = different `.tfvars` files |
| **Tag everything** | `environment`, `team`, `cost-center` tags |

## 7.5 Anti-Patterns

- **Manual console changes** — Terraform will detect drift and overwrite
- **Committing `.tfstate` to git** — contains secrets; use remote backend
- **Monolith `.tf` files** — split by service: `networking.tf`, `compute.tf`, `database.tf`

## 7.6 ICIL Cross-Ref

Use with: `devops-infra/04` (cloud), `software-engineering/07` (project structure)

## ⚡ Action Checklist
- [ ] Terraform state stored in remote backend (GCS/S3), never in git
- [ ] Always run `terraform plan` and review before `apply`
- [ ] Split infrastructure into modules by domain (networking, compute, data)
- [ ] All resources tagged with `environment` and `team`
- [ ] `.gitignore` includes: `.terraform/`, `*.tfstate`, `*.tfvars` (except example)

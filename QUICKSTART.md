# Quick Start Guide - Teefinder DevOps IaC

Get up and running with Terraform and Docker in 5 minutes!

## Prerequisites

- Docker Desktop (with Docker Compose)
- Terraform v1.0+
- Google Cloud SDK (gcloud CLI)
- Git

## 1. Local Development Setup (5 min)

```bash
# Clone the repository
git clone https://github.com/tobiasbjurstrom/teefinder-devops.git
cd teefinder-devops

# Copy environment template
cp .env.example .env

# Edit .env with your values (Google Maps API, Firebase keys)
# - Get Google Maps API key from Google Cloud Console
# - Get Firebase config from Firebase Console

# Start development environment
./scripts/docker.sh dev-up

# App is ready at http://localhost:3000
# View logs: ./scripts/docker.sh dev-logs
# Stop: ./scripts/docker.sh dev-down
```

## 2. Infrastructure Setup (10 min)

### GCP Project Setup

```bash
# Authenticate with Google Cloud
gcloud auth application-default login

# Create or select a GCP project
gcloud projects create teefinder-prod --name="Teefinder Production"
gcloud config set project teefinder-prod

# Get your project ID
PROJECT_ID=$(gcloud config get-value project)
echo $PROJECT_ID
```

### Update Terraform Configuration

```bash
# Edit terraform/dev.tfvars (and staging/prod if needed)
# Replace "your-gcp-project-id" with your actual project ID
nano terraform/dev.tfvars
```

### Initialize Terraform

```bash
# Initialize Terraform
./scripts/terraform.sh init

# Validate configuration
./scripts/terraform.sh validate

# Plan infrastructure
./scripts/terraform.sh plan dev

# Review the plan output carefully, then apply
./scripts/terraform.sh apply dev
```

## 3. Building and Deploying (5 min)

### Build Docker Image

```bash
# Build locally
./scripts/docker.sh build

# Or build with tag
./scripts/docker.sh build v1.0.0
```

### Push to Artifact Registry

```bash
# Push to Google Artifact Registry
./scripts/docker.sh push $PROJECT_ID latest

# Or with specific tag
./scripts/docker.sh push $PROJECT_ID v1.0.0
```

### Automated CI/CD (Optional)

The `cloudbuild.yaml` file enables automatic builds on GitHub push:

1. Connect your GitHub repository to Cloud Build
2. Enable Cloud Build API
3. Push to main branch → automatic build and push to registry

## Common Commands Reference

### Docker Commands

```bash
./scripts/docker.sh build               # Build image
./scripts/docker.sh dev-up              # Start dev environment
./scripts/docker.sh dev-down            # Stop dev environment
./scripts/docker.sh dev-logs            # View logs
./scripts/docker.sh push PROJECT_ID     # Push to registry
./scripts/docker.sh clean               # Clean up Docker
```

### Terraform Commands

```bash
./scripts/terraform.sh init             # Initialize
./scripts/terraform.sh validate         # Validate config
./scripts/terraform.sh plan dev         # Plan changes
./scripts/terraform.sh apply dev        # Apply changes
./scripts/terraform.sh output dev       # View outputs
./scripts/terraform.sh destroy dev      # Destroy (dev only!)
./scripts/terraform.sh state list       # List resources
```

## Project Structure

```
teefinder-devops/
├── Dockerfile                 # Container image definition
├── docker-compose.yml         # Local dev environment
├── .env.example               # Environment template
├── cloudbuild.yaml            # CI/CD pipeline
├── terraform/
│   ├── main.tf                # Provider & config
│   ├── resources.tf           # GCP resources
│   ├── variables.tf           # Input variables
│   ├── outputs.tf             # Output values
│   ├── dev.tfvars             # Dev environment
│   ├── staging.tfvars         # Staging environment
│   ├── prod.tfvars            # Production environment
│   └── modules/               # Reusable modules
├── scripts/
│   ├── docker.sh              # Docker helper script
│   └── terraform.sh           # Terraform helper script
└── IaC-README.md              # Detailed documentation
```

## Troubleshooting

### Docker Issues

**Port 3000 already in use:**
```bash
lsof -i :3000          # Find what's using the port
kill -9 <PID>          # Kill the process
```

**Build fails:**
```bash
docker system prune -a  # Clean Docker resources
./scripts/docker.sh build  # Rebuild
```

### Terraform Issues

**GCP authentication error:**
```bash
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

**Provider error:**
```bash
cd terraform
terraform init -upgrade
terraform validate
```

## Next Steps

1. **Customize for your needs:**
   - Update `terraform/variables.tf` for additional resources
   - Modify `docker-compose.yml` for additional services
   - Configure Cloud Build triggers for your repository

2. **Set up environments:**
   - Create separate GCP projects for dev/staging/prod
   - Update `terraform/*.tfvars` files accordingly
   - Test infrastructure changes in dev first

3. **Security:**
   - Never commit `.env` or `.tfvars` with real values
   - Use GCP Secret Manager for sensitive data
   - Enable audit logging in GCP

4. **Monitor and maintain:**
   - Set up Cloud Monitoring alerts
   - Regular Terraform state backups
   - Keep Docker images updated

## Getting Help

- 📖 Detailed docs: See `IaC-README.md`
- 🐛 Issues: Check troubleshooting section above
- 🔗 Resources:
  - [Terraform Docs](https://www.terraform.io/docs)
  - [Docker Docs](https://docs.docker.com/)
  - [GCP Terraform Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)

---

**Happy Infrastructure-as-Code-ing! 🚀**

# Infrastructure as Code (IaC) - Teefinder DevOps

This directory contains Terraform configurations and Docker setup for the Teefinder application infrastructure.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Directory Structure](#directory-structure)
- [Docker Setup](#docker-setup)
- [Terraform Setup](#terraform-setup)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)

---

## Overview

This IaC implementation provides:

- **Docker**: Multi-stage containerization for development and production
- **Terraform**: Infrastructure provisioning on Google Cloud Platform (GCP)
- **Google Cloud Integration**: Firestore, Cloud Storage, Artifact Registry, Cloud Build
- **Environment Management**: Dev, staging, and production configurations

---

## Prerequisites

### Required Tools

1. **Docker** (v20.10+)
   - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Docker Compose** (v2.0+)
   - Included with Docker Desktop

3. **Terraform** (v1.0+)
   - [Install Terraform](https://www.terraform.io/downloads.html)
   - Verify: `terraform version`

4. **Google Cloud SDK** (gcloud CLI)
   - [Install gcloud CLI](https://cloud.google.com/sdk/docs/install)
   - Authenticate: `gcloud auth application-default login`

5. **Git**
   - For version control

### GCP Project Setup

1. Create a GCP project: https://console.cloud.google.com
2. Enable billing for your project
3. Set your project ID: `gcloud config set project YOUR_PROJECT_ID`
4. Note your project ID (used in Terraform configuration)

---

## Directory Structure

```
teefinder-devops/
├── Dockerfile                 # Multi-stage production Docker image
├── .dockerignore              # Files to exclude from Docker context
├── docker-compose.yml         # Local development orchestration
├── .env.example               # Environment variables template
├── cloudbuild.yaml            # Google Cloud Build pipeline
└── terraform/
    ├── main.tf                # Provider configuration
    ├── variables.tf           # Variable definitions
    ├── outputs.tf             # Output values
    ├── resources.tf           # Main resource definitions
    ├── backend.tf             # Remote state configuration
    ├── dev.tfvars             # Development environment vars
    ├── staging.tfvars         # Staging environment vars
    ├── prod.tfvars            # Production environment vars
    └── modules/
        ├── firebase/          # Firebase/Firestore module
        └── registry/          # Artifact Registry module
```

---

## Docker Setup

### Building the Docker Image

```bash
# Build the image
docker build -t teefinder-app:latest .

# Build with specific tag
docker build -t teefinder-app:v1.0.0 .

# Build and tag for Artifact Registry
docker build -t eu-docker.pkg.dev/YOUR_PROJECT_ID/teefinder-docker-repo/teefinder-app:latest .
```

### Running with Docker Compose (Development)

#### 1. Set up environment variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
# - VITE_GOOGLE_MAPS_API_KEY
# - VITE_FIREBASE_* variables
```

#### 2. Start the development environment

```bash
# Start services in the background
docker-compose up -d

# View logs
docker-compose logs -f teefinder

# Stop services
docker-compose down
```

The app will be available at `http://localhost:3000`

#### 3. Running specific commands

```bash
# Install dependencies
docker-compose run --rm teefinder npm install

# Run tests
docker-compose run --rm teefinder npm run test

# Build for production
docker-compose run --rm teefinder npm run build

# Clean up
docker-compose down -v
```

### Pushing to Artifact Registry

```bash
# Authenticate Docker with Artifact Registry
gcloud auth configure-docker eu-docker.pkg.dev

# Tag the image
docker tag teefinder-app:latest eu-docker.pkg.dev/YOUR_PROJECT_ID/teefinder-docker-repo/teefinder-app:latest

# Push to registry
docker push eu-docker.pkg.dev/YOUR_PROJECT_ID/teefinder-docker-repo/teefinder-app:latest

# Pull from registry
docker pull eu-docker.pkg.dev/YOUR_PROJECT_ID/teefinder-docker-repo/teefinder-app:latest
```

---

## Terraform Setup

### Initial Configuration

#### 1. Update terraform variables

Edit `terraform/dev.tfvars` (and staging/prod as needed):

```hcl
gcp_project_id = "your-actual-gcp-project-id"
gcp_region     = "europe-west1"
environment    = "dev"
app_name       = "teefinder"
```

#### 2. Initialize Terraform

```bash
cd terraform

# Initialize (downloads providers and modules)
terraform init

# Verify configuration
terraform validate
```

#### 3. Set up remote state (recommended for production)

Create a GCS bucket for Terraform state:

```bash
gsutil mb gs://YOUR_PROJECT_ID-terraform-state
gsutil versioning set on gs://YOUR_PROJECT_ID-terraform-state
```

Uncomment and update `terraform/backend.tf`:

```hcl
terraform {
  backend "gcs" {
    bucket = "YOUR_PROJECT_ID-terraform-state"
    prefix = "teefinder-devops"
  }
}
```

Re-initialize: `terraform init`

### Planning and Applying

#### Development Environment

```bash
cd terraform

# Plan (dry-run)
terraform plan -var-file=dev.tfvars -out=tfplan.dev

# Review the plan output carefully

# Apply
terraform apply tfplan.dev

# View outputs
terraform output
```

#### Staging Environment

```bash
terraform plan -var-file=staging.tfvars -out=tfplan.staging
terraform apply tfplan.staging
```

#### Production Environment

```bash
# For production, use -lock to prevent concurrent modifications
terraform plan -var-file=prod.tfvars -lock-timeout=5m -out=tfplan.prod
terraform apply -lock-timeout=5m tfplan.prod
```

### Managing Resources

```bash
# View state
terraform state list
terraform state show google_firestore_database.firestore_db

# Import existing resource
terraform import google_firestore_database.firestore_db projects/YOUR_PROJECT_ID/databases/firestore-db

# Destroy resources (dev only!)
terraform destroy -var-file=dev.tfvars
```

---

## Deployment Guide

### Complete Deployment Workflow

#### 1. Local Development

```bash
# Start local environment
docker-compose up -d

# Make your changes
# Test locally
docker-compose run --rm teefinder npm run test

# Commit changes
git add .
git commit -m "Feature: Add new capability"
git push origin your-branch
```

#### 2. Set up Infrastructure

```bash
# Initialize Terraform (if not already done)
cd terraform
terraform init

# Plan and apply for your environment
terraform plan -var-file=dev.tfvars
terraform apply -var-file=dev.tfvars
```

#### 3. Build and Push Docker Image

```bash
# Build the image
docker build -t teefinder-app:v1.0.0 .

# Tag for Artifact Registry
docker tag teefinder-app:v1.0.0 eu-docker.pkg.dev/YOUR_PROJECT_ID/teefinder-docker-repo/teefinder-app:v1.0.0

# Push to registry
docker push eu-docker.pkg.dev/YOUR_PROJECT_ID/teefinder-docker-repo/teefinder-app:v1.0.0
```

#### 4. Cloud Build Pipeline

The `cloudbuild.yaml` is automatically triggered on push to main:

```bash
# Manual trigger (optional)
gcloud builds submit --config=cloudbuild.yaml

# View build logs
gcloud builds log COMMIT_SHA --stream
```

### CI/CD Integration

The pipeline automatically:
1. Builds the Docker image
2. Pushes to Artifact Registry
3. Updates deployment metadata

---

## Troubleshooting

### Docker Issues

#### Image Build Fails

```bash
# Clear build cache
docker system prune -a

# Rebuild with verbose output
docker build --progress=plain -t teefinder-app:latest .
```

#### Port Already in Use

```bash
# Find and stop container using port 3000
lsof -i :3000
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Terraform Issues

#### State Lock

```bash
# Release stuck state lock (use cautiously!)
terraform force-unlock LOCK_ID
```

#### Provider Authentication Error

```bash
# Re-authenticate with GCP
gcloud auth application-default login

# Verify credentials
gcloud config list

# Re-initialize
terraform init -upgrade
```

#### "Project is not found"

```bash
# Verify project ID
gcloud config get-value project

# Set correct project
gcloud config set project YOUR_CORRECT_PROJECT_ID
```

### GCP Issues

#### API Not Enabled

Terraform will attempt to enable required APIs. If this fails:

```bash
# Enable manually
gcloud services enable compute.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

#### Quota Exceeded

```bash
# Check quotas
gcloud compute project-info describe --project=YOUR_PROJECT_ID

# Request quota increase in GCP Console
```

---

## Useful Commands Reference

### Docker

```bash
docker-compose up -d              # Start
docker-compose down               # Stop
docker-compose logs -f            # View logs
docker-compose exec teefinder npm run build  # Run command
docker system prune -a            # Clean up
```

### Terraform

```bash
terraform init                    # Initialize
terraform validate                # Check syntax
terraform plan                    # Dry-run
terraform apply                   # Deploy
terraform destroy                 # Remove resources
terraform fmt                     # Format code
terraform taint RESOURCE_ID       # Mark for recreation
terraform untaint RESOURCE_ID     # Unmark
```

### GCP/gcloud

```bash
gcloud auth login                 # Authenticate
gcloud config set project ID      # Set project
gcloud services list --enabled    # View enabled APIs
gcloud builds list                # View Cloud Build history
gcloud builds log SHA --stream    # Stream build logs
```

---

## Security Best Practices

1. **Never commit sensitive data**
   - Use `.env.local` for local secrets
   - Add to `.gitignore`

2. **Terraform State**
   - Use remote state (GCS) for production
   - Enable versioning and locking

3. **Service Accounts**
   - Use specific IAM roles (least privilege)
   - Rotate credentials regularly

4. **Environment Variables**
   - Use separate .env files per environment
   - Manage via Terraform variables

5. **Docker Images**
   - Use specific version tags
   - Scan for vulnerabilities: `gcloud container images scan`

---

## Support and Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [Google Cloud Terraform Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Docker Documentation](https://docs.docker.com/)
- [GCP Documentation](https://cloud.google.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

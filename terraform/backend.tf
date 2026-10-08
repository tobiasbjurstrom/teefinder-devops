# Terraform Backend Configuration
# Uncomment and update to enable remote state storage

terraform {
  backend "gcs" {
    bucket = "your-terraform-state-bucket"
    prefix = "teefinder-devops"
  }
}

# To use this backend:
# 1. Create a GCS bucket: gsutil mb gs://your-terraform-state-bucket
# 2. Enable versioning: gsutil versioning set on gs://your-terraform-state-bucket
# 3. Uncomment this file
# 4. Run: terraform init

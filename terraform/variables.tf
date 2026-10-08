variable "gcp_project_id" {
  description = "The GCP project ID"
  type        = string
  validation {
    condition     = length(var.gcp_project_id) > 0
    error_message = "Project ID cannot be empty."
  }
}

variable "gcp_region" {
  description = "The GCP region"
  type        = string
  default     = "europe-west1"
  validation {
    condition     = contains(["europe-west1", "us-central1", "asia-southeast1", "us-east1"], var.gcp_region)
    error_message = "Region must be a valid GCP region."
  }
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "teefinder"
}

variable "firebase_database_instance_name" {
  description = "Firestore database instance name"
  type        = string
  default     = "firestore-db"
}

variable "enable_apis" {
  description = "Whether to enable required APIs"
  type        = bool
  default     = true
}

variable "docker_image_name" {
  description = "Docker image name in Container Registry"
  type        = string
  default     = "teefinder-app"
}

variable "container_registry_location" {
  description = "Location for Artifact Registry (us, eu, asia)"
  type        = string
  default     = "eu"
  validation {
    condition     = contains(["us", "eu", "asia"], var.container_registry_location)
    error_message = "Container registry location must be us, eu, or asia."
  }
}

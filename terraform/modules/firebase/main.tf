terraform {
  required_version = ">= 1.0"
}

variable "gcp_project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP Region"
  type        = string
  default     = "europe-west1"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
}

output "firebase_database_name" {
  description = "Firestore database name"
  value       = google_firestore_database.firestore_db.name
}

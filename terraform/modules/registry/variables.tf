variable "gcp_project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "container_registry_location" {
  description = "Container registry location"
  type        = string
  default     = "eu"
}

variable "app_name" {
  description = "Application name"
  type        = string
}

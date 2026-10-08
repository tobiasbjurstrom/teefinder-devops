output "firebase_project_id" {
  description = "Firebase Project ID"
  value       = var.gcp_project_id
}

output "gcp_region" {
  description = "GCP Region"
  value       = var.gcp_region
}

output "artifact_registry_repository_name" {
  description = "Artifact Registry repository name"
  value       = try(google_artifact_registry_repository.docker_repo.name, "")
}

output "artifact_registry_repository_url" {
  description = "Artifact Registry repository URL"
  value       = try("${var.container_registry_location}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.docker_repo.name}", "")
}

output "firestore_database_name" {
  description = "Firestore Database Name"
  value       = try(google_firestore_database.firestore_db.name, "")
}

output "cloud_build_status" {
  description = "Cloud Build API status"
  value       = try(google_project_service.cloud_build.service, "")
}

resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.container_registry_location
  repository_id = "${var.app_name}-docker-repo"
  description   = "Docker repository for ${var.app_name}"
  format        = "DOCKER"
}

output "repository_name" {
  value = google_artifact_registry_repository.docker_repo.name
}

output "repository_url" {
  value = "${var.container_registry_location}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.docker_repo.name}"
}

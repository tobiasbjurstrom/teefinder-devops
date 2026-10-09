# Enable required APIs
resource "google_project_service" "required_apis" {
  for_each = toset([
    "compute.googleapis.com",
    "storage-api.googleapis.com",
    "firestore.googleapis.com",
    "cloudbuild.googleapis.com",
    "containerregistry.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudrun.googleapis.com",
    "firebase.googleapis.com",
  ])

  service            = each.value
  disable_on_destroy = true
}

# Artifact Registry for Docker images
resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.container_registry_location
  repository_id = "${var.app_name}-docker-repo"
  description   = "Docker repository for ${var.app_name} application"
  format        = "DOCKER"

  depends_on = [google_project_service.required_apis["artifactregistry.googleapis.com"]]
}

# Firestore Database
resource "google_firestore_database" "firestore_db" {
  provider        = google-beta
  project         = var.gcp_project_id
  name            = var.firebase_database_instance_name
  location_id     = "eur3"
  type            = "FIRESTORE_NATIVE"
  concurrency_mode = "PESSIMISTIC"

  depends_on = [google_project_service.required_apis["firestore.googleapis.com"]]
}

# Cloud Storage bucket for app assets
resource "google_storage_bucket" "app_assets" {
  name          = "${var.gcp_project_id}-${var.app_name}-assets"
  location      = var.gcp_region
  force_destroy = false

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 5
    }
  }

  depends_on = [google_project_service.required_apis["storage-api.googleapis.com"]]
}

# IAM Service Account for Cloud Build
resource "google_service_account" "cloud_build_sa" {
  account_id   = "${var.app_name}-cloud-build"
  display_name = "Cloud Build Service Account for ${var.app_name}"
  description  = "Service account for Cloud Build pipeline"
}

# Grant necessary permissions to Cloud Build service account
resource "google_project_iam_member" "cloud_build_editor" {
  project = var.gcp_project_id
  role    = "roles/editor"
  member  = "serviceAccount:${google_service_account.cloud_build_sa.email}"
}

# Create a Cloud Build trigger (requires GitHub connection)
# Note: This requires manual setup of GitHub App connection in Cloud Build UI first
# Commented out until GitHub connection is configured
# resource "google_cloudbuild_trigger" "github_trigger" {
#   name            = "${var.app_name}-github-trigger"
#   description     = "Trigger build on GitHub push"
#   service_account = google_service_account.cloud_build_sa.id
#   filename        = "cloudbuild.yaml"
#
#   # Uncomment when GitHub connection is set up
#   # github {
#   #   owner = "tobiasbjurstrom"
#   #   name  = "teefinder-devops"
#   #   push {
#   #     branch = "main"
#   #   }
#   # }
#
#   depends_on = [google_project_service.required_apis["cloudbuild.googleapis.com"]]
# }

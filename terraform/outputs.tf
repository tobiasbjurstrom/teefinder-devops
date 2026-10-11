output "container_id" {
  description = "The provisioned container ID"
  value       = docker_container.app.id
}

output "application_endpoint" {
  description = "Host endpoint for testing"
  value       = "http://localhost:${var.host_port}"
}
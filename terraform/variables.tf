variable "environment" {
  type        = string
  description = "Environment name (e.g. dev, staging, prod)"
  default     = "dev"
}

variable "app_name" {
  type        = string
  description = "Application name"
  default     = "teefinder"
}

variable "host_port" {
  type        = number
  description = "Port exposed on the host machine/runner"
  default     = 3000
}

variable "container_port" {
  type        = number
  description = "Port used inside the container"
  default     = 3000
}
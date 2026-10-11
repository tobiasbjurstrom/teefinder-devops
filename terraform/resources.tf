resource "docker_network" "app_net" {
  name = "${var.app_name}-${var.environment}-network"
}

resource "docker_image" "app" {
  name         = "node:18-alpine"
  keep_locally = true
}

resource "docker_container" "app" {
  name  = "${var.app_name}-${var.environment}-container"
  image = docker_image.app.image_id

  networks_advanced {
    name = docker_network.app_net.name
  }

  ports {
    internal = 3000
    external = var.host_port
  }

  env = [
    "NODE_ENV=${var.environment}"
  ]

  # Keeps the demo container alive for healthcheck verification
  command = ["node", "-e", "const http = require('http'); http.createServer((req, res) => res.end('OK')).listen(3000);"]
}
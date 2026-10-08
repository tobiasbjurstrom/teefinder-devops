#!/bin/bash
#
# Teefinder DevOps - Docker helper script
# Usage: ./scripts/docker.sh [command] [options]
#

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Show usage
show_usage() {
    cat << EOF
Usage: $0 [command] [options]

Commands:
  build              Build Docker image
  dev-up             Start development environment
  dev-down           Stop development environment
  dev-logs           View development logs
  push               Push image to Artifact Registry
  clean              Clean up Docker resources
  help               Show this help message

Examples:
  $0 build
  $0 dev-up
  $0 push YOUR_PROJECT_ID v1.0.0
  $0 clean --all

EOF
}

# Build Docker image
build_image() {
    local tag="${1:-latest}"
    print_info "Building Docker image with tag: $tag"
    cd "$PROJECT_ROOT"
    docker build -t teefinder-app:$tag .
    print_info "Build complete!"
}

# Start development environment
dev_up() {
    print_info "Starting development environment..."
    cd "$PROJECT_ROOT"
    
    # Check if .env exists
    if [ ! -f .env ]; then
        print_warn ".env file not found. Creating from template..."
        cp .env.example .env
        print_warn "Please update .env with your actual values"
        return 1
    fi
    
    docker-compose up -d
    print_info "Development environment started!"
    print_info "App available at: http://localhost:3000"
}

# Stop development environment
dev_down() {
    print_info "Stopping development environment..."
    cd "$PROJECT_ROOT"
    docker-compose down
    print_info "Development environment stopped!"
}

# View logs
dev_logs() {
    cd "$PROJECT_ROOT"
    docker-compose logs -f teefinder
}

# Push to Artifact Registry
push_image() {
    local project_id="${1:-}"
    local tag="${2:-latest}"
    local region="${3:-eu}"
    
    if [ -z "$project_id" ]; then
        print_error "Project ID is required"
        echo "Usage: $0 push <project_id> [tag] [region]"
        return 1
    fi
    
    print_info "Authenticating Docker with Artifact Registry..."
    gcloud auth configure-docker ${region}-docker.pkg.dev
    
    local registry_url="${region}-docker.pkg.dev/${project_id}/teefinder-docker-repo/teefinder-app:${tag}"
    
    print_info "Tagging image: $registry_url"
    docker tag teefinder-app:$tag $registry_url
    
    print_info "Pushing to Artifact Registry..."
    docker push $registry_url
    
    print_info "Push complete!"
    echo "Image URL: $registry_url"
}

# Clean up Docker resources
cleanup() {
    local all="${1:-}"
    
    if [ "$all" == "--all" ]; then
        print_warn "Removing all Docker resources (containers, images, volumes)..."
        docker system prune -af --volumes
    else
        print_info "Removing stopped containers and dangling images..."
        docker system prune -f
    fi
    print_info "Cleanup complete!"
}

# Main script logic
main() {
    local command="${1:-help}"
    
    case "$command" in
        build)
            build_image "${2:-latest}"
            ;;
        dev-up)
            dev_up
            ;;
        dev-down)
            dev_down
            ;;
        dev-logs)
            dev_logs
            ;;
        push)
            push_image "$2" "${3:-latest}" "${4:-eu}"
            ;;
        clean)
            cleanup "$2"
            ;;
        help|--help|-h)
            show_usage
            ;;
        *)
            print_error "Unknown command: $command"
            show_usage
            exit 1
            ;;
    esac
}

main "$@"

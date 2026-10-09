#!/bin/bash
#
# Teefinder DevOps - Terraform helper script
# Usage: ./scripts/terraform.sh [command] [environment] [options]
#

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
TF_DIR="$PROJECT_ROOT/terraform"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v terraform &> /dev/null; then
        print_error "Terraform is not installed"
        exit 1
    fi
    
    if ! command -v gcloud &> /dev/null; then
        print_error "Google Cloud SDK is not installed"
        exit 1
    fi
    
    print_info "Prerequisites check passed"
}

# Initialize Terraform
init_terraform() {
    print_step "Initializing Terraform..."
    cd "$TF_DIR"
    terraform init -upgrade
    print_info "Terraform initialization complete!"
}

# Validate configuration
validate_config() {
    print_step "Validating Terraform configuration..."
    cd "$TF_DIR"
    terraform validate
    print_info "Configuration is valid!"
}

# Plan changes
plan_changes() {
    local env="${1:-dev}"
    local tfvars_file="$TF_DIR/${env}.tfvars"
    
    if [ ! -f "$tfvars_file" ]; then
        print_error "Environment file not found: $tfvars_file"
        return 1
    fi
    
    print_step "Planning infrastructure changes for environment: $env"
    cd "$TF_DIR"
    
    local tfplan_file="tfplan.${env}"
    terraform plan -var-file="$tfvars_file" -out="$tfplan_file"
    
    print_info "Plan saved to: $tfplan_file"
    print_warn "Review the plan carefully before applying!"
}

# Apply changes
apply_changes() {
    local env="${1:-dev}"
    local tfplan_file="$TF_DIR/tfplan.${env}"
    local auto_approve="${2:-}"
    
    if [ ! -f "$tfplan_file" ] && [ "$auto_approve" != "--auto-approve" ]; then
        print_error "Plan file not found: $tfplan_file"
        print_info "Run 'terraform.sh plan $env' first"
        return 1
    fi
    
    print_warn "Applying infrastructure changes for environment: $env"
    cd "$TF_DIR"
    
    if [ "$auto_approve" == "--auto-approve" ]; then
        local tfvars_file="$TF_DIR/${env}.tfvars"
        print_warn "Auto-approve is enabled. Proceeding without manual confirmation."
        terraform apply -var-file="$tfvars_file" -auto-approve
    else
        if [ -f "$tfplan_file" ]; then
            terraform apply "$tfplan_file"
        else
            local tfvars_file="$TF_DIR/${env}.tfvars"
            terraform apply -var-file="$tfvars_file"
        fi
    fi
    
    print_info "Apply complete!"
}

# Destroy resources
destroy_resources() {
    local env="${1:-dev}"
    local tfvars_file="$TF_DIR/${env}.tfvars"
    local auto_approve="${2:-}"
    
    if [ ! -f "$tfvars_file" ]; then
        print_error "Environment file not found: $tfvars_file"
        return 1
    fi
    
    print_error "WARNING: This will destroy all resources for environment: $env"
    
    if [ "$auto_approve" != "--auto-approve" ]; then
        read -p "Type '${env}-destroy' to confirm: " confirmation
        if [ "$confirmation" != "${env}-destroy" ]; then
            print_info "Destroy cancelled"
            return 0
        fi
    fi
    
    print_step "Destroying infrastructure for environment: $env"
    cd "$TF_DIR"
    terraform destroy -var-file="$tfvars_file" $([ "$auto_approve" == "--auto-approve" ] && echo "-auto-approve" || echo "")
    print_info "Destroy complete!"
}

# Show outputs
show_outputs() {
    local env="${1:-dev}"
    
    print_info "Terraform outputs for environment: $env"
    cd "$TF_DIR"
    terraform output -json 2>/dev/null | jq . || terraform output
}

# Manage state
manage_state() {
    local action="${1:-list}"
    shift
    
    cd "$TF_DIR"
    
    case "$action" in
        list)
            print_info "Terraform state resources:"
            terraform state list
            ;;
        show)
            if [ -z "$1" ]; then
                print_error "Resource name required"
                return 1
            fi
            terraform state show "$1"
            ;;
        rm)
            if [ -z "$1" ]; then
                print_error "Resource name required"
                return 1
            fi
            print_warn "Removing from state: $1"
            terraform state rm "$1"
            ;;
        *)
            print_error "Unknown state command: $action"
            return 1
            ;;
    esac
}

# Format Terraform files
format_files() {
    print_step "Formatting Terraform files..."
    cd "$TF_DIR"
    terraform fmt -recursive .
    print_info "Formatting complete!"
}

# Main script logic
main() {
    local command="${1:-help}"
    
    case "$command" in
        init)
            check_prerequisites
            init_terraform
            ;;
        validate)
            check_prerequisites
            validate_config
            ;;
        plan)
            check_prerequisites
            plan_changes "$2"
            ;;
        apply)
            check_prerequisites
            apply_changes "$2" "$3"
            ;;
        destroy)
            check_prerequisites
            destroy_resources "$2" "$3"
            ;;
        output)
            check_prerequisites
            show_outputs "$2"
            ;;
        state)
            check_prerequisites
            manage_state "$2" "$3"
            ;;
        fmt)
            check_prerequisites
            format_files
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

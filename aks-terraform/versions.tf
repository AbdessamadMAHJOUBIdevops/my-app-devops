terraform {
  required_version = ">= 0.14"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.46.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0.2"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0.3"
    }
  }
}

provider "azurerm" {
  features {}
}

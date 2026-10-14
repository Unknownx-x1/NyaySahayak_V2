<#
.SYNOPSIS
    NyaySahayak 2.0 — Windows PowerShell Development Helper Script

.EXAMPLE
    .\scripts\dev.ps1 infra-up
    .\scripts\dev.ps1 api-dev
    .\scripts\dev.ps1 api-test
    .\scripts\dev.ps1 web-build
#>

param (
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet("infra-up", "infra-down", "api-install", "api-migrate", "api-dev", "api-test", "api-lint", "web-install", "web-dev", "web-build", "test")]
    [string]$Command
)

$ErrorActionPreference = "Stop"
$RootDir = Split-Path -Parent $PSScriptRoot

switch ($Command) {
    "infra-up" {
        Write-Host "Starting local infrastructure via Docker Compose..." -ForegroundColor Cyan
        docker compose -f "$RootDir\infra\docker-compose.yml" up -d
    }
    "infra-down" {
        Write-Host "Stopping local infrastructure..." -ForegroundColor Yellow
        docker compose -f "$RootDir\infra\docker-compose.yml" down
    }
    "api-install" {
        Write-Host "Installing Python dependencies..." -ForegroundColor Cyan
        python -m pip install -r "$RootDir\apps\api\requirements.txt"
    }
    "api-migrate" {
        Write-Host "Running Alembic migrations..." -ForegroundColor Cyan
        Push-Location "$RootDir\apps\api"
        try { alembic upgrade head } finally { Pop-Location }
    }
    "api-dev" {
        Write-Host "Starting FastAPI development server on port 8000..." -ForegroundColor Green
        Push-Location "$RootDir\apps\api"
        try { python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload } finally { Pop-Location }
    }
    "api-test" {
        Write-Host "Running backend pytest test suite..." -ForegroundColor Cyan
        Push-Location "$RootDir\apps\api"
        try { python -m pytest tests/ -v } finally { Pop-Location }
    }
    "api-lint" {
        Write-Host "Running Ruff lint and format check..." -ForegroundColor Cyan
        python -m ruff check "$RootDir\apps\api"
        python -m ruff format --check "$RootDir\apps\api"
    }
    "web-install" {
        Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
        Push-Location "$RootDir\apps\web"
        try { npm install } finally { Pop-Location }
    }
    "web-dev" {
        Write-Host "Starting Next.js development server on port 3000..." -ForegroundColor Green
        Push-Location "$RootDir\apps\web"
        try { npm run dev } finally { Pop-Location }
    }
    "web-build" {
        Write-Host "Building Next.js for production..." -ForegroundColor Cyan
        Push-Location "$RootDir\apps\web"
        try { npm run build } finally { Pop-Location }
    }
    "test" {
        Write-Host "Running full test suite..." -ForegroundColor Cyan
        Push-Location "$RootDir\apps\api"
        try { python -m pytest tests/ -v } finally { Pop-Location }
        Push-Location "$RootDir\apps\web"
        try { npm run build } finally { Pop-Location }
    }
}

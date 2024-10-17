#!/bin/bash
set -e

# Print a message indicating the script is starting
echo "Starting entrypoint script..."

# Check if manage.py exists
if [ ! -f manage.py ]; then
    echo "Error: manage.py not found! Please ensure you are in the correct directory."
    exit 1
fi

# Run Django migrations
echo "Running Django migrations..."
if ! python manage.py makemigrations; then
    echo "Error: Failed to create migrations."
    exit 1
fi

if ! python manage.py migrate; then
    echo "Error: Migration failed."
    exit 1
fi

# Collect static files (if applicable)
echo "Collecting static files..."
if ! python manage.py collectstatic --noinput; then
    echo "Error: Failed to collect static files."
    exit 1
fi

# Start Gunicorn server
echo "Starting Gunicorn Server..."
exec gunicorn hires.wsgi:application --bind 0.0.0.0:8000

#!/bin/sh

# entrypoint.sh

# Run Django migrations
echo "Running migrations..."    
python manage.py makemigrations

python manage.py migrate

# Collect static files (if applicable)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn Server..."
exec gunicorn hires.wsgi:application --bind 0.0.0.0:8000

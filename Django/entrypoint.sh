# #!/bin/bash

# # entrypoint.sh

# # Run Django migrations
# echo "Running migrations..."    
# python manage.py makemigrations

# python manage.py migrate

# # Collect static files (if applicable)
# echo "Collecting static files..."
# python manage.py collectstatic --noinput

# # Start Gunicorn
# echo "Starting Gunicorn Server..."
# exec gunicorn hires.wsgi:application --bind 0.0.0.0:8000

#!/bin/bash
set -e

# Print a message indicating the script is starting
echo "Starting entrypoint script..."

# Check if manage.py exists
if [ ! -f manage.py ]; then
    echo "manage.py not found! Please ensure you are in the correct directory."
    exit 1
fi

# Run Django migrations
echo "Running Django migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files (if applicable)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn server
echo "Starting Gunicorn Server..."
exec gunicorn hires.wsgi:application --bind 0.0.0.0:8000

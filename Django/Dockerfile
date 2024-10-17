# backend/Dockerfile
FROM python:3.12

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    dos2unix \  # Install dos2unix to convert line endings
    && apt-get clean

WORKDIR /hires

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Convert line endings of entrypoint.sh to Unix style
RUN dos2unix /entrypoint.sh

# Ensure the script is executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint to the script
ENTRYPOINT ["/entrypoint.sh"]

#CMD ["gunicorn", "app.wsgi:application", "--bind", "0.0.0.0:8000"]

# Use the official Python 3.12 image as a base
FROM python:3.12

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Set the working directory
WORKDIR /hires

# Copy the requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt  # Use --no-cache-dir to save space

# Copy the rest of the application code
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh  # Make the entrypoint script executable

# Set the entrypoint to the script
ENTRYPOINT ["/hires/entrypoint.sh"]

# The default command to run (can be overridden)
#CMD ["gunicorn", "hires.wsgi:application", "--bind", "0.0.0.0:8000"]

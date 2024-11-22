# Specify the base image
FROM python:3.12

# Install dependencies and tools
RUN apt-get update && \
    apt-get install -y \
    curl \
    wget \
    vim \
    dos2unix && \
    apt-get clean

# Set the working directory
WORKDIR /hires

EXPOSE 8000

# Copy the requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Copy and set up the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

# Set the entrypoint to the script
ENTRYPOINT ["/entrypoint.sh"]

# Specify the command to run the application
#CMD ["gunicorn", "app.wsgi:application", "--bind", "0.0.0.0:8000"]

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Use the specific Git plugin steps instead
                git url: 'https://github.com/sanganishubham426/hires_docker_jenkins.git', branch: 'main'
            }
        }

        stage('Check Docker Version') {
            steps {
                script {
                    bat 'docker --version'
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    try {
                        bat 'docker-compose -f docker-compose.yml up -d'
                    } catch (Exception e) {
                        echo "Build failed: ${e}"
                        error("Stopping the pipeline due to build failure.")
                    }
                }
            }
        }

        stage('Post-deployment') {
            steps {
                echo 'Deployment completed!'
            }
        }
    }

}

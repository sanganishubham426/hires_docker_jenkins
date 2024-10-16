pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', branch: 'main', url: 'https://github.com/sanganishubham426/hires_docker_jenkins.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d --build'
                }
            }
        }

        stage('Post-deployment') {
            steps {
                echo 'Deployment completed!'
            }
        }
    }

    post {
        always {
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}

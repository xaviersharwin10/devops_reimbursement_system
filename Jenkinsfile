
pipeline {
    agent any
    
    stages {
        stage('Pull Docker image') {
            steps {
                script {
                    // Pull the Docker image from Docker Hub
                    docker.image('sharwinrmsa/devops:frontend').pull()
                }
            }
        }
        
        stage('Run Backend') {
            steps {
                script {
                    // Run the Docker container
                    docker.image('sharwinrmsa/devops:frontend').run('--rm -d -p 3000:3000 sharwinrmsa/devops:frontend')
                }
            }
        }
    }
    
    // post {
    //     always {
    //         // Clean up - stop and remove the Docker container
    //         script {
    //             docker.image('myusername/myrepository:latest').stop()
    //             docker.image('myusername/myrepository:latest').remove()
    //         }
    //     }
    // }
}

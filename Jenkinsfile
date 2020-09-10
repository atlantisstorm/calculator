pipeline {
    agent any
    environment {
        NEW_VERSION = "1.0.1"
        SERVER_CREDENTIALS = credentials('atlantisstorm-github')
    }
    parameters {
        string(name: 'VERSION', defaultVaule: '', description: 'Version')
        choice(name: 'VERSIONS', choices: ["1.0.0", "2.0.0", "3.0.0"], description: 'Take your pick!')
        booleanParam(name: "SAYWHAT", defaultVaule: true, description: 'Say something')
    }
    stages {
        stage("build") {
            steps {
                echo "building applcation with version number ${NEW_VERSION}"
                sh "npm install"
            }
        }
        stage("saySomething") {
            when {
                expression {
                    params.SAYWHAT == true
                }
            }
            steps {
                echo "fishbone is redhot, just saying!"
            }
        }
        stage("test") {
            when {
                expression {
                    BRANCH_NAME == "dev"
                }
            }
            steps {
                echo "testing applcation BRANCH_NAME==${BRANCH_NAME} SERVER_CREDENTIALS==${SERVER_CREDENTIALS}"
                sh "git checkout ${BRANCH_NAME}"
                sh "npm run test:unwatched"
            }
        }
        stage("build docker image") {
            steps {
                echo "testing applcation"
                //sh "npm run test"
            }
        }
        stage("upload docker image") {
            steps {
                echo "testing applcation"
                //sh "npm run test"
            }
        }        
        stage("deploy") {
            steps {
                echo "deploying applcation VERSION==${params.VERSIONS}"
                withCredentials([
                    usernamePassword(credentials: 'atlantisstorm-github', usernameVariable: USER, passwordVariable: PWD)
                ]) {
                    echo "Deploying with github credentials USER==${USER}, PWD==${PWD}"
                }
            }
        }
    }
    post {
        always {
            echo "toujours gai, le diable est mort!"
        }
        success {
            echo "All good, woop! woop! "
        }
        failure {
            echo "We'll never see this message! :p ;)"
        }
    }
}
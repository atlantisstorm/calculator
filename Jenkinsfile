def gv

pipeline {
    agent any
    environment {
        NEW_VERSION = "1.0.1"
        SERVER_CREDENTIALS = credentials('atlantisstorm-github')
    }
    parameters {
        string(name: 'VERSION', defaultValue: '', description: 'Version')
        choice(name: 'VERSIONS', choices: ["1.0.0", "2.0.0", "3.0.0"], description: 'Take your pick!')
        booleanParam(name: "SAYWHAT", defaultValue: true, description: 'Say something')
    }
    stages {
        stage("init") {
            steps {
                script {
                    gv = load "script.groovy"
                }
            }
        }
        stage("build") {
            steps {
                echo "building applcation with version number ${NEW_VERSION}"
                script {
                    gv.greeting()
                }
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
                script {
                    gv.greetingsFromTest()
                }
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
                script {
                    gv.greetingsFromDeploy()
                }
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
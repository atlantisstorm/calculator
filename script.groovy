def greetings() {
    echo "hello moto!"
}

def greetingsFromTest() {
    echo "hello testing moto!"
    echo "testing applcation BRANCH_NAME==${BRANCH_NAME} SERVER_CREDENTIALS==${SERVER_CREDENTIALS}"
}

def greetingsFromDeploy() {
    echo "hello deploy moto!"
    echo "deploying applcation VERSION==${params.VERSIONS}"
}

return this
class Service {
  handle(err: Error | string = 'Something went wrong') {
    console.log(err)
  }
}

const ErrorService = new Service()
export default ErrorService

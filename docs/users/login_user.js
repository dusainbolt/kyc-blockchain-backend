module.exports = {
  post:{
      tags:['Users'],
      summary: "User Login",
      operationId: "Login",
      parameters:[],
      requestBody: {
          content:{
              'application/json': {
                  schema:{
                      $ref:'#/components/schemas/UserLogin'
                  }
              }
          }
      },
      responses:{
          '200':{
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserResponse",
                },
              },
            },
          },
          '500':{
              description: 'Server error'
          }
      },
  }
}
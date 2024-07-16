import { Authcontroller } from "../controller/authController";
import rabbitClient from "./client";


const controller = new Authcontroller()

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log("The operation in user service is", operation, data);

    switch (operation) {
      case "login":
        response = await controller.isAuthenticated.bind(controller)(data,1);
        break;
      case "register":
        response = await controller. verifyToken.bind(controller)(data,1);
        break;
      default:
        response = "Request-key notfound";
        break;
    }
    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}

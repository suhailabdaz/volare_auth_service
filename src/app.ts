import RabbitMQClient from "./rabbitMQ/client"
import express from "express";
import { Application } from "express";
import "dotenv/config";




class App{
  public app: Application;

  constructor(){
    this.app=express()
    this.app.listen(process.env.AUTH_PORT,()=>{
      console.log(`server  http://localhost:${process.env.AUTH_PORT}`);
      
    })
      RabbitMQClient.initialize()
  }
}

export default App
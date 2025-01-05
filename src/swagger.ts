import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerLocalURL = process.env.SWAGGER_LOCAL_URI


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel-Booking",
      version: "1.0.0",
      description: "Hotel-Booking API Documentation",
    },
    servers: [
      {
        url: swaggerLocalURL,
        description: "Local Server",
      },
    ],
    components: {
      
    },
    security: []
  },
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpecs = swaggerJsDoc(options);

export default swaggerSpecs;

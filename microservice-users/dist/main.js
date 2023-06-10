"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("./common/constants");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.AMQP_URL],
            queue: constants_1.RabbitMQ.UserQueue,
        },
    });
    await app.listen();
    console.log('Microservice Users is listening');
}
const logger = new common_1.Logger('NestMicroservice');
bootstrap().then(() => logger.log(`Microservice Users is listening`));
//# sourceMappingURL=main.js.map
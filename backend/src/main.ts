import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;
var passport = require('passport');
var session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var LocalStrategy = require("passport-local");
  const config = new DocumentBuilder()
    .setTitle('Proyecto de Grado')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('category')
    .addTag('estilos-nado')
    .addTag('task')
    .addTag('times')
    .addTag('usuarios')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const passport = require('passport');
  SwaggerModule.setup('api', app, document);
  passport.authenticate('session');
  app.use(session({ secret: 'SECRET' }));
  passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password'
  }, (req, username, password, done) => {
  
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.enableCors();

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

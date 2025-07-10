import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: Number(process.env.THROTTLER_LIMIT),
          ttl: seconds(Number(process.env.THROTTLER_TTL)),
        },
      ],
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

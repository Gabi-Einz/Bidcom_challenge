import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './client/datasource';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (!datasource.isInitialized) {
          await datasource.initialize();
        }

        return {
          ...datasource.options,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

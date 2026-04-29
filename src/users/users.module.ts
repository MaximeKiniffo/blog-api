import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  // forFeature([User]) enregistre le repository User pour injection dans ce module
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  // UsersService est exporté pour être consommé par AuthModule
  exports: [UsersService],
})
export class UsersModule {}

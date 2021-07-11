import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: 'supersecretkey',
                signOptions: {
                    expiresIn: '1000m'
                }
            })
        })
    ],
    providers: [JwtStrategy, AuthService, UserService],
    controllers: [AuthController]
})
export class AuthModule {}

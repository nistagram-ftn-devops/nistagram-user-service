import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: 'supersecretkey',
                signOptions: {
                    expiresIn: '1000m'
                }
            })
        }),
        UserModule
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController]
})
export class AuthModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.types';
import { UserService } from '../user/user.service';

@Controller('user/auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('login')
    async login(@Body() payload: LoginDto) {
        const user = await this.userService.validateLogin(payload)
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }
}

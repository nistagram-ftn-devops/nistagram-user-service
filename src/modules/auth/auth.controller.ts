import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.types';
import { UserService } from '../user/user.service';

@Controller('api/user/auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('login')
    async login(@Body() payload: LoginDto) {
        const user = await this.userService.validateLogin(payload)
        return {
            user: user,
            token: this.authService.getTokenForUser(user)
        }
    }
}

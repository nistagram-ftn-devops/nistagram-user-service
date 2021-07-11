import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.types';
import { UserService } from './user.service';

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

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Request() request) {
        return request.user
    }
}

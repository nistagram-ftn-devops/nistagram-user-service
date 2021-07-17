import { Controller, Get, UseGuards, Request, Param, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { UserRegistrationDto } from "./user.types";

@Controller('user/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async getMyProfile(@Request() request) {
        return request.user
    }

    @Get('profile/:username')
    async getProfile(@Param('username') username: string) {
        return this.userService.findByUsername(username)
    }

    @Post('register')
    async register(@Body() payload: UserRegistrationDto) {
        return this.userService.create(payload)
    }
}
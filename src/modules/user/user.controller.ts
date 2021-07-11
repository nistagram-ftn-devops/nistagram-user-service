import { Controller, Get, UseGuards, Request, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

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
}
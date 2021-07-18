import { Controller, Get, UseGuards, Request, Param, Post, Body, Patch, Put } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./user.entity";
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

    @Put('update')
    async updateProfile(@Body() payload: Partial<User>) {
        return this.userService.update(payload)
    }

    @Get(':id/accept')
    async acceptAgent(@Param('id') id: string) {
        return this.userService.acceptAgent(+id)
    }

    @Get(':id/decline')
    async declineAgent(@Param('id') id: string) {
        return this.userService.declineAgent(+id)
    }

    @Get('agents')
    async getAgents() {
        return this.userService.getAgents()
    }
}
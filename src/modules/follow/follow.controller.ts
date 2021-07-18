import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';

@Controller('user/follow')
export class FollowController {
    constructor(private followService: FollowService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async follow(@Body() payload: Partial<Follow>) {
        return this.followService.follow(payload)
    }

    @Post(':id/accept')
    @UseGuards(AuthGuard('jwt'))
    async acceptFollow(@Param('id') id: string) {
        return this.followService.acceptRequest(+id)
    }

    @Post(':id/decline')
    @UseGuards(AuthGuard('jwt'))
    async declineFollow(@Param('id') id: string) {
        return this.followService.declineRequest(+id)
    }

    @Get('requests')
    @UseGuards(AuthGuard('jwt'))
    async getFollowRequests(@Request() request) {
        return this.followService.getFollowRequests(request.user.id)
    }
}

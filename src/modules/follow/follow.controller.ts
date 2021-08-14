import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';

@Controller('api/user/follow')
export class FollowController {
    constructor(private followService: FollowService) {}

    @Post()
    async follow(@Body() payload: Partial<Follow>) {
        return this.followService.follow(payload)
    }

    @Post(':id/accept')
    async acceptFollow(@Param('id') id: string) {
        return this.followService.acceptRequest(+id)
    }

    @Post(':id/decline')
    async declineFollow(@Param('id') id: string) {
        return this.followService.declineRequest(+id)
    }

    @Get('requests/:id')
    async getFollowRequests(@Param('id') id: string) {
        return this.followService.getFollowRequests(+id)
    }

    @Post('do-i-follow')
    async doIFollow(@Body() payload: { me: number, user: number }) {
        return this.followService.doIFollow(payload)
    }
}

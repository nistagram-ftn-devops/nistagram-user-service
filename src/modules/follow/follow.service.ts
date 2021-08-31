import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Follow } from './follow.entity';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(FollowRepository) 
        private followRepository: FollowRepository, 
        private userUservice: UserService
    ) {}

    async findById(id: number) {
        const found = await this.followRepository.findOne({ id })
        if (!found) throw new NotFoundException('follow-not-found')
        return found
    }

    findByFollowerAndFollowee(followerId: number, followeeId: number) {
        return this.followRepository.findOne({ followerId, followeeId })
    }

    async follow(payload: Partial<Follow>) {
        const userFollower = await this.userUservice.findById(payload.followerId)
        const userFollowee = await this.userUservice.findById(payload.followeeId)

        if (userFollowee.id === userFollower.id) throw new BadRequestException('cant-follow-yourself')
        
        const found = await this.findByFollowerAndFollowee(payload.followerId, payload.followeeId)
        if (found) throw new BadRequestException('follow-exists')

        if (userFollowee.isPublic) {
            payload.accepted = true
            payload.activeRequest = false
        } else {
            payload.accepted = false
            payload.activeRequest = true
        }
        
        return this.followRepository.save(payload)
    }

    async acceptRequest(id: number) {
        const request = await this.findById(id)

        if (!request.activeRequest) throw new BadRequestException('request-not-active') 

        request.accepted = true
        request.activeRequest = false
        return this.followRepository.save(request)
    }

    async declineRequest(id: number) {
        const request = await this.findById(id)

        if (!request.activeRequest) throw new BadRequestException('request-not-active') 

        request.accepted = false
        request.activeRequest = false
        return this.followRepository.save(request)
    }

    async getFollowRequests(userId: number) {
        return this.followRepository.find({ followeeId: userId, activeRequest: true })
    }

    async doIFollow(payload: { me: number, user: number }) {
        return this.followRepository.find({ followerId: payload.me, followeeId: payload.user, accepted: true })
    }

    async getUserFollowing(usedId: number) {
        return this.followRepository.find({ followerId: usedId, accepted: true })
    }
}

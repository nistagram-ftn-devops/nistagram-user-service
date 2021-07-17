import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "../auth/auth.types";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async findById(id: number) {
        const found = await this.userRepository.findOne({ id })
        if (!found) throw new NotFoundException('user-not-found')
        return found
    }

    async validateLogin(payload: LoginDto) {
        const found = await this.userRepository.findOne({ ...payload })
        if (!found) throw new NotFoundException('user-not-found')
        return found
    }

    async findByUsername(username: string) {
        const found = await this.userRepository.findOne({ username })
        if (!found) throw new NotFoundException('user-not-found')
        return found
    }

    async create(payload: Partial<User>) {
        const found = await this.userRepository.findOne({ username: payload.username })
        if (found) throw new BadRequestException('user-exists')
        
        const user = new User()
        user.username = payload.username
        user.password = payload.password
        user.name = payload.name
        user.email = payload.email
        user.phoneNum = payload.phoneNum
        user.dateOfBirth = payload.dateOfBirth
        user.website = payload.website
        user.biography = payload.biography

        return this.userRepository.save(user)
    }

    async update(payload: Partial<User>) {
        const user = await this.findByUsername(payload.username)        
        user.password = payload.password
        user.name = payload.name
        user.email = payload.email
        user.phoneNum = payload.phoneNum
        user.dateOfBirth = payload.dateOfBirth
        user.website = payload.website
        user.biography = payload.biography

        return this.userRepository.save(user)
    }
}
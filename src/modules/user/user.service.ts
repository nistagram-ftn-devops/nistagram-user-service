import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "../auth/auth.types";
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
}
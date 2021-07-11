import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    public getTokenForUser(user: User): string {
        return this.jwtService.sign({
            username: user.username,
            sub: user.id,
        })
    }
}

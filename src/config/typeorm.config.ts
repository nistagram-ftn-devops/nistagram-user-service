import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'NistagramUserServiceDb',
    entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
    synchronize: true,
}

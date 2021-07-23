import { EntityRepository, Repository } from "typeorm";
import { Follow } from "./follow.entity";

@EntityRepository()
export class FollowRepository extends Repository<Follow> {

}
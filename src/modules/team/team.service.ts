import { Injectable } from '@nestjs/common';
import { Team, TeamMember, TeamUserRole, User } from '../user/user.entity';
import { File } from '../file/file.entity';
import { MissingTeamException } from './exceptions/missingTeam.exception';
import { getModelForClass } from "@typegoose/typegoose";

@Injectable()
export class TeamService {

  public async createTeam(user: User, teamName: string, image: File) {

    // create team
    const TeamModel = getModelForClass(Team);
    const teamData = { name: teamName } as any;
    teamData.image = image;
    const team = new TeamModel(teamData);

    // create team admin
    const TeamUserModel = getModelForClass(TeamMember);
    const teamAdmin = new TeamUserModel({
      role: TeamUserRole.ADMIN,
      user: user
    });
    team.members = [teamAdmin];

    return team.save();

  }

  public async getTeam(teamId: string): Promise<Team> {

    const TeamModel = getModelForClass(Team);
    return await TeamModel.findById(teamId);

  }

  public async isUserInTeam(userId: string, teamId: string) {
    const TeamModel = getModelForClass(Team);
    const team = await TeamModel.findOne({ _id: teamId, 'members.user': userId, deleted: false });
    if (!team) return null;
    const teamMember = team.members.filter(member => String(member.user) === String(userId))[0];
    return teamMember;
  }

}

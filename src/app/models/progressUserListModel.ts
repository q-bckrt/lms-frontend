import {progressPerUser} from './progressPerUser';


export interface progressUserListModel {
  username: string;
  progressPerUserDtoList: progressPerUser[];
}

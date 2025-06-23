import {userModel} from './userModel';

export interface classOverviewModel {
  id: number;
  title: string;
  courseTitle: string;
  coaches: userModel[];
  students: userModel[];
}

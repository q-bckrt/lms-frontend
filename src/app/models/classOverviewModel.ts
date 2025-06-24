import {userModel} from './userModel';

export interface classOverviewModel {
  id: number;
  title: string;
  courseId: number;
  courseTitle: string;
  coaches: userModel[];
  students: userModel[];
}

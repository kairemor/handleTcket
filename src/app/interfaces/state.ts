import { SortDirection } from '../directives/user.directive';

export interface State {
   page: number;
   pageSize: number;
   searchTerm: string;
   sortColumn: string;
   sortDirection: SortDirection;
 }

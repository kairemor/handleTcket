import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser } from 'src/app/modals/add-user';
import { UserDirective } from 'src/app/directives/user.directive';
import { UserService } from 'src/app/services/user.service';
import { SortEvent } from 'src/app/interfaces/sort-event';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<AddUser[]>;
  total$: Observable<number>;

  @ViewChildren(UserDirective) headers: QueryList<UserDirective>;

  constructor(private service: UserService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
   }

   onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit() {
  }

}

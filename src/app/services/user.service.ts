import { Injectable, PipeTransform } from '@angular/core';
import { AddUser } from '../modals/add-user';
import { State } from '../interfaces/state';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { USERS } from '../modals/users';
import { SortDirection } from '../directives/demande.directive';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';

interface SearchResult {
  users: AddUser[];
  total: number;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(users: AddUser[], column: string, direction: string): AddUser[] {
  if (direction === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: AddUser, term: string, pipe: PipeTransform) {
  return user.firstName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
   || user.lastName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
   || user.email.toLocaleLowerCase().includes(term.toLocaleLowerCase())
   || user.service.toLocaleLowerCase().includes(term.toLocaleLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
 // tslint:disable-next-line: variable-name
 private _loading$ = new BehaviorSubject<boolean>(true);
 // tslint:disable-next-line: variable-name
 private _search$ = new Subject<void>();
 // tslint:disable-next-line: variable-name
 private _users$ = new BehaviorSubject<AddUser[]>([]);
 // tslint:disable-next-line: variable-name
 private _total$ = new BehaviorSubject<number>(0);

 // tslint:disable-next-line: variable-name
 private _state: State = {
   page: 1,
   pageSize: 10,
   searchTerm: '',
   sortColumn: '',
   sortDirection: ''
 };
  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._users$.next(result.users);
      this._total$.next(result.total);
    });

    this._search$.next();
   }

   get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) { this._set({page}); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) { this._set({pageSize}); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let users = sort(USERS, sortColumn, sortDirection);

    // 2. filter
    users = users.filter(user => matches(user, searchTerm, this.pipe));
    const total = users.length;

    // 3. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }
}

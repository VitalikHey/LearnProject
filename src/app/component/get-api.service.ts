// Import { Injectable } from '@angular/core';
// Import {catchError, map, Observable, of} from 'rxjs';
// Import { HttpClient } from '@angular/common/http';
// Import {Address, User} from './common.types';
//
// @Injectable()
// Export class GetApiService {
//   Private readonly url: string = 'http://localhost:3000/users';
//
//   Constructor(private readonly http: HttpClient) {}
//
//   Public getUsers(): Observable<User[]> {
//     Return this.http.get<User[]>(this.url).pipe(
//       Map((users: User[]) =>
//         Users.map((user: User) => new User(user.id, user.name, user.email, new Address(user.address.id, user.address.street, user.address.homeNumber))),
//       ),
//       CatchError((err: unknown) => {
//         Console.error('Error occurred: ', err);
//         Return of([]);
//       }),
//     );
//   }
// }

import { Injectable } from "@angular/core";
import { ISession } from "../shared";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class voterService {
    
    constructor (private http: HttpClient) {}

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url).pipe(catchError(this.handleError('deleteVoter'))).subscribe();
    }

    addVoter (eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        const options = { headers: new HttpHeaders({'Content-Type': '/application/json'})};
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.post(url, {}, options).pipe(catchError(this.handleError('addVoter'))).subscribe();
    }

    userHasVoted (session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error)
          return of(result as T)
        }
      }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment as env } from '@env/environment';
import { Profile } from '../models/profile.model';
import { Skill } from '../models/skill.model';
import { ServiceOffering } from '../models/service-offering.model';
import { Education } from '../models/education.model';
import { Project } from '../models/project.model';

/**
 * Reads portfolio content (profile, skills, services) from the FastAPI
 * backend, which serves it out of MongoDB (see backend/seed_profile.py
 * in the Mongo db profile repo). Each getter is cached for the lifetime of
 * the app (shareReplay) since content only changes via a redeploy/reseed —
 * this matters here because the home page re-subscribes on every tab switch.
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private profile$?: Observable<Profile>;
  private skills$?: Observable<Skill[]>;
  private services$?: Observable<ServiceOffering[]>;
  private education$?: Observable<Education[]>;
  private projects$?: Observable<Project[]>;

  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<Profile> {
    this.profile$ ??= this.http.get<Profile>(`${env.chatApiUrl}/profile`).pipe(shareReplay(1));
    return this.profile$;
  }

  getSkills(): Observable<Skill[]> {
    this.skills$ ??= this.http.get<Skill[]>(`${env.chatApiUrl}/skills`).pipe(shareReplay(1));
    return this.skills$;
  }

  getServices(): Observable<ServiceOffering[]> {
    this.services$ ??= this.http.get<ServiceOffering[]>(`${env.chatApiUrl}/services`).pipe(shareReplay(1));
    return this.services$;
  }

  getEducation(): Observable<Education[]> {
    this.education$ ??= this.http.get<Education[]>(`${env.chatApiUrl}/education`).pipe(shareReplay(1));
    return this.education$;
  }

  getProjects(): Observable<Project[]> {
    this.projects$ ??= this.http.get<Project[]>(`${env.chatApiUrl}/projects`).pipe(shareReplay(1));
    return this.projects$;
  }
}

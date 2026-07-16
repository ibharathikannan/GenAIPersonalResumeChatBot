import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '@app/shared/models/profile.model';
import { Skill } from '@app/shared/models/skill.model';
import { ServiceOffering } from '@app/shared/models/service-offering.model';
import { Education } from '@app/shared/models/education.model';
import { Project } from '@app/shared/models/project.model';
import { PortfolioService } from '@app/shared/services/portfolio.service';
import { ChatUiService } from '@app/shared/services/chat-ui.service';

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export type ContentTab = 'education' | 'skills' | 'projects' | 'services';

@Component({
  selector: 'eus-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {
  profile$: Observable<Profile>;
  skills$: Observable<Skill[]>;
  skillGroups$: Observable<SkillGroup[]>;
  services$: Observable<ServiceOffering[]>;
  education$: Observable<Education[]>;
  projects$: Observable<Project[]>;
  year = new Date().getFullYear();

  activeTab: ContentTab = 'education';

  constructor(private readonly portfolioService: PortfolioService, private readonly chatUi: ChatUiService) {}

  ngOnInit(): void {
    this.profile$ = this.portfolioService.getProfile();
    this.skills$ = this.portfolioService.getSkills();
    this.services$ = this.portfolioService.getServices();
    this.education$ = this.portfolioService.getEducation();
    this.projects$ = this.portfolioService.getProjects();

    this.skillGroups$ = this.skills$.pipe(
      map(skills => {
        const order: string[] = [];
        const byCategory = new Map<string, Skill[]>();
        for (const skill of skills) {
          if (!byCategory.has(skill.category)) {
            byCategory.set(skill.category, []);
            order.push(skill.category);
          }
          byCategory.get(skill.category)!.push(skill);
        }
        return order.map(category => ({ category, skills: byCategory.get(category)! }));
      })
    );
  }

  setTab(tab: ContentTab): void {
    this.activeTab = tab;
  }

  openChat(): void {
    this.chatUi.requestOpen();
  }
}

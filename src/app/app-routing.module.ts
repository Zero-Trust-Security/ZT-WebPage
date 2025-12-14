import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { AboutUsComponent } from './company/about-us/about-us.component';
import { OurTeamComponent } from './company/our-team/our-team.component';
import { UEBAComponent } from './Features/ueba/ueba.component';
import { RealTimeMonitoringComponent } from './Features/real-time-monitoring/real-time-monitoring.component';
import { MitreAttackComponent } from './Features/mitre-attack/mitre-attack.component';
import { DashboardSystemComponent } from './Features/dashboard-system/dashboard-system.component';
import { AutomatedResponseComponent } from './Features/automated-response/automated-response.component';
import { AiMlDetectionComponent } from './Features/ai-ml-detection/ai-ml-detection.component';

const routes: Routes = [
   {
    path: '',
    component: homeComponent,
  },
  {
    path: '',
    component: HeaderComponent
  },
  {
    path: '',
    component: FooterComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'our-team',
    component: OurTeamComponent
  },
  {
    path: 'ueba',
    component: UEBAComponent
  },
  {
    path: 'real-time-monitoring',
    component: RealTimeMonitoringComponent
  },
  {
    path: 'mitre-attck',
    component: MitreAttackComponent
  },
  {
    path: 'dashboard-system',
    component: DashboardSystemComponent
  },
  {
    path: 'automated-response',
    component: AutomatedResponseComponent
  },
  {
    path: 'ai-ml-detection',
    component: AiMlDetectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


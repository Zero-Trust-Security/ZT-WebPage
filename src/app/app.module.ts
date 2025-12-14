import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { homeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { AboutUsComponent } from './company/about-us/about-us.component';
import { OurTeamComponent } from './company/our-team/our-team.component';
import { RealTimeMonitoringComponent } from './Features/real-time-monitoring/real-time-monitoring.component';
import { AiMlDetectionComponent } from './Features/ai-ml-detection/ai-ml-detection.component';
import { UEBAComponent } from './Features/ueba/ueba.component';
import { AutomatedResponseComponent } from './Features/automated-response/automated-response.component';
import { MitreAttackComponent } from './Features/mitre-attack/mitre-attack.component';
import { DashboardSystemComponent } from './Features/dashboard-system/dashboard-system.component';
@NgModule({
  declarations: [
    AppComponent,
    homeComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    BlogComponent,
    AboutUsComponent,
    OurTeamComponent,
    RealTimeMonitoringComponent,
    AiMlDetectionComponent,
    UEBAComponent,
    AutomatedResponseComponent,
    MitreAttackComponent,
    DashboardSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

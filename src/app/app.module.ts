import { NgModule } from '@angular/core';
import {
  heroChevronUp,
  heroChevronDown,
  heroSun,
  heroMoon,
} from '@ng-icons/heroicons/outline';
import { ionLogoGithub } from '@ng-icons/ionicons';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { NgIconsModule } from '@ng-icons/core';
import { CrypterComponent } from './components/crypter/crypter.component';
import { SubstitutionTableComponent } from './components/substitution-table/substitution-table.component';
import { SecretKeyFormComponent } from './components/secret-key-form/secret-key-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    CrypterComponent,
    SubstitutionTableComponent,
    SecretKeyFormComponent,
  ],
  imports: [
    BrowserModule,
    NgIconsModule.withIcons({
      heroChevronDown,
      heroChevronUp,
      heroSun,
      heroMoon,
      ionLogoGithub,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

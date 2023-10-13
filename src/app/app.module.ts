import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GenogramDesignerModule } from 'projects/genogram-designer/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GenogramDesignerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

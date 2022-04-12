import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => 
      // import("myAccessAccount/ExposeModule").then((m) => {
      //   console.log(m);
      //   return m.ExposeModule
      // }),
      loadRemoteModule({
        remoteEntry: 'http://localhost:3002/remoteEntry.js',
        exposedModule: 'ExposeModule',
        type: 'module',
      })
        .then(m => {
          console.log(m);
          return m.ExposeModule
        })
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

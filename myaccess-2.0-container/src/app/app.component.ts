import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterViewInit, Component, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {  
  title = 'myaccess-2.0-container';
  @ViewChild('navigation', { read: ViewContainerRef, static: true })
  navigationContainer!: ViewContainerRef;
  constructor( private route: ActivatedRoute, private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private router: Router) {}

  ngAfterViewInit(): void {
    // load footer
    loadRemoteModule({
      remoteEntry: 'http://localhost:3001/remoteEntry.js',
      remoteName: 'navigation',
      exposedModule: 'AppComponent',
    })
      .then(module => {
        const factory = this.resolver.resolveComponentFactory(module.AppComponent);
        // console.log(factory)
        // console.log(this.injector)
        this.navigationContainer?.createComponent(factory, undefined, this.injector)
      });
  }

}

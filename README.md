# gui
GUI module for Archie Beeri application (Angular front-end)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# My notes

## Material design and flexbox
* https://material.angular.io/
* https://material.io/tools/icons/?style=baseline
* https://github.com/angular/flex-layout/wiki/
* https://auth0.com/blog/creating-beautiful-apps-with-angular-material/

## Internationalization (i18n)
https://angular.io/guide/i18n
* mark text in html templates
* ng xi18n
* cp src/messages.xlf src/locale/messages.he.xlf
* add target to each source

## NetBeans integration
* https://jaxenter.com/typescript-angular-2-and-netbeans-ide-an-unbeatable-trio-125443.html
  * Manually install netbeanstypescript-3.0.1.nbm ?
* https://netbeans.org/bugzilla/show_bug.cgi?id=257587

## Development
* ng serve --disableHostCheck
* ng generate component edit-document --module app
* ng build --prod --allowed-common-js-dependencies=url --allowed-common-js-dependencies=file-saver

## New release

* Update version field in pakcage.json to x.y.z
* npm install
* Optionally: upgrade pakcages
* Commit changes. Remark: prepare release archie-beeri-gui-2.4
* Tag: archie-beeri-gui-x.y.z
* Update version field in pakcage.json to x.y.z-SNAPSHOT
* npm install
* Commit changes. Remark: prepare for next development iteration
* ng build --prod
* Local
  * rm -rf /var/www/archie/beeri/*
  * mv dist/archie-beeri-ui/* /var/www/archie/beeri
* Remote
  * aws --profile=beeri s3 sync dist/archie-beeri-ui/ s3://admin.archie-beeri.arinamal.com/ --delete

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
/* import { fakeBackendProvider } from './_helpers/index';
 */
import { AppComponent } from './app.component';
import { routing } from './app.routing';

 import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { EmployesService } from './_services/employes.service';
import { FournisseurService } from './_services/fournisseurs.service';
import { CategorieService } from './_services/categories.service';
import { ArticlesService } from './_services/articles.service';
import { ArticlesComponent } from './articles/articles.component';
import { EmployesComponent } from './employes/employes.component';
import { CategoriesComponent } from './categories/categories.component';
import { StocksComponent } from './stocks/stocks.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { StockService } from './_services/stocks.service';
import {DataTableModule} from 'angular2-datatable';
import { EmployeConsultComponent } from './employes/consult/employe-consult.component';
import { EmployeCreerComponent } from './employes/creer/employe-creer.component';
import { MajMotPasseComponent } from './employes/majMotPasse/majMotPasse.component';
import { CategorieConsultComponent } from './categories/consult/categorie-consult.component';
import { CategorieCreerComponent } from './categories/creer/categorie-creer.component';
import { FournisseurCreerComponent } from './fournisseurs/creer/fournisseur-creer.component';
import { FournisseurConsultComponent } from './fournisseurs/consult/fournisseur-consult.component';
import { ArticleCreerComponent } from './articles/creer/article-creer.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { ArticleConsultComponent } from './articles/consult/article-consult.component';
import { ReferenceService } from './_services/reference.service';
import { StockCreerComponent } from './stocks/creer/stock-creer.component';
import { StockConsultComponent } from './stocks/consult/stock-consult.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CommandesConsultComponent } from './commandes/consult/commandes-consult/commandes-consult.component';
import { CommandesCreerComponent } from './commandes/creer/commandes-creer/commandes-creer.component';
import { CommandesService } from './_services/commandes.service';
import { RayonsCreerComponent } from './rayons/creer/rayons-creer.component';
import { RayonsComponent } from './rayons/rayons.component';
import { RayonsConsultComponent } from './rayons/consult/rayons-consult.component';
import { RayonService } from './_services/rayons.service';
import { AlertModule } from 'angular-x-alerts';
import {NgxMaskModule} from 'ngx-mask';
import { DatePipe } from './_pipe/date.pipe';
import { VenteComponent } from './vente/vente.component';
import { ClavierComponent } from './vente/clavier/clavier.component';
import { EncaisseComponent } from './vente/encaisse/encaisse.component';
import { RuptureComponent } from './stocks/rupture/rupture.component';
import { ListeVentesComponent } from './vente/liste-ventes/liste-ventes.component'
;
import { DetailsVenteComponent } from './vente/liste-ventes/details-vente/details-vente.component'
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        DataTableModule,
        AlertModule,
        NgSelectModule,
        routing,
        BrowserModule, FormsModule, ReactiveFormsModule,

        NgxMaskModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ArticlesComponent,
        ArticleConsultComponent,
        ArticleCreerComponent,
        EmployesComponent,
        EmployeConsultComponent,
        MajMotPasseComponent,
        EmployeCreerComponent,
        CategoriesComponent,
        CategorieConsultComponent,
        CategorieCreerComponent,
        FournisseursComponent,
        FournisseurCreerComponent,
        FournisseurConsultComponent,
        StocksComponent,
        StockCreerComponent,
        StockConsultComponent,
        CommandesComponent,
        CommandesConsultComponent,
        CommandesCreerComponent,
        RayonsCreerComponent,
        RayonsConsultComponent,
        RayonsComponent,
        DatePipe,
        VenteComponent,
        ClavierComponent ,
        EncaisseComponent ,
        RuptureComponent ,
        ListeVentesComponent ,
        DetailsVenteComponent],
    providers: [
        AuthGuard,
        ArticlesService,
        CategorieService,
        CommandesService,
        EmployesService,
        FournisseurService,
        StockService,
        AuthenticationService,
        UserService,
        ReferenceService,
        RayonService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
/*         fakeBackendProvider
 */    ],
    bootstrap: [AppComponent]
})

export class AppModule {}

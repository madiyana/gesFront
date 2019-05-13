import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { EmployesComponent } from './employes/employes.component';
import { EmployeConsultComponent } from './employes/consult/employe-consult.component';
import { EmployeCreerComponent } from './employes/creer/employe-creer.component';
import { MajMotPasseComponent } from './employes/majMotPasse/majMotPasse.component';
import { CategorieConsultComponent } from './categories/consult/categorie-consult.component';
import { CategorieCreerComponent } from './categories/creer/categorie-creer.component';
import { FournisseurCreerComponent } from './fournisseurs/creer/fournisseur-creer.component';
import { FournisseurConsultComponent } from './fournisseurs/consult/fournisseur-consult.component';
import { ArticleCreerComponent } from './articles/creer/article-creer.component';
import { ArticleConsultComponent } from './articles/consult/article-consult.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockCreerComponent } from './stocks/creer/stock-creer.component';
import { StockConsultComponent } from './stocks/consult/stock-consult.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CommandesConsultComponent } from './commandes/consult/commandes-consult/commandes-consult.component';
import { CommandesCreerComponent } from './commandes/creer/commandes-creer/commandes-creer.component';
import { RayonsComponent } from './rayons/rayons.component';
import { RayonsConsultComponent } from './rayons/consult/rayons-consult.component';
import { RayonsCreerComponent } from './rayons/creer/rayons-creer.component';
import { VenteComponent } from './vente/vente.component';
import { RuptureComponent } from './stocks/rupture/rupture.component';
import { ListeVentesComponent } from './vente/liste-ventes/liste-ventes.component';
import { DetailsVenteComponent } from './vente/liste-ventes/details-vente/details-vente.component';
import { AnnulVenteComponent } from './vente/annul-vente/annul-vente.component';
import { UniteMesureComponent } from './uniteMesure/unite-mesure.component';
import { UnitemesureCreerComponent } from './uniteMesure/creer/unitemesure-creer.component';
import { UniteMesureConsultComponent } from './uniteMesure/consult/unite-mesure-consult.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RetourArticleComponent } from './stocks/retour-article/retour-article.component';
import { CreerArticleRetourComponent } from './stocks/retour-article/creer/creer-article-retour.component';
import { ConsultArticleRetourComponent } from './stocks/retour-article/consult/consult-article-retour.component';
import { ParametresComponent } from './parametres/parametres.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'majMotPasse', component: MajMotPasseComponent },
    { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
    { path: 'articles/creer', component: ArticleCreerComponent, canActivate: [AuthGuard]},
    { path: 'articles/consult', component: ArticleConsultComponent, canActivate: [AuthGuard]},
    { path: 'commandes', component: CommandesComponent, canActivate: [AuthGuard] },
    { path: 'commandes/consult', component: CommandesConsultComponent, canActivate: [AuthGuard] },
    { path: 'commandes/creer', component: CommandesCreerComponent , canActivate: [AuthGuard]},
    { path: 'employes', component: EmployesComponent, canActivate: [AuthGuard] },
    { path: 'employes/consult', component: EmployeConsultComponent },
    { path: 'employes/creer', component: EmployeCreerComponent },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'categories/consult', component: CategorieConsultComponent, canActivate: [AuthGuard] },
    { path: 'categories/creer', component: CategorieCreerComponent, canActivate: [AuthGuard] },
    { path: 'fournisseurs', component: FournisseursComponent, canActivate: [AuthGuard] },
    { path: 'fournisseur/consult', component: FournisseurConsultComponent, canActivate: [AuthGuard]  },
    { path: 'fournisseur/creer', component: FournisseurCreerComponent, canActivate: [AuthGuard] },
    { path: 'stocks', component: StocksComponent, canActivate: [AuthGuard] },
    { path: 'stocks/consult', component: StockConsultComponent, canActivate: [AuthGuard] },
    { path: 'stocks/creer', component: StockCreerComponent, canActivate: [AuthGuard] },
    { path: 'stocks/ruptureStock', component: RuptureComponent, canActivate: [AuthGuard] },
    { path: 'rayons', component: RayonsComponent, canActivate: [AuthGuard] },
    { path: 'rayons/consult', component: RayonsConsultComponent, canActivate: [AuthGuard] },
    { path: 'rayons/creer', component: RayonsCreerComponent, canActivate: [AuthGuard] },
    { path: 'listeVente', component: ListeVentesComponent, canActivate: [AuthGuard] },
    { path: 'detailVente/:idVente', component: DetailsVenteComponent, canActivate: [AuthGuard] },
    { path: 'uniteMesure', component: UniteMesureComponent, canActivate: [AuthGuard] },
    { path: 'uniteMesure/consult', component: UniteMesureConsultComponent, canActivate: [AuthGuard] },
    { path: 'uniteMesure/creer', component: UnitemesureCreerComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'retourArticle', component: RetourArticleComponent, canActivate: [AuthGuard] },
    { path: 'retourArticle/creer', component: CreerArticleRetourComponent, canActivate: [AuthGuard] },
    { path: 'retourArticle/consult', component: ConsultArticleRetourComponent, canActivate: [AuthGuard] },
    { path: 'parametres', component: ParametresComponent, canActivate: [AuthGuard] },


    // Interface user
    { path: 'ventes', component: VenteComponent, canActivate: [AuthGuard] },
    { path: 'ventes/annulVente', component: AnnulVenteComponent, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: 'dashboard' }
];
export const routing = RouterModule.forRoot(appRoutes, { useHash: true });

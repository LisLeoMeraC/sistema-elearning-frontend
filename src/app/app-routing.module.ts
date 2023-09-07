import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AdminGuard } from './services/admin.guard.service';
import { WelcomeUserComponent } from './pages/user/welcome-user/welcome-user.component';
import { ModuleOneComponent } from './pages/user/module-one/module-one.component';
import { ModuleTwoComponent } from './pages/user/module-two/module-two.component';
import { ModuleThreeComponent } from './pages/user/module-three/module-three.component';
import { ModuleFourComponent } from './pages/user/module-four/module-four.component';
import { ViewCategoriaComponent } from './pages/admin/view-categoria/view-categoria.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './pages/admin/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { startWith } from 'rxjs';
import { StartComponent } from './pages/user/start/start.component';
import { ResourcesComponent } from './pages/user/resources/resources.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { RecomendacionesComponent } from './pages/user/recomendaciones/recomendaciones.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },

  {
    path:'home',
    component:HomeComponent,
    pathMatch:'full'
  },

  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
        canActivate:[AdminGuard],
        children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path : '',
        component : WelcomeComponent
      },
      {
        path : 'categorias',
        component : ViewCategoriaComponent
      },
      {
        path:"add-categoria",
        component: AddCategoriaComponent
      },
      {
        path:"examenes",
        component: ViewExamenesComponent
      }
      ,
      {
        path:"add-examen",
        component: AddExamenComponent
      }
      ,
      {
        path:"examen/:examenId",
        component: ActualizarExamenComponent
      },
      {
        path:'ver-preguntas/:examenId/:titulo',
        component:ViewExamenPreguntasComponent
      },
      {
        path:'add-pregunta/:examenId/:titulo',
        component : AddPreguntaComponent
      },
      {
        path:'pregunta/:preguntaId',
        component:ActualizarPreguntaComponent
      }
    
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children : [
      {
        path:'load-examen',
        component:LoadExamenComponent
      },
      {
        path : '',
        component : WelcomeUserComponent
      },
      {
        path:'instrucciones/:examenId',
        component:InstruccionesComponent
      },
      {
        path:'resources',
        component:ResourcesComponent
      },
      {
        path:'module-one',
        component:ModuleOneComponent
      },

      {
        path:'profile-user',
        component:ProfileUserComponent
      },
      {
        path:'recomendaciones',
        component:RecomendacionesComponent
      }

    ]
  },
  {
    path:"start/:examenId",
    component:StartComponent,
    canActivate:[NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


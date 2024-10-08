import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/User';


@Component({
  selector: 'app-registrer',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule],
  templateUrl: './registrer.component.html',
  styleUrl: './registrer.component.scss',

})
export class RegistrerComponent {
  user = {
    email: "",
    name: "",
    pass: ""
  }

  constructor(private userService: UserService,
    private router: Router) { }

    usuarioBoolean :boolean =false;

  registrerUser(): void {
    if (this.user.email != " " && this.user.pass != " ") {

      //TODO: verificar si el usuario existe
      this.userService.getUser(this.user).subscribe((usuarioExiste) => {
        if (!usuarioExiste) {
          this.userService.insertUser(this.user).subscribe((datos) => {
            if (datos) {
              this.router.navigate(['/login']);
            }
          });
        }else{
          this.usuarioBoolean==true;
        }
      })
    }
  }

}


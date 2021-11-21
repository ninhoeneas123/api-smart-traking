import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.getByEmail(userEmail)
    if (user && bcrypt.compareSync(userPassword, user.password)) {
      const { _id, name, email } = user
      return { id: _id, name, email }
    }
    return { statusCode: 401, message: "Usuário não encontrado" }
  }

  async login(user: any) {
    if (user.statusCode === 401) {
      return user
    } else {
      const payload = { email: user.email, sub: user.id }
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
  }
}

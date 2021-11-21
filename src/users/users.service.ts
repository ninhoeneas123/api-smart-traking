import { HttpException, HttpStatus } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './entities/user.entity'
import * as bcrypt from 'bcrypt'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { RecoverPasswordDto } from './dto/recover-password.dto'
import { Recover, RecoverDocument } from './entities/recover-password.entity'



@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Recover.name) private recoverModel: Model<RecoverDocument>,
  ) { }

  async register(data: CreateUserDto) {
    const user = new this.userModel(data)
    user.password = bcrypt.hashSync(data, 8)
    console.log(user)
    return user.save()
      .then((result) => {
        return { menssage: 'Usuário cadastrado com sucesso' }
      })
      .catch(() => {
        throw new HttpException('Erro ao cadastrar usuário', HttpStatus.BAD_REQUEST)
      })
  }
  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
   return user 
  }

}
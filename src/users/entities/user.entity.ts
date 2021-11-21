import { PartialType } from '@nestjs/mapped-types'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: false })
  _id: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  role: string

  @Prop({ required: true })
  availTime: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  administrator: boolean

  constructor(users?: Partial<User>) {
    this.name = users?.name;
    this.role = users?.role;
    this.availTime = users?.availTime;
    this.email = users?.email;
    this.password = users?.password;

  }
}


export const UserSchema = SchemaFactory.createForClass(User)
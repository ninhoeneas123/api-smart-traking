import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RecoverDocument = Recover & Document

@Schema({ timestamps: true })
export class Recover {
  @Prop({ required: true })
  email: string

  @Prop({ required: true, unique: true })
  codeRecover: string

  @Prop({ required: true })
  worn: Boolean
}

export const RecoverSchema = SchemaFactory.createForClass(Recover)
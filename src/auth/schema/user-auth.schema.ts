import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum userTypes {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ versionKey: false, timestamps: true })
export class UserAuth extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, enum: [userTypes.USER, userTypes.ADMIN] })
  role: string;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);

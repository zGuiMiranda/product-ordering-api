import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AbstractDocument = HydratedDocument<Abstract>;

@Schema({ timestamps: true })
export class Abstract extends Document {
  @Prop()
  createAt: string;
}

export const AbstractSchema = SchemaFactory.createForClass(Abstract);

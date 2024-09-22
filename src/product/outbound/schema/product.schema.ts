import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from '../../../shared/abstract/inbound/AbstractSchema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false })
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  supplierId: string;
  @Prop({ required: true })
  unitPrice: number;
  @Prop({ required: true })
  quantity: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.add(AbstractSchema);
export default ProductSchema;

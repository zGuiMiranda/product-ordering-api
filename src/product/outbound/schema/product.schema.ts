import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '@shared/abstract/inbound/AbstractSchema';
import { HydratedDocument } from 'mongoose';

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
  price: number;
  @Prop({ required: true })
  quantity: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.add(AbstractSchema);
export default ProductSchema;

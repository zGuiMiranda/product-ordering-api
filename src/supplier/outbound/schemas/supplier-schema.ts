import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractSchema } from 'src/shared/abstract/inbound/AbstractSchema';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema({ versionKey: false })
export class Supplier {
  @Prop({ required: true })
  name: string;
}

const SupplierSchema = SchemaFactory.createForClass(Supplier);
SupplierSchema.add(AbstractSchema);
export default SupplierSchema;

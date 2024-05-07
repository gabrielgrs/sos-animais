import { Model, Schema, model, models } from 'mongoose'
import { AnimalSchema } from './types'

const schema = new Schema<AnimalSchema>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    species: { type: String, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE'], required: true },
    color: { type: String, required: true },
    breed: { type: String },
    rescue: {
      date: { type: Date, required: true },
      zipCode: { type: String },
      city: { type: String, required: true },
      neighborhood: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String },
      complement: { type: String },
    },
    contact: {
      phone: { type: String, required: true },
      city: { type: String },
      zipCode: { type: String },
      neighborhood: { type: String },
      street: { type: String },
      number: { type: String },
      complement: { type: String },
    },
    handedOverToOwner: { type: Boolean, default: false },
    pictures: { type: [String], default: [] },
    observations: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

const currentModel = models?.Animal as Model<AnimalSchema>
export default currentModel || model<AnimalSchema>('Animal', schema)

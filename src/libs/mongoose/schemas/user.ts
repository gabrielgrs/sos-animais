import { Model, Schema, model, models } from 'mongoose'
import { UserSchema } from './types'

const schema = new Schema<UserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

const currentModel = models?.User as Model<UserSchema>
export default currentModel || model<UserSchema>('User', schema)

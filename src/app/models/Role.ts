import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },
    description: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);

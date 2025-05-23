import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  returns: number;
}

const ContributionSchema = new Schema<IContribution>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  returns: { type: Number, default: 0 },
});

export default mongoose.models.Contribution || mongoose.model<IContribution>('Contribution', ContributionSchema);

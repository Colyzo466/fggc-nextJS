import mongoose, { Schema, Document } from 'mongoose';

export interface IContribution extends Document {
  user: mongoose.Types.ObjectId; // contributor
  recipient: mongoose.Types.ObjectId; // recipient of payment
  amount: number;
  date: Date;
  status: 'pending' | 'approved' | 'completed' | 'failed';
  returns: number;
  approvedAt?: Date;
  returnedAt?: Date;
  suspendedUntil?: Date;
}

const ContributionSchema = new Schema<IContribution>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'completed', 'failed'], default: 'pending' },
  returns: { type: Number, default: 0 },
  approvedAt: { type: Date },
  returnedAt: { type: Date },
  suspendedUntil: { type: Date },
});

export default mongoose.models.Contribution || mongoose.model<IContribution>('Contribution', ContributionSchema);

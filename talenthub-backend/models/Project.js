import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    title: String,
    description: String,
    link: String,
    image: String,
    tags: [String],
    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

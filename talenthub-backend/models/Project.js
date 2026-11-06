
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    link: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    tags: {
      type: [String],
      default: [],
    },

    upvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;

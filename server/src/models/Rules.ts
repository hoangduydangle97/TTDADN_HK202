import mongoose from 'mongoose';
import { CollectionName } from './CollectionName';

interface RuleAttrs {
  name: string;
  conditionDevice: mongoose.Types.ObjectId;
  conditionOperator: string;
  conditionValue: string;
  targetDevice: mongoose.Types.ObjectId;
  targetValue: string;
}

interface RuleModel extends mongoose.Model<RuleDoc> {
  build(attrs: RuleAttrs): RuleDoc;
}

interface RuleDoc extends mongoose.Document {
  name: string;
  conditionDevice: mongoose.Types.ObjectId;
  conditionOperator: string;
  conditionValue: string;
  targetDevice: mongoose.Types.ObjectId;
  targetValue: string;
}

const ruleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    conditionDevice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CollectionName.Device,
    },
    conditionOperator: {
      type: String,
      required: true,
    },
    conditionValue: {
      type: String,
      required: true,
    },
    targetDevice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CollectionName.Device,
    },
    targetValue: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ruleSchema.statics.build = (attrs: RuleAttrs) => {
  return new Rule(attrs);
};

const Rule = mongoose.model<RuleDoc, RuleModel>(
  CollectionName.Rule,
  ruleSchema
);

export { Rule };

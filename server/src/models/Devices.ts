import mongoose from 'mongoose';

interface DeviceAttrs {
  name: string;
  feed: string;
  type: string;
}

interface DeviceModel extends mongoose.Model<DeviceDoc> {
  build(attrs: DeviceAttrs): DeviceDoc;
}

interface DeviceDoc extends mongoose.Document {
  name: string;
  feed: string;
  type: string;
}

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    feed: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

deviceSchema.statics.build = (attrs: DeviceAttrs) => {
  return new Device(attrs);
};

const Device = mongoose.model<DeviceDoc, DeviceModel>('Device', deviceSchema);

export { Device };

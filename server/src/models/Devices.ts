import mongoose from 'mongoose';
import { CollectionName } from './CollectionName';

interface DeviceAttrs {
  name: string;
  feed: string;
  type: string;
  room: mongoose.Types.ObjectId;
}

interface DeviceModel extends mongoose.Model<DeviceDoc> {
  build(attrs: DeviceAttrs): DeviceDoc;
}

interface DeviceDoc extends mongoose.Document {
  name: string;
  feed: string;
  type: string;
  room: mongoose.Types.ObjectId;
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
    room: { type: mongoose.Schema.Types.ObjectId, ref: CollectionName.Room },
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

const Device = mongoose.model<DeviceDoc, DeviceModel>(
  CollectionName.Device,
  deviceSchema
);

export { Device };

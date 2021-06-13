import mongoose from 'mongoose';
import { CollectionName } from './CollectionName';

interface RoomAttrs {
  name: string;
  icon: string;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
}

interface RoomDoc extends mongoose.Document {
  name: string;
  icon: string;
  devices: mongoose.Schema.Types.ObjectId[];
}

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
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

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs);
};

const Room = mongoose.model<RoomDoc, RoomModel>(
  CollectionName.Room,
  roomSchema
);

export { Room };

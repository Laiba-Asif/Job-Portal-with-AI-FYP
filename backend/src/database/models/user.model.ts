
// src/models/user.model.ts
import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";


interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

export interface ProviderEntry {
  provider: "google" | "linkedin" | string;
  providerId: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "recruiter" | "jobseeker" |"pending";
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userPreference: UserPreferences;
  providers?: ProviderEntry[];      
  resumeParsed:boolean,
  resumeId: { type: ObjectId, ref: "Resume" } 
  comparePassword(value: string): Promise<boolean>;
}

const userPreferencesSchema = new Schema<UserPreferences>({
  enable2FA: { type: Boolean, default: false },
  emailNotification: { type: Boolean, default: true },
  twoFactorSecret: { type: String, required: false },
});

// NEW provider sub-schema
const providerSchema = new Schema<ProviderEntry>({
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
}, { _id: false });

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "recruiter", "jobseeker","pending"], default: "pending" },
    isEmailVerified: { type: Boolean, default: false },
    userPreference: { type: userPreferencesSchema, default: {} },
    providers: { type: [providerSchema], default: [] }, 
    resumeParsed: { type: Boolean, default: false },
    resumeId: { type: Schema.Types.ObjectId, ref: "Resume", default: null }
  },
  {
    timestamps: true,
    toJSON: {},
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
  next();
});

// Add instance method for comparing passwords
userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

// Prevents leaking sensitive data in API responses
userSchema.set("toJSON", {
  transform: function (doc, ret:any) {
    delete ret.password;
    if (ret.userPreference) {
      delete ret.userPreference.twoFactorSecret;
    }
    return ret;
  },
});


const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;


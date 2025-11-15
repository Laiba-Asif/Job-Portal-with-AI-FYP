import mongoose, { Document, Schema, Types } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";

// -----------------------------
// User Preferences
// -----------------------------
interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

// -----------------------------
// OAuth / Provider Entry
// -----------------------------
export interface ProviderEntry {
  provider: "google" | "linkedin" | string;
  providerId: string;
}

// -----------------------------
// User Document Interface
// -----------------------------
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "recruiter" | "jobseeker" | "pending";
  isEmailVerified: boolean;
  userPreference: UserPreferences;
  providers?: ProviderEntry[];
  profileId?: Types.ObjectId | null;       // Points to role-specific profile
  profileModel?: string | null;            // Name of profile collection
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
}

// -----------------------------
// Subschemas
// -----------------------------
const userPreferencesSchema = new Schema<UserPreferences>({
  enable2FA: { type: Boolean, default: false },
  emailNotification: { type: Boolean, default: true },
  twoFactorSecret: { type: String },
});

const providerSchema = new Schema<ProviderEntry>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { _id: false }
);

// -----------------------------
// User Schema
// -----------------------------
const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "recruiter", "jobseeker", "pending"],
      default: "pending",
    },
    isEmailVerified: { type: Boolean, default: false },
    userPreference: { type: userPreferencesSchema, default: {} },
    providers: { type: [providerSchema], default: [] },
    profileId: { type: Schema.Types.ObjectId, refPath: "profileModel", default: null },
    profileModel: { type: String, enum: ["JobseekerProfile", "RecruiterProfile"], default: null },
  },
  { timestamps: true }
);

// -----------------------------
// Pre-save password hash
// -----------------------------
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
  next();
});

// -----------------------------
// Compare password method
// -----------------------------
userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

// -----------------------------
// Hide sensitive fields when JSON
// -----------------------------
userSchema.set("toJSON", {
  transform: (doc, ret: any) => {
    delete ret.password;
    if (ret.userPreference) delete ret.userPreference.twoFactorSecret;
    return ret;
  },
});

// -----------------------------
// Export
// -----------------------------
const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;

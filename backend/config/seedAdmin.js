const bcrypt = require("bcryptjs");
const AdminModel = require("../models/adminModel");

const seedAdmin = async () => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.warn(
      "ADMIN_USERNAME / ADMIN_PASSWORD not set - skipping admin seed. No admin account will exist until these are provided."
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await AdminModel.findOneAndUpdate(
    { adminName: ADMIN_USERNAME },
    { adminName: ADMIN_USERNAME, adminPassword: hashedPassword },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  console.log(`Admin account ready for "${ADMIN_USERNAME}"`);
};

module.exports = seedAdmin;

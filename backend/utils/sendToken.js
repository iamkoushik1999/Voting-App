const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = () => ({
  expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
});

exports.sendToken = (res, admin, message, statusCode) => {
  const token = admin.getJWTToken();

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions())
    .json({
      success: true,
      message,
      admin: { id: admin._id, adminName: admin.adminName },
    });
};

exports.sendTokenVoter = (res, voter, message, statusCode) => {
  const voterToken = voter.getJWTToken();

  res
    .status(statusCode)
    .cookie("voterToken", voterToken, cookieOptions())
    .json({
      success: true,
      message,
      voter: {
        id: voter._id,
        name: voter.name,
        voterId: voter.voterId,
        mobile: voter.mobile,
        isVoted: voter.isVoted,
      },
    });
};

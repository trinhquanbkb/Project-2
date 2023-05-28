//quyền chỉ dành riêng cho admin
const adminAuthorize = (req, res, next) => {
  const { user } = req;
  if (["admin"].findIndex((e) => e === user.userType) > -1) {
    next();
  } else {
    res.status(400).send("You cannot use this permission");
  }
};

//quyền dành cho user
const userAuthorize = (req, res, next) => {
  const { user } = req;
  if (["user"].findIndex((e) => e === user.userType) > -1) {
    next();
  } else {
    res.status(400).send("You cannot use this permission");
  }
};

module.exports = {
  adminAuthorize,
  userAuthorize,
};

const hasRole =
  (...roles) =>
  (req, res, next) => {
    const { id } = req.params;
    const { role, _id } = req.user;

    if (roles.includes('self') && id === _id) {
      next();
      return;
    }

    if (roles.includes(role)) {
      next();
      return;
    }

    throw new Error('Not Authorized', { cause: 403 });
  };

export default hasRole;

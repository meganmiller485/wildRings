const express = require('express');
const apiRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const printsRouter = require('./prints');
apiRouter.use('/prints', printsRouter);

const userRolesRouter = require('./userRoles');
apiRouter.use('/userRoles', userRolesRouter);

const rolesRouter = require('./roles');
apiRouter.use('/roles', rolesRouter);

module.exports = apiRouter;

// middlewares/validateItem.js
const { check, validationResult } = require('express-validator');

const validateItem = [
  check('name').isString().notEmpty(),
  check('quantity').isInt({ min: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateItem;

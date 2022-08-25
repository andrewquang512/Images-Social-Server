const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route GET api/auth
//@desc Test route
//@access Public
router.get('/', auth, async (req, res) => {
  try {
    // ? get all but without password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    // ? send is different from msg
    // ? + send is directly print on browser
    // ? + msg is return in http respond
    res.status(500).send('Server Error');
  }
});

//@route POST api/auth
//@desc Authenticate user & get token
//@access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // ? Inorder to make this req.body work
    // ? we have to init middleware in body parser
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // See if user exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Crendentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Crendentials' }] });
      }

      // Return jsonwebtoken
      // ? The reason jwt is secure that it is will expired in a duration -> so hacked can only use it until expired
      // ? Header - Phần header sẽ chứa kiểu dữ liệu , và thuật toán sử dụng để mã hóa ra chuỗi JWT
      // ? Payload - Phần payload sẽ chứa các thông tin mình muốn đặt trong chuỗi
      // ? Signature - phần chử ký này sẽ được tạo ra bằng cách mã hóa phần header , payload kèm theo một chuỗi secret
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // ! expiresIn is temporary set to 1 hour, renember to set back to 360000
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send('User register');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;

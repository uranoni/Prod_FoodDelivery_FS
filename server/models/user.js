const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema(
  {
    age: {
      type: Number
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      minlength: [6, "Minimum 6 characters required!"],
      required: true
    },
    name: String,
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            v
          );
        },
        message: props => `${props.value} is not a valid email!`
      },
      unique: true,
      required: true
    },
    role: { type: String, enum: ["ADMIN", "USER", "STORE"] },
    tokens: [
      {
        token: {
          type: String
        },
        user_agent: {
          type: String
        },
        request_ip: {
          type: String
        }
      }
    ],
    forgot: {
      expire: Date,
      token: String
    }
  },
  {
    timestamps: true
  }
);

schema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

schema.methods.generateAuthToken = function(request_ip, user_agent) {
  const user = this;
  const token = jwt
    .sign(
      { _id: user._id.toHexString(), request_ip, user_agent },
      process.env.JWT_SECRET
    )
    .toString();
  user.tokens.push({ token, request_ip, user_agent });
  return user.save().then(user => {
    return { token, user };
  });
};

schema.methods.userAuthentication = function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

schema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject("沒有這個會員");
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then(res => {
        if (res) {
          resolve(user);
        } else {
          reject("此密碼錯誤");
        }
      });
    });
  });
};

schema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token
  });
};

schema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.hash(user.password, 10).then(hash => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", schema);

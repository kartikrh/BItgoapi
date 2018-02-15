module.exports.login = function (req, res) {
    const BitGoJS = require('../src/index.js');
    var param = { useProduction: true };
    const bitgo = new BitGoJS.BitGo(param);
    var user = req.query.user;
    var password = req.query.password;
    var otp = req.query.otp;

    bitgo.authenticate({ username: user, password: password, otp: otp }, function (err, result) {
        if (err) {
            res.json({ status: "err", record: err });
        }
        res.json({ status: "ok", record: result });
    });
};

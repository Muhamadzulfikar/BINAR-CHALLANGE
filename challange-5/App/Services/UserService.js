const bcrypt = require("bcryptjs");
const UserRepositories = require("../Repositories/UserRepositories");

module.exports = {
    async superAdminLogin(email, password) {
        try {
            const user =  await UserRepositories.findUser(email);
            const encryptedPassword = user.password;

            if (user) {
                const isPassword =  await bcrypt.compare(password, encryptedPassword);
                return isPassword ? {
                    status: "OK",
                    code: "200",
                    message: "Selamat Datang di Indomaret",
                } : "Password Salah";
            } else {
                return {
                    status: "Not Found",
                    code: "404",
                    message: "Cannot Find User"
                }
            }
        } catch (error) {
            return {
                status: "Internal Server Error",
                code: "505",
                message: error,
            }       
        }
    },
};

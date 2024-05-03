import passport from "passport";
import LocalStrategy from "passport-local";
import github from "passport-github2";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js"


const userManager = new MongoUserManager();

const initPassport = () => {
    // ** Local Strategy **
    passport.use(
        "register",
        new LocalStrategy.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true,
            },
            async (req, username, password, done) => {
                try {
                    const userData = req.body;
                    const newUser = await userManager.register({
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        age: parseInt(userData.age),
                        email: username,
                        password: password,
                    });
                    done(null, newUser);
                } catch (error) {
                    done(`Error al crear el usuario ${error}`, false);
                }
            }
        )
    );

    // ** Github Strategy **
    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: process.env.PASSPORT_CLIENT_ID,
                clientSecret: process.env.PASSPORT_CLIENT_SECRET,
                callbackURL: "http://localhost:8080/api/session/callbackGithub",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { name: first_name, email, login } = profile._json;
                    console.log(profile._json);
                    let user = await userManager.findUserByEmail(email);
                    if (!user) {
                        const newUser = await userManager.register({
                            first_name,
                            last_name: '.',
                            email,
                            password: `${email + login}123`,
                            age: 99
                        });

                        return done(null, newUser);
                    }
                    return done(null, user)
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getUserById(id);
        done(null, user);
    });
};

export { initPassport };
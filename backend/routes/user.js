const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.port("/logn", UserController.userLogin);

module.exports = router;
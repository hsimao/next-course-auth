import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const isEmpty = (value) => {
  return !value?.trim();
};

const isEmail = (email) => {
  return !isEmpty(email) && email.includes("@");
};

const passwordIsValid = (password) => {
  return !isEmpty(password) && password?.trim().length < 7;
};

const validateSignupData = ({ email, password }) => {
  if (!isEmail(email) || passwordIsValid(password)) {
    throw new Error("Invalid Input!");
  }
};

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    validateSignupData({ email, password });
    console.log(data);

    const client = await connectToDatabase();
    const db = client.db();

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Created user!", user: result });
  } catch (err) {
    console.log(err.message);
    res.status(422).json({ message: err.message });
  }
}

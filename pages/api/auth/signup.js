import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

const isEmpty = (value) => {
  return !value?.trim();
};

const isEmail = (email) => {
  return !isEmpty(email) && email.includes('@');
};

const passwordIsValid = (password) => {
  return !isEmpty(password) && password?.trim().length < 7;
};

const validateSignupData = ({ email, password }) => {
  if (!isEmail(email) || passwordIsValid(password)) {
    throw new Error('Invalid Input!');
  }
};

const validateUserIsExisting = async (db, email) => {
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    throw new Error('User exists already!');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return;
  const client = await connectToDatabase();
  const db = client.db();

  try {
    const { email, password } = req.body;

    validateSignupData({ email, password });
    await validateUserIsExisting(db, email);

    const hashedPassword = await hashPassword(password);
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user!' });
  } catch (err) {
    console.log(err.message);
    res.status(422).json({ message: err.message });
  } finally {
    client.close();
  }
}

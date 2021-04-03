import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  async function changePassword(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePassword} />
    </section>
  );
}

export default UserProfile;

import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
// Add your Firebase configuration here
const firebaseConfig = {
  // Your Firebase config
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const TopUsersList = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    // Fetch the top 100 users from Firebase Firestore
    const fetchTopUsers = async () => {
      try {
        const usersRef = firestore.collection('users');
        const querySnapshot = await usersRef.orderBy('likes', 'desc').limit(100).get();
        const topUsers = querySnapshot.docs.map((doc) => doc.data());
        setUsers(topUsers);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div>
      <h1>Top 100 Users</h1>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.profileImage} alt={user.username} width="45" height="45" />
            {user.username} - Likes: {user.likes}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopUsersList;

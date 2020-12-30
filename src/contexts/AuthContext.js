import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import app from '../firebase';
import 'firebase/firestore';
import 'firebase/storage';
import cryptoRandomString from 'crypto-random-string';

const db = app.firestore();
const storageRef = app.storage().ref();

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'));
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [currentUserData, setCurrentUserData] = useState();
	const [allUsersData, setAllUsersData] = useState([]);
	const [allChallengesData, setAllChallengesData] = useState([]);
	const [singleChallengeData, setSingleChallengeData] = useState([]);

	function switchDarkMode() {
		var XD = localStorage.getItem('darkMode');
		if (XD === 'true') {
			localStorage.setItem('darkMode', 'false');
			setDarkMode('false');
		} else if (XD === 'false') {
			localStorage.setItem('darkMode', 'true');
			setDarkMode('true');
		}
	}

	function signup(email, password, username) {
		return auth.createUserWithEmailAndPassword(email, password).then(() => {
			createProfile(username, email);
		});
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	function createProfile(username, email) {
		return db
			.collection('users')
			.doc(`${email}`)
			.set({
				avatar:
					'https://firebasestorage.googleapis.com/v0/b/capturethewdictory.appspot.com/o/avatars%2F0wli9hCJ8mTJbvj.png?alt=media',
				bio: 'There is nothing to see here unfortunately :(',
				challenges: {
					challenge1: false,
					challenge2: false,
					challenge3: false,
					challenge4: false,
					challenge5: false,
					challenge6: false,
				},
				createdAt: new Date(),
				email: email,
				points: 0,
				username: username,
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
	}

	function getProfile() {
		return db
			.collection('users')
			.doc(currentUser.email)
			.get()
			.then((doc) => {
				if (doc.exists) {
					var Data = doc.data();
					setCurrentUserData(Data);
				} else {
					console.error('No such document!');
				}
			})
			.catch(function (error) {
				console.error('Error getting document:', error);
			});
	}

	function getAllUsersData() {
		var Data = [];

		return db
			.collection('users')
			.orderBy('points', 'desc')
			.limit(1000)
			.where('points', '>', 0)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					Data.push(doc.data());
				});
			})
			.then(() => {
				setAllUsersData(Data);
			})
			.catch(function (error) {
				console.error('Error getting documents:', error);
			});
	}

	function getAllChallengesData() {
		var Data = [];

		return db
			.collection('challenges')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					Data.push(doc.data());
				});
			})
			.then(() => {
				setAllChallengesData(Data);
			})
			.catch(function (error) {
				console.error('Error getting documents:', error);
			});
	}

	function getSingleChallengeData(url) {
		var Data = [];

		return db
			.collection('challenges')
			.doc(url)
			.get()
			.then((doc) => {
				if (doc.exists) {
					Data.push(doc.data());
				} else {
					console.error('No such document!');
				}
			})
			.then(() => {
				setSingleChallengeData(Data);
			})
			.catch((error) => {
				console.error('Error getting document: ', error);
			});
	}

	function updateUsername(email, username) {
		return db
			.collection('users')
			.doc(`${email}`)
			.update({
				username: username,
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
			});
	}

	function updateBio(email, bio) {
		return db
			.collection('users')
			.doc(`${email}`)
			.update({
				bio: bio,
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
			});
	}

	function updateAvatar(email, file) {
		var filename = cryptoRandomString({ length: 20, type: 'alphanumeric' });
		var filetype = file.type.slice(6);
		var fullfilename = `${filename}.${filetype}`;

		var metadata = {
			contentType: file.type,
		};

		storageRef.child('avatars/' + fullfilename).put(file, metadata);

		var avatar = `https://firebasestorage.googleapis.com/v0/b/capturethewdictory.appspot.com/o/avatars%2F${fullfilename}?alt=media`;

		return db
			.collection('users')
			.doc(`${email}`)
			.update({
				avatar: avatar,
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
			});
	}

	function doChallenge(url, challengePoints, user, userPoints) {
		var points = challengePoints + userPoints;

		return db
			.collection('users')
			.doc(user)
			.update({
				points: points,
				[`challenges.${url}`]: true,
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
			});
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		currentUserData,
		allUsersData,
		allChallengesData,
		singleChallengeData,
		darkMode,
		login,
		logout,
		signup,
		resetPassword,
		updatePassword,
		updateEmail,
		getProfile,
		createProfile,
		updateUsername,
		updateBio,
		updateAvatar,
		getAllUsersData,
		getAllChallengesData,
		getSingleChallengeData,
		doChallenge,
		switchDarkMode,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

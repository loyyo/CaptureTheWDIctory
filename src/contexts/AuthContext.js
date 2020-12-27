import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/app';
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
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [currentUserData, setCurrentUserData] = useState();
	const [allUsersData, setAllUsersData] = useState([]);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function rememberedLogin(email, password) {
		auth
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				return auth.signInWithEmailAndPassword(email, password);
			})
			.catch((err) => {
				console.error(err);
			});
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
		login,
		logout,
		signup,
		resetPassword,
		updatePassword,
		updateEmail,
		rememberedLogin,
		createProfile,
		getProfile,
		updateUsername,
		updateBio,
		updateAvatar,
		getAllUsersData,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

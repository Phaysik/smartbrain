import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import axios from 'axios';

const app = new Clarifai.App({
	apiKey: '557ccc63e44f4c5fb86574df24263277',
});

const particleOptions: object = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 400,
			},
		},
	},
};

const defaultUser: any = {
	id: '',
	name: '',
	email: '',
	entries: 0,
	joined: '',
};

const App = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [boundingBox, setBoundingBox] = useState({});
	const [route, setRoute] = useState('signin');
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState(defaultUser);

	const calculateFaceLocation = (response: any) => {
		const clarifaiFace =
			response.outputs[0].data.regions[0].region_info.bounding_box;
		const image: HTMLImageElement = document.getElementById(
			'inputimage'
		) as HTMLImageElement;
		const width: number = Number(image.width);
		const height: number = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	const onPictureSubmit = () => {
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
			.then((response: any) => {
				if (response) {
					axios
						.put('http://localhost:3000/image', {
							id: user.id,
						})
						.then((response) =>
							setUser((user: React.SetStateAction<object>) => ({
								...user,
								entries: response.data.entries,
							}))
						);
					setBoundingBox(calculateFaceLocation(response));
				}
			})
			.catch(console.log);
	};

	const onRouteChange = (query: React.SetStateAction<string>) => {
		if (query === 'signout') {
			setIsSignedIn(false);
		} else if (query === 'home') {
			setIsSignedIn(true);
		}

		setRoute(query);
	};

	return (
		<React.StrictMode>
			<div className="App">
				<Particles className="particles" params={particleOptions} />
				<Navigation
					onRouteChange={(query: React.SetStateAction<string>) =>
						onRouteChange(query)
					}
					signedIn={isSignedIn}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank name={user.name} entries={user.entries} />
						<ImageLinkForm
							getQuery={(query: React.SetStateAction<string>) =>
								setImageUrl(query)
							}
							onButtonClick={onPictureSubmit}
						/>
						<FaceRecognition imageUrl={imageUrl} box={boundingBox} />
					</div>
				) : route === 'register' ? (
					<Register
						onRouteChange={(query: React.SetStateAction<string>) =>
							onRouteChange(query)
						}
						createUser={(query: React.SetStateAction<object>) => setUser(query)}
					/>
				) : (
					<SignIn
						onRouteChange={(query: React.SetStateAction<string>) =>
							onRouteChange(query)
						}
						createUser={(query: React.SetStateAction<object>) => setUser(query)}
					/>
				)}
			</div>
		</React.StrictMode>
	);
};

export default App;

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import Script from "next/script";

const Tracks = () => {
	const [token, setToken] = useState("");
	const [tracks, setTracks] = useState([]);

	const id = "7gP3bB2nilZXLfPHJhMdvc";
	const market = "US";
	useEffect(() => {
		axios("http://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-form-urlencoded",
				Autorization:
					"Basic" +
					new Buffer(
						"85b095bae5e6429f955b14f8b377ebd3" +
							":" +
							"c6f3145974cd4becbc7677ee7b77610c"
					).toString("base64"),
			},
			data: "grant_type=client_credentials",
		})
			.then((tokenresponse) => {
				console.log(tokenresponse.data.access_token);
				setToken(tokenresponse.data.access_token);
				axios(
					`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${US}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							Authorization: "Bearer " + tokenresponse.data.access_token,
						},
					}
				)
					.then((trackresponse) => {
						console.log(trackresponse.data.tracks);
						setTracks(trackresponse.data.tracks);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const PopularityByTrack = (data) => {
		let plotData = [];
		let names = [];
		let popularity = [];

		data.map((each) => {
			names.push(each.name);
			popularity.push(each.popularity);
		});

		plotData.push["name"] = names;
		plotData["popularity"] = popularity;

		return plotData;
	};

	return (
		<>
			<Script src="https://cdn.plot.ly/plotly-2.6.0.min.js"></Script>

			<div className="tracks">
				<Plot
					data={[
						{
							type: "bar",
							x: PopularityByTrack(tracks)["names"],
							y: PopularityByTrack(tracks)["popularity"],
							marker: { color: "rgb(158,202,225)" },
						},
						(layout = {
							with: 1000,
							height: 1200,
							title: "Artist Famous (US)",
						}),
					]}
				/>
			</div>
		</>
	);
};

export default Tracks;

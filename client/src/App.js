import React, { useEffect, useState } from "react";

function App() {
	const [backendData, setBackendData] = useState([{}]);

	useEffect(() => {
		fetch("/api")
			.then((response) => response.json())
			.then((data) => {
				setBackendData(data);
			});
	}, []);

	return (
		<div>
			<p>Front end is working!</p>
		</div>
	);
}

export default App;

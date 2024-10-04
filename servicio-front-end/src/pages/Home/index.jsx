import { useState, useEffect } from "react";
import { getCharacters } from "../../api/DragonBall";
import "./Home.css";
import Loader from "../../components/Loader";

export function Home() {
	const [characters, setCharacters] = useState();
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getCharacters(currentPage).then((res) => {
			setCharacters(res);
		});
	}, [currentPage]);

	return (
		<div className="container">
			<div className="home">
				<div className="characters-containter">
					{characters ? (
						<>
							{characters.items?.map((char) => (
								<div className="character" key={char.id}>
									Name: {char.name}
									<br />
									<img src={char.image} alt={char.name} />
									<br />
									Max Ki: {char.maxKi}
								</div>
							))}
						</>
					) : (
						<div className="loader-container">
							<Loader></Loader>
						</div>
					)}
				</div>
			</div>
			<div className="pagination">
				<p id="actual-page">
					Current Page:<span>{currentPage}</span>
				</p>
				<button
					disabled={currentPage === 1}
					style={
						currentPage === 1
							? {
									cursor: "not-allowed",
									backgroundColor: "#342b2b",
									color: "#555",
							  }
							: {}
					}
					onClick={() => {
						setCharacters()
						setCurrentPage(currentPage - 1);
					}}
				>
					{"<"} Previous
				</button>
				<button
					disabled={currentPage === characters?.meta?.totalPages}
					style={
						currentPage === characters?.meta?.totalPages
							? {
									cursor: "not-allowed",
									backgroundColor: "#342b2b",
									color: "#555",
							  }
							: {}
					}
					onClick={() => {
						setCharacters()
						setCurrentPage(currentPage + 1);
					}}
				>
					Next {">"}
				</button>
			</div>
		</div>
	);
}

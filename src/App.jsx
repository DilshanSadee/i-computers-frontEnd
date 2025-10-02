import "./App.css";
import ProductCard from "./componentes/productCard";

function App() {
	return (
		<>
		
		<ProductCard name = "laptop" Price = "100000" image = "https://picsum.photos/id/1/200/300"/>
		<ProductCard name = "phone" Price = "50000" image = "https://picsum.photos/id/2/200/300"/>
		<ProductCard name = "watch" Price = "2000" image = "https://picsum.photos/id/3/200/300"/>
		<ProductCard name = "pen" Price = "10" image = "https://picsum.photos/id/4/200/300"/>

		</>
	);
}

export default App;

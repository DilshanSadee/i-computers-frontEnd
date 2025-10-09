 import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./componentes/test";
import HomePage from "./Pages/homePage";
import AdminPage from "./Pages/adminPage";
import LoginPage from "./Pages/loginPage";
import RegisterPage from "./Pages/registerPage";


function App() {
	return (

		<BrowserRouter>

		<div className="w-full h-screen bg-primary text-white">
			<Routes path="/">
				<Route path="admin"element ={<AdminPage/>}/>;
				<Route path="/"element ={<HomePage/>}/>;
				<Route path="register"element ={<RegisterPage/>}/>;
				<Route path="login"element ={<LoginPage/>}/>;
			</Routes>
		</div>


		</BrowserRouter>
		
	);
}

export default App;

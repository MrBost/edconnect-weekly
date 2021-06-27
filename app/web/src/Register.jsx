import Footer from "./shared/Footer";
import Header from "./shared/Header";
import Layout from "./shared/Layout";

export default () => {
    return (
        <html>
            <head>
                <title>Module 2 Project Excercise</title>
                <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
            </head>
            <body>
                <div className="header"> 
                <Header/>
                <h1>Register</h1>
                <Footer/>
                </div>
            </body>
        </html>
    )
}




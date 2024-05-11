import app from "./app";
import connection from "./configs/database";
import { cloudinaryConnection } from "./configs/cloudinary.connection";

const PORT = process.env.PORT || 7171;

app.listen(PORT, async () => {
	try {
		await connection;
		await cloudinaryConnection;
		console.log("Connected to Database and Cloudinary");
	} catch (error) {
		console.log(error);
		console.log("Unable to connect to Database");
	}
	console.log(`Server is running on port ${process.env.port}`);
});

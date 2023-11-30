
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET() {
    // Retrieve the authentication token from the cookies
    const authToken = cookies();
    const token = authToken.get("token");

    // If the token is not present, return an unauthorized response
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 407 })
    }

    // Extract the token value
    const { value } = token;

    // Retrieve the JWT secret from the environment variables
    const secret = process.env.JWT_SECRET || "";

    try {
        // Verify the token using the secret
        const decoded = verify(value, secret,);

        // If the token is verified successfully, return a response containing the user information and the decoded payload
        const response = {
            user: "Authenticated",
            payload: decoded
        }
        
    
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (err) {
        // If there is an error during the token verification, return a response indicating that something went wrong
        return NextResponse.json({ message: "Something went wrong, try again !" }, { status: 400 })

    }
}
//
//In this code, we first retrieve the authentication token from the cookies. If the token is not present, we return an unauthorized response.
//
//Next, we verify the token using the JWT secret. If the token is verified successfully, we return a response containing the user information and the decoded payload.
//
//If there is an error during the token verification, we return a response indicating that something went wrong..</s>
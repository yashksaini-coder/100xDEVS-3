import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export default function GET(req : NextRequest, res: Response) {
    const body = req.headers;
    const headers = body.get("authorization");
    const decoded = jwt.decoded(headers, "secret");
    console.log(decoded);

  return NextResponse.json({ user: { name: "John Doe" } });
}
export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, "secret");
    } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const profilePictureUrl = "https://example.com/profile-picture.jpg"; // Replace with actual logic to get profile picture URL

    return NextResponse.json({ user: { name: "John Doe", profilePicture: profilePictureUrl } });
}
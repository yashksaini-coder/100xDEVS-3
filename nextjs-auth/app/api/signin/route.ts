import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest, res: Response) {
    const body = await req.json();

    const userid = body.userid;
    const password = body.password;


    console.log(userid);
    console.log(password);

    
    // const token = jwt.sign({ userid},"secret");

    // return NextResponse.json({ token });

}; 
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import axios from "axios";

const apiKey = process.env.GITHUB_APP_KEY

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")

    if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });

    const githubUsers = await db.github.findMany({
      where: {
        serverId: serverId as string
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(githubUsers);

  } catch (error) {
    console.log("[CODE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get("serverId")
    const userId = searchParams.get("userId")

    if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });
    if (!userId) return new NextResponse("User Id required", { status: 400 });

    const data = await getUserURL(userId)
    
    if (!data) return new NextResponse("No user with this Id", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        githubs: {
          create: {
            name: data?.name,
            content: data
          }
        }
      }       
    });

    return NextResponse.json(server);

  } catch (error) {
    console.log("[CODE_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


async function getUserURL(username: string){
  const apiUrl = `https://api.github.com/users/${username}`;
  
  const headers = {
    Authorization: `token ${apiKey}`,
  };

  try {
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      return response.data
    } else {
      console.error('GitHub API request failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

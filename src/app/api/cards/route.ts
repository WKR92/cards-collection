import Cards from "../../../../model/card";
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../database/conn";
// import connectMongo from "../../../../database/conn";

export async function GET() {
  // await connectMongo().catch(() =>
  //   NextResponse.json(
  //     { error: "Error while connecting" },
  //     {
  //       status: 500,
  //     }
  //   )
  // );

  const connection = await dbConnect();
  if (!connection) return;

  try {
    const cards = await Cards.find({});
    if (!cards)
      return NextResponse.json(
        { error: "Cards not found" },
        {
          status: 404,
        }
      );
    return NextResponse.json({
      cards: cards,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error while fetching data" },
      {
        status: 404,
      }
    );
  }
}

export async function POST(req: Request) {
  // await connectMongo().catch(() => {
  //   return NextResponse.json(
  //     { error: "Error while connecting" },
  //     {
  //       status: 500,
  //     }
  //   );
  // });

  const connection = await dbConnect();
  if (!connection) return;
  
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: "Body not provided" },
        {
          status: 404,
        }
      );
    }
    const res = await Cards.create(body);
    return NextResponse.json(
      { res },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request) {
  // await connectMongo().catch(() => {
  //   return NextResponse.json(
  //     { error: "Error while connecting" },
  //     {
  //       status: 500,
  //     }
  //   );
  // });

  const connection = await dbConnect();
  if (!connection) return;

  try {
    const body = await req.json();
    if (!body)
      return NextResponse.json(
        { error: "Body not provided" },
        {
          status: 404,
        }
      );
    const updatedCard = await Cards.findOneAndUpdate({ _id: body._id }, body, {
      new: true,
    });
    return NextResponse.json(
      { updatedCard },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}

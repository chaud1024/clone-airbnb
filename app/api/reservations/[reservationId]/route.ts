import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma?.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id }, // Creator of the reservation
        { listing: { userId: currentUser.id } }, // Creator of the listing that the reservation is on
      ],
    },
  });

  return NextResponse.json(reservation);
}

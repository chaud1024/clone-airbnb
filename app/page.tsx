import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listing/ListingCard";
import { SafeListing } from "./types";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((item: SafeListing) => (
            <div key={item.id}>
              <ListingCard data={item} currentUser={currentUser} />
            </div>
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}

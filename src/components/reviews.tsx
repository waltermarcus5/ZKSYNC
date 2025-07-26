import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Alex Johnson",
    handle: "@alex_crypto",
    avatar: "AJ",
    text: "The process was so smooth! I connected my wallet and had my ZK tokens in minutes. Highly recommend this airdrop to everyone.",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "smiling man",
  },
  {
    name: "Samantha Lee",
    handle: "@samlee_eth",
    avatar: "SL",
    text: "I was skeptical at first, but it's legit! The UI is clean and the instructions are crystal clear. Great job to the ZKSync team.",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "woman outdoors",
  },
  {
    name: "Ben Carter",
    handle: "@bencarter_dev",
    avatar: "BC",
    text: "Finally, a straightforward airdrop. No hoops to jump through. Connected, claimed, done. The future of L2s is bright!",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "man city",
  },
  {
    name: "Olivia Chen",
    handle: "@cryptoolivia",
    avatar: "OC",
    text: "As a long-time supporter of ZK-rollups, this airdrop was a fantastic reward. The team has built something truly special.",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "woman glasses",
  },
  {
    name: "Daniel Rodriguez",
    handle: "@d_rodriguez",
    avatar: "DR",
    text: "Impressed by the security and ease of use. This sets a new standard for how airdrops should be conducted. Two thumbs up!",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "man beard",
  },
  {
    name: "Aisha Khan",
    handle: "@aisha_codes",
    avatar: "AK",
    text: "The educational aspect of this simulation is brilliant. It's a safe way for newcomers to learn about airdrops without risk.",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "woman cafe",
  },
  {
    name: "Mike Stan",
    handle: "@stans_web3",
    avatar: "MS",
    text: "This is the cleanest airdrop interface I've ever seen. The team has clearly put a lot of thought into the user experience.",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "man headphones",
  },
  {
    name: "Chloe Kim",
    handle: "@chloek_nft",
    avatar: "CK",
    text: "Super fast and easy. I'm excited to see how the ZKSync ecosystem develops from here. Great project!",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "woman gallery",
  },
  {
    name: "James White",
    handle: "@jamesw_defi",
    avatar: "JW",
    text: "A fantastic example of how to do a community airdrop right. Well done to the entire team. Highly professional.",
    rating: 5,
    image: "https://placehold.co/100x100.png",
    hint: "man sea",
  },
];

export function Reviews() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Trusted by the Community
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
            See what our early users are saying about the airdrop.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.image} alt={review.name} data-ai-hint={review.hint} />
                      <AvatarFallback>{review.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.handle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

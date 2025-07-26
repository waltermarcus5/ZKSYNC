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
    image: "https://placehold.co/100x100/E2E8F0/4A5568.png",
  },
  {
    name: "Samantha Lee",
    handle: "@samlee_eth",
    avatar: "SL",
    text: "I was skeptical at first, but it's legit! The UI is clean and the instructions are crystal clear. Great job to the ZKSync team.",
    rating: 5,
    image: "https://placehold.co/100x100/E2E8F0/4A5568.png",
  },
  {
    name: "Ben Carter",
    handle: "@bencarter_dev",
    avatar: "BC",
    text: "Finally, a straightforward airdrop. No hoops to jump through. Connected, claimed, done. The future of L2s is bright!",
    rating: 5,
    image: "https://placehold.co/100x100/E2E8F0/4A5568.png",
  },
];

export function Reviews() {
  return (
    <section className="bg-secondary py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Trusted by the Community
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            See what our early users are saying about the airdrop.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} data-ai-hint="person avatar" />
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
